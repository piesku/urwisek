import {spawn} from "../components/com_spawn.js";
import {Game} from "../game.js";
import {blueprint_animal} from "./blu_animal.js";

export function blueprint_spawn_animal(game: Game) {
    return [spawn(blueprint_animal, 1)];
}
