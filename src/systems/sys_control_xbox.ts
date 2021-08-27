import {Vec3} from "../../common/math.js";
import {Entity} from "../../common/world.js";
import {Control} from "../components/com_control_player.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Move | Has.ControlPlayer;
const AXIS_Y: Vec3 = [0, 1, 0];
const AXIS_X: Vec3 = [1, 0, 0];
const DEAD_ZONE = 0.1;

export function sys_control_xbox(game: Game, delta: number) {
    for (let pad of navigator.getGamepads()) {
        if (pad) {
            game.InputDelta[`pad${pad.index}_axis_1`] = pad.axes[0];
            game.InputDelta[`pad${pad.index}_axis_2`] = pad.axes[1];
            game.InputDelta[`pad${pad.index}_axis_3`] = pad.axes[2];
            game.InputDelta[`pad${pad.index}_axis_4`] = pad.axes[3];
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
        if (Math.abs(game.InputDelta["pad0_axis_1"]) > DEAD_ZONE) {
            // Strafe movement.
            move.Directions.push([-game.InputDelta["pad0_axis_1"], 0, 0]);
        }
        if (Math.abs(game.InputDelta["pad0_axis_2"]) > DEAD_ZONE) {
            // Forward movement.
            move.Directions.push([0, 0, -game.InputDelta["pad0_axis_2"]]);
        }
    }
}
