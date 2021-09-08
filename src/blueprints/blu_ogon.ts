import {render_colored_shadows} from "../components/com_render.js";
import {Game} from "../game.js";

export function blueprint_ogon(game: Game) {
    return [render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1])];
}
