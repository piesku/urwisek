/**
 * @module components/com_light
 */

import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Light {
    Intensity: number;
}

export function light(range: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Light;
        game.World.Light[entity] = {
            // < 1 means directional light, > 0 means point light.
            Intensity: range ** 2,
        };
    };
}
