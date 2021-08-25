import {control_player} from "../components/com_control_player.js";
import {move} from "../components/com_move.js";
import {Game} from "../game.js";

export function blueprint_player(game: Game) {
    return [control_player(true, false), move(1.5, 0)];
}
