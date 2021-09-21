import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlPlayer {
    Flags: number;
    IsFacingRight: boolean;
    IsWalking: boolean;
    IsGrabbingEntity: Entity | null;
}

export const enum Control {
    None,
    Move = 1,
    Rotate = 2,
    Animate = 4,
    Grab = 8,
}

export function control_player(flags: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlPlayer;
        game.World.ControlPlayer[entity] = {
            Flags: flags,
            IsFacingRight: true,
            IsWalking: false,
            IsGrabbingEntity: null,
        };
    };
}
