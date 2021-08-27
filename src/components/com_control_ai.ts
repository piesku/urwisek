/**
 * @module components/com_control_ai
 */

import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {Animate} from "./com_animate.js";

export interface ControlAi {
    Animation: Animate["Trigger"];
}

export function control_ai(Animation: Animate["Trigger"]) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlAi;
        game.World.ControlAi[entity] = {
            Animation,
        };
    };
}
