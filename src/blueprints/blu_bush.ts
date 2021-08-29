import {from_euler} from "../../common/quat.js";
import {float, integer} from "../../common/random.js";
import {cull} from "../components/com_cull.js";
import {render_instanced} from "../components/com_render.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {leaft_colors} from "./blu_tree.js";

export function blueprint_bush(game: Game) {
    let radius = float(0.5, 0.9);
    let leaf_count = integer(400, 600);
    let offsets = [];
    let rotations = [];
    for (let i = 0; i < leaf_count; i++) {
        offsets.push(
            float(-radius, radius),
            float(-radius, radius),
            float(-radius, radius),
            integer(0, 7)
        );
        rotations.push(...from_euler([0, 0, 0, 0], float(-90, 90), float(-90, 90), float(-90, 90)));
    }

    return [
        cull(Has.Render),
        render_instanced(
            game.MeshLeaf,
            Float32Array.from(offsets),
            Float32Array.from(rotations),
            leaft_colors
        ),
    ];
}
