import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_rocket} from "../blueprints/blu_rocket.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {map_city} from "./map_city.js";

export function scene_level1(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    map_city(game);

    instantiate(game, [
        ...blueprint_rocket(game),
        transform([-10, 9, -3], from_euler([0, 0, 0, 1], -45, 100, 0)),
    ]);

    // Camera.
    // instantiate(game, [
    //     ...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
    //     transform([-6.2, 10, 0]),
    //     mimic(find_first(game.World, "camera anchor"), 0.01),
    //     disable(Has.Mimic),
    //     task_timeout(5, (entity) => {
    //         game.World.Signature[entity] |= Has.Mimic;
    //     }),
    // ]);

    instantiate(game, [
        ...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
        transform([-6.2, 10, 0]),
        mimic(find_first(game.World, "camera anchor"), 0.01),
        // disable(Has.Mimic),
        // task_timeout(5, (entity) => {
        //     game.World.Signature[entity] |= Has.Mimic;
        // }),
    ]);
}
