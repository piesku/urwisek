import {Entity} from "../../common/world.js";
import {Animate} from "../components/com_animate.js";
import {query_all} from "../components/com_children.js";
import {Control} from "../components/com_control_player.js";
import {Game, Layer} from "../game.js";
import {snd_walk1} from "../sounds/snd_walk1.js";
import {snd_walk2} from "../sounds/snd_walk2.js";
import {snd_walk3} from "../sounds/snd_walk3.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer;

export function sys_control_animate(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlPlayer[entity];

    if (control.Flags & Control.Move) {
        let collide = game.World.Collide[entity];
        let audio_source = game.World.AudioSource[entity];

        if (control.IsWalking && collide.Collisions.length > 0) {
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
    }

    if (control.Flags & Control.Animate) {
        let anim_name: Animate["Trigger"];

        let parent_entity = game.World.Transform[entity].Parent;
        if (parent_entity !== undefined) {
            let parent_mimic = game.World.Mimic[parent_entity];
            let anchor_entity = parent_mimic.Target;
            let anchor_parent = game.World.Transform[anchor_entity].Parent;
            if (anchor_parent !== undefined) {
                let player_control = game.World.ControlPlayer[anchor_parent];
                if (player_control.IsWalking) {
                    anim_name = "w";
                }

                let player_rigid_body = game.World.RigidBody[anchor_parent];
                if (player_rigid_body.IsAirborne) {
                    anim_name = "j";
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
