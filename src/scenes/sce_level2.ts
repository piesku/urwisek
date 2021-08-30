import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {map_farm} from "./map_farm.js";

export function scene_level2(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    map_farm(game);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [255 / 255, 208 / 255, 0 / 255, 1]),
        transform([0, 0, 0], from_euler([0, 0, 0, 1], -30, 0, 0)),
        mimic(find_first(game.World, "camera anchor"), 0.05),
    ]);
}