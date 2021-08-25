import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlPlayer {
    Move: boolean;
    Animate: boolean;
}

export function control_player(move: boolean, animate: boolean) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlPlayer;
        game.World.ControlPlayer[entity] = {
            Move: move,
            Animate: animate,
        };
    };
}
