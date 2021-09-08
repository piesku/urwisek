import {instantiate} from "../../common/game.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_branch} from "../blueprints/blu_branch.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {blueprint_end} from "../blueprints/blu_end.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_launchpad} from "../blueprints/blu_launchpad.js";
import {blueprint_monster} from "../blueprints/blu_monster.js";
import {blueprint_obstacle_branch} from "../blueprints/blu_obstacle_branch.js";
import {blueprint_pushable_branch} from "../blueprints/blu_pushable_branch.js";
import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

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
            [46.76, -1.75, -5.6],
            [0, 0.71, 0, 0.71],
            [10, 4, 105],
        ],
        [
            [-3.79, -1.96, 0],
            [0, 0.71, 0, 0.71],
            [1.5, 6.14, 2],
        ],
        [
            [92.21, -2.25, 1.4],
            [0, 0.71, 0, 0.71],
            [4, 5, 57],
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
    end: [[[120.2, 3, 0], undefined, [1, 10, 1]]],
    launchpad: [
        [
            [122.6, 0.2, 0],
            [0, 0.71, 0, -0.71],
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
    launchpad: blueprint_launchpad,
};

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
        transform([68.763, -1.75, -5.605], [0, 0.707, 0, 0.707], [10, 4, 150]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([11.077, 0.547, -6.398], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-3.752, -1.042, -0.369], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([20.014, 0.582, -6.565], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([7.742, 0.611, -5.393], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([17.472, 0.547, -8.601], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([20.536, 0.547, -1.319], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([10.405, 0.547, -1.964], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-1.606, 0.547, -2.287], undefined, undefined),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([27.699, 0.582, -2.777], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([29.875, 0.582, -9.011], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([15.796, 0.582, -4.064], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([23.4, 0.582, -0.949], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([-3.889, -3.873, 2.375], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([-1.288, 0.191, -1.989], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([10.51, -3.953, -1.485], undefined, [10, 8, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([6.327, 0.191, -1.725], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([9.531, 0.191, -6.075], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([9.298, 0.191, -2.361], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([12.562, 0.026, -1.458], undefined, [10, 8, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([13.787, 0.191, -3.901], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([16.759, 0.191, -9.066], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([16.063, 0.191, -3.029], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([24.792, 0.191, -2.704], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([19.979, 0.191, -3.293], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([30.828, 0.191, -1.452], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([33.475, 0.191, -8.416], undefined, [10, 4, 10]),
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
        transform([52.76, 0.191, -2.093], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([56.985, 0.191, -2.047], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([83.135, 0.191, -1.66], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([61.023, 0.191, -9.333], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([60.327, 0.191, -3.297], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([64.506, 0.191, -2.925], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([69.056, 0.191, -2.972], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([70.356, 0.191, -8.637], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([79.318, 0.191, -3.25], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([77.739, 0.191, -8.683], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([43.479, 0.191, -9.068], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([90.685, 0.191, -2.381], undefined, [10, 4, 10]),
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
        transform([2.748, -0.436, -2.215], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([5.921, -0.436, -2.176], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([9.133, -0.436, -2.137], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([12.267, -0.436, -2.099], undefined, [3, 3, 3]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([15.07, -1.114, 1.98], undefined, [3, 3, 3]),
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
        transform([-1.529, 2.558, -2.052], [0.344, 0.618, -0.344, 0.618], [0.5, 4, 0.5]),
        ...blueprint_branch(game),
    ]);

    instantiate(game, [
        transform([11.491, -0.094, -0.654], [0.705, 0.056, -0.056, 0.705], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([6.645, 3.532, -1.492], [0.54, 0.61, 0.192, 0.547], [0.5, 4, 0.5]),
        ...blueprint_branch(game),
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
        transform([68.295, -3.312, -3.498], undefined, undefined),
        ...blueprint_monster(game),
    ]);

    instantiate(game, [
        transform([34.944, 0.582, -4.29], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([45.044, 0.582, -5.722], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
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
        transform([58.548, 0.582, -9.282], undefined, [2.439, 1, 2.539]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [
        transform([71.898, 0.582, -1.62], undefined, [2.439, 1, 2.539]),
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
        transform([103.514, -2.25, 1.395], [0, 0.707, 0, 0.707], [4, 5, 80]),
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

    instantiate(game, [
        transform([80.256, 0.191, 2.869], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([82.065, 1.241, 2.496], undefined, [2, 2, 2]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [transform([120, 3, 0]), ...blueprint_end(game)]);

    instantiate(game, [
        transform([121.6, 0.2, 0.5], [0, 0.383, 0, -0.924], undefined),
        ...blueprint_crib(game),
    ]);

    instantiate(game, [...blueprint_sun_light(game), transform()]);

    instantiate(game, [...blueprint_sun_shadow(game), transform()]);
}
