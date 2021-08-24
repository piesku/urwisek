import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

let color: Vec4 = [0.4, 0.2, 0.5, 1];
export function blueprint_car(game: Game) {
    return [
        children(
    [
        transform([0, 2, -1], undefined, [1, 1, 2]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform(undefined, undefined, [1, 1, 3]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform([0, 0.5, -3], [-0.7071068286895752, 0, 0, 0.7071068286895752], [1, 1, 0.5]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform([0, 0.5, 3], [-0.7071068286895752, 0, 0, 0.7071068286895752], [1, 1, 0.5]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform([1, 1, -2], [-0.5, -0.5, -0.5, 0.4999999701976776], undefined),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform([1, 0.5, 2], [-0.5, 0.5, 0.5, 0.4999999701976776], [1, 1, 0.5]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform([0, 1, 2], undefined, undefined),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform([-1, 1, -2], [-0.5, -0.5, -0.5, 0.4999999701976776], undefined),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform([-1, 0.5, 2], [-0.5, 0.5, 0.5, 0.4999999701976776], [1, 1, 0.5]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform([-0.800000011920929, 1.5, 1], [0.7071068286895752, 0, 0, 0.7071068286895752], [0.20000000298023224, 1, 0.5]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform([0.800000011920929, 1.5, 1], [0.7071068286895752, 0, 0, 0.7071068286895752], [0.20000000298023224, 1, 0.5]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshPlane,
            color
        ),
    ],

    [
        transform([-0.5, 0.5, 3], undefined, [0.20000000298023224, 0.20000000298023224, 0.20000000298023224]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            color
        ),
    ],

    [
        transform([0.5, 0.5, 3], undefined, [0.20000000298023224, 0.20000000298023224, 0.20000000298023224]),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.MeshCube,
            color
        ),
    ]),
    ];
}
