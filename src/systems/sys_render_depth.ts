/**
 * @module systems/sys_render_depth
 */

import {
    GL_COLOR_BUFFER_BIT,
    GL_DEPTH_BUFFER_BIT,
    GL_FRAMEBUFFER,
    GL_UNSIGNED_SHORT,
} from "../../common/webgl.js";
import {CameraDepth, CameraKind} from "../components/com_camera.js";
import {
    Render,
    RenderInstanced,
    RenderKind,
    RenderParticlesColored,
    RenderParticlesTextured,
    RenderVertices,
} from "../components/com_render.js";
import {Transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Render;

export function sys_render_depth(game: Game, delta: number) {
    for (let camera_entity of game.Cameras) {
        let camera = game.World.Camera[camera_entity];
        switch (camera.Kind) {
            case CameraKind.Depth:
                render_depth(game, camera);
                break;
        }
    }
}

function render_depth(game: Game, camera: CameraDepth) {
    let current_material = null;
    let current_front_face = null;

    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target.Framebuffer);
    game.Gl.viewport(0, 0, camera.Target.Width, camera.Target.Height);
    game.Gl.clearColor(...camera.ClearColor);
    game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            let transform = game.World.Transform[i];
            let render = game.World.Render[i];

            if (render.Material !== current_material) {
                current_material = render.Material;
                switch (render.Kind) {
                    case RenderKind.Vertices:
                    case RenderKind.ParticlesColored:
                    case RenderKind.ParticlesTextured:
                        break;
                    case RenderKind.Instanced:
                        use_instanced_shading(game, camera);
                        break;
                    default:
                        use_default_shading(game, camera);
                }
            }

            if (render.FrontFace !== current_front_face) {
                current_front_face = render.FrontFace;
                game.Gl.frontFace(render.FrontFace);
            }

            switch (render.Kind) {
                case RenderKind.Vertices:
                case RenderKind.ParticlesColored:
                case RenderKind.ParticlesTextured:
                    // Skip rendering, RenderVertices doesn't cast shadow for now.
                    break;
                case RenderKind.Instanced:
                    draw_instanced_shading(game, transform, render);
                    break;
                default:
                    draw_default_shading(game, transform, render);
            }
        }
    }
}

function use_default_shading(game: Game, camera: CameraDepth) {
    game.Gl.useProgram(game.MaterialDepth.Program);
    game.Gl.uniformMatrix4fv(game.MaterialDepth.Locations.Pv, false, camera.Pv);
}

function draw_default_shading(
    game: Game,
    transform: Transform,
    render: Exclude<Render, RenderVertices | RenderParticlesColored | RenderParticlesTextured>
) {
    game.Gl.uniformMatrix4fv(game.MaterialDepth.Locations.World, false, transform.World);
    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElements(game.MaterialDepth.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    game.Gl.bindVertexArray(null);
}

function use_instanced_shading(game: Game, camera: CameraDepth) {
    game.Gl.useProgram(game.MaterialDepthInstanced.Program);
    game.Gl.uniformMatrix4fv(game.MaterialDepthInstanced.Locations.Pv, false, camera.Pv);
}

function draw_instanced_shading(game: Game, transform: Transform, render: RenderInstanced) {
    game.Gl.uniformMatrix4fv(game.MaterialDepthInstanced.Locations.World, false, transform.World);
    game.Gl.uniformMatrix4fv(game.MaterialDepthInstanced.Locations.Self, false, transform.Self);
    game.Gl.bindVertexArray(render.Vao);
    game.Gl.drawElementsInstanced(
        game.MaterialDepthInstanced.Mode,
        render.Mesh.IndexCount,
        GL_UNSIGNED_SHORT,
        0,
        render.InstanceCount
    );
    game.Gl.bindVertexArray(null);
}
