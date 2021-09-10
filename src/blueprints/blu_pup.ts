import {children} from "../components/com_children.js";
import {named, Names} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {blueprint_lisek} from "./blu_lisek.js";

export function blueprint_pup(game: Game) {
    return [
        named(Names.Pup),
        children([transform(undefined, undefined, [0.3, 0.3, 0.3]), ...blueprint_lisek(game)]),
    ];
}
