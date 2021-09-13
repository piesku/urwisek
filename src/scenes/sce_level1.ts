import {instantiate} from "../../common/game.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {map_forest} from "./map_forest.js";

export function scene_level1(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    instantiate_player(game);

    map_forest(game);

    instantiate(game, [
        ...blueprint_camera(game, [0.4, 0.6, 0.4, 1]),
        transform([0, 10, 10]),
        mimic(find_first(game.World, "ca"), 0.05),
    ]);
}
