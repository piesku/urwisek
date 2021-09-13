import {from_euler} from "../../common/quat.js";
import {blueprint_lisek} from "../blueprints/blu_lisek.js";
import {children} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {move} from "../components/com_move.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_monster(game: Game) {
    return [
        children([
            transform([0, 0, 0], from_euler([0, 0, 0, 1], 0, -90, 0), [5, 60, 20]),
            control_always([0, 0, 1], null, "w"),
            move(0.5, 0.5),
            ...blueprint_lisek(game, [0, 0, 0, 1], 50),
        ]),
    ];
}
