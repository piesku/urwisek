import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Cull {
    Mask: number;
}

export function cull(mask: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Cull;
        game.World.Cull[entity] = {
            Mask: mask,
        };
    };
}
