import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function blueprint_branch(game: Game) {
    return [
        cull(Has.Render),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.8, 0.2, 0.2, 1]),
    ];
}
