import {instantiate} from "../../common/game.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {mimic} from "../components/com_mimic.js";
import {find_first, Names} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {map_city} from "./map_city.js";

export function scene_level1(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    instantiate_player(game, [0, 0.774, 0]);

    map_city(game);

    instantiate(game, [
        ...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
        transform([0, 10, 10]),
        mimic(find_first(game.World, Names.CameraAnchor), 0.05),
    ]);
}
