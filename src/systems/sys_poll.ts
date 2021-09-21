/**
 * @module systems/sys_poll
 */

import {Entity} from "../../common/world.js";
import {TaskKind} from "../components/com_task.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Task;

export function sys_poll(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            let task = game.World.Task[i];
            switch (task.Kind) {
                case TaskKind.Until: {
                    if (task.Predicate(i)) {
                        complete(game, i);
                    }
                    break;
                }
                case TaskKind.Timeout: {
                    task.Remaining -= delta;
                    if (task.Remaining < 0) {
                        complete(game, i);
                    }
                    break;
                }
            }
        }
    }
}

function complete(game: Game, entity: Entity) {
    let task = game.World.Task[entity];
    if (task.OnDone) {
        task.OnDone(entity);
    }

    game.World.Signature[entity] &= ~Has.Task;
    if (game.World.Signature[entity] === Has.None) {
        game.World.DestroyEntity(entity);
    }

    // Explicitly delete the component data for this task to avoid memory
    // leaks from closures.
    delete game.World.Task[entity];
}
