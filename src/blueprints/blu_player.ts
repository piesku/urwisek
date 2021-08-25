import {children} from "../components/com_children.js";
import {control_player} from "../components/com_control_player.js";
import {move} from "../components/com_move.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_player(game: Game) {
    return [
        control_player(true, false, false),
        move(1.5, 0),
        children([transform(), control_player(false, true, false)]),
    ];
}
