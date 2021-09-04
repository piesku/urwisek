import {set} from "../../common/quat.js";
import {Entity} from "../../common/world.js";
import {Animate} from "../components/com_animate.js";
import {query_all} from "../components/com_children.js";
import {Control} from "../components/com_control_player.js";
import {query_up} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {snd_walk1} from "../sounds/snd_walk1.js";
import {snd_walk2} from "../sounds/snd_walk2.js";
import {snd_walk3} from "../sounds/snd_walk3.js";
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
        let move = game.World.Move[entity];
        let collide = game.World.Collide[entity];
        let audio_source = game.World.AudioSource[entity];
        let rigid_body = game.World.RigidBody[entity];

        let is_walking = false;

        if (game.InputState["ArrowLeft"]) {
            move.Directions.push([-1, 0, 0]);
            is_walking = true;
        }
        if (game.InputState["ArrowRight"]) {
            move.Directions.push([1, 0, 0]);
            is_walking = true;
        }

        if (is_walking && collide.Collisions.length > 0) {
            let other_entity = collide.Collisions[0].Other;
            let other_layers = game.World.Collide[other_entity].Layers;
            if (other_layers & Layer.SurfaceGround) {
                audio_source.Trigger = snd_walk1;
            } else if (other_layers & Layer.SurfaceWood) {
                audio_source.Trigger = snd_walk2;
            } else if (other_layers & Layer.SurfaceMetal) {
                audio_source.Trigger = snd_walk3;
            }
        }

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
            for (let ent of query_up(game.World, entity, Has.ControlPlayer)) {
                let control = game.World.ControlPlayer[ent];
                control.IsGrabbingEntity = obstacle_entity;
            }

            game.World.Signature[obstacle_entity] |= Has.Mimic;
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

    if (control.Flags & Control.Animate) {
        let anim_name: Animate["Trigger"];

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

        if (anim_name) {
            for (let ent of query_all(game.World, entity, Has.Animate)) {
                let animate = game.World.Animate[ent];
                animate.Trigger = anim_name;
            }
        }
    }
}
