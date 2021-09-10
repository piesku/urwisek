import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {Game} from "../game.js";
import {transform} from "../components/com_transform.js";
import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";
import {render_colored_shadows} from "../components/com_render.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {prop_barn} from "../props/prop_barn.js";
import {prop_fence} from "../props/prop_fence.js";
import {prop_silo} from "../props/prop_silo.js";
import {prop_slup} from "../props/prop_slup.js";
import {prop_car2} from "../props/prop_car2.js";
import {blueprint_obstacle_slup} from "../blueprints/blu_obstacle_slup.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {blueprint_obstacle_barn} from "../blueprints/blu_obstacle_barn.js";
import {blueprint_obstacle_fence} from "../blueprints/blu_obstacle_fence.js";
import {blueprint_exit} from "../blueprints/blu_exit.js";

export function map_farm(game: Game) {
    instantiate(game, [
        transform([5.4, -0.5, 0.96], [0, 0.71, 0, 0.71], [4, 2, 15]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([19.35, -2.5, 0.96], [0, 0.71, 0, 0.71], [4, 2, 14]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([65.3, -0.5, 0.96], [0, 0.71, 0, 0.71], [4, 2, 81.11]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([56.93, -1.5, -6.04], [0, 0.71, 0, 0.71], [10, 4, 120]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [transform([32.71, 0.39, -4.35]), ...blueprint_bush(game)]);

    instantiate(game, [
        transform([1.39, 0.5, -5.42], [0, 0.56, 0, 0.83], [2, 2, 2]),
        ...prop_barn(game),
    ]);

    instantiate(game, [transform([-0.95, 0.5, 2.69], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([1.05, 0.5, 2.69], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [
        transform([2.52, -0.05, 2.69], [0.19, 0.68, -0.19, 0.68]),
        ...prop_fence(game),
    ]);

    instantiate(game, [transform([7.95, 0.5, -5.44], [0, 0.17, 0, 0.98]), ...prop_silo(game)]);

    instantiate(game, [transform([8.46, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([10.46, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([12.46, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([14.46, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([16.46, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [
        transform([19.23, 0.5, -6.94], undefined, [0.8, 0.8, 0.8]),
        ...prop_barn(game),
    ]);

    instantiate(game, [transform([18.46, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([18.12, 0.55, -5.59]), ...blueprint_bush(game)]);

    instantiate(game, [
        transform([13.63, -0.54, -1.59], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [transform([24.62, 0.36, -5.02], [0, 0.95, 0, 0.31]), ...prop_slup(game)]);

    instantiate(game, [
        transform([62.05, 0.5, -7.33], [0, 0.17, 0, 0.98], [0.6, 0.6, 0.6]),
        ...prop_silo(game),
    ]);

    instantiate(game, [
        transform([64.08, 0.5, -7.33], [0, 0.17, 0, 0.98], [0.6, 0.6, 0.6]),
        ...prop_silo(game),
    ]);

    instantiate(game, [
        transform([66.14, 0.5, -7.33], [0, 0.17, 0, 0.98], [0.6, 0.6, 0.6]),
        ...prop_silo(game),
    ]);

    instantiate(game, [transform([62.6, 0.58, -7]), ...blueprint_bush(game)]);

    instantiate(game, [transform([66.02, 3.59, -7.08]), ...blueprint_bush(game)]);

    instantiate(game, [
        transform([70.27, 0.36, -8.29], [0, 0.95, 0, 0.31], [0.7, 0.7, 0.7]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([71.83, 0.5, -7.63], [0, -0.44, 0, 0.9], [0.8, 0.8, 0.8]),
        ...prop_barn(game),
    ]);

    instantiate(game, [
        transform([74.69, 0.5, -3.81], [0, 0.82, 0, 0.58], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([11.78, 0.9, -6.81], [0.68, 0.19, -0.19, 0.68], [0.4, 0.4, 0.4]),
        ...prop_car2(game),
    ]);

    instantiate(game, [transform([11.41, 0.61, -5.83]), ...blueprint_bush(game)]);

    instantiate(game, [
        transform([73.83, 0.5, -3.49], [0, 0.82, 0, 0.58], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([72.94, 0.5, -3.3], [0, 0.74, 0, 0.67], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([72.02, 0.5, -3.24], [0, 0.72, 0, 0.69], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([71.07, 0.5, -3.19], [0, 0.72, 0, 0.69], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([70.14, 0.5, -3.3], [0, 0.6, 0, 0.8], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([69.34, 0.5, -3.74], [0, 0.41, 0, 0.91], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([67.36, 0.5, -5.59], [0, 0.41, 0, 0.91], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([66.55, 0.5, -5.93], [0, 0.68, 0, 0.74], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([65.62, 0.5, -6.02], [0, 0.68, 0, 0.74], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([64.69, 0.5, -6.02], [0, 0.74, 0, 0.67], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([63.79, 0.5, -5.93], [0, 0.74, 0, 0.67], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([68.03, 0.5, -4.98], [0, 0.41, 0, 0.91], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([62.88, 0.5, -5.92], [0, 0.68, 0, 0.74], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([61.96, 0.5, -5.92], [0, 0.74, 0, 0.67], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([61.12, 0.5, -6.12], [0, 0.48, 0, 0.88], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([60.44, 0.5, -6.74], [0, 0.33, 0, 0.94], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([60.09, 0.5, -7.58], [0, 0.05, 0, 1], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([60.01, 0.5, -8.53], [0, 0.05, 0, 1], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [
        transform([68.41, 0.29, -4.19], [0.15, 0.38, -0.33, 0.85], [0.5, 0.5, 0.5]),
        ...prop_fence(game),
    ]);

    instantiate(game, [transform([29.08, 0.33, -4.94]), ...blueprint_bush(game)]);

    instantiate(game, [transform([2.72, 0.61, 2.53]), ...blueprint_bush(game)]);

    instantiate(game, [
        transform([25.37, 0.23, 0], [-0.67, 0.67, 0.22, 0.22], [0.75, 0.75, 0.75]),
        ...blueprint_obstacle_slup(game),
    ]);

    instantiate(game, [transform([23.23, -0.71, 0.06]), ...blueprint_box(game)]);

    instantiate(game, [transform([25.09, 0.4, 2.79]), ...blueprint_tree(game)]);

    instantiate(game, [transform([9.21, 0.61, 2.53]), ...blueprint_bush(game)]);

    instantiate(game, [transform([15.13, -1.48, 1.53], [0.5, 0.5, 0.5, 0.5]), ...prop_fence(game)]);

    instantiate(game, [transform([15.27, -1.92, 2.4]), ...blueprint_bush(game)]);

    instantiate(game, [transform([24.97, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([26.97, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([28.97, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [
        transform([31.74, 0.5, -6.94], undefined, [0.8, 0.8, 0.8]),
        ...prop_barn(game),
    ]);

    instantiate(game, [transform([30.97, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([38.09, 0.36, -7.73], [0, 0.95, 0, 0.31]), ...prop_slup(game)]);

    instantiate(game, [transform([21, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([23, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [
        transform([15.64, -0.54, -1.63], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([17.73, -0.54, -1.47], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([19.82, -0.54, -1.78], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([21.79, -0.54, -1.67], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([23.69, -0.54, -2.02], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([44.79, 0.5, -0.19], [0, 0.71, 0, 0.71], [2, 2, 2]),
        ...blueprint_obstacle_barn(game),
    ]);

    instantiate(game, [transform([41.23, 3.45, 0.06]), ...blueprint_box(game)]);

    instantiate(game, [transform([41.23, 1.08, 0.06]), ...blueprint_box(game)]);

    instantiate(game, [transform([41.23, 2.27, 0.06]), ...blueprint_box(game)]);

    instantiate(game, [transform([41.23, 4.62, 0]), ...blueprint_box(game)]);

    instantiate(game, [transform([53.83, 0.36, -3.7], [0, 0.19, 0, 0.98]), ...prop_slup(game)]);

    instantiate(game, [transform([59.06, 0.36, -10.05], [0, 0.56, 0, 0.83]), ...prop_slup(game)]);

    instantiate(game, [transform([47.85, 0.33, 2.41]), ...blueprint_bush(game)]);

    instantiate(game, [transform([54.83, 0.5, 2.69], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([56.83, 0.5, 2.69], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [
        transform([58.3, -0.05, 2.69], [0.19, 0.68, -0.19, 0.68]),
        ...prop_fence(game),
    ]);

    instantiate(game, [transform([58.51, 0.61, 2.53]), ...blueprint_bush(game)]);

    instantiate(game, [transform([72.23, 0.5, -1.57], [0, 0.17, 0, 0.98]), ...prop_silo(game)]);

    instantiate(game, [
        transform([71.01, 3, 0.32], [0.71, 0.71, 0, 0], [2, 2, 2]),
        ...blueprint_obstacle_fence(game),
    ]);

    instantiate(game, [
        transform([78.08, 0.72, -3.38], [-0.32, 0.63, 0.63, -0.32], [0.75, 0.75, 0.75]),
        ...blueprint_obstacle_slup(game),
    ]);

    instantiate(game, [transform([77, 1.98, 0]), ...blueprint_box(game)]);

    instantiate(game, [transform([72.16, 4.57, 0.31]), ...blueprint_box(game)]);

    instantiate(game, [transform([77.58, 0.78, 2.87]), ...blueprint_bush(game)]);

    instantiate(game, [transform([-1.91, 0.5, -0.22]), ...blueprint_obstacle_fence(game)]);

    instantiate(game, [transform([-1.91, 0.5, 1.82]), ...blueprint_obstacle_fence(game)]);

    instantiate(game, [transform([84.66, 0.36, -2.18], [0, 0.95, 0, 0.31]), ...prop_slup(game)]);

    instantiate(game, [transform([90.59, 0.5, -6.21], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([92.59, 0.5, -6.21], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [
        transform([95.37, 0.5, -5.59], undefined, [0.8, 0.8, 0.8]),
        ...prop_barn(game),
    ]);

    instantiate(game, [transform([94.59, 0.5, -6.21], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);

    instantiate(game, [transform([89.69, 0.5, -5.27], [0, 1, 0, 0]), ...prop_fence(game)]);

    instantiate(game, [transform([89.7, 0.5, -3.44], [0, 1, 0, 0]), ...prop_fence(game)]);

    instantiate(game, [transform([89.71, 0.5, -1.64], [0, 1, 0, 0]), ...prop_fence(game)]);

    instantiate(game, [
        transform([89.73, 0.5, 0.15], [0, 1, 0, 0]),
        ...blueprint_obstacle_fence(game),
    ]);

    instantiate(game, [transform([89.73, 0.5, 2.07], [0, 1, 0, 0]), ...prop_fence(game)]);

    instantiate(game, [transform([89.69, 1.64, -5.27], [0, 1, 0, 0]), ...prop_fence(game)]);

    instantiate(game, [transform([89.7, 1.64, -3.44], [0, 1, 0, 0]), ...prop_fence(game)]);

    instantiate(game, [transform([89.71, 1.64, -1.64], [0, 1, 0, 0]), ...prop_fence(game)]);

    instantiate(game, [
        transform([89.73, 1.64, 0.15], [0, 1, 0, 0]),
        ...blueprint_obstacle_fence(game),
    ]);

    instantiate(game, [transform([89.73, 1.64, 2.07], [0, 1, 0, 0]), ...prop_fence(game)]);

    instantiate(game, [transform([95, 0.5, 0]), ...blueprint_exit(game)]);

    instantiate(game, [...blueprint_sun_light(game), transform()]);

    instantiate(game, [...blueprint_sun_shadow(game), transform()]);
}
