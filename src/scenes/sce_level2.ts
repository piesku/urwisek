import {instantiate} from "../../common/game.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_pixie} from "../blueprints/blu_pixie.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {audio_source} from "../components/com_audio_source.js";
import {children} from "../components/com_children.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {snd_chirp1} from "../sounds/snd_chirp1.js";
import {snd_gust} from "../sounds/snd_gust.js";
import {snd_horn} from "../sounds/snd_horn.js";
import {snd_neigh} from "../sounds/snd_neigh.js";
import {World} from "../world.js";
import {map_farm} from "./map_farm.js";

export function scene_level2(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    instantiate_player(game);

    map_farm(game);

    instantiate(game, [...blueprint_pixie(game), transform([-20, 5, 0])]);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [255 / 255, 208 / 255, 0 / 255, 1]),
        transform([0, 10, 10]),
        mimic(find_first(game.World, "ca"), 0.05),
    ]);

    instantiate(game, [
        children(
            [audio_source(snd_horn)],
            [audio_source(snd_chirp1)],
            [audio_source(snd_gust)],
            [audio_source(snd_neigh)]
        ),
    ]);
}
