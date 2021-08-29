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
        transform([7.532, -0.5, 1.453], [0, 0.707, 0, 0.707], [4, 2.003, 30]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([30.775, -0.498, 1.453], [0, 0.707, 0, 0.707], [4, 2.003, 13]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([69.885, -1.477, 1.453], [0, 0.707, 0, 0.707], [4, 2.003, 2.349]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([76.045, 0.522, 1.453], [0, 0.707, 0, 0.707], [4, 2.003, 7.047]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([49.734, -1.5, -5.547], [0, 0.707, 0, 0.707], [10, 4, 120]),
        ...blueprint_ground(game),
    ]);

    instantiate_player(game, [0, 0.774, 0]);

    instantiate(game, [
        transform([17.043, -3.406, -6.364], from_euler([0, 0, 0, 1], 0, 90, 0), [5, 10, 10]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([29.067, -2.849, -6.198], from_euler([0, 0, 0, 1], 0, 90, 0), [5, 10, 10]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([40.236, -8.323, -7.025], from_euler([0, 0, 0, 1], 0, 90, 0), [12, 22, 8]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([11.667, 0.5, -2.491], undefined, undefined),
        ...prop_house(game),
    ]);

    instantiate(game, [
        transform([-1.899, 0.435, -3.704], [0, -0.986, 0, 0.166], [0.5, 0.5, 0.5]),
        ...prop_house(game),
    ]);

    instantiate(game, [
        transform([8.578, 0.718, 0.592], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([24.076, 0.385, -0.486], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([0.556, 0.238, -3.394], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([13.367, 2.125, -1.203], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-1.273, 0.19, -3.205], undefined, [0.5, 0.5, 0.5]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-4.515, 0.687, 1.747], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([2.685, 0.334, -2.793], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-0.619, 4.323, -5.257], undefined, [0.2, 0.2, 0.2]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-4.671, 3.776, -5.403], undefined, [0.15, 0.15, 0.15]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([4.619, 0.533, -3.357], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([23.85, 0.109, -5.148], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([26.94, 0.93, -1.805], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([21.289, 6.84, -5.257], undefined, [0.2, 0.2, 0.2]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-3.151, -0.074, -5.666], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([11.679, 4.852, -5.235], undefined, [0.25, 0.25, 0.25]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([20.605, 0.481, -2.506], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([28.5, 0.481, -2.506], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([30.326, 0.075, -3.081], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([33.681, 0.258, -2.988], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([33.432, 0.258, -4.449], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([31.597, 0.258, -1.588], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([29.482, 0.258, -0.826], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([28.814, 0.258, -4.263], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([34.241, 0.258, -5.087], undefined, [0.7, 0.7, 0.7]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([32.344, 0.258, -3.376], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([28.145, 0.258, -1.573], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([27.834, 0.258, -3.998], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([30.213, 0.258, -4.558], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([30.571, 0.258, -2.241], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([21.225, 0.258, -3.268], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([22.438, 0.258, -2.848], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([23.729, 0.258, -3.687], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([31.045, 0.743, -1.14], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([29.076, 0.386, -3.853], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([11.687, 0.5, 0.827], undefined, undefined),
        ...blueprint_obstacle_house(game),
    ]);

    instantiate(game, [
        transform([11.581, 0.677, 2.019], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([15.393, 0.109, -2.793], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-3.948, 0.5, 1.411], [0, 0.622, 0, 0.783], undefined),
        ...blueprint_obstacle_car(game),
    ]);

    instantiate(game, [
        transform([7.692, 1, -0.096], [-0.147, 0.684, 0.7, 0.144], [0.4, 0.4, 0.4]),
        ...blueprint_obstacle_car(game),
    ]);

    instantiate(game, [
        transform([14.311, 0.109, 3.176], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([22.335, 0.385, -0.905], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-2.766, 0.385, -0.993], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([54.036, 0.5, 0.827], undefined, undefined),
        ...blueprint_obstacle_house(game),
    ]);

    instantiate(game, [
        transform([28.606, 0.975, 0.498], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([21.958, 1, -2.347], [-0.442, 0.55, 0.563, 0.431], [0.4, 0.4, 0.4]),
        ...prop_car2(game),
    ]);

    instantiate(game, [
        transform([17.431, 0.481, -2.709], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([18.731, 0.481, -1.713], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([22.567, 0.93, -1.771], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([30.874, 0.481, 3.099], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([32.985, 0.481, 3.336], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([33.508, 0.481, 2.998], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([56.116, 0.236, 2.713], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([54.23, 4.091, 0.498], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([31.022, 0.258, -3.719], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([31.784, 0.258, -4.745], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([31.022, 0.258, -3.719], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([31.784, 0.258, -4.745], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([34.225, 0.258, -5.693], undefined, [0.7, 0.7, 0.7]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([37.32, 0.258, -6.004], undefined, [0.7, 0.7, 0.7]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([34.816, 0.258, -6.02], undefined, [0.7, 0.7, 0.7]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([34.692, 0.258, -5.569], undefined, [0.7, 0.7, 0.7]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([35.656, 0.258, -6.284], undefined, [0.7, 0.7, 0.7]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([35.345, 0.258, -5.678], undefined, [0.7, 0.7, 0.7]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([36.184, 0.258, -5.88], undefined, [0.7, 0.7, 0.7]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([38.564, 0.258, -6.611], undefined, [0.4, 0.4, 0.4]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([36.268, 0.258, -6.533], undefined, [0.4, 0.4, 0.4]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([36.878, 0.258, -7.025], undefined, [0.4, 0.4, 0.4]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([37.911, 0.258, -6.465], undefined, [0.4, 0.4, 0.4]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([37.394, 0.258, -6.916], undefined, [0.4, 0.4, 0.4]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([37.058, 0.258, -6.527], undefined, [0.4, 0.4, 0.4]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([38.19, 0.258, -6.962], undefined, [0.4, 0.4, 0.4]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([28.606, 2.405, 0.498], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([53.759, -0.498, 1.453], [0, 0.707, 0, 0.707], [4, 2.003, 30]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([69.451, -3.406, -6.364], from_euler([0, 0, 0, 1], 0, 90, 0), [5, 10, 10]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([51.79, 4.323, -5.257], undefined, [0.2, 0.2, 0.2]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([47.737, 3.776, -5.403], undefined, [0.15, 0.15, 0.15]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([45.996, 0.109, -1.516], [0, -0.727, 0, 0.686], undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([44.272, 0.258, -4.246], [0, -0.727, 0, 0.686], undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([43.782, 0.258, -3.059], [0, -0.727, 0, 0.686], undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([43.311, 1, -3.568], [-0.713, 0.063, 0.065, 0.696], [0.4, 0.4, 0.4]),
        ...prop_car2(game),
    ]);

    instantiate(game, [
        transform([42.7, 0.93, -2.993], [0, -0.727, 0, 0.686], undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([59.592, 0.435, -4.675], [0, 0.707, 0, 0.707], [0.5, 0.5, 0.5]),
        ...prop_house(game),
    ]);

    instantiate(game, [
        transform([61.26, 0.435, -4.675], [0, 0.707, 0, 0.707], [0.5, 0.5, 0.5]),
        ...prop_house(game),
    ]);

    instantiate(game, [
        transform([62.932, 0.435, -4.675], [0, 0.707, 0, 0.707], [0.5, 0.5, 0.5]),
        ...prop_house(game),
    ]);

    instantiate(game, [
        transform([60.146, 0.558, -3.884], [0, -0.727, 0, 0.686], undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([68.567, 0.075, -3.081], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([71.922, 0.258, -2.988], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([71.673, 0.258, -4.449], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([72.482, 0.258, -5.087], undefined, [0.7, 0.7, 0.7]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([70.584, 0.258, -3.376], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([68.812, 0.258, -2.241], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([67.317, 0.386, -3.853], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([69.263, 0.258, -3.719], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([70.025, 0.258, -4.745], undefined, undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([72.466, 0.258, -5.693], undefined, [0.7, 0.7, 0.7]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([41.695, 2.405, 0.498], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([41.394, 2.405, 2.85], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([41.031, 2.952, -1.296], [0, 0, -0.707, 0.707], undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([61.983, 0.211, 2.777], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([87.091, -10.266, -7.025], from_euler([0, 0, 0, 1], 0, 90, 0), [12, 22, 8]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([78.665, 1.215, 3.099], [0, 0.996, 0, 0.086], undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([75.148, 1.398, -0.34], [0, 0.996, 0, 0.086], undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([73.43, 1.229, 3.107], [0, 0.996, 0, 0.086], undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([76.527, 1.398, 2.936], [0, 0.996, 0, 0.086], undefined),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([78.016, 0.236, -3.542], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([56.158, 0.609, 0.392], [0, -1, 0, -0.016], undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([56.401, 1, 0.298], [0.698, 0.155, 0.159, -0.681], undefined),
        ...blueprint_obstacle_car(game),
    ]);
}
