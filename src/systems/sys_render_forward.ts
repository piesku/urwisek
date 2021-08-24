/**
 * @module systems/sys_render_forward
 */

import {multiply} from "../../common/mat4.js";
import {Material} from "../../common/material.js";
import {
    GL_ARRAY_BUFFER,
    GL_COLOR_BUFFER_BIT,
    GL_DEPTH_BUFFER_BIT,
    GL_FLOAT,
    GL_FRAMEBUFFER,
    GL_TEXTURE0,
    GL_TEXTURE1,
    GL_TEXTURE2,
    GL_TEXTURE3,
    GL_TEXTURE_2D,
    GL_UNSIGNED_SHORT,
} from "../../common/webgl.js";
import {Entity, first_entity} from "../../common/world.js";
import {
    ColoredShadedLayout,
    ColoredUnlitLayout,
    ForwardShadingLayout,
    InstancedLayout,
    MappedShadedLayout,
    PaletteShadedLayout,
    ParticlesColoredLayout,
    ParticlesTexturedLayout,
    ShadowMappingLayout,
    TexturedShadedLayout,
    TexturedUnlitLayout,
} from "../../materials/layout.js";
import {CameraEye, CameraForward, CameraFramebuffer, CameraKind} from "../components/com_camera.js";
import {query_all} from "../components/com_children.js";
import {EmitParticles} from "../components/com_emit_particles.js";
import {
    DATA_PER_PARTICLE,
    RenderColoredShaded,
    RenderColoredShadows,
    RenderColoredSkinned,
    RenderColoredUnlit,
    RenderInstanced,
    RenderKind,
    RenderMappedShaded,
    RenderParticlesColored,
    RenderParticlesTextured,
    RenderTexturedShaded,
    RenderTexturedUnlit,
    RenderVertices,
} from "../components/com_render.js";
import {Transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Render;

export function sys_render_forward(game: Game, delta: number) {
    for (let camera_entity of game.Cameras) {
        let camera = game.World.Camera[camera_entity];
        switch (camera.Kind) {
            case CameraKind.Forward:
                render_forward(game, camera);
                break;
            case CameraKind.Framebuffer:
                render_framebuffer(game, camera);
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

function render_framebuffer(game: Game, camera: CameraFramebuffer) {
    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target.Framebuffer);
    game.Gl.viewport(0, 0, camera.Target.Width, camera.Target.Height);
    game.Gl.clearColor(...camera.ClearColor);
    game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    render(game, camera, camera.Target.RenderTexture);
}

function render(game: Game, eye: CameraEye, current_target?: WebGLTexture) {
    // Keep track of the current material to minimize switching.
    let current_material = null;
    let current_front_face = null;

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
                    case RenderKind.ColoredShaded:
                        use_colored_shaded(game, render.Material, eye);
                        break;
                    case RenderKind.TexturedUnlit:
                        use_textured_unlit(game, render.Material, eye);
                        break;
                    case RenderKind.TexturedShaded:
                        use_textured_shaded(game, render.Material, eye);
                        break;
                    case RenderKind.Vertices:
                        use_vertices(game, render.Material, eye);
                        break;
                    case RenderKind.MappedShaded:
                        use_mapped(game, render.Material, eye);
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
                    case RenderKind.ParticlesTextured:
                        use_particles_textured(game, render.Material, eye);
                        break;
                    case RenderKind.Instanced:
                        use_instanced(game, render.Material, eye);
                        break;
                }
            }

            if (render.FrontFace !== current_front_face) {
                current_front_face = render.FrontFace;
                game.Gl.frontFace(render.FrontFace);
            }

            switch (render.Kind) {
                case RenderKind.ColoredUnlit:
                    draw_colored_unlit(game, transform, render);
                    break;
                case RenderKind.ColoredShaded:
                    draw_colored_shaded(game, transform, render);
                    break;
                case RenderKind.TexturedUnlit:
                    // Prevent feedback loop between the active render target
                    // and the texture being rendered.
                    if (render.Texture !== current_target) {
                        draw_textured_unlit(game, transform, render);
                    }
                    break;
                case RenderKind.TexturedShaded:
                    // Prevent feedback loop between the active render target
                    // and the texture being rendered.
                    if (render.Texture !== current_target) {
                        draw_textured_shaded(game, transform, render);
                    }
                    break;
                case RenderKind.Vertices:
                    draw_vertices(game, transform, render);
                    break;
                case RenderKind.MappedShaded:
                    draw_mapped(game, transform, render);
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
                case RenderKind.ParticlesTextured: {
                    let emitter = game.World.EmitParticles[i];
                    if (emitter.Instances.length) {
                        draw_particles_textured(game, render, emitter);
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

function use_colored_shaded(
    game: Game,
    material: Material<ColoredShadedLayout & ForwardShadingLayout>,
    eye: CameraEye
) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
}

function draw_colored_shaded(game: Game, transform: Transform, render: RenderColoredShaded) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
    game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
    game.Gl.uniform4fv(render.Material.Locations.SpecularColor, render.SpecularColor);
    game.Gl.uniform1f(render.Material.Locations.Shininess, render.Shininess);
    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.Gl.bindVertexArray(null);
}

function use_textured_unlit(game: Game, material: Material<TexturedUnlitLayout>, eye: CameraEye) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
}

function draw_textured_unlit(game: Game, transform: Transform, render: RenderTexturedUnlit) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);

    game.Gl.activeTexture(GL_TEXTURE0);
    game.Gl.bindTexture(GL_TEXTURE_2D, render.Texture);
    game.Gl.uniform1i(render.Material.Locations.TextureMap, 0);

    game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);

    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.Gl.bindVertexArray(null);
}

function use_textured_shaded(
    game: Game,
    material: Material<TexturedShadedLayout & ForwardShadingLayout>,
    eye: CameraEye
) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
}

function draw_textured_shaded(game: Game, transform: Transform, render: RenderTexturedShaded) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
    game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
    game.Gl.uniform4fv(render.Material.Locations.SpecularColor, render.SpecularColor);
    game.Gl.uniform1f(render.Material.Locations.Shininess, render.Shininess);

    game.Gl.activeTexture(GL_TEXTURE0);
    game.Gl.bindTexture(GL_TEXTURE_2D, render.Texture);
    game.Gl.uniform1i(render.Material.Locations.DiffuseMap, 0);

    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.Gl.bindVertexArray(null);
}

function use_vertices(game: Game, material: Material<ColoredUnlitLayout>, eye: CameraEye) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
}

function draw_vertices(game: Game, transform: Transform, render: RenderVertices) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);
    game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.VertexBuffer);
    game.Gl.enableVertexAttribArray(render.Material.Locations.VertexPosition);
    game.Gl.vertexAttribPointer(render.Material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
    game.Gl.drawArrays(render.Material.Mode, 0, render.IndexCount);
}

function use_mapped(
    game: Game,
    material: Material<MappedShadedLayout & ForwardShadingLayout>,
    eye: CameraEye
) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
}

function draw_mapped(game: Game, transform: Transform, render: RenderMappedShaded) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);

    game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);

    game.Gl.activeTexture(GL_TEXTURE1);
    game.Gl.bindTexture(GL_TEXTURE_2D, render.DiffuseMap);
    game.Gl.uniform1i(render.Material.Locations.DiffuseMap, 1);

    game.Gl.activeTexture(GL_TEXTURE2);
    game.Gl.bindTexture(GL_TEXTURE_2D, render.NormalMap);
    game.Gl.uniform1i(render.Material.Locations.NormalMap, 2);

    game.Gl.activeTexture(GL_TEXTURE3);
    game.Gl.bindTexture(GL_TEXTURE_2D, render.RoughnessMap);
    game.Gl.uniform1i(render.Material.Locations.RoughnessMap, 3);

    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.Gl.bindVertexArray(null);
}

function use_colored_shadows(
    game: Game,
    material: Material<ColoredShadedLayout & ForwardShadingLayout & ShadowMappingLayout>,
    eye: CameraEye
) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);

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

function draw_colored_shadows(game: Game, transform: Transform, render: RenderColoredShadows) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
    game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
    game.Gl.uniform4fv(render.Material.Locations.SpecularColor, render.SpecularColor);
    game.Gl.uniform1f(render.Material.Locations.Shininess, render.Shininess);
    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.Gl.bindVertexArray(null);
}

function use_colored_skinned(
    game: Game,
    material: Material<ColoredShadedLayout & ForwardShadingLayout>,
    eye: CameraEye
) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
}

const bones = new Float32Array(16 * 6);
function draw_colored_skinned(
    game: Game,
    entity: Entity,
    transform: Transform,
    render: RenderColoredSkinned
) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
    game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
    game.Gl.uniform4fv(render.Material.Locations.SpecularColor, render.SpecularColor);
    game.Gl.uniform1f(render.Material.Locations.Shininess, render.Shininess);

    let bone_entities: Array<Entity> = [];
    if (game.World.Signature[entity] & Has.Children) {
        for (let bone_entity of query_all(game.World, entity, Has.Bone | Has.Transform)) {
            bone_entities.push(bone_entity);
        }
    } else {
        // Find the 5 tail bones. They're top-level for mimic() to work, so we
        // need to find them in the world rather than the tail's children.
        let start_here = entity;
        for (let i = 0; i < 5; i++) {
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
    material: Material<ParticlesColoredLayout>,
    eye: CameraEye
) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
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

function use_particles_textured(
    game: Game,
    material: Material<ParticlesTexturedLayout>,
    eye: CameraEye
) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
}

function draw_particles_textured(
    game: Game,
    render: RenderParticlesTextured,
    emitter: EmitParticles
) {
    game.Gl.uniform4fv(render.Material.Locations.ColorStart, render.ColorStart);
    game.Gl.uniform4fv(render.Material.Locations.ColorEnd, render.ColorEnd);

    game.Gl.activeTexture(GL_TEXTURE0);
    game.Gl.bindTexture(GL_TEXTURE_2D, render.Texture);
    game.Gl.uniform1i(render.Material.Locations.TextureMap, 0);

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
    game.Gl.enableVertexAttribArray(render.Material.Locations.DirectionSeed);
    game.Gl.vertexAttribPointer(
        render.Material.Locations.DirectionSeed,
        4,
        GL_FLOAT,
        false,
        DATA_PER_PARTICLE * 4,
        4 * 4
    );
    game.Gl.drawArrays(render.Material.Mode, 0, emitter.Instances.length / DATA_PER_PARTICLE);
}

function use_instanced(
    game: Game,
    material: Material<PaletteShadedLayout & InstancedLayout & ForwardShadingLayout>,
    eye: CameraEye
) {
    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
    game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
}

function draw_instanced(game: Game, transform: Transform, render: RenderInstanced) {
    game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
    game.Gl.uniform3fv(render.Material.Locations.Palette, render.Palette);
    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElementsInstanced(
        render.Material.Mode,
        render.Mesh.IndexCount,
        GL_UNSIGNED_SHORT,
        0,
        render.InstanceCount
    );
    game.Gl.bindVertexArray(null);
}
