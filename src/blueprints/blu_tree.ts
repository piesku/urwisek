import {float} from "../../common/random.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {blueprint_bush} from "./blu_bush.js";

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
    let height = float(min, max);

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
            [transform([0, height, 0]), cull(Has.Render), ...blueprint_bush(game)]
        ),
    ];
}
