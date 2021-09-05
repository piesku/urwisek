import {children} from "../components/com_children.js";
import {Control, control_player} from "../components/com_control_player.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {blueprint_lisek} from "./blu_lisek.js";

export function blueprint_pup(game: Game, idx: number) {
    return [
        mimic(find_first(game.World, "pup anchor " + idx), 0.2),
        children([
            ...blueprint_lisek(game),
            transform(undefined, undefined, [0.3, 0.3, 0.3]),
            control_player(Control.Animate),
        ]),
    ];
}
