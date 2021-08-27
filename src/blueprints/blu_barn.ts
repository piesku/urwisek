import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_barn(game: Game) {
    return [
        children(
    [
        transform([0, 1, 0], undefined, [3, 2, 3]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.406, 0, 0, 1]
        ),
    ],

    [
        transform([0, 2, 0], [0.707, 0, 0, 0.707], [6, 6, 5.98]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.406, 0, 0, 1]
        ),
    ],

    [
        transform([-1.5, 1, -1.5], undefined, [0.1, 2, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([-1.5, 1, 1.5], undefined, [0.1, 2, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([1.5, 1, -1.5], undefined, [0.1, 2, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0, 0, 0, 1]
        ),
    ],

    [
        transform([1.5, 1, 1.5], undefined, [0.1, 2, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0, 2, 1.49], undefined, [3.099, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0, 2, -1.5], undefined, [3.099, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([1.5, 2, -0.001], [0, 0.707, 0, 0.707], [3.099, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([-1.498, 2, -0.001], [0, 0.707, 0, 0.707], [3.099, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([-1.28, 2.524, 1.49], [0, 0, 0.547, 0.837], [1.159, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([-1.28, 2.524, -1.494], [0, 0, 0.547, 0.837], [1.159, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([1.273, 2.524, 1.49], [0, 0, -0.547, 0.837], [1.159, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([1.273, 2.524, -1.524], [0, 0, -0.547, 0.837], [1.159, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0.507, 3.274, -1.524], [0, 0, -0.191, 0.982], [1.159, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0.507, 3.274, 1.527], [0, 0, -0.191, 0.982], [1.159, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([-0.521, 3.274, 1.527], [0, 0, 0.191, 0.982], [1.159, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([-0.521, 3.274, -1.525], [0, 0, 0.191, 0.982], [1.159, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0, 1.5, 1.6], undefined, [1.8, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0.854, 0.7, 1.6], [0, 0, -0.707, 0.707], [1.5, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([-0.85, 0.7, 1.6], [0, 0, -0.707, 0.707], [1.5, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0, 0.7, 1.59], [0, 0, -0.383, 0.924], [2.2, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0, 0.7, 1.58], [0, 0, 0.383, 0.924], [2.2, 0.1, 0.1]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([-1.247, 2.524, -0.011], [0, 0, 0.547, 0.837], [1.159, 0.1, 2.99]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.07, 0.07, 0.07, 1]
        ),
    ],

    [
        transform([1.242, 2.524, -0.011], [0, 0, -0.547, 0.837], [1.159, 0.1, 2.99]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.07, 0.07, 0.07, 1]
        ),
    ],

    [
        transform([0.508, 3.242, -0.011], [0, 0, -0.191, 0.982], [1.159, 0.1, 2.99]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.07, 0.07, 0.07, 1]
        ),
    ],

    [
        transform([-0.515, 3.242, -0.011], [0, 0, 0.191, 0.982], [1.159, 0.1, 2.99]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            [0.07, 0.07, 0.07, 1]
        ),
    ]),
    ];
}
