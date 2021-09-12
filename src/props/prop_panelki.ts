import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_panelki(game: Game) {
    return [
        children(
            [
                transform([0, 0.1, 0], undefined, [4, 0.2, 4]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.2, 0.2, 0.2, 1]
                ),
            ],

            [
                transform([-1.75, 1.1, 0], [0, 0, -0.71, 0.71], [1.8, 0.5, 4]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.2, 0.2, 0.2, 1]
                ),
            ],

            [
                transform([0, 2.1, 0], undefined, [4, 0.2, 4]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.2, 0.2, 0.2, 1]
                ),
            ],

            [
                transform([1.75, 1.1, 0], [0, 0, -0.71, 0.71], [1.8, 0.5, 4]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.2, 0.2, 0.2, 1]
                ),
            ],

            [
                transform([0, 0.65, 1.75], [-0.5, 0.5, -0.5, 0.5], [0.9, 0.5, 3]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.2, 0.2, 0.2, 1]
                ),
            ],

            [
                transform([0, 1.55, 1.75], [-0.5, 0.5, -0.5, 0.5], [0.9, 0.5, 0.8]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.2, 0.2, 0.2, 1]
                ),
            ],

            [
                transform([-0.55, 0.65, -1.75], [-0.5, 0.5, -0.5, 0.5], [0.9, 0.5, 1.9]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.2, 0.2, 0.2, 1]
                ),
            ],

            [
                transform([0, 1.55, -1.75], [-0.5, 0.5, -0.5, 0.5], [0.9, 0.5, 0.8]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.2, 0.2, 0.2, 1]
                ),
            ]
        ),
    ];
}
