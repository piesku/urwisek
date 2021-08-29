import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_rocket} from "../blueprints/blu_rocket.js";
import {children} from "../components/com_children.js";
import {disable} from "../components/com_disable.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {task_timeout} from "../components/com_task.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has, World} from "../world.js";
import {map_city} from "./map_city.js";

export function scene_level1(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    map_city(game);

    instantiate(game, [
        ...blueprint_rocket(game),
        transform([-9, 7, -3], from_euler([0, 0, 0, 1], -45, 100, 0)),
    ]);

    let camera_entity = instantiate(game, [
        ...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
        transform([-6.2, 10, 0], from_euler([0, 0, 0, 1], 10, 0, 0)),
        mimic(find_first(game.World, "camera anchor"), 0.01),
        disable(Has.Mimic),
    ]);

    // Animate the camera during the intro.
    instantiate(game, [
        children([
            task_timeout(5, () => {
                game.World.Signature[camera_entity] |= Has.Mimic;
            }),
        ]),
        task_timeout(9, () => {
            game.World.Mimic[camera_entity].Stiffness = 0.05;
        }),
    ]);
}
