import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_box(game: Game) {
    return [
        children(
            [
                transform(),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.34, 0.17, 0.04, 1]
                ),
            ],

            [
                transform([0.17, 0.62, 0], [0, 0, 0.57, 0.82], [0.04, 0.7, 1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.34, 0.17, 0.04, 1]
                ),
            ],

            [
                transform([-0.29, 0.54, 0], [0, 0, -0.64, 0.77], [0.04, 0.42, 1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.34, 0.17, 0.04, 1]
                ),
            ]
        ),
    ];
}
