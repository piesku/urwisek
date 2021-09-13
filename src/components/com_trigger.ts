/**
 * @module components/com_trigger
 */

import {Entity} from "../../common/world.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Trigger {
    Action: Action;
}

export function trigger(action: Action) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Trigger;
        game.World.Trigger[entity] = {
            Action: action,
        };
    };
}
