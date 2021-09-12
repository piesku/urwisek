/**
 * @module systems/sys_render_forward
 */

import {resize_depth_target} from "../../common/framebuffer.js";
import {QualitySettings} from "../../common/game.js";
import {multiply} from "../../common/mat4.js";
import {Material} from "../../common/material.js";
import {
    GL_ARRAY_BUFFER,
    GL_COLOR_BUFFER_BIT,
    GL_CULL_FACE,
    GL_DEPTH_BUFFER_BIT,
    GL_FLOAT,
    GL_FRAMEBUFFER,
    GL_TEXTURE0,
    GL_TEXTURE_2D,
    GL_UNSIGNED_SHORT,
} from "../../common/webgl.js";
import {Entity, first_entity} from "../../common/world.js";
import {
    ColoredShadedLayout,
    ColoredUnlitLayout,
    FogLayout,
    ForwardShadingLayout,
    InstancedLayout,
    ParticlesColoredLayout,
    ShadowMappingLayout,
    SingleColorLayout,
    SkinningLayout,
} from "../../materials/layout.js";
import {CameraDepth, CameraEye, CameraForward, CameraKind} from "../components/com_camera.js";
import {query_all} from "../components/com_children.js";
import {EmitParticles} from "../components/com_emit_particles.js";
import {
    DATA_PER_PARTICLE,
    RenderColoredShadows,
    RenderColoredSkinned,
    RenderColoredUnlit,
    RenderInstanced,
    RenderKind,
    RenderParticlesColored,
} from "../components/com_render.js";
import {Transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Render;

export function sys_render_forward(game: Game, delta: number) {
    if (game.Quality !== game.Targets.Sun.Width) {
        resize_depth_target(game.Gl, game.Targets.Sun, game.Quality, game.Quality);
    }

    for (let camera_entity of game.Cameras) {
        let camera = game.World.Camera[camera_entity];
        switch (camera.Kind) {
            case CameraKind.Forward:
                render_forward(game, camera);
                break;
            case CameraKind.Depth:
                render_depth(game, camera);
                break;
        }
    }
}

function render_forward(game: Game, camera: CameraForward) {
    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, null);
    game.Gl.viewport(0, 0, game.ViewportWidth, game.ViewportHeight);
    game.Gl.clearColor(...camera.ClearColor);
    game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    render(game, camera);
}

function render_depth(game: Game, camera: CameraDepth) {
    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target.Framebuffer);
    game.Gl.viewport(0, 0, camera.Target.Width, camera.Target.Height);
    game.Gl.clearColor(...camera.ClearColor);
    game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    render(game, camera);
}

function render(game: Game, eye: CameraEye) {
    // Keep track of the current material to minimize switching.
    let current_material = null;

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            let transform = game.World.Transform[i];
            let render = game.World.Render[i];

            if (render.Material !== current_material) {
                current_material = render.Material;
                switch (render.Kind) {
                    case RenderKind.ColoredUnlit:
                        use_colored_unlit(game, render.Material, eye);
                        break;
                    case RenderKind.ColoredShadows:
                        use_colored_shadows(game, render.Material, eye);
                        break;
                    case RenderKind.ColoredSkinned:
                        use_colored_skinned(game, render.Material, eye);
                        break;
                    case RenderKind.ParticlesColored:
                        use_particles_colored(game, render.Material, eye);
                        break;
                    case RenderKind.Instanced:
                        use_instanced(game, render.Material, eye);
                        break;
                }
            }

            switch (render.Kind) {
                case RenderKind.ColoredUnlit:
                    draw_colored_unlit(game, transform, render);
                    break;
                case RenderKind.ColoredShadows:
                    draw_colored_shadows(game, transform, render);
                    break;
                case RenderKind.ColoredSkinned:
                    draw_colored_skinned(game, i, transform, render);
                    break;
                case RenderKind.ParticlesColored: {
                    let emitter = game.World.EmitParticles[i];
                    if (emitter.Instances.length) {
                        draw_particles_colored(game, render, emitter);
                    }
                    break;
                }
                case RenderKind.Instanced:
                    draw_instanced(game, transform, render);
                    break;
            }
        }
    }
}

function use_colored_unlit(game: Game, material: Material<ColoredUnlitLayout>, eye: CameraEye) {
    game.Gl.enable(GL_CULL_FACE);
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
}

function draw_colored_unlit(game: Game, transform: Transform, render: RenderColoredUnlit) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);
    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.Gl.bindVertexArray(null);
}

function use_colored_shadows(
    game: Game,
    material: Material<
        ColoredShadedLayout & ForwardShadingLayout & ShadowMappingLayout & FogLayout
    >,
    eye: CameraEye
) {
    game.Gl.enable(GL_CULL_FACE);
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);

    if (eye.Kind === CameraKind.Depth) {
        game.Gl.activeTexture(GL_TEXTURE0);
        game.Gl.bindTexture(GL_TEXTURE_2D, game.Targets.Noop.DepthTexture);
        game.Gl.uniform1i(material.Locations.ShadowMap, 0);
    } else {
        game.Gl.activeTexture(GL_TEXTURE0);
        game.Gl.bindTexture(GL_TEXTURE_2D, game.Targets.Sun.DepthTexture);
        game.Gl.uniform1i(material.Locations.ShadowMap, 0);

        // Only one shadow source is supported.
        let light_entity = first_entity(game.World, Has.Camera | Has.Light);
        if (light_entity) {
            let light_camera = game.World.Camera[light_entity];
            game.Gl.uniformMatrix4fv(material.Locations.ShadowSpace, false, light_camera.Pv);
        }
    }
}

function draw_colored_shadows(game: Game, transform: Transform, render: RenderColoredShadows) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
    game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.Gl.bindVertexArray(null);
}

function use_colored_skinned(
    game: Game,
    material: Material<SkinningLayout & ForwardShadingLayout & FogLayout>,
    eye: CameraEye
) {
    game.Gl.enable(GL_CULL_FACE);
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
}

const bones = new Float32Array(16 * 6);
function draw_colored_skinned(
    game: Game,
    entity: Entity,
    transform: Transform,
    render: RenderColoredSkinned
) {
    game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);

    let bone_entities: Array<Entity> = [];
    if (game.World.Signature[entity] & Has.Children) {
        for (let bone_entity of query_all(game.World, entity, Has.Bone | Has.Transform)) {
            bone_entities.push(bone_entity);
        }
    } else {
        // Find the 4 tail bones. They're top-level for mimic() to work, so we
        // need to find them in the world rather than the tail's children.
        let start_here = entity;
        for (let i = 0; i < 4; i++) {
            let bone_entity = first_entity(game.World, Has.Bone | Has.Transform, start_here);
            if (bone_entity) {
                bone_entities.push(bone_entity);
                start_here = bone_entity + 1;
            }
        }
    }
    for (let bone_entity of bone_entities) {
        let bone_transform = game.World.Transform[bone_entity];
        let bone = game.World.Bone[bone_entity];
        let bone_view = bones.subarray(bone.Index * 16);
        multiply(bone_view, bone_transform.World, bone.InverseBindPose);
    }
    game.Gl.uniformMatrix4fv(render.Material.Locations.Bones, false, bones);

    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.Gl.bindVertexArray(null);
}

function use_particles_colored(
    game: Game,
    material: Material<ParticlesColoredLayout & FogLayout>,
    eye: CameraEye
) {
    game.Gl.enable(GL_CULL_FACE);
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
    game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
}

function draw_particles_colored(
    game: Game,
    render: RenderParticlesColored,
    emitter: EmitParticles
) {
    game.Gl.uniform4fv(render.Material.Locations.ColorStart, render.ColorStart);
    game.Gl.uniform4fv(render.Material.Locations.ColorEnd, render.ColorEnd);

    game.Gl.uniform4f(
        render.Material.Locations.Details,
        emitter.Lifespan,
        emitter.Speed,
        ...render.Size
    );

    let instances = Float32Array.from(emitter.Instances);
    game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.Buffer);
    game.Gl.bufferSubData(GL_ARRAY_BUFFER, 0, instances);

    game.Gl.enableVertexAttribArray(render.Material.Locations.OriginAge);
    game.Gl.vertexAttribPointer(
        render.Material.Locations.OriginAge,
        4,
        GL_FLOAT,
        false,
        DATA_PER_PARTICLE * 4,
        0
    );

    game.Gl.enableVertexAttribArray(render.Material.Locations.Direction);
    game.Gl.vertexAttribPointer(
        render.Material.Locations.Direction,
        3,
        GL_FLOAT,
        false,
        DATA_PER_PARTICLE * 4,
        4 * 4
    );
    game.Gl.drawArrays(render.Material.Mode, 0, emitter.Instances.length / DATA_PER_PARTICLE);
}

function use_instanced(
    game: Game,
    material: Material<SingleColorLayout & InstancedLayout & FogLayout>,
    eye: CameraEye
) {
    game.Gl.disable(GL_CULL_FACE);
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
    game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
}

function draw_instanced(game: Game, transform: Transform, render: RenderInstanced) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.bindVertexArray(render.Vao);

    let quality_factor = game.Quality / QualitySettings.Ultra;
    let instance_count = Math.floor(render.InstanceCount * quality_factor);
    game.Gl.drawElementsInstanced(
        render.Material.Mode,
        render.Mesh.IndexCount,
        GL_UNSIGNED_SHORT,
        0,
        instance_count
    );
    game.Gl.bindVertexArray(null);
}
