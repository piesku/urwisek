import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {map_forest} from "./map_forest.js";

export function scene_level3(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    map_forest(game);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [0.4, 0.6, 0.4, 1]),
        transform([0, 0, 0], from_euler([0, 0, 0, 1], -30, 0, 0)),
    ]);
}
