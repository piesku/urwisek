import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_house(game: Game) {
    return [
        children(
            [
                transform([0, 1.7000000476837158, 0], undefined, [3, 3, 3]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.095, 0.095, 0.095, 1]
                ),
            ],

            [
                transform([-2.25, 1.7000000476837158, 0], undefined, [1.5, 0.10000000149011612, 3]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.069, 0.154, 0.8, 1]
                ),
            ],

            [
                transform(
                    [-0.800000011920929, 0.10000000149011612, 0],
                    undefined,
                    [4.900000095367432, 0.20000000298023224, 3.4000000953674316]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.095, 0.095, 0.095, 1]
                ),
            ],

            [
                transform(
                    [-2.814239978790283, 0.949999988079071, 0],
                    undefined,
                    [0.10000000149011612, 1.5, 0.10000000149011612]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.095, 0.095, 0.095, 1]
                ),
            ]
        ),
    ];
}
