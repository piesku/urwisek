import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function prop_fence(game: Game) {
    return [
        children(
            [
                transform([0, 0.6, 0], undefined, [0.1, 1.2, 0.1]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 1.21, 0.5], [0.707, 0, 0, 0.707], [0.1, 2, 0.1]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 0.6, 1], undefined, [0.1, 1.2, 0.1]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 0.8, 0.5], [0.707, 0, 0, 0.707], [0.1, 2, 0.1]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 0.4, 0.5], [0.707, 0, 0, 0.707], [0.1, 2, 0.1]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ]
        ),
    ];
}
