import {create_depth_target} from "../common/framebuffer.js";
import {Game3D} from "../common/game.js";
import {Entity} from "../common/world.js";
import {mat_forward_colored_gouraud_skinned} from "../materials/mat_forward_colored_gouraud_skinned.js";
import {mat_forward_colored_phong} from "../materials/mat_forward_colored_phong.js";
import {mat_forward_colored_phong_skinned} from "../materials/mat_forward_colored_phong_skinned.js";
import {mat_forward_colored_shadows} from "../materials/mat_forward_colored_shadows.js";
import {mat_forward_depth} from "../materials/mat_forward_depth.js";
import {mat_forward_depth_instanced} from "../materials/mat_forward_depth_instanced.js";
import {mat_forward_instanced} from "../materials/mat_forward_instanced.js";
import {mat_forward_particles_colored} from "../materials/mat_forward_particles_colored.js";
import {mat_forward_particles_textured} from "../materials/mat_forward_particles_textured.js";
import {mesh_cube} from "../meshes/cube.js";
import {mesh_leaf} from "../meshes/leaf.js";
import {mesh_lisek} from "../meshes/lisek.js";
import {mesh_ludek} from "../meshes/ludek.js";
import {mesh_plane} from "../meshes/plane.js";
import {sys_animate} from "./systems/sys_animate.js";
import {sys_audio_listener} from "./systems/sys_audio_listener.js";
import {sys_audio_source} from "./systems/sys_audio_source.js";
import {sys_camera} from "./systems/sys_camera.js";
import {sys_collide} from "./systems/sys_collide.js";
import {sys_control_always} from "./systems/sys_control_always.js";
import {sys_control_keyboard} from "./systems/sys_control_keyboard.js";
import {sys_control_mouse_move} from "./systems/sys_control_mouse_move.js";
import {sys_control_touch_move} from "./systems/sys_control_touch_move.js";
import {sys_control_xbox} from "./systems/sys_control_xbox.js";
import {sys_draw} from "./systems/sys_draw.js";
import {sys_lifespan} from "./systems/sys_lifespan.js";
import {sys_light} from "./systems/sys_light.js";
import {sys_mimic} from "./systems/sys_mimic.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_particles} from "./systems/sys_particles.js";
import {sys_physics_integrate} from "./systems/sys_physics_integrate.js";
import {sys_physics_kinematic} from "./systems/sys_physics_kinematic.js";
import {sys_physics_resolve} from "./systems/sys_physics_resolve.js";
import {sys_poll} from "./systems/sys_poll.js";
import {sys_render_depth} from "./systems/sys_render_depth.js";
import {sys_render_forward} from "./systems/sys_render_forward.js";
import {sys_resize} from "./systems/sys_resize.js";
import {sys_shake} from "./systems/sys_shake.js";
import {sys_spawn} from "./systems/sys_spawn.js";
import {sys_toggle} from "./systems/sys_toggle.js";
import {sys_transform} from "./systems/sys_transform.js";
import {sys_trigger} from "./systems/sys_trigger.js";
import {sys_ui} from "./systems/sys_ui.js";
import {World} from "./world.js";

export class Game extends Game3D {
    World = new World();

    MaterialColoredShaded = mat_forward_colored_phong(this.Gl);
    MaterialColoredShadows = mat_forward_colored_shadows(this.Gl);
    MaterialColoredGouraudSkinned = mat_forward_colored_gouraud_skinned(this.Gl);
    MaterialColoredPhongSkinned = mat_forward_colored_phong_skinned(this.Gl);
    MaterialParticlesColored = mat_forward_particles_colored(this.Gl);
    MaterialParticlesTextured = mat_forward_particles_textured(this.Gl);
    MaterialDepth = mat_forward_depth(this.Gl);
    MaterialDepthInstanced = mat_forward_depth_instanced(this.Gl);
    MaterialInstanced = mat_forward_instanced(this.Gl);

    MeshLeaf = mesh_leaf(this.Gl);
    MeshPlane = mesh_plane(this.Gl);
    MeshCube = mesh_cube(this.Gl);
    MeshLudek = mesh_ludek(this.Gl);
    MeshLisek = mesh_lisek(this.Gl);

    // The rendering pipeline supports 8 lights.
    LightPositions = new Float32Array(4 * 8);
    LightDetails = new Float32Array(4 * 8);
    Cameras: Array<Entity> = [];

    Targets = {
        Sun: create_depth_target(this.Gl, 2048, 2048),
    };

    ItemsCollected = 0;
    ItemsMissed = 0;

    override FixedUpdate(delta: number) {
        // Collisions and physics.
        sys_physics_integrate(this, delta);
        sys_transform(this, delta);
        sys_physics_kinematic(this, delta);
        sys_collide(this, delta);
        sys_physics_resolve(this, delta);
        sys_transform(this, delta);
        sys_trigger(this, delta);
    }

    override FrameUpdate(delta: number) {
        // Event loop.
        sys_poll(this, delta);

        // Player input.
        sys_control_keyboard(this, delta);
        sys_control_mouse_move(this, delta);
        sys_control_touch_move(this, delta);
        sys_control_xbox(this, delta);

        // AI.
        sys_control_always(this, delta);

        // Game logic.
        sys_animate(this, delta);
        sys_move(this, delta);
        sys_mimic(this, delta);
        sys_lifespan(this, delta);
        sys_shake(this, delta);
        sys_toggle(this, delta);
        sys_spawn(this, delta);
        sys_particles(this, delta);
        sys_transform(this, delta);

        // Rendering.
        sys_audio_listener(this, delta);
        sys_audio_source(this, delta);
        sys_resize(this, delta);
        sys_camera(this, delta);
        sys_light(this, delta);
        sys_render_depth(this, delta);
        sys_render_forward(this, delta);
        sys_draw(this, delta);
        sys_ui(this, delta);
    }
}

export const enum Layer {
    None = 0,
    Player = 1,
    Terrain = 2,
    Obstacle = 4,
    Collectable = 8,
}
