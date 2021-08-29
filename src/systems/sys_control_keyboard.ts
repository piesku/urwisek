import {set} from "../../common/quat.js";
import {Entity} from "../../common/world.js";
import {Animate} from "../components/com_animate.js";
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
        // Requires Has.Move | Has.RigidBody.

        let move = game.World.Move[entity];
        if (game.InputState["ArrowLeft"]) {
            move.Directions.push([-1, 0, 0]);
        }
        if (game.InputState["ArrowRight"]) {
            move.Directions.push([1, 0, 0]);
        }

        let rigid_body = game.World.RigidBody[entity];
        if (!rigid_body.IsAirborne) {
            // The entity is on the ground or on an object.
            if (game.InputState["ArrowUp"]) {
                rigid_body.Acceleration[1] += 500;
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

    if (control.Flags & Control.Grab) {
        // Requires Has.Collide.
        let collide = game.World.Collide[entity];
        if (
            game.InputState["Space"] &&
            !control.IsGrabbingEntity &&
            collide.Collisions.length > 0
        ) {
            let obstacle_entity = collide.Collisions[0].Other;
            let obstacle_mimic = game.World.Mimic[obstacle_entity];

            if (obstacle_mimic) {
                for (let ent of query_up(game.World, entity, Has.ControlPlayer)) {
                    let control = game.World.ControlPlayer[ent];
                    control.IsGrabbingEntity = obstacle_entity;
                }

                game.World.Signature[obstacle_entity] |= Has.Mimic;
                if (obstacle_mimic) {
                    obstacle_mimic.Target = entity;
                }
            }
        }

        if (game.InputDelta["Space"] === -1 && control.IsGrabbingEntity) {
            game.World.Signature[control.IsGrabbingEntity] &= ~Has.Mimic;
            for (let ent of query_up(game.World, entity, Has.ControlPlayer)) {
                let control = game.World.ControlPlayer[ent];
                control.IsGrabbingEntity = null;
            }
        }
    }

    if (control.Flags & Control.Animate) {
        let anim_name: Animate["Trigger"] = "idle";

        if (game.InputState["ArrowLeft"] || game.InputState["ArrowRight"]) {
            anim_name = "walk";
        }

        let parent_entity = game.World.Transform[entity].Parent;
        if (parent_entity !== undefined) {
            let parent_mimic = game.World.Mimic[parent_entity];
            let anchor_entity = parent_mimic.Target;
            let anchor_parent = game.World.Transform[anchor_entity].Parent;
            if (anchor_parent) {
                let rigid_body = game.World.RigidBody[anchor_parent];
                if (rigid_body.IsAirborne) {
                    anim_name = "jump";
                }
            }
        }

        for (let ent of query_all(game.World, entity, Has.Animate)) {
            let animate = game.World.Animate[ent];
            animate.Trigger = anim_name;
        }
    }
}
