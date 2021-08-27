import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function prop_house(game: Game) {
    return [
        children(
            [
                transform([0, 1.7, 0], undefined, [3, 3, 3]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.095, 0.095, 0.095, 1]
                ),
            ],

            [
                transform([-2.25, 1.7, 0], undefined, [1.5, 0.1, 3]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.069, 0.154, 0.8, 1]
                ),
            ],

            [
                transform([-0.8, 0.1, 0], undefined, [4.9, 0.2, 3.4]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.095, 0.095, 0.095, 1]
                ),
            ],

            [
                transform([-2.814, 0.95, 0], undefined, [0.1, 1.5, 0.1]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.095, 0.095, 0.095, 1]
                ),
            ]
        ),
    ];
}
