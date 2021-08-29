import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {Game} from "../game.js";
import {transform} from "../components/com_transform.js";
import {blueprint_sun} from "../blueprints/blu_sun.js";
import {render_colored_shadows} from "../components/com_render.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {prop_house} from "../props/prop_house.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {prop_slup} from "../props/prop_slup.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {blueprint_obstacle_house} from "../blueprints/blu_obstacle_house.js";
import {blueprint_obstacle_car} from "../blueprints/blu_obstacle_car.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {prop_car2} from "../props/prop_car2.js";

export function map_city(game: Game) {
    instantiate(game, [
        transform(undefined, from_euler([0, 0, 0, 1], 0, 90, 0)),
        ...blueprint_sun(game),
    ]);

    instantiate(game, [
        transform([-4, -0.5, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 20]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([14.662, -0.498, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 13]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([22.326, -1.477, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 2.349]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([28.13, 0.522, 1.767], [0, 0.707, 0, 0.707], [4, 2.003, 7.047]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([6.267, 0, -5.233], [0, 0.707, 0, 0.707], [10, 1, 40]),
        ...blueprint_ground(game),
    ]);

    instantiate_player(game, [-6.258, 0.774, 0.343]);

    instantiate(game, [
        transform([10.595, -3.406, -6.05], from_euler([0, 0, 0, 1], 0, 90, 0), [5, 10, 10]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([22.619, -2.849, -5.884], from_euler([0, 0, 0, 1], 0, 90, 0), [5, 10, 10]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([33.788, -8.323, -6.71], from_euler([0, 0, 0, 1], 0, 90, 0), [12, 22, 8]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [transform([1.388, 0.5, -2.177], undefined, undefined), ...prop_house(game)]);

    instantiate(game, [
        transform([7.88, 0.5, -3.146], [0, -0.986, 0, 0.166], undefined),
        ...prop_house(game),
    ]);

    instantiate(game, [
        transform([-1.721, 0.718, 1.61], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([8.712, 0.385, 2.999], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-5.891, 0.238, -3.08], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([3.088, 2.125, -0.889], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([7.376, 3.166, -1.898], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-10.963, 0.687, 2.061], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-3.763, 0.109, -2.479], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-7.066, 4.323, -4.943], undefined, [0.2, 0.2, 0.2]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-11.119, 3.776, -5.088], undefined, [0.15, 0.15, 0.15]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-1.829, 0.492, -3.043], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([35.227, 0.109, 3.529], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([17.402, 0.109, -4.834], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([20.492, 0.93, -1.49], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([14.841, 6.84, -4.943], undefined, [0.2, 0.2, 0.2]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-9.599, 0.481, -5.351], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([5.231, 4.852, -4.921], undefined, [0.25, 0.25, 0.25]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([14.157, 0.481, -2.192], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([22.052, 0.481, -2.192], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([23.878, 0.075, -2.767], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([26.067, 0.258, -1.865], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([24.574, 0.258, -3.404], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([25.149, 0.258, -1.274], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([23.034, 0.258, -0.512], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([22.366, 0.258, -3.949], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([25.336, 0.258, -4.431], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([25.896, 0.258, -3.062], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([21.697, 0.258, -1.258], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([21.386, 0.258, -3.684], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([23.765, 0.258, -4.244], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([24.123, 0.258, -1.927], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([14.777, 0.258, -2.953], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([15.99, 0.258, -2.533], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([17.281, 0.258, -3.373], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([24.597, 0.743, -0.826], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([22.628, 0.386, -3.539], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([1.388, 0.5, 1.141], undefined, undefined),
        ...blueprint_obstacle_house(game),
    ]);

    instantiate(game, [
        transform([1.282, 0.677, 2.333], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([5.114, 0.109, -2.479], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-10.396, 0.5, 1.725], [0, 0.938, 0, 0.345], undefined),
        ...blueprint_obstacle_car(game),
    ]);

    instantiate(game, [
        transform([-2.607, 1, 0.922], [-0.147, 0.684, 0.7, 0.144], [0.4, 0.4, 0.4]),
        ...blueprint_obstacle_car(game),
    ]);

    instantiate(game, [transform([4.012, 0.109, 3.49], undefined, undefined), ...prop_slup(game)]);

    instantiate(game, [
        transform([6.179, 0.385, -0.591], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([7.733, 0.385, -0.679], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([19.491, 0.5, 1.141], undefined, undefined),
        ...blueprint_obstacle_house(game),
    ]);

    instantiate(game, [
        transform([10.554, 0.975, 0.813], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([15.51, 1, -2.033], [-0.442, 0.55, 0.563, 0.431], [0.4, 0.4, 0.4]),
        ...prop_car2(game),
    ]);

    instantiate(game, [
        transform([10.983, 0.481, -2.395], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([12.283, 0.481, -1.398], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([16.119, 0.93, -1.457], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([12.823, 0.481, 3.414], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([14.934, 0.481, 3.65], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([15.457, 0.481, 3.312], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [transform([28.12, 1.185, 0.794], undefined, undefined), ...prop_slup(game)]);

    instantiate(game, [
        transform([19.685, 4.091, 0.813], undefined, undefined),
        ...blueprint_box(game),
    ]);
}
