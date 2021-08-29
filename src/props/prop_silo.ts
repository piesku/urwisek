import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function prop_silo(game: Game) {
    return [
        children(
            [
                transform([0, 3, 0], undefined, [2.5, 6, 2.5]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.406, 0, 0, 1]
                ),
            ],

            [
                transform([0, 0.001, 0], undefined, [2.6, 0.2, 2.6]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 6, 0], undefined, [2.6, 0.2, 2.6]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 3, 0], undefined, [2.6, 0.2, 2.6]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 1.5, 0], undefined, [2.6, 0.2, 2.6]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 4.5, 0], undefined, [2.6, 0.2, 2.6]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0.527, 3, 1.595], undefined, [0.4, 6, 0.4]),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.8, 0.8, 1]
                ),
            ]
        ),
    ];
}