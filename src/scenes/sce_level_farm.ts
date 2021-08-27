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
        transform([17.281, 0.258, -3.373], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([22.628, 0.386, -3.539], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-8.685, 0.5, -4.619], [0, 0.56, 0, 0.829], [2, 2, 2]),
        ...blueprint_barn(game),
    ]);

    instantiate(game, [
        transform([-12, 0.5, 3.5], [0, 0.707, 0, 0.707], undefined),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([-10, 0.5, 3.5], [0, 0.707, 0, 0.707], undefined),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([-8, 0.5, 3.5], [0, 0.707, 0, 0.707], undefined),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([-6, 0.5, 3.5], [0, 0.707, 0, 0.707], undefined),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([-2.123, 0.5, -4.634], [0, 0.175, 0, 0.985], undefined),
        ...blueprint_silo(game),
    ]);

    instantiate(game, [
        transform([-5, 0.5, -8], [0, 0.707, 0, 0.707], undefined),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([-3, 0.5, -8], [0, 0.707, 0, 0.707], undefined),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([-1, 0.5, -8], [0, 0.707, 0, 0.707], undefined),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([1, 0.5, -8], [0, 0.707, 0, 0.707], undefined),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([3, 0.5, -8], [0, 0.707, 0, 0.707], undefined),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([5.772, 0.5, -7.376], undefined, [0.8, 0.8, 0.8]),
        ...blueprint_barn(game),
    ]);

    instantiate(game, [
        transform([5, 0.5, -8], [0, 0.707, 0, 0.707], undefined),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([4.669, 0.547, -6.026], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([3.112, 0.769, 3.408], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([3.714, 0.191, -2.208], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([9.436, 0.356, -3.75], [0, 0.952, 0, 0.305], undefined),
        ...blueprint_slup(game),
    ]);

    instantiate(game, [
        transform([13.056, 0.5, -6.526], [0, 0.175, 0, 0.985], [0.6, 0.6, 0.6]),
        ...blueprint_silo(game),
    ]);

    instantiate(game, [
        transform([15.088, 0.5, -6.526], [0, 0.175, 0, 0.985], [0.6, 0.6, 0.6]),
        ...blueprint_silo(game),
    ]);

    instantiate(game, [
        transform([17.147, 0.5, -6.526], [0, 0.175, 0, 0.985], [0.6, 0.6, 0.6]),
        ...blueprint_silo(game),
    ]);

    instantiate(game, [
        transform([13.606, 0.582, -6.194], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([17.024, 3.589, -6.274], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([21.275, 0.356, -7.481], [0, 0.952, 0, 0.305], [0.7, 0.7, 0.7]),
        ...blueprint_slup(game),
    ]);

    instantiate(game, [
        transform([22.834, 0.5, -6.821], [0, -0.437, 0, 0.899], [0.8, 0.8, 0.8]),
        ...blueprint_barn(game),
    ]);

    instantiate(game, [
        transform([25.7, 0.5, -3], [0, 0.815, 0, 0.579], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([1.7, 0.9, -6], [0.681, 0.19, -0.19, 0.681], [0.4, 0.4, 0.4]),
        ...blueprint_car2(game),
    ]);

    instantiate(game, [
        transform([1.334, 0.611, -5.021], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([24.836, 0.5, -2.687], [0, 0.815, 0, 0.579], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([23.942, 0.5, -2.493], [0, 0.739, 0, 0.674], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([23.024, 0.5, -2.431], [0, 0.722, 0, 0.692], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([22.074, 0.5, -2.387], [0, 0.722, 0, 0.692], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([21.15, 0.5, -2.497], [0, 0.602, 0, 0.798], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([20.344, 0.5, -2.934], [0, 0.411, 0, 0.911], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([18.363, 0.5, -4.784], [0, 0.411, 0, 0.911], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([17.557, 0.5, -5.128], [0, 0.678, 0, 0.735], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([16.626, 0.5, -5.209], [0, 0.678, 0, 0.735], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([15.701, 0.5, -5.209], [0, 0.739, 0, 0.674], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([14.795, 0.5, -5.122], [0, 0.739, 0, 0.674], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([19.038, 0.5, -4.178], [0, 0.411, 0, 0.911], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([13.888, 0.5, -5.109], [0, 0.678, 0, 0.735], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([12.964, 0.5, -5.109], [0, 0.739, 0, 0.674], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([12.126, 0.5, -5.315], [0, 0.476, 0, 0.88], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([11.445, 0.5, -5.934], [0, 0.33, 0, 0.944], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([11.101, 0.5, -6.778], [0, 0.049, 0, 0.999], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([11.014, 0.5, -7.721], [0, 0.049, 0, 0.999], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([19.421, 0.289, -3.388], [0.149, 0.384, -0.33, 0.85], [0.5, 0.5, 0.5]),
        ...blueprint_fence(game),
    ]);

    instantiate(game, [
        transform([19.003, 0.331, -4.134], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [255 / 255, 215 / 255, 55 / 255, 1]),
        transform([-6.258, 0.774, 0.343], from_euler([0, 0, 0, 1], -30, 0, 0)),
    ]);
}
