import {from_rotation_translation_scale} from "../../common/mat4.js";
import {Vec3} from "../../common/math.js";
import {from_euler} from "../../common/quat.js";
import {float} from "../../common/random.js";
import {cull} from "../components/com_cull.js";
import {render_instanced} from "../components/com_render.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function blueprint_bush(game: Game) {
    let radius = float(0.5, 0.9);
    let leaf_count = 600;
    let matrices = new Float32Array(leaf_count * 16);
    for (let i = 0; i < leaf_count; i++) {
        let offset: Vec3 = [float(-radius, radius), float(-radius, radius), float(-radius, radius)];
        let rotation = from_euler([0, 0, 0, 1], float(-90, 90), float(-90, 90), float(-90, 90));
        let view = new Float32Array(matrices.buffer, i * 4 * 16, 16);
        from_rotation_translation_scale(view, rotation, offset, [1, 1, 1]);
    }

    return [cull(Has.Render), render_instanced(game.MeshLeaf, matrices)];
}
