import {Action, dispatch} from "../actions.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {named} from "../components/com_named.js";
import {task_until} from "../components/com_task.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";

export function blueprint_exit(game: Game) {
    return [
        collide(false, Layer.Terrain, Layer.Player, [1, 100, 1]),
        task_until(
            (entity) => {
                let collide = game.World.Collide[entity];
                return collide.Collisions.length > 0;
            },
            (entity) => {
                dispatch(game, Action.NextScene, entity);
            }
        ),
        children([transform([0, 1, 0]), named("exit")]),
    ];
}
