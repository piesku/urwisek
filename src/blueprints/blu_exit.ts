import {Action} from "../actions.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {named} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {trigger} from "../components/com_trigger.js";
import {Game, Layer} from "../game.js";
import {blueprint_lisek} from "./blu_lisek.js";

export function blueprint_exit(game: Game) {
    return [
        collide(false, Layer.Terrain, Layer.Player, [1, 100, 1]),
        trigger(Layer.Player, Action.NextScene),
        children(
            [named("exit"), transform([1, 1, 0])],
            [transform([1, 0, 0], [0, -0.707, 0, 0.707], [0.3, 0.3, 0.3]), ...blueprint_lisek(game)]
        ),
    ];
}
