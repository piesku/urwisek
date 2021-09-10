import {Action} from "../actions.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {named, Names} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {trigger} from "../components/com_trigger.js";
import {Game, Layer} from "../game.js";

export function blueprint_exit(game: Game) {
    return [
        collide(false, Layer.Terrain, Layer.Player, [1, 100, 1]),
        trigger(Layer.Player, Action.NextScene),
        children([transform([0, 1, 0]), named(Names.Exit)]),
    ];
}
