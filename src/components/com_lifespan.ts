/**
 * @module components/com_lifespan
 *
 * To save bytes, the Lifespan component is implemented as a Task.
 */

import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {destroy_all} from "./com_children.js";
import {TaskKind} from "./com_task.js";

export function lifespan(duration: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Task;
        game.World.Task[entity] = {
            Kind: TaskKind.Timeout,
            Remaining: duration,
            OnDone: (entity) => destroy_all(game.World, entity),
        };
    };
}
