import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function prop_box(game: Game) {
    return [
        children(
            [
                transform(undefined, undefined, undefined),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.342, 0.17, 0.035, 1]
                ),
            ],

            [
                transform([0.171, 0.62, 0], [0, 0, 0.574, 0.819], [0.039, 0.7, 1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.342, 0.17, 0.035, 1]
                ),
            ],

            [
                transform([-0.293, 0.536, 0], [0, 0, -0.643, 0.766], [0.039, 0.42, 1]),
                cull(Has.Render),
                render_colored_shadows(
                    game.MaterialColoredShadows,
                    game.MeshCube,
                    [0.342, 0.17, 0.035, 1]
                ),
            ]
        ),
    ];
}
