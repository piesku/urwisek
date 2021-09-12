import {from_euler} from "../../common/quat.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {cull} from "../components/com_cull.js";
import {emit_particles} from "../components/com_emit_particles.js";
import {render_particles_colored} from "../components/com_render.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {shake} from "../components/com_shake.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {Has} from "../world.js";

export function blueprint_fire(game: Game) {
    return [
        collide(false, Layer.Terrain, Layer.None, [1, 4, 1]),
        rigid_body(RigidKind.Static),
        children([
            transform(undefined, from_euler([0, 0, 0, 1], -90, 0, 0)),
            emit_particles(2, 0.05, 1),
            render_particles_colored([1, 1, 0, 1], 50, [1, 0, 0, 1], 10),
            shake(0.5),
            cull(Has.Render | Has.Shake | Has.EmitParticles),
        ]),
    ];
}
