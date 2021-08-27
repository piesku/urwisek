import {blueprint_lisek} from "../blueprints/blu_lisek.js";
import {children} from "../components/com_children.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_monster(game: Game) {
    return [children([transform([0, 0, 0], undefined, [2, 2, 2]), ...blueprint_lisek(game)])];
}
