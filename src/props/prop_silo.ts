import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_silo(game: Game) {
    return [
        children(
            [
                transform([0, 3, 0], undefined, [2.5, 6, 2.5]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.41, 0, 0, 1]
                ),
            ],

            [
                transform([0, 6, 0], undefined, [2.6, 0.2, 2.6]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0, 3, 0], undefined, [2.6, 0.2, 2.6]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.8, 0.8, 1]
                ),
            ],

            [
                transform([0.53, 3, 1.6], undefined, [0.4, 6, 0.4]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCylinder,
                    [0.8, 0.8, 0.8, 1]
                ),
            ]
        ),
    ];
}
