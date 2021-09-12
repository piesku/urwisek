import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {Game} from "../game.js";
import {transform} from "../components/com_transform.js";
import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";
import {render_colored_shadows} from "../components/com_render.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {prop_slup} from "../props/prop_slup.js";
import {blueprint_obstacle_house} from "../blueprints/blu_obstacle_house.js";
import {blueprint_obstacle_car} from "../blueprints/blu_obstacle_car.js";
import {prop_car2} from "../props/prop_car2.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_pup} from "../blueprints/blu_pup.js";
import {blueprint_exit} from "../blueprints/blu_exit.js";
import {blueprint_bird} from "../blueprints/blu_bird.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {shake} from "../components/com_shake.js";
import {spawn} from "../components/com_spawn.js";
import {Has} from "../world.js";
import {blueprint_animal} from "../blueprints/blu_animal.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {float, element} from "../../common/random.js";
import {blueprint_fire} from "../blueprints/blu_fire.js";
import {blueprint_end} from "../blueprints/blu_end.js";
import {blueprint_launchpad} from "../blueprints/blu_launchpad.js";
import {blueprint_blok} from "../blueprints/blu_blok.js";

export function map_city(game: Game) {
    instantiate(game, [
        transform([87.04, 1.52, 0.45], [0, 0.71, 0, 0.71], [5, 2, 15]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([49.73, -1.5, -5.55], [0, 0.71, 0, 0.71], [20, 4, 120]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [transform([8.58, 0.72, 0.59]), ...blueprint_bush(game)]);

    instantiate(game, [transform([24.08, 0.38, -0.49]), ...blueprint_bush(game)]);

    instantiate(game, [transform([13.37, 2.13, -1.2]), ...blueprint_bush(game)]);

    instantiate(game, [
        transform([-1.27, 0.19, -3.2], undefined, [0.5, 0.5, 0.5]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [transform([-4.52, 0.69, 1.75]), ...blueprint_bush(game)]);

    instantiate(game, [transform([2.69, 0.33, -2.79]), ...prop_slup(game)]);

    instantiate(game, [
        transform([-0.62, 3.32, -8.26], undefined, [0.2, 0.2, 0.2]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-4.67, 2.78, -8.4], undefined, [0.15, 0.15, 0.15]),
        ...prop_slup(game),
    ]);

    instantiate(game, [transform([23.85, 0.11, -5.15]), ...prop_slup(game)]);

    instantiate(game, [transform([31.05, 0.74, -1.14]), ...blueprint_bush(game)]);

    instantiate(game, [transform([11.69, 0.5, -0.17]), ...blueprint_obstacle_house(game)]);

    instantiate(game, [transform([11.58, 0.68, 2.02]), ...blueprint_bush(game)]);

    instantiate(game, [transform([15.39, 0.11, -2.79]), ...prop_slup(game)]);

    instantiate(game, [
        transform([-3.95, 0.5, 1.41], [0, 0.62, 0, 0.78]),
        ...blueprint_obstacle_car(game),
    ]);

    instantiate(game, [
        transform([7.69, 1, -0.1], [-0.15, 0.68, 0.7, 0.14], [0.4, 0.4, 0.4]),
        ...blueprint_obstacle_car(game),
    ]);

    instantiate(game, [transform([14.31, 0.11, 3.18]), ...prop_slup(game)]);

    instantiate(game, [transform([22.34, 0.38, -0.91]), ...blueprint_bush(game)]);

    instantiate(game, [
        transform([21.96, 1, -2.35], [-0.44, 0.55, 0.56, 0.43], [0.4, 0.4, 0.4]),
        ...prop_car2(game),
    ]);

    instantiate(game, [transform([56.12, 0.24, 2.71]), ...prop_slup(game)]);

    instantiate(game, [transform([54.23, 4.09, 0]), ...blueprint_box(game)]);

    instantiate(game, [transform([28.61, 2.41, 0]), ...blueprint_box(game)]);

    instantiate(game, [transform([46, 0.11, -1.52], [0, -0.73, 0, 0.69]), ...prop_slup(game)]);

    instantiate(game, [
        transform([43.31, 1, -3.57], [-0.71, 0.06, 0.06, 0.7], [0.4, 0.4, 0.4]),
        ...prop_car2(game),
    ]);

    instantiate(game, [
        transform([60.15, 0.56, -3.88], [0, -0.73, 0, 0.69]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [transform([60.98, 0.21, 3.78]), ...blueprint_bush(game)]);

    instantiate(game, [transform([78.02, 0.24, -3.54]), ...prop_slup(game)]);

    instantiate(game, [transform([56.16, 0.61, 0.39], [0, -1, 0, -0.02]), ...blueprint_bush(game)]);

    instantiate(game, [
        transform([56.4, 1, 0.3], [0.7, 0.15, 0.16, -0.68]),
        ...blueprint_obstacle_car(game),
    ]);

    instantiate(game, [transform([87, 2.5, 0]), ...blueprint_exit(game)]);

    instantiate(game, [transform([87, 2.5, 0], [0, -0.71, 0, 0.71]), ...blueprint_pup(game)]);

    instantiate(game, [
        transform([-3, 2, -2], [0.01, 0.76, 0.12, 0.64]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [
        transform([14, 2, -2], [0.01, 0.76, 0.12, 0.64]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [
        transform([33, 2, -2], [0.01, 0.76, 0.12, 0.64]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [
        transform([53, 2, -2], [0.01, 0.76, 0.12, 0.64]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [
        transform([73, 3, -2], [0.01, 0.76, 0.12, 0.64]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [transform([-7, 0.5, -5], [0, 0.71, 0, 0.71]), spawn(blueprint_animal, 1)]);

    {
        let width = 28;
        let depth = 6;
        let centerX = 6.0;
        let centerZ = -5.0;

        let Xmin = centerX - ~~(width / 2);
        let Xmax = centerX + ~~(width / 2);
        let Zmin = centerZ - ~~(depth / 2);
        let Zmax = centerZ + ~~(depth / 2);

        let number_of_trees = ~~(((width * depth) / 1) * 0.8);
        for (let i = 0; i < number_of_trees; i++) {
            instantiate(game, [
                transform([float(Xmin, Xmax), 0, float(Zmin, Zmax)]),
                ...element([blueprint_tree(game), blueprint_bush(game)]),
            ]);
        }
    }

    {
        let width = 12;
        let depth = 5;
        let centerX = 71.0;
        let centerZ = -4.0;

        let Xmin = centerX - ~~(width / 2);
        let Xmax = centerX + ~~(width / 2);
        let Zmin = centerZ - ~~(depth / 2);
        let Zmax = centerZ + ~~(depth / 2);

        let number_of_trees = ~~(((width * depth) / 1) * 0.8);
        for (let i = 0; i < number_of_trees; i++) {
            instantiate(game, [
                transform([float(Xmin, Xmax), 0, float(Zmin, Zmax)]),
                ...element([blueprint_tree(game), blueprint_bush(game)]),
            ]);
        }
    }

    instantiate(game, [transform([-2.6, 0.9, 0.6]), ...blueprint_fire(game)]);

    instantiate(game, [
        transform([53.69, 0.5, 0.83], [0, 0.34, 0, 0.94]),
        ...blueprint_obstacle_house(game),
    ]);

    {
        let width = 28;
        let depth = 6;
        let centerX = 41.0;
        let centerZ = -7.0;

        let Xmin = centerX - ~~(width / 2);
        let Xmax = centerX + ~~(width / 2);
        let Zmin = centerZ - ~~(depth / 2);
        let Zmax = centerZ + ~~(depth / 2);

        let number_of_trees = ~~(((width * depth) / 1) * 0.8);
        for (let i = 0; i < number_of_trees; i++) {
            instantiate(game, [
                transform([float(Xmin, Xmax), 0, float(Zmin, Zmax)]),
                ...element([blueprint_tree(game), blueprint_bush(game)]),
            ]);
        }
    }

    instantiate(game, [transform([93, 2.5, 0]), ...blueprint_end(game)]);

    instantiate(game, [transform([95.97, 1.5, 0.44]), ...blueprint_launchpad(game)]);

    instantiate(game, [transform([9.24, 0.5, -9.03], [0, 0.17, 0, 0.98]), ...blueprint_blok(game)]);

    instantiate(game, [transform([4.54, 0.5, -7.32], [0, 0.17, 0, 0.98]), ...blueprint_blok(game)]);

    instantiate(game, [
        transform([-0.16, 0.5, -5.61], [0, 0.17, 0, 0.98]),
        ...blueprint_blok(game),
    ]);

    instantiate(game, [
        transform([7.53, 0.5, -13.73], [0, 0.17, 0, 0.98]),
        ...blueprint_blok(game),
    ]);

    instantiate(game, [
        transform([2.83, 0.5, -12.02], [0, 0.17, 0, 0.98]),
        ...blueprint_blok(game),
    ]);

    instantiate(game, [
        transform([-1.87, 0.5, -10.31], [0, 0.17, 0, 0.98]),
        ...blueprint_blok(game),
    ]);

    instantiate(game, [transform([49.93, 0.5, -6.96], [0, -0.09, 0, 1]), ...blueprint_blok(game)]);

    instantiate(game, [transform([45.01, 0.5, -7.83], [0, -0.09, 0, 1]), ...blueprint_blok(game)]);

    instantiate(game, [transform([40.08, 0.5, -8.7], [0, -0.09, 0, 1]), ...blueprint_blok(game)]);

    instantiate(game, [transform([82.26, -0.31, -6.49]), ...blueprint_blok(game)]);

    instantiate(game, [transform([77.26, -0.31, -6.49]), ...blueprint_blok(game)]);

    instantiate(game, [transform([35.16, 0.5, -9.57], [0, -0.09, 0, 1]), ...blueprint_blok(game)]);

    instantiate(game, [transform([30.24, 0.5, -10.44], [0, -0.09, 0, 1]), ...blueprint_blok(game)]);

    instantiate(game, [transform([25.31, 0.5, -11.31], [0, -0.09, 0, 1]), ...blueprint_blok(game)]);

    instantiate(game, [...blueprint_sun_light(game), transform()]);

    instantiate(game, [...blueprint_sun_shadow(game), transform()]);
}
