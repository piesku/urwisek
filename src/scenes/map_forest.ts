import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {Game} from "../game.js";
import {transform} from "../components/com_transform.js";
import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";
import {render_colored_shadows} from "../components/com_render.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {blueprint_obstacle_branch} from "../blueprints/blu_obstacle_branch.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_pushable_branch} from "../blueprints/blu_pushable_branch.js";
import {blueprint_end} from "../blueprints/blu_end.js";
import {blueprint_launchpad} from "../blueprints/blu_launchpad.js";
import {float, element} from "../../common/random.js";

export function map_forest(game: Game) {
    instantiate(game, [
        transform([3.698, -4.7, 1.395], [0, 0.707, 0, 0.707], [4, 2.003, 20]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([33.685, -2.25, 1.395], [0, 0.707, 0, 0.707], [4, 5, 40]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([46.763, -1.75, -5.605], [0, 0.707, 0, 0.707], [10, 4, 105]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([-3.752, -1.042, -0.369], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([10.405, 0.547, -1.964], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-3.889, -3.873, 2.375], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([10.51, -3.953, -1.485], undefined, [10, 8, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([37.639, 0.191, -1.219], undefined, [7.5, 3, 7.5]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([41.669, -0.324, -1.576], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([46.723, -0.09, -1.525], undefined, [10, 8, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([-3.794, -1.961, 0], [0, 0.707, 0, 0.707], [1.5, 6.144, 2]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([-0.541, -0.873, -2.022], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([12.267, -0.436, -2.099], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([10.124, -1.192, -0.696], [0.704, -0.07, 0.07, 0.704], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([12.816, -2.88, 0.162], undefined, [1.3, 1.3, 1.3]),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([11.491, -0.094, -0.654], [0.705, 0.056, -0.056, 0.705], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([19.142, -0.333, 2.004], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([44.068, 1.007, 0], undefined, [1.3, 1.3, 1.3]),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([34.713, -0.331, -1.754], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([34.042, 2.193, 0.619], [0.706, -0.045, 0.045, 0.706], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([35.14, 2.918, 0.012], [0.707, 0.006, -0.006, 0.707], [0.5, 2, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([37.71, 4.1, 0.044], [0.5, 0.5, -0.5, 0.5], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([41.553, 5.419, -0.251], [0.5, 0.5, -0.5, 0.5], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([38.853, 0.582, 0.005], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([49.571, 0.582, 2.404], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([61.489, 0.582, -1.736], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([46.815, 6.495, 0], [0.5, 0.5, -0.5, 0.5], [0.5, 6, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([92.214, -2.25, 1.395], [0, 0.707, 0, 0.707], [4, 5, 57]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([48.271, 7.051, 0], undefined, undefined),
        ...blueprint_pushable_branch(game),
    ]);

    instantiate(game, [
        transform([58.571, -3.256, 1.395], [0, 0.707, 0, 0.707], [4, 2, 10]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([55.291, -1.158, -1.698], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([58.346, -1.41, -1.985], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([59.944, 0.696, 1.773], [0, 0.66, 0, 0.751], undefined),
        ...blueprint_pushable_branch(game),
    ]);

    instantiate(game, [
        transform([62.768, 0.65, 1.652], [0, 0.674, 0, 0.739], undefined),
        ...blueprint_pushable_branch(game),
    ]);

    instantiate(game, [
        transform([58.433, 0.696, 1.773], [0, 0.708, 0, 0.706], undefined),
        ...blueprint_pushable_branch(game),
    ]);

    instantiate(game, [
        transform([61.141, 0.682, 1.682], [0, 0.724, 0, 0.69], undefined),
        ...blueprint_pushable_branch(game),
    ]);

    instantiate(game, [
        transform([54.119, -1.488, 0], [0.707, 0.006, -0.006, 0.707], [0.5, 2, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([55.644, -0.759, 0.49], [0.703, 0.075, -0.075, 0.703], [0.5, 2, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [transform([120.2, 3, 0]), ...blueprint_end(game)]);

    instantiate(game, [
        transform([122.6, 0.2, 0], [0, 0.707, 0, -0.707], undefined),
        ...blueprint_launchpad(game),
    ]);

    {
        let width = 105;
        let depth = 9;
        let centerX = 48.0;
        let centerZ = -6.0;

        let Xmin = centerX - ~~(width / 2);
        let Xmax = centerX + ~~(width / 2);
        let Zmin = centerZ - ~~(depth / 2);
        let Zmax = centerZ + ~~(depth / 2);

        let number_of_trees = ~~(width * 0.6);
        for (let i = 0; i < number_of_trees; i++) {
            instantiate(game, [
                transform([float(Xmin, Xmax), 0, float(Zmin, Zmax)], undefined, [8, 4, 8]),
                ...blueprint_tree(game),
            ]);
        }
    }

    instantiate(game, [...blueprint_sun_light(game), transform()]);

    instantiate(game, [...blueprint_sun_shadow(game), transform()]);
}
