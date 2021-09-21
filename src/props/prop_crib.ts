import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_crib(game: Game) {
    return [
        children(
            [
                transform([0, 0.5, 0], undefined, [1.01, 0.5, 1]),
                cull(Has.Render),
                render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [1, 1, 1, 1]),
            ],

            [
                transform([0, 0.25, 0], [0, 0, -0.71, 0.71], [0.5, 1, 1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [1, 1, 1, 1]
                ),
            ],

            [
                transform([0.25, 0.75, 0], [0, 0, -0.71, 0.71], [1, 0.5, 1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [1, 1, 1, 1]
                ),
            ]
        ),
    ];
}
