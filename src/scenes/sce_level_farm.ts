import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_barn} from "../blueprints/blu_barn.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {blueprint_sun} from "../blueprints/blu_sun.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_level_farm(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    instantiate(game, [
        transform(undefined, from_euler([0, 0, 0, 1], 0, 90, 0)),
        ...blueprint_sun(game),
    ]);

    instantiate(game, [
        transform([-9, -0.498, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 8]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([-3.833, -0.898, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 2.349]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([-1.484, -1.299, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 2.349]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([3.214, -0.498, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 7.047]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([7.911, 0.304, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 2.349]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([11.435, 0.905, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 4.698]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([17.307, -0.498, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 7.047]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([6.267, 0, -5.233], [0, 0.707, 0, 0.707], [10, 1, 40]),
        ...blueprint_ground(game),
    ]);

    instantiate_player(game, [-6.258, 0.774, 0.343]);

    instantiate(game, [
        transform([-3, 0.5, -5], from_euler([0, 0, 0, 1], 0, -35, 0), [2, 2, 2]),
        ...blueprint_barn(game),
    ]);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [255 / 255, 215 / 255, 55 / 255, 1]),
        transform([-6.258, 0.774, 0.343], from_euler([0, 0, 0, 1], -30, 0, 0)),
    ]);
}
