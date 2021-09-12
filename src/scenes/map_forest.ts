import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {Game} from "../game.js";
import {transform} from "../components/com_transform.js";
import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";
import {render_colored_shadows} from "../components/com_render.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_obstacle_branch} from "../blueprints/blu_obstacle_branch.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {float, element} from "../../common/random.js";
import {blueprint_pup} from "../blueprints/blu_pup.js";
import {blueprint_exit} from "../blueprints/blu_exit.js";
import {blueprint_animal} from "../blueprints/blu_animal.js";
import {spawn} from "../components/com_spawn.js";
import {Has} from "../world.js";
import {blueprint_bird} from "../blueprints/blu_bird.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {shake} from "../components/com_shake.js";
import {blueprint_fire} from "../blueprints/blu_fire.js";

export function map_forest(game: Game) {
    instantiate(game, [
        transform([46, -1.75, -5.6], [0, 0.71, 0, 0.71], [20, 4, 105]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([73.64, 0.19, -1.22], undefined, [7.5, 3, 7.5]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([77.67, -0.32, -1.58], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([82.72, -0.09, -1.53], undefined, [10, 8, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([-3.86, -0.33, 2], undefined, [20, 4, 20]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [transform([48.2, 1, 0]), ...blueprint_box(game)]);

    instantiate(game, [
        transform([70.71, -0.33, -1.75], undefined, [10, 4, 10]),
        ...blueprint_tree(game),
    ]);

    instantiate(game, [
        transform([70.04, 2.19, 0.62], [0.71, -0.05, 0.05, 0.71], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([71.14, 2.92, 0.01], [0.71, 0.01, -0.01, 0.71], [0.5, 2, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([73.71, 4.1, 0.04], [0.5, 0.5, -0.5, 0.5], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([77.55, 5.42, -0.25], [0.5, 0.5, -0.5, 0.5], [0.5, 4, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([82.82, 6.49, 0], [0.5, 0.5, -0.5, 0.5], [0.5, 6, 0.5]),
        ...blueprint_obstacle_branch(game),
    ]);

    {
        let width = 105;
        let depth = 8;
        let centerX = 47.0;
        let centerZ = -6.0;

        let Xmin = centerX - ~~(width / 2);
        let Xmax = centerX + ~~(width / 2);
        let Zmin = centerZ - ~~(depth / 2);
        let Zmax = centerZ + ~~(depth / 2);

        let number_of_trees = ~~(((width * depth) / 10) * 0.8);
        for (let i = 0; i < number_of_trees; i++) {
            instantiate(game, [
                transform([float(Xmin, Xmax), -3, float(Zmin, Zmax)], undefined, [10, 5, 10]),
                ...element([blueprint_tree(game), blueprint_bush(game)]),
            ]);
        }
    }

    instantiate(game, [
        transform([25, 0.5, 0], [0.71, 0, 0, 0.71], [1, 4, 1]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([26, 0.5, 0], [0.71, 0, 0, 0.71], [1, 4, 1]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([27, 0.5, 0], [0.71, 0, 0, 0.71], [1, 4, 1]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [
        transform([26.5, 1.2, 0], [0.71, 0, 0, 0.71], [1, 4, 1]),
        ...blueprint_obstacle_branch(game),
    ]);

    instantiate(game, [transform([95, 4, 0]), ...blueprint_exit(game)]);

    instantiate(game, [transform([95, 4, 0], [0, -0.71, 0, 0.71]), ...blueprint_pup(game)]);

    instantiate(game, [transform([-4, 0.5, -6], [0, 0.71, 0, 0.71]), spawn(blueprint_animal, 1)]);

    instantiate(game, [
        transform([29, 3.5, -2], [0.01, 0.76, 0.12, 0.64]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [transform([-1.5, 0, 0], undefined, [2, 2, 2]), ...blueprint_fire(game)]);

    instantiate(game, [transform([50, 1, -1]), ...blueprint_box(game)]);

    instantiate(game, [transform([45, 1, 3]), ...blueprint_box(game)]);

    instantiate(game, [transform([51, 1, 3]), ...blueprint_box(game)]);

    instantiate(game, [transform([47, 1, 2]), ...blueprint_box(game)]);

    instantiate(game, [transform([48, 2, -0.1]), ...blueprint_box(game)]);

    instantiate(game, [transform([48.2, 3, 0]), ...blueprint_box(game)]);

    instantiate(game, [
        transform([91, 2, 0.6], undefined, [14, 4, 7.5]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([-4, 3.5, -2], [0.01, 0.76, 0.12, 0.64]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [
        transform([76, 3.5, -2], [0.01, 0.76, 0.12, 0.64]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [transform([45, 0.5, -9], [0, 0.71, 0, 0.71]), spawn(blueprint_animal, 1)]);

    instantiate(game, [transform([74, 1, 0]), ...blueprint_box(game)]);

    instantiate(game, [...blueprint_sun_light(game), transform()]);

    instantiate(game, [...blueprint_sun_shadow(game), transform()]);
}
