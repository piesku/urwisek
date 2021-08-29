import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {Game} from "../game.js";
import { transform } from "../components/com_transform.js";
import { blueprint_sun } from "../blueprints/blu_sun.js";
import { render_colored_shadows } from "../components/com_render.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {prop_barn} from "../props/prop_barn.js";
import {prop_fence} from "../props/prop_fence.js";
import {prop_silo} from "../props/prop_silo.js";
import {prop_slup} from "../props/prop_slup.js";
import {prop_car2} from "../props/prop_car2.js";
import {blueprint_obstacle_slup} from "../blueprints/blu_obstacle_slup.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_obstacle_barn} from "../blueprints/blu_obstacle_barn.js";
import {blueprint_obstacle_fence} from "../blueprints/blu_obstacle_fence.js";

export function map_farm(game: Game) {
    instantiate(game, [
        transform(undefined, from_euler([0, 0, 0, 1], 0, 90, 0)),
        ...blueprint_sun(game),
    ]);

    instantiate(game, [
        transform([5.402, -0.5, 0.961], [0, 0.707, 0, 0.707], [4, 2.003, 15]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([19.346, -2.5, 0.961], [0, 0.707, 0, 0.707], [4, 2.003, 14]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([42.296, -0.498, 0.961], [0, 0.707, 0, 0.707], [4, 2.003, 35]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([56.933, -1.5, -6.039], [0, 0.707, 0, 0.707], [10, 4, 120]),
        ...blueprint_ground(game),
    ]);

    instantiate_player(game, [0, 0.774, 0]);

    instantiate(game, [
        transform([66.274, 0.258, -4.179], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([32.705, 0.386, -4.345], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([1.391, 0.5, -5.425], [0, 0.56, 0, 0.829], [2, 2, 2]),
        ...prop_barn(game),
    ]);

    instantiate(game, [
        transform([-0.953, 0.5, 2.694], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([1.047, 0.5, 2.694], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([2.523, -0.045, 2.694], [0.191, 0.681, -0.191, 0.681], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([7.953, 0.5, -5.44], [0, 0.175, 0, 0.985], undefined),
        ...prop_silo(game),
    ]);

    instantiate(game, [
        transform([8.455, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([10.455, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([12.455, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([14.455, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([16.455, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([19.227, 0.5, -6.935], undefined, [0.8, 0.8, 0.8]),
        ...prop_barn(game),
    ]);

    instantiate(game, [
        transform([18.455, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([18.125, 0.547, -5.585], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([13.626, -0.537, -1.589], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([13.791, 0.191, -3.014], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([24.62, 0.356, -5.02], [0, 0.952, 0, 0.305], undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([62.05, 0.5, -7.332], [0, 0.175, 0, 0.985], [0.6, 0.6, 0.6]),
        ...prop_silo(game),
    ]);

    instantiate(game, [
        transform([64.082, 0.5, -7.332], [0, 0.175, 0, 0.985], [0.6, 0.6, 0.6]),
        ...prop_silo(game),
    ]);

    instantiate(game, [
        transform([66.141, 0.5, -7.332], [0, 0.175, 0, 0.985], [0.6, 0.6, 0.6]),
        ...prop_silo(game),
    ]);

    instantiate(game, [
        transform([62.6, 0.582, -7], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([66.018, 3.589, -7.08], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([70.268, 0.356, -8.288], [0, 0.952, 0, 0.305], [0.7, 0.7, 0.7]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([71.828, 0.5, -7.627], [0, -0.437, 0, 0.899], [0.8, 0.8, 0.8]),
        ...prop_barn(game),
    ]);

    instantiate(game, [
        transform([74.694, 0.5, -3.806], [0, 0.815, 0, 0.579], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([11.777, 0.9, -6.806], [0.681, 0.19, -0.19, 0.681], [0.4, 0.4, 0.4]),
        ...prop_car2(game),
    ]);

    instantiate(game, [
        transform([11.411, 0.611, -5.828], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([73.83, 0.5, -3.493], [0, 0.815, 0, 0.579], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([72.936, 0.5, -3.299], [0, 0.739, 0, 0.674], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([72.017, 0.5, -3.237], [0, 0.722, 0, 0.692], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([71.067, 0.5, -3.193], [0, 0.722, 0, 0.692], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([70.144, 0.5, -3.303], [0, 0.602, 0, 0.798], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([69.338, 0.5, -3.74], [0, 0.411, 0, 0.911], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([67.357, 0.5, -5.59], [0, 0.411, 0, 0.911], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([66.55, 0.5, -5.934], [0, 0.678, 0, 0.735], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([65.619, 0.5, -6.015], [0, 0.678, 0, 0.735], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([64.694, 0.5, -6.015], [0, 0.739, 0, 0.674], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([63.788, 0.5, -5.928], [0, 0.739, 0, 0.674], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([68.032, 0.5, -4.984], [0, 0.411, 0, 0.911], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([62.882, 0.5, -5.915], [0, 0.678, 0, 0.735], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([61.957, 0.5, -5.915], [0, 0.739, 0, 0.674], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([61.12, 0.5, -6.121], [0, 0.476, 0, 0.88], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([60.439, 0.5, -6.74], [0, 0.33, 0, 0.944], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([60.095, 0.5, -7.584], [0, 0.049, 0, 0.999], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([60.007, 0.5, -8.527], [0, 0.049, 0, 0.999], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([68.415, 0.289, -4.194], [0.149, 0.384, -0.33, 0.85], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([29.079, 0.331, -4.94], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([2.724, 0.611, 2.529], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([25.372, 0.328, 0], [-0.673, 0.673, 0.216, 0.216], [0.75, 0.75, 0.75]),
        ...blueprint_obstacle_slup(game),
    ]);

    instantiate(game, [
        transform([23.231, -0.715, 0.057], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([25.088, 0.402, 2.789], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([9.208, 0.611, 2.529], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([15.132, -1.485, 1.53], [0.5, 0.5, 0.5, 0.5], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([15.272, -1.922, 2.401], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([24.972, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([26.972, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([28.972, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([31.744, 0.5, -6.935], undefined, [0.8, 0.8, 0.8]),
        ...prop_barn(game),
    ]);

    instantiate(game, [
        transform([30.972, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([38.086, 0.356, -7.729], [0, 0.952, 0, 0.305], undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([20.999, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([22.999, 0.5, -7.559], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([15.638, -0.537, -1.628], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([17.728, -0.537, -1.473], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([19.817, -0.537, -1.783], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([21.791, -0.537, -1.667], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([23.687, -0.537, -2.015], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([44.792, 0.5, -0.191], [0, 0.707, 0, 0.707], [2, 2, 2]),
        ...blueprint_obstacle_barn(game),
    ]);

    instantiate(game, [
        transform([41.232, 3.454, 0.057], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([41.232, 1.077, 0.057], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([41.232, 2.27, 0.057], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([41.232, 4.617, 0], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([59.503, 0.258, 0.928], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([54.898, 0.258, 1.47], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([50.294, 0.258, 1.16], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([53.834, 0.356, -3.705], [0, 0.194, 0, 0.981], undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([59.058, 0.356, -10.051], [0, 0.556, 0, 0.831], undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([47.846, 0.331, 2.412], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([54.829, 0.5, 2.694], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([56.829, 0.5, 2.694], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([58.305, -0.045, 2.694], [0.191, 0.681, -0.191, 0.681], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([58.505, 0.611, 2.529], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([78.626, -0.498, 0.961], [0, 0.707, 0, 0.707], [4, 2.003, 35]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([72.227, 0.5, -1.567], [0, 0.175, 0, 0.985], undefined),
        ...prop_silo(game),
    ]);

    instantiate(game, [
        transform([71.008, 2.999, 0.323], [0.707, 0.707, 0, 0], [2, 2, 2]),
        ...blueprint_obstacle_fence(game),
    ]);

    instantiate(game, [
        transform([78.077, 0.722, -3.382], [-0.324, 0.629, 0.629, -0.324], [0.75, 0.75, 0.75]),
        ...blueprint_obstacle_slup(game),
    ]);

    instantiate(game, [
        transform([76.999, 1.985, 0], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([72.162, 4.567, 0.31], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([77.575, 0.777, 2.871], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([67.938, 0.258, 2.631], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([79.198, 0.258, -0.813], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([81.946, 0.258, -5.34], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([94.119, 0.258, -2.957], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([94.328, 0.258, 2.515], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([-1.914, 0.5, -0.217], undefined, undefined),
        ...blueprint_obstacle_fence(game),
    ]);

    instantiate(game, [
        transform([-1.914, 0.5, 1.824], undefined, undefined),
        ...blueprint_obstacle_fence(game),
    ]);

    instantiate(game, [
        transform([84.659, 0.356, -2.181], [0, 0.952, 0, 0.305], undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([90.594, 0.5, -6.21], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([92.594, 0.5, -6.21], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([95.366, 0.5, -5.586], undefined, [0.8, 0.8, 0.8]),
        ...prop_barn(game),
    ]);

    instantiate(game, [
        transform([94.594, 0.5, -6.21], [0, 0.707, 0, 0.707], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([89.688, 0.5, -5.266], [0, 1, 0, 0], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([89.696, 0.5, -3.44], [0, 1, 0, 0], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([89.712, 0.5, -1.644], [0, 1, 0, 0], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([89.73, 0.5, 0.147], [0, 1, 0, 0], undefined),
        ...blueprint_obstacle_fence(game),
    ]);

    instantiate(game, [
        transform([89.73, 0.5, 2.069], [0, 1, 0, 0], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([89.688, 1.638, -5.266], [0, 1, 0, 0], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([89.696, 1.638, -3.44], [0, 1, 0, 0], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([89.712, 1.638, -1.644], [0, 1, 0, 0], undefined),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([89.73, 1.638, 0.147], [0, 1, 0, 0], undefined),
        ...blueprint_obstacle_fence(game),
    ]);

    instantiate(game, [
        transform([89.73, 1.638, 2.069], [0, 1, 0, 0], undefined),
        ...prop_fence(game),
    ]);
}
