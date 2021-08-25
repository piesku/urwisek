import {Vec4} from "../../common/math.js";
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
        transform([0, 3.705, -0.125], undefined, [1.5, 0.225, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.119, 0.027, 0.012, 1]
        ),
    ],

    [
        transform([0, 3.705, 0.125], undefined, [1.5, 0.225, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.119, 0.027, 0.012, 1]
        ),
    ],

    [
        transform([0, 3.164, -0.125], undefined, [1.5, 0.225, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.119, 0.027, 0.012, 1]
        ),
    ],

    [
        transform([0.65, 3.875, -0.125], undefined, [0.2, 0.3, 0.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.367, 0.367, 0.367, 1]
        ),
    ],

    [
        transform([0.5, 3.875, -0.125], undefined, [0.2, 0.3, 0.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.367, 0.367, 0.367, 1]
        ),
    ],

    [
        transform([0.65, 3.35, -0.125], undefined, [0.2, 0.3, 0.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.367, 0.367, 0.367, 1]
        ),
    ],

    [
        transform([0.5, 3.35, -0.125], undefined, [0.2, 0.3, 0.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.367, 0.367, 0.367, 1]
        ),
    ],

    [
        transform([-0.17, 2.88, -0.12], [0, 0, -0.383, 0.924], [0.6, 0.1, 0.025]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.367, 0.367, 0.367, 1]
        ),
    ],

    [
        transform([-0.5, 3.875, 0.125], undefined, [0.2, 0.3, 0.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.367, 0.367, 0.367, 1]
        ),
    ],

    [
        transform([-0.65, 3.875, 0.125], undefined, [0.2, 0.3, 0.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.367, 0.367, 0.367, 1]
        ),
    ]),
    ];
}
