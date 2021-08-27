import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_barn} from "../blueprints/blu_barn.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_car2} from "../blueprints/blu_car2.js";
import {blueprint_fence} from "../blueprints/blu_fence.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {blueprint_silo} from "../blueprints/blu_silo.js";
import {blueprint_slup} from "../blueprints/blu_slup.js";
import {blueprint_sun} from "../blueprints/blu_sun.js";
import {blueprint_bush, blueprint_tree} from "../blueprints/blu_tree.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_level_forest(game: Game) {
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
        transform([4.669, 0.547, -6.026], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([3.112, 0.769, 3.408], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([13.606, 0.582, -6.194], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([1.334, 0.611, -5.021], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-10.877, 0.191, -4.573], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([11.065, 0.547, -8.23], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([14.128, 0.547, -0.948], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([3.998, 0.547, -1.593], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-8.014, 0.547, -1.915], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([11.522, 2.276, 0.987], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([21.291, 0.582, -2.405], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([23.468, 0.582, -8.639], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-3.806, 0.582, -2.029], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([16.992, 0.582, -0.578], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-6.169, 0.191, -7.926], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([-11.78, 0.191, -9.474], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([-1.494, 0.191, -9.474], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([-3.686, 0.191, -4.379], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([1.602, 0.191, -5.927], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([0.312, 0.191, -2.767], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([-10.296, 0.191, 2.747], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([2.731, 0.191, 2.521], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([5.471, 0.191, -9.023], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([5.149, 0.191, -2.864], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([8.503, 0.191, -5.798], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([12.243, 0.191, -8.765], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([10.889, 0.191, -2.348], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([14.758, 0.191, -4.799], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([18.37, 0.191, 2.521], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([17.789, 0.191, -9.023], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([19.305, 0.191, -4.154], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([24.045, 0.191, -2.251], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([22.981, 0.191, -7.83], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [0.4, 0.6, 0.4, 1]),
        transform([-6.258, 0.774, 0.343], from_euler([0, 0, 0, 1], -30, 0, 0)),
    ]);
}
