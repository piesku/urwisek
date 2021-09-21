import {set} from "../../common/quat.js";
import {Entity} from "../../common/world.js";
import {Control} from "../components/com_control_player.js";
import {query_up} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer;
const DEAD_ZONE = 0.5;

export function sys_control_xbox(game: Game, delta: number) {
    for (let pad of navigator.getGamepads()) {
        if (pad) {
            game.InputDelta[`pad${pad.index}_axis_1`] = pad.axes[0];
            game.InputDelta[`pad${pad.index}_axis_2`] = pad.axes[1];
            game.InputDelta[`pad${pad.index}_axis_3`] = pad.axes[2];
            game.InputDelta[`pad${pad.index}_axis_4`] = pad.axes[3];

            for (let b = 0; b < pad.buttons.length; b++) {
                game.InputState[`pad${pad.index}_button_${b}`] = Number(pad.buttons[b].pressed);
            }
        }
    }

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlPlayer[entity];

    if (control.Flags & Control.Move) {
        let move = game.World.Move[entity];
        let rigid_body = game.World.RigidBody[entity];

        if (Math.abs(game.InputDelta["pad0_axis_1"]) > DEAD_ZONE) {
            control.IsWalking = true;
            move.Directions.push([game.InputDelta["pad0_axis_1"], 0, 0]);
        }

        if (!rigid_body.IsAirborne) {
            // The entity is on the ground or on an object.
            if (game.InputState["pad0_button_0"]) {
                rigid_body.Acceleration[1] += 500;
            }
        }
    }

    if (control.Flags & Control.Rotate) {
        // Requires Has.Transform.
        let transform = game.World.Transform[entity];
        if (!control.IsGrabbingEntity) {
            if (game.InputDelta["pad0_axis_1"] < -DEAD_ZONE && control.IsFacingRight) {
                control.IsFacingRight = false;
                set(transform.Rotation, 0, -0.71, 0.0, 0.71);
                transform.Dirty = true;
            }
            if (game.InputDelta["pad0_axis_1"] > DEAD_ZONE && !control.IsFacingRight) {
                control.IsFacingRight = true;
                set(transform.Rotation, 0, 0.71, 0.0, 0.71);
                transform.Dirty = true;
            }
        }
    }

    if (control.Flags & Control.Grab) {
        // Requires Has.Collide.
        let collide = game.World.Collide[entity];
        if (
            game.InputState["pad0_button_7"] &&
            !control.IsGrabbingEntity &&
            collide.Collisions.length > 0
        ) {
            let obstacle_entity = collide.Collisions[0].Other;
            let obstacle_mimic = game.World.Mimic[obstacle_entity];
            for (let ent of query_up(game.World, entity, Has.ControlPlayer)) {
                let control = game.World.ControlPlayer[ent];
                control.IsGrabbingEntity = obstacle_entity;
            }

            game.World.Signature[obstacle_entity] |= Has.Mimic;
            obstacle_mimic.Target = entity;
        }

        if (game.InputState["pad0_button_7"] === 0 && control.IsGrabbingEntity) {
            game.World.Signature[control.IsGrabbingEntity] &= ~Has.Mimic;
            for (let ent of query_up(game.World, entity, Has.ControlPlayer)) {
                let control = game.World.ControlPlayer[ent];
                control.IsGrabbingEntity = null;
            }
        }
    }
}
