import {Quat, Vec2, Vec3} from "../../common/math.js";
import {clamp} from "../../common/number.js";
import {set} from "../../common/quat.js";
import {Entity} from "../../common/world.js";
import {Animate} from "../components/com_animate.js";
import {query_all} from "../components/com_children.js";
import {Control} from "../components/com_control_player.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer;
const AXIS_Y: Vec3 = [0, 1, 0];
const AXIS_X: Vec3 = [1, 0, 0];
const MOVEMENT_DEAD_ZONE = 0.01;
const JUMPING_DEAD_ZONE = 0.1;
const TOUCH_SENSITIVITY = 10;

// The position of the joystick center, given by the initial Touch0's x and y.
const joystick: Vec2 = [0, 0];
const rotation: Quat = [0, 0, 0, 0];

export function sys_control_touch_move(game: Game, delta: number) {
    if (game.InputDelta["Touch0"] === 1) {
        // The center of the invisible joystick is given by the position of the
        // first touch of the first finger on the screen's surface.
        joystick[0] = game.InputState["Touch0X"];
        joystick[1] = game.InputState["Touch0Y"];
    }

    if (game.InputState["Touch0"] === 1) {
        let divisor = Math.min(game.ViewportWidth, game.ViewportHeight) / 4;
        let dx = (game.InputState["Touch0X"] - joystick[0]) / divisor;
        let dy = (game.InputState["Touch0Y"] - joystick[1]) / divisor;

        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY) === QUERY) {
                update(game, i, dx, dy);
            }
        }
    }
}

function update(game: Game, entity: Entity, dx: number, dy: number) {
    let control = game.World.ControlPlayer[entity];

    if (control.Flags & Control.Move) {
        let move = game.World.Move[entity];
        if (Math.abs(dx) > MOVEMENT_DEAD_ZONE) {
            move.Directions.push([clamp(-1, 1, dx), 0, 0]);
        }

        let rigid_body = game.World.RigidBody[entity];
        if (rigid_body.VelocityResolved[1] === 0) {
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
                set(transform.Rotation, 0, -0.7, 0.0, 0.7);
                transform.Dirty = true;
            }
            if (dx > 0 && !control.IsFacingRight) {
                control.IsFacingRight = true;
                set(transform.Rotation, 0, 0.7, 0.0, 0.7);
                transform.Dirty = true;
            }
        }
    }

    if (control.Flags & Control.Animate) {
        let anim_name: Animate["Trigger"];

        if (dx !== 0) {
            anim_name = "walk";
        } else {
            anim_name = "idle";
        }

        for (let ent of query_all(game.World, entity, Has.Animate)) {
            let animate = game.World.Animate[ent];
            animate.Trigger = anim_name;
        }
    }
}
