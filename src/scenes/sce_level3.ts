import {instantiate} from "../../common/game.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {audio_source} from "../components/com_audio_source.js";
import {children} from "../components/com_children.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {snd_helicopter} from "../sounds/snd_helicopter.js";
import {snd_wind} from "../sounds/snd_wind.js";
import {World} from "../world.js";
import {map_forest} from "./map_forest.js";

export function scene_level3(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    instantiate_player(game, [0, -2, 0]);

    map_forest(game);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [0.4, 0.6, 0.4, 1]),
        transform([0, 10, 10]),
        mimic(find_first(game.World, "camera anchor"), 0.05),
    ]);

    instantiate(game, [children([audio_source(snd_wind)], [audio_source(snd_helicopter)])]);
}
