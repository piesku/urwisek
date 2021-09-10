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
        transform([3.7, -4.7, 1.4], [0, 0.71, 0, 0.71], [4, 2, 20]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([33.68, -2.25, 1.4], [0, 0.71, 0, 0.71], [4, 5, 40]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([46.76, -1.75, -5.6], [0, 0.71, 0, 0.71], [10, 4, 105]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([-3.75, -1.04, -0.37], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [transform([10.41, 0.55, -1.96]), ...blueprint_bush(game)]);

    instantiate(game, [
        transform([-3.89, -3.87, 2.38], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([10.51, -3.95, -1.49], undefined, [10, 8, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([37.64, 0.19, -1.22], undefined, [7.5, 3, 7.5]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([41.67, -0.32, -1.58], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([46.72, -0.09, -1.53], undefined, [10, 8, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([-3.79, -1.96, 0], [0, 0.71, 0, 0.71], [1.5, 6.14, 2]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([-0.54, -0.87, -2.02], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([12.27, -0.44, -2.1], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([10.12, -1.19, -0.7], [0.7, -0.07, 0.07, 0.7], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([12.82, -2.88, 0.16], undefined, [1.3, 1.3, 1.3]),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([11.49, -0.09, -0.65], [0.7, 0.06, -0.06, 0.7], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([19.14, -0.33, 2], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([44.07, 1.01, 0], undefined, [1.3, 1.3, 1.3]),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([34.71, -0.33, -1.75], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([34.04, 2.19, 0.62], [0.71, -0.05, 0.05, 0.71], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([35.14, 2.92, 0.01], [0.71, 0.01, -0.01, 0.71], [0.5, 2, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([37.71, 4.1, 0.04], [0.5, 0.5, -0.5, 0.5], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([41.55, 5.42, -0.25], [0.5, 0.5, -0.5, 0.5], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([38.85, 0.58, 0.01], undefined, [2.44, 1, 2.54]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([49.57, 0.58, 2.4], undefined, [2.44, 1, 2.54]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([61.49, 0.58, -1.74], undefined, [2.44, 1, 2.54]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([46.82, 6.49, 0], [0.5, 0.5, -0.5, 0.5], [0.5, 6, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([92.21, -2.25, 1.4], [0, 0.71, 0, 0.71], [4, 5, 57]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [transform([48.27, 7.05, 0]), ...blueprint_pushable_branch(game)]);

    instantiate(game, [
        transform([58.57, -3.26, 1.4], [0, 0.71, 0, 0.71], [4, 2, 10]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([55.29, -1.16, -1.7], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([58.35, -1.41, -1.99], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([59.94, 0.7, 1.77], [0, 0.66, 0, 0.75]),
        ...blueprint_pushable_branch(game),
    ]);

    instantiate(game, [
        transform([62.77, 0.65, 1.65], [0, 0.67, 0, 0.74]),
        ...blueprint_pushable_branch(game),
    ]);

    instantiate(game, [
        transform([58.43, 0.7, 1.77], [0, 0.71, 0, 0.71]),
        ...blueprint_pushable_branch(game),
    ]);

    instantiate(game, [
        transform([61.14, 0.68, 1.68], [0, 0.72, 0, 0.69]),
        ...blueprint_pushable_branch(game),
    ]);

    instantiate(game, [
        transform([54.12, -1.49, 0], [0.71, 0.01, -0.01, 0.71], [0.5, 2, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([55.64, -0.76, 0.49], [0.7, 0.07, -0.07, 0.7], [0.5, 2, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [transform([120.2, 3, 0]), ...blueprint_end(game)]);

    instantiate(game, [
        transform([122.6, 0.2, 0], [0, 0.71, 0, -0.71]),
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
