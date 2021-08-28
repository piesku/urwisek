import {set} from "../../common/quat.js";
import {Entity} from "../../common/world.js";
import {query_all} from "../components/com_children.js";
import {Control} from "../components/com_control_player.js";
import {query_up} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer;

export function sys_control_keyboard(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlPlayer[entity];

    if (control.Flags & Control.Move) {
        // Requires Has.Collide | Has.Move.
        let collide = game.World.Collide[entity];
        let move = game.World.Move[entity];

        if (game.InputState["ArrowLeft"]) {
            move.Directions.push([-1, 0, 0]);
        }

        if (game.InputState["ArrowRight"]) {
            move.Directions.push([1, 0, 0]);
        }

        let has_collided_with_terrain = false;
        for (let collision of collide.Collisions) {
            if (collision.Hit[1] > 0) {
                // It's a collision with something under the player.
                has_collided_with_terrain = true;
                break;
            }
        }

        if (control.IsAirborne && has_collided_with_terrain) {
            control.IsAirborne = false;
        }

        if (!control.IsAirborne) {
            if (game.InputState["ArrowUp"]) {
                move.Directions.push([1, 0, 0]);
                let rigid_body = game.World.RigidBody[entity];
                rigid_body.Acceleration[1] += 500;
                control.IsAirborne = true;
            }
        }
    }

    if (control.Flags & Control.Rotate) {
        // Requires Has.Transform.
        let transform = game.World.Transform[entity];
        if (!control.IsGrabbingEntity) {
            if (game.InputState["ArrowLeft"] && control.IsFacingRight) {
                control.IsFacingRight = false;
                set(transform.Rotation, 0, -0.7, 0.0, 0.7);
                transform.Dirty = true;
            }
            if (game.InputState["ArrowRight"] && !control.IsFacingRight) {
                control.IsFacingRight = true;
                set(transform.Rotation, 0, 0.7, 0.0, 0.7);
                transform.Dirty = true;
            }
        }
    }

    if (control.Flags & Control.Animate) {
        let anim_name: "walk" | "idle" = "idle";

        if (game.InputState["ArrowLeft"]) {
            anim_name = "walk";
        }
        if (game.InputState["ArrowRight"]) {
            anim_name = "walk";
        }

        for (let ent of query_all(game.World, entity, Has.Animate)) {
            let animate = game.World.Animate[ent];
            animate.Trigger = anim_name;
        }
    }

    if (control.Flags & Control.Grab) {
        // Requires Has.Collide.
        let collide = game.World.Collide[entity];
        if (
            game.InputState["Space"] &&
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

        if (game.InputDelta["Space"] === -1 && control.IsGrabbingEntity) {
            game.World.Signature[control.IsGrabbingEntity] &= ~Has.Mimic;
            for (let ent of query_up(game.World, entity, Has.ControlPlayer)) {
                let control = game.World.ControlPlayer[ent];
                control.IsGrabbingEntity = null;
            }
        }
    }
}
