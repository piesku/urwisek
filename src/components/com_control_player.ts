import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlPlayer {
    Move: boolean;
    Rotate: boolean;
    Animate: boolean;
    IsFacingRight: boolean;
}

export function control_player(move: boolean, rotate: boolean, animate: boolean) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlPlayer;
        game.World.ControlPlayer[entity] = {
            Move: move,
            Rotate: rotate,
            Animate: animate,
            IsFacingRight: true,
        };
    };
}
