import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_car2(game: Game) {
    return [
        children(
            [
                transform([0, 0.800000011920929, 0], undefined, [4, 1, 2]),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform(
                    [1.2764941453933716, 0.5, 0],
                    [0.7071068286895752, 0, 0, 0.7071068286895752],
                    [1 * 2, 2.200000047683716 * 2, 1 * 2]
                ),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0, 0, 0, 1]),
            ],

            [
                transform(
                    [-1.100000023841858, 0.5, 0],
                    [0.7071068286895752, 0, 0, 0.7071068286895752],
                    [1 * 2, 2.200000047683716 * 2, 1 * 2]
                ),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0, 0, 0, 1]),
            ],

            [
                transform(
                    [-0.5, 2, 0.8999999761581421],
                    undefined,
                    [0.20000000298023224, 1.399999976158142, 0.20000000298023224]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform(
                    [-0.5, 2, -0.8999999761581421],
                    undefined,
                    [0.20000000298023224, 1.399999976158142, 0.20000000298023224]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform(
                    [1.899999976158142, 2, 0.8999999761581421],
                    undefined,
                    [0.20000000298023224, 1.399999976158142, 0.20000000298023224]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform(
                    [1.899999976158142, 2, -0.8999999761581421],
                    undefined,
                    [0.20000000298023224, 1.399999976158142, 0.20000000298023224]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform(
                    [0.7000470161437988, 2.799999952316284, 0],
                    undefined,
                    [2.5999999046325684, 0.20000000298023224, 2]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.8, 0.024, 0.016, 1]
                ),
            ],

            [
                transform(
                    [-2, 1, -0.6000000238418579],
                    [0.5, 0.5, -0.5, 0.4999999701976776],
                    [0.4000000059604645 * 2, 0.20000000298023224 * 2, 0.4000000059604645 * 2]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCylinder,
                    [0.8, 0.784, 0.019, 1]
                ),
            ],

            [
                transform(
                    [-2, 1, 0.6000000238418579],
                    [0.5, 0.5, -0.5, 0.4999999701976776],
                    [0.4000000059604645 * 2, 0.20000000298023224 * 2, 0.4000000059604645 * 2]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCylinder,
                    [0.8, 0.784, 0.019, 1]
                ),
            ],

            [
                transform(
                    [0.26432204246520996, 1.5499989986419678, 0.550000011920929],
                    undefined,
                    [0.20000000298023224, 0.5, 0.800000011920929]
                ),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0, 0, 0, 1]),
            ],

            [
                transform(
                    [0.26432204246520996, 1.5499989986419678, -0.550000011920929],
                    undefined,
                    [0.20000000298023224, 0.5, 0.800000011920929]
                ),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0, 0, 0, 1]),
            ]
        ),
    ];
}
