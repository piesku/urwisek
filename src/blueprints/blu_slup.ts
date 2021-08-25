import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_slup(game: Game) {
    return [
        children(
            [
                transform([0, 2, 0], undefined, [0.5, 8, 0.5]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCylinder,
                    [0.119, 0.027, 0.012, 1]
                ),
            ],

            [
                transform(
                    [0, 3.7051446437835693, -0.125],
                    undefined,
                    [1.5, 0.22499999403953552, 0.10000000149011612]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.119, 0.027, 0.012, 1]
                ),
            ],

            [
                transform(
                    [0, 3.7051446437835693, 0.125],
                    undefined,
                    [1.5, 0.22499999403953552, 0.10000000149011612]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.119, 0.027, 0.012, 1]
                ),
            ],

            [
                transform(
                    [0, 3.1643192768096924, -0.125],
                    undefined,
                    [1.5, 0.22499999403953552, 0.10000000149011612]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.119, 0.027, 0.012, 1]
                ),
            ],

            [
                transform(
                    [0.6499999761581421, 3.875, -0.125],
                    undefined,
                    [0.20000000298023224, 0.30000001192092896, 0.20000000298023224]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform(
                    [0.5, 3.875, -0.125],
                    undefined,
                    [0.20000000298023224, 0.30000001192092896, 0.20000000298023224]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform(
                    [0.6499999761581421, 3.3499999046325684, -0.125],
                    undefined,
                    [0.20000000298023224, 0.30000001192092896, 0.20000000298023224]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform(
                    [0.5, 3.3499999046325684, -0.125],
                    undefined,
                    [0.20000000298023224, 0.30000001192092896, 0.20000000298023224]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform(
                    [-0.1698063760995865, 2.8801214694976807, -0.12012429535388947],
                    [0, 0, -0.38340887427330017, 0.9235787391662598],
                    [0.6000000238418579, 0.10000000149011612, 0.02500000037252903]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform(
                    [-0.5, 3.875, 0.125],
                    undefined,
                    [0.20000000298023224, 0.30000001192092896, 0.20000000298023224]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ],

            [
                transform(
                    [-0.6499999761581421, 3.875, 0.125],
                    undefined,
                    [0.20000000298023224, 0.30000001192092896, 0.20000000298023224]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCylinder,
                    [0.367, 0.367, 0.367, 1]
                ),
            ]
        ),
    ];
}
