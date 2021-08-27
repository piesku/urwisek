import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {map_city} from "./map_city.js";

export function scene_level1(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    map_city(game);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
        transform([0, 0, 0], from_euler([0, 0, 0, 1], -30, 0, 0)),
    ]);
}
