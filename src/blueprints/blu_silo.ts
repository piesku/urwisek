import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_silo(game: Game) {
    return [
        children(
    [
        transform([0, 3, 0], undefined, [5, 12, 5]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.406, 0, 0, 1]
        ),
    ],

    [
        transform([0, 0.001, 0], undefined, [5.2, 0.4, 5.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0, 6, 0], undefined, [5.2, 0.4, 5.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0, 3, 0], undefined, [5.2, 0.4, 5.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0, 1.5, 0], undefined, [5.2, 0.4, 5.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0, 4.5, 0], undefined, [5.2, 0.4, 5.2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.8, 0.8, 0.8, 1]
        ),
    ],

    [
        transform([0.527, 3, 1.595], undefined, [0.8, 12, 0.8]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCylinder,
            [0.8, 0.8, 0.8, 1]
        ),
    ]),
    ];
}
