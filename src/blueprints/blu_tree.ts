import {from_euler} from "../../common/quat.js";
import {float, integer} from "../../common/random.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows, render_instanced} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

// prettier-ignore
export const leaft_colors = [
    0, 1, 0,
    0, 0.36, 0,
    0, 0.5, 0,
    0.48, 0.98, 0,
    1, 0.84, 0,
    1, 0.54, 0,
    0.84, 0.21, 0.21,
];

export function blueprint_tree(game: Game, min = 2, max = 4) {
    let radius = float(0.5, 0.9);
    let leaf_count = integer(400, 600);
    let height = float(min, max);
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
        children(
            [
                transform([0, height / 2, 0], undefined, [0.25, height, 0.25]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.2, 0.2, 1]
                ),
            ],
            [
                transform([0, height, 0]),
                cull(Has.Render),
                render_instanced(
                    game.MeshLeaf,
                    Float32Array.from(offsets),
                    Float32Array.from(rotations),
                    leaft_colors
                ),
            ]
        ),
    ];
}
