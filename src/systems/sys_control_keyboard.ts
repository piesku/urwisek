import {Entity} from "../../common/world.js";
import {query_all} from "../components/com_children.js";
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

    if (control.Move) {
        let move = game.World.Move[entity];
        if (game.InputState["ArrowLeft"]) {
            move.Directions.push([0, 0, -1]);
        }
        if (game.InputState["ArrowRight"]) {
            move.Directions.push([0, 0, 1]);
        }
    }

    if (control.Rotate) {
        let transform = game.World.Transform[entity];
        if (game.InputState["ArrowLeft"] && control.IsFacingRight) {
            control.IsFacingRight = false;
            transform.Rotation = [0, 1, 0, 0];
            transform.Dirty = true;
        }
        if (game.InputState["ArrowRight"] && !control.IsFacingRight) {
            control.IsFacingRight = true;
            transform.Rotation = [0, 0, 0, 1];
            transform.Dirty = true;
        }
    }

    if (control.Animate) {
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
}
