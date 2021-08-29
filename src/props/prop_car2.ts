import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function prop_car2(game: Game) {
    return [
        children(
            [
                transform([0, 0.8, 0], undefined, [4, 1, 2]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform([1.276, 0.5, 0], [0.707, 0, 0, 0.707], [1, 2.2, 1]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0, 0, 0, 1]
                ),
            ],

            [
                transform([-1.1, 0.5, 0], [0.707, 0, 0, 0.707], [1, 2.2, 1]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0, 0, 0, 1]
                ),
            ],

            [
                transform([-0.5, 2, 0.9], undefined, [0.2, 1.4, 0.2]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform([-0.5, 2, -0.9], undefined, [0.2, 1.4, 0.2]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform([1.9, 2, 0.9], undefined, [0.2, 1.4, 0.2]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform([1.9, 2, -0.9], undefined, [0.2, 1.4, 0.2]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform([0.7, 2.8, 0], undefined, [2.6, 0.2, 2]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform([-2, 1, -0.6], [0.5, 0.5, -0.5, 0.5], [0.4, 0.2, 0.4]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.784, 0.019, 1]
                ),
            ],

            [
                transform([-2, 1, 0.6], [0.5, 0.5, -0.5, 0.5], [0.4, 0.2, 0.4]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.784, 0.019, 1]
                ),
            ],

            [
                transform([0.264, 1.55, 0.55], undefined, [0.2, 0.5, 0.8]),
                render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0, 0, 0, 1]),
            ],

            [
                transform([0.264, 1.55, -0.55], undefined, [0.2, 0.5, 0.8]),
                render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0, 0, 0, 1]),
            ]
        ),
    ];
}
