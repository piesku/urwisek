import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
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
        mimic(find_first(game.World, "camera anchor"), 0.01),
        // shake(0.02),
        // toggle(Has.Shake, 0.5, true),
    ]);
}
