import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {shake} from "../components/com_shake.js";
import {spawn} from "../components/com_spawn.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {blueprint_bird} from "./blu_bird.js";

export function blueprint_spawn_bird(game: Game) {
    return [
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ];
}
