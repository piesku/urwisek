import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_fence(game: Game) {
    return [
        children(
            [
                transform([0, 0.6, 0], undefined, [0.1, 1.2, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 1.21, 0.5], [0.71, 0, 0, 0.71], [0.1, 2, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 0.6, 1], undefined, [0.1, 1.2, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 0.8, 0.5], [0.71, 0, 0, 0.71], [0.1, 2, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 0.4, 0.5], [0.71, 0, 0, 0.71], [0.1, 2, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ]
        ),
    ];
}
