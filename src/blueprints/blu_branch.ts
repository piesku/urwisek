import {cull} from "../components/com_cull.js";
import {render_colored_shaded} from "../components/com_render.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function blueprint_branch(game: Game) {
    return [
        cull(Has.Render),
        render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.8, 0.2, 0.2, 1]),
    ];
}
