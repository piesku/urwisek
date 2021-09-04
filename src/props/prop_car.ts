import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_car(game: Game) {
    return [
        children(
            [
                transform([0, 2, -1], undefined, [1, 1, 2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform(undefined, undefined, [1, 1, 3]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform([0, 0.5, -3], [-0.707, 0, 0, 0.707], [1, 1, 0.5]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform([0, 0.5, 3], [-0.707, 0, 0, 0.707], [1, 1, 0.5]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform([1, 1, -2], [-0.5, -0.5, -0.5, 0.5], undefined),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform([1, 0.5, 2], [-0.5, 0.5, 0.5, 0.5], [1, 1, 0.5]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform([0, 1, 2], undefined, undefined),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform([-1, 1, -2], [-0.5, -0.5, -0.5, 0.5], undefined),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform([-1, 0.5, 2], [-0.5, 0.5, 0.5, 0.5], [1, 1, 0.5]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform([-0.8, 1.5, 1], [0.707, 0, 0, 0.707], [0.2, 1, 0.5]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform([0.8, 1.5, 1], [0.707, 0, 0, 0.707], [0.2, 1, 0.5]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshPlane,
                    [0.8, 0.002, 0, 1]
                ),
            ],

            [
                transform([-0.5, 0.5, 3], undefined, [0.2, 0.2, 0.2]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0.5, 0.5, 3], undefined, [0.2, 0.2, 0.2]),
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
