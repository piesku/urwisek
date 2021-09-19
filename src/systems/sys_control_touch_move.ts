import {Vec2} from "../../common/math.js";
import {clamp} from "../../common/number.js";
import {set} from "../../common/quat.js";
import {Entity} from "../../common/world.js";
import {Control} from "../components/com_control_player.js";
import {query_up} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer;
const DOUBLE_TAP_INTERVAL = 0.2;
const MOVEMENT_DEAD_ZONE = 0.01;
const JUMPING_DEAD_ZONE = 0.5;

// The origin o fthe gesture from which to compute dx, dy.
const touch_start: Vec2 = [0, 0];
let time_between_taps = 0;

export function sys_control_touch_move(game: Game, delta: number) {
    if (game.InputDelta["Touch0"] === -1) {
        time_between_taps = 0;
    }

    if (game.InputState["Touch0"] === 0) {
        time_between_taps += delta;
    }

    if (game.InputDelta["Touch0"] === 1) {
        // The center of the invisible joystick is given by the position of the
        // first touch of the first finger on the screen's surface.
        touch_start[0] = game.InputState["Touch0X"];
        touch_start[1] = game.InputState["Touch0Y"];
    }

    let dx = 0;
    let dy = 0;

    if (game.InputState["Touch0"] === 1) {
        let divisor = Math.min(game.ViewportWidth, game.ViewportHeight) / 4;
        dx = (game.InputState["Touch0X"] - touch_start[0]) / divisor;
        dy = (game.InputState["Touch0Y"] - touch_start[1]) / divisor;
    }

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i, dx, dy);
        }
    }
}

function update(game: Game, entity: Entity, dx: number, dy: number) {
    let control = game.World.ControlPlayer[entity];

    if (control.Flags & Control.Move) {
        let move = game.World.Move[entity];
        if (Math.abs(dx) > MOVEMENT_DEAD_ZONE) {
            control.IsWalking = true;
            move.Directions.push([clamp(-1, 1, dx), 0, 0]);
        }

        let rigid_body = game.World.RigidBody[entity];
        if (!rigid_body.IsAirborne) {
            // The entity is on the ground or on an object.
            if (Math.abs(dy) > JUMPING_DEAD_ZONE) {
                rigid_body.Acceleration[1] += 500;
            }
        }
    }

    if (control.Flags & Control.Rotate) {
        let transform = game.World.Transform[entity];
        if (!control.IsGrabbingEntity) {
            if (dx < 0 && control.IsFacingRight) {
                control.IsFacingRight = false;
                set(transform.Rotation, 0, -0.71, 0.0, 0.71);
                transform.Dirty = true;
            }
            if (dx > 0 && !control.IsFacingRight) {
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
            game.InputDelta["Touch0"] === 1 &&
            time_between_taps < DOUBLE_TAP_INTERVAL &&
            !control.IsGrabbingEntity &&
            collide.Collisions.length > 0
        ) {
            let obstacle_entity = collide.Collisions[0].Other;
            for (let ent of query_up(game.World, entity, Has.ControlPlayer)) {
                let control = game.World.ControlPlayer[ent];
                control.IsGrabbingEntity = obstacle_entity;
            }

            game.World.Signature[obstacle_entity] |= Has.Mimic;
            let obstacle_mimic = game.World.Mimic[obstacle_entity];
            obstacle_mimic.Target = entity;
        }

        if (game.InputDelta["Touch0"] === -1 && control.IsGrabbingEntity) {
            game.World.Signature[control.IsGrabbingEntity] &= ~Has.Mimic;
            for (let ent of query_up(game.World, entity, Has.ControlPlayer)) {
                let control = game.World.ControlPlayer[ent];
                control.IsGrabbingEntity = null;
            }
        }
    }
}
