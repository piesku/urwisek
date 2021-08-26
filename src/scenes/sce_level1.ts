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

export function scene_level1(game: Game) {
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

    instantiate(game, [
        transform([0, 0.5, -2.177], undefined, undefined),
        ...blueprint_house(game),
    ]);

    instantiate(game, [
        transform([7.88, 0.5, -3.146], [0, -0.986, 0, 0.166], undefined),
        ...blueprint_house(game),
    ]);

    instantiate(game, [
        transform([3.726, 0.718, -2.339], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([0.454, 0.385, 2.999], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-5.891, 0.238, -3.08], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-0.106, 2.147, -0.984], undefined, undefined),
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
        ...blueprint_slup(game),
    ]);

    instantiate(game, [
        transform([-7.066, 4.323, -4.943], undefined, [0.2, 0.2, 0.2]),
        ...blueprint_slup(game),
    ]);

    instantiate(game, [
        transform([-11.119, 3.776, -5.088], undefined, [0.15, 0.15, 0.15]),
        ...blueprint_slup(game),
    ]);

    instantiate(game, [
        transform([-1.829, 0.492, -3.043], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([14.794, 0.109, 3.529], undefined, undefined),
        ...blueprint_slup(game),
    ]);

    instantiate(game, [
        transform([19.427, 0.5, -3.36], [0, 0.709, 0, 0.706], undefined),
        ...blueprint_house(game),
    ]);

    instantiate(game, [
        transform([17.402, 0.109, -4.834], undefined, undefined),
        ...blueprint_slup(game),
    ]);

    instantiate(game, [
        transform([20.492, 0.93, -1.49], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([14.841, 6.84, -4.943], undefined, [0.2, 0.2, 0.2]),
        ...blueprint_slup(game),
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
        transform([-10.396, 0.5, 1.725], [0, 0.938, 0, 0.345], undefined),
        ...blueprint_car2(game),
    ]);

    instantiate(game, [
        transform([2.839, 1, -3.027], [-0.147, 0.684, 0.7, 0.144], [0.4, 0.4, 0.4]),
        ...blueprint_car2(game),
    ]);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
        transform([-6.258, 0.774, 0.343], from_euler([0, 0, 0, 1], -30, 0, 0)),
    ]);
}
