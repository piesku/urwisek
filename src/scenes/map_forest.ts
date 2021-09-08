import {Blueprint, instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {Game} from "../game.js";
import {transform} from "../components/com_transform.js";
import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";
import {render_colored_shadows} from "../components/com_render.js";
import {Quat, Vec3} from "../../common/math.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {blueprint_obstacle_branch} from "../blueprints/blu_obstacle_branch.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_branch} from "../blueprints/blu_branch.js";
import {blueprint_monster} from "../blueprints/blu_monster.js";
import {blueprint_pushable_branch} from "../blueprints/blu_pushable_branch.js";
import {blueprint_end} from "../blueprints/blu_end.js";
import {blueprint_crib} from "../blueprints/blu_crib.js";

let transforms: Record<string, Array<[Vec3, Quat?, Vec3?]>> = {
    ground: [
        [
            [3.7, -4.7, 1.4],
            [0, 0.71, 0, 0.71],
            [4, 2, 20],
        ],
        [
            [33.68, -2.25, 1.4],
            [0, 0.71, 0, 0.71],
            [4, 5, 40],
        ],
        [
            [68.76, -1.75, -5.6],
            [0, 0.71, 0, 0.71],
            [10, 4, 150],
        ],
        [
            [-3.79, -1.96, 0],
            [0, 0.71, 0, 0.71],
            [1.5, 6.14, 2],
        ],
        [
            [103.51, -2.25, 1.4],
            [0, 0.71, 0, 0.71],
            [4, 5, 80],
        ],
        [
            [58.57, -3.26, 1.4],
            [0, 0.71, 0, 0.71],
            [4, 2, 10],
        ],
    ],
    bush: [
        [[11.08, 0.55, -6.4]],
        [[-3.75, -1.04, -0.37], undefined, [3, 3, 3]],
        [[20.01, 0.58, -6.57], undefined, [2.44, 1, 2.54]],
        [[7.74, 0.61, -5.39]],
        [[17.47, 0.55, -8.6]],
        [[20.54, 0.55, -1.32]],
        [[10.41, 0.55, -1.96]],
        [[-1.61, 0.55, -2.29]],
        [[27.7, 0.58, -2.78], undefined, [2.44, 1, 2.54]],
        [[29.88, 0.58, -9.01], undefined, [2.44, 1, 2.54]],
        [[15.8, 0.58, -4.06], undefined, [2.44, 1, 2.54]],
        [[23.4, 0.58, -0.95], undefined, [2.44, 1, 2.54]],
        [[-0.54, -0.87, -2.02], undefined, [3, 3, 3]],
        [[2.75, -0.44, -2.21], undefined, [3, 3, 3]],
        [[5.92, -0.44, -2.18], undefined, [3, 3, 3]],
        [[9.13, -0.44, -2.14], undefined, [3, 3, 3]],
        [[12.27, -0.44, -2.1], undefined, [3, 3, 3]],
        [[15.07, -1.11, 1.98], undefined, [3, 3, 3]],
        [[34.94, 0.58, -4.29], undefined, [2.44, 1, 2.54]],
        [[45.04, 0.58, -5.72], undefined, [2.44, 1, 2.54]],
        [[38.85, 0.58, 0.01], undefined, [2.44, 1, 2.54]],
        [[49.57, 0.58, 2.4], undefined, [2.44, 1, 2.54]],
        [[58.55, 0.58, -9.28], undefined, [2.44, 1, 2.54]],
        [[71.9, 0.58, -1.62], undefined, [2.44, 1, 2.54]],
        [[61.49, 0.58, -1.74], undefined, [2.44, 1, 2.54]],
        [[55.29, -1.16, -1.7], undefined, [3, 3, 3]],
        [[58.35, -1.41, -1.99], undefined, [3, 3, 3]],
        [[82.06, 1.24, 2.5], undefined, [2, 2, 2]],
    ],
    tree: [
        [[-3.89, -3.87, 2.38], undefined, [20, 4, 20]],
        [[-1.29, 0.19, -1.99], undefined, [10, 4, 10]],
        [[10.51, -3.95, -1.49], undefined, [10, 8, 10]],
        [[6.33, 0.19, -1.73], undefined, [10, 4, 10]],
        [[9.53, 0.19, -6.08], undefined, [10, 4, 10]],
        [[9.3, 0.19, -2.36], undefined, [10, 4, 10]],
        [[12.56, 0.03, -1.46], undefined, [10, 8, 10]],
        [[13.79, 0.19, -3.9], undefined, [10, 4, 10]],
        [[16.76, 0.19, -9.07], undefined, [10, 4, 10]],
        [[16.06, 0.19, -3.03], undefined, [10, 4, 10]],
        [[24.79, 0.19, -2.7], undefined, [10, 4, 10]],
        [[19.98, 0.19, -3.29], undefined, [10, 4, 10]],
        [[30.83, 0.19, -1.45], undefined, [10, 4, 10]],
        [[33.48, 0.19, -8.42], undefined, [10, 4, 10]],
        [[37.64, 0.19, -1.22], undefined, [7.5, 3, 7.5]],
        [[41.67, -0.32, -1.58], undefined, [10, 4, 10]],
        [[46.72, -0.09, -1.53], undefined, [10, 8, 10]],
        [[52.76, 0.19, -2.09], undefined, [10, 4, 10]],
        [[56.99, 0.19, -2.05], undefined, [10, 4, 10]],
        [[83.13, 0.19, -1.66], undefined, [10, 4, 10]],
        [[61.02, 0.19, -9.33], undefined, [10, 4, 10]],
        [[60.33, 0.19, -3.3], undefined, [10, 4, 10]],
        [[64.51, 0.19, -2.93], undefined, [10, 4, 10]],
        [[69.06, 0.19, -2.97], undefined, [10, 4, 10]],
        [[70.36, 0.19, -8.64], undefined, [10, 4, 10]],
        [[79.32, 0.19, -3.25], undefined, [10, 4, 10]],
        [[77.74, 0.19, -8.68], undefined, [10, 4, 10]],
        [[43.48, 0.19, -9.07], undefined, [10, 4, 10]],
        [[90.68, 0.19, -2.38], undefined, [10, 4, 10]],
        [[19.14, -0.33, 2], undefined, [20, 4, 20]],
        [[34.71, -0.33, -1.75], undefined, [10, 4, 10]],
        [[80.26, 0.19, 2.87], undefined, [10, 4, 10]],
    ],
    obstacle_branch: [
        [
            [10.12, -1.19, -0.7],
            [0.7, -0.07, 0.07, 0.7],
            [0.5, 4, 0.5],
        ],
        [
            [11.49, -0.09, -0.65],
            [0.7, 0.06, -0.06, 0.7],
            [0.5, 4, 0.5],
        ],
        [
            [34.04, 2.19, 0.62],
            [0.71, -0.05, 0.05, 0.71],
            [0.5, 4, 0.5],
        ],
        [
            [35.14, 2.92, 0.01],
            [0.71, 0.01, -0.01, 0.71],
            [0.5, 2, 0.5],
        ],
        [
            [37.71, 4.1, 0.04],
            [0.5, 0.5, -0.5, 0.5],
            [0.5, 4, 0.5],
        ],
        [
            [41.55, 5.42, -0.25],
            [0.5, 0.5, -0.5, 0.5],
            [0.5, 4, 0.5],
        ],
        [
            [46.82, 6.49, 0],
            [0.5, 0.5, -0.5, 0.5],
            [0.5, 6, 0.5],
        ],
        [
            [54.12, -1.49, 0],
            [0.71, 0.01, -0.01, 0.71],
            [0.5, 2, 0.5],
        ],
        [
            [55.64, -0.76, 0.49],
            [0.7, 0.07, -0.07, 0.7],
            [0.5, 2, 0.5],
        ],
    ],
    box: [
        [[12.82, -2.88, 0.16], undefined, [1.3, 1.3, 1.3]],
        [[44.07, 1.01, 0], undefined, [1.3, 1.3, 1.3]],
    ],
    branch: [
        [
            [-1.53, 2.56, -2.05],
            [0.34, 0.62, -0.34, 0.62],
            [0.5, 4, 0.5],
        ],
        [
            [6.65, 3.53, -1.49],
            [0.54, 0.61, 0.19, 0.55],
            [0.5, 4, 0.5],
        ],
    ],
    monster: [[[68.3, -3.31, -3.5]]],
    pushable_branch: [
        [[48.27, 7.05, 0]],
        [
            [59.94, 0.7, 1.77],
            [0, 0.66, 0, 0.75],
        ],
        [
            [62.77, 0.65, 1.65],
            [0, 0.67, 0, 0.74],
        ],
        [
            [58.43, 0.7, 1.77],
            [0, 0.71, 0, 0.71],
        ],
        [
            [61.14, 0.68, 1.68],
            [0, 0.72, 0, 0.69],
        ],
    ],
    end: [[[120, 3, 0], undefined, [1, 10, 1]]],
    crib: [
        [
            [121.6, 0.2, 0.5],
            [0, 0.38, 0, -0.92],
        ],
    ],
};

let blueprints: Record<string, (game: Game) => Blueprint<Game>> = {
    ground: blueprint_ground,
    bush: blueprint_bush,
    tree: blueprint_tree,
    obstacle_branch: blueprint_obstacle_branch,
    box: blueprint_box,
    branch: blueprint_branch,
    monster: blueprint_monster,
    pushable_branch: blueprint_pushable_branch,
    end: blueprint_end,
    crib: blueprint_crib,
};

export function map_forest(game: Game) {
    instantiate(game, [...blueprint_sun_light(game), transform()]);

    instantiate(game, [...blueprint_sun_shadow(game), transform()]);

    for (let key of Object.keys(transforms)) {
        let blueprint = blueprints[key];
        for (let i = 0; i < transforms[key].length; i++) {
            instantiate(game, [
                transform(transforms[key][i][0], transforms[key][i][1], transforms[key][i][2]),
                ...blueprint(game),
            ]);
        }
    }
}
