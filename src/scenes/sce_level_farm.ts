import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_car2} from "../blueprints/blu_car2.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_house} from "../blueprints/blu_house.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {blueprint_slup} from "../blueprints/blu_slup.js";
import {blueprint_sun} from "../blueprints/blu_sun.js";
import {blueprint_bush, blueprint_tree} from "../blueprints/blu_tree.js";
import {render_colored_shadows} from "../components/com_render.js";
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
        transform([14.794, 0.109, 3.529], undefined, undefined),
        ...blueprint_slup(game),
    ]);

    instantiate(game, [
        transform([17.281, 0.258, -3.373], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([22.628, 0.386, -3.539], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
        transform([-6.258, 0.774, 0.343], from_euler([0, 0, 0, 1], -30, 0, 0)),
    ]);
}
