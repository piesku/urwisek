import {Action, dispatch} from "../actions.js";
import {collide} from "../components/com_collide.js";
import {named} from "../components/com_named.js";
import {task_until} from "../components/com_task.js";
import {Game, Layer} from "../game.js";

export function blueprint_end(game: Game) {
    return [
        named("exit"),
        collide(false, Layer.Terrain, Layer.Player, [1, 100, 1]),
        task_until(
            (entity) => {
                let collide = game.World.Collide[entity];
                return collide.Collisions.length > 0;
            },
            (entity) => {
                dispatch(game, Action.EndGame, entity);
            }
        ),
    ];
}
