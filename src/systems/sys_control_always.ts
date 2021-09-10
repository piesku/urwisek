/**
 * @module systems/sys_control_always
 */

import {Quat, Vec3} from "../../common/math.js";
import {Entity} from "../../common/world.js";
import {query_all} from "../components/com_children.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlAlways | Has.Transform;

export function sys_control_always(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlAlways[entity];
    let move = game.World.Move[entity];

    if (control.Direction) {
        move.Directions.push(control.Direction.slice() as Vec3);
    }

    if (control.Rotation) {
        move.LocalRotations.push(control.Rotation.slice() as Quat);
    }

    if (control.AnimationClip) {
        for (let ent of query_all(game.World, entity, Has.Animate)) {
            let animate = game.World.Animate[ent];
            animate.Trigger = control.AnimationClip;
        }
    }
}
