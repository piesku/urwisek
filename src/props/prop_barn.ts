import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_barn(game: Game) {
    return [
        children(
            [
                transform([0, 1, 0], undefined, [3, 2, 3]),
                cull(Has.Render),
                render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.41, 0, 0, 1]),
            ],

            [
                transform([0, 2, 0.9], [0.71, 0, 0, 0.71], [3, 1.2, 2.99]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.41, 0, 0, 1]
                ),
            ],

            [
                transform([-1.5, 1, -1.5], undefined, [0.1, 2, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([-1.5, 1, 1.5], undefined, [0.1, 2, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([1.5, 1, 1.5], undefined, [0.1, 2, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 2, 1.49], undefined, [3.1, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 2, -1.5], undefined, [3.1, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([1.5, 2, 0], [0, 0.71, 0, 0.71], [3.1, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([-1.5, 2, 0], [0, 0.71, 0, 0.71], [3.1, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([-1.28, 2.52, 1.49], [0, 0, 0.55, 0.84], [1.16, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([1.27, 2.52, 1.49], [0, 0, -0.55, 0.84], [1.16, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0.51, 3.27, 1.53], [0, 0, -0.19, 0.98], [1.16, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 1.5, 1.6], undefined, [1.8, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0.85, 0.7, 1.6], [0, 0, -0.71, 0.71], [1.5, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([-0.85, 0.7, 1.6], [0, 0, -0.71, 0.71], [1.5, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 0.7, 1.59], [0, 0, -0.38, 0.92], [2.2, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 0.7, 1.58], [0, 0, 0.38, 0.92], [2.2, 0.1, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([-1.25, 2.52, -0.01], [0, 0, 0.55, 0.84], [1.16, 0.1, 2.99]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.07, 0.07, 0.07, 1]
                ),
            ],

            [
                transform([1.24, 2.52, -0.01], [0, 0, -0.55, 0.84], [1.16, 0.1, 2.99]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.07, 0.07, 0.07, 1]
                ),
            ],

            [
                transform([-0.51, 3.24, -0.01], [0, 0, 0.19, 0.98], [1.16, 0.1, 2.99]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.07, 0.07, 0.07, 1]
                ),
            ]
        ),
    ];
}
