import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_house(game: Game) {
    return [
        children(
            [
                transform([0, 1.7, 0], undefined, [3, 3, 3]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.095, 0.095, 0.095, 1]
                ),
            ],

            [
                transform([-2.25, 1.7, 0], undefined, [1.5, 0.1, 3]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.069, 0.154, 0.8, 1]
                ),
            ],

            [
                transform([-0.8, 0.1, 0], undefined, [4.9, 0.2, 3.4]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.095, 0.095, 0.095, 1]
                ),
            ],

            [
                transform([-2.814, 0.95, 0], undefined, [0.1, 1.5, 0.1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.095, 0.095, 0.095, 1]
                ),
            ]
        ),
    ];
}
