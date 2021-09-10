import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_rocket(game: Game) {
    return [
        children(
            [
                transform([0, 3.5, 0], [0, -0.71, 0, 0.71], [1, 7, 1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [1, 1, 1, 1]
                ),
            ],

            [
                transform([0, 7.8, 0], [0, -0.71, 0, 0.71], [0.8, 1.6, 0.8]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [1, 1, 1, 1]
                ),
            ],

            [
                transform([0, 9.4, 0], [0, -0.71, 0, 0.71], [0.56, 1.6, 0.56]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [1, 1, 1, 1]
                ),
            ],

            [
                transform([0, 10.2, 0], [-0.5, -0.5, 0.5, 0.5], [1.72, 0.51, 0.59]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [1, 1, 1, 1]
                ),
            ],

            [
                transform([0, 8.6, 0], [-0.5, -0.5, 0.5, 0.5], [1.12, 0.44, 0.8]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0, 0, 0, 1]
                ),
            ],

            [
                transform([0, 7, 0], [-0.5, -0.5, 0.5, 0.5], [2.61, 0.77, 0.9]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0, 0, 0, 1]
                ),
            ]
        ),
    ];
}
