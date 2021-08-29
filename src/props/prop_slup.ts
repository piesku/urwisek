import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_slup(game: Game) {
    return [
        children(
            [
                transform([0, 4, 0], undefined, [0.5, 8, 0.5]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.119, 0.027, 0.012, 1]
                ),
            ],

            [
                transform([0, 7.41, -0.25], undefined, [3, 0.45, 0.2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.119, 0.027, 0.012, 1]
                ),
            ],

            [
                transform([0, 7.41, 0.25], undefined, [3, 0.45, 0.2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.119, 0.027, 0.012, 1]
                ),
            ],

            [
                transform([0, 6.329, -0.25], undefined, [3, 0.45, 0.2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.119, 0.027, 0.012, 1]
                ),
            ],

            [
                transform([1.3, 7.75, -0.25], undefined, [0.2, 0.3, 0.2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform([1, 7.75, -0.25], undefined, [0.2, 0.3, 0.2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform([1.3, 6.7, -0.25], undefined, [0.2, 0.3, 0.2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform([1, 6.7, -0.25], undefined, [0.2, 0.3, 0.2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform([-0.34, 5.76, -0.24], [0, 0, -0.383, 0.924], [1.2, 0.2, 0.05]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform([-1, 7.75, 0.25], undefined, [0.2, 0.3, 0.2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform([-1.3, 7.75, 0.25], undefined, [0.2, 0.3, 0.2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ]
        ),
    ];
}
