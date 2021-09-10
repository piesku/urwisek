import {Action} from "../actions.js";
import {collide} from "../components/com_collide.js";
import {named} from "../components/com_named.js";
import {trigger} from "../components/com_trigger.js";
import {Game, Layer} from "../game.js";

export function blueprint_end(game: Game) {
    return [
        named("exit"),
        collide(false, Layer.Terrain, Layer.Player, [1, 100, 1]),
        trigger(Layer.Player, Action.EndGame),
    ];
}
