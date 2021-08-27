import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function prop_box(game: Game) {
    return [
        children(
            [
                transform(undefined, undefined, undefined),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.342, 0.17, 0.035, 1]
                ),
            ],

            [
                transform([0.171, 0.62, 0], [0, 0, 0.574, 0.819], [0.039, 0.7, 1]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.342, 0.17, 0.035, 1]
                ),
            ],

            [
                transform([-0.293, 0.536, 0], [0, 0, -0.643, 0.766], [0.039, 0.42, 1]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.342, 0.17, 0.035, 1]
                ),
            ]
        ),
    ];
}
