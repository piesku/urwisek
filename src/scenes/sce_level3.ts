import {instantiate} from "../../common/game.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {children} from "../components/com_children.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {shake} from "../components/com_shake.js";
import {toggle} from "../components/com_toggle.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has, World} from "../world.js";
import {map_forest} from "./map_forest.js";

export function scene_level3(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    map_forest(game);

    // Camera.
    instantiate(game, [
        transform([0, 10, 10]),
        mimic(find_first(game.World, "camera anchor"), 0.05),
        children([
            transform(),
            ...blueprint_camera(game, [0.4, 0.6, 0.4, 1]),
            shake(0.03),
            toggle(Has.Shake, 10, 0.3, true),
        ]),
    ]);
}
