import {instantiate} from "../../common/game.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_pixie} from "../blueprints/blu_pixie.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {mimic} from "../components/com_mimic.js";
import {find_first, Names} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {map_farm} from "./map_farm.js";

export function scene_level2(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    instantiate_player(game, [0, 0.774, 0]);

    map_farm(game);

    instantiate(game, [...blueprint_pixie(game), transform([-20, 5, 0])]);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [255 / 255, 208 / 255, 0 / 255, 1]),
        transform([0, 10, 10]),
        mimic(find_first(game.World, Names.CameraAnchor), 0.05),
    ]);
}
