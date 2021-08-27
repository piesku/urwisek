/**
 * @module systems/sys_control_ai
 */

import {Entity} from "../../common/world.js";
import {query_all} from "../components/com_children.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlAi | Has.Transform;

export function sys_control_ai(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlAi[entity];

    for (let ent of query_all(game.World, entity, Has.Animate)) {
        let animate = game.World.Animate[ent];
        animate.Trigger = control.Animation;
    }
}
