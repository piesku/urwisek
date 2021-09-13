import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {Game} from "../game.js";
import {transform} from "../components/com_transform.js";
import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";
import {render_colored_shadows} from "../components/com_render.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {Vec4} from "../../common/math.js";
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

export function map_city(game: Game, ground_color: Vec4 = [82 / 255, 39 / 255, 5 / 255, 1]) {
    instantiate(game, [
        transform([87.04, 1.52, 0.45], [0, 0.71, 0, 0.71], [5, 2, 15]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [
        transform([49.73, -1.5, -5.55], [0, 0.71, 0, 0.71], [20, 4, 120]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [transform([8.58, 0.72, 0.59]), ...blueprint_bush(game)]);

    instantiate(game, [
        transform([-1.27, 0.19, -3.2], undefined, [0.5, 0.5, 0.5]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [transform([27, 0.11, -5]), ...prop_slup(game)]);

    instantiate(game, [transform([11, 0.5, 0]), ...blueprint_obstacle_house(game)]);

    instantiate(game, [transform([15, 0, -3]), ...prop_slup(game)]);

    instantiate(game, [
        transform([-3.95, 0.5, 1.41], [0, 0.62, 0, 0.78]),
        ...blueprint_obstacle_car(game),
    ]);

    instantiate(game, [
        transform([7.69, 1, -0.1], [-0.15, 0.68, 0.7, 0.14], [0.4, 0.4, 0.4]),
        ...blueprint_obstacle_car(game),
    ]);

    instantiate(game, [transform([15, 0, 3]), ...prop_slup(game)]);

    instantiate(game, [
        transform([21.96, 1, -2.35], [-0.44, 0.55, 0.56, 0.43], [0.4, 0.4, 0.4]),
        ...prop_car2(game),
    ]);

    instantiate(game, [transform([76.12, 0.24, 3.71]), ...prop_slup(game)]);

    instantiate(game, [transform([28, 2, 0.5]), ...blueprint_box(game)]);

    instantiate(game, [transform([44, 0, -0.2]), ...prop_slup(game)]);

    instantiate(game, [
        transform([43.31, 1, -3.57], [-0.71, 0.06, 0.06, 0.7], [0.4, 0.4, 0.4]),
        ...prop_car2(game),
    ]);

    instantiate(game, [
        transform([60.15, 0.56, -3.88], [0, -0.73, 0, 0.69]),
        ...blueprint_bush(game),
    ]);

    instantiate(game, [transform([87, 2.5, 0]), ...blueprint_exit(game)]);

    instantiate(game, [transform([87, 2.5, 0], [0, -0.71, 0, 0.71]), ...blueprint_pup(game)]);

    instantiate(game, [
        transform([39, 7, -2], [0.01, 0.76, 0.12, 0.64]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [transform([-7, 0.5, -5], [0, 0.71, 0, 0.71]), spawn(blueprint_animal, 1)]);

    {
        let width = 120;
        let depth = 6;
        let centerX = 50.0;
        let centerZ = -5.0;

        let Xmin = centerX - ~~(width / 2);
        let Xmax = centerX + ~~(width / 2);
        let Zmin = centerZ - ~~(depth / 2);
        let Zmax = centerZ + ~~(depth / 2);

        let number_of_trees = ~~(((width * depth) / 1) * 0.3);
        for (let i = 0; i < number_of_trees; i++) {
            instantiate(game, [
                transform([float(Xmin, Xmax), 0, float(Zmin, Zmax)]),
                ...element([blueprint_tree(game), blueprint_bush(game)]),
            ]);
        }
    }

    instantiate(game, [transform([-2.6, 0.9, 0.6]), ...blueprint_fire(game)]);

    instantiate(game, [transform([93, 2.5, 0]), ...blueprint_end(game)]);

    instantiate(game, [transform([95.97, 1.5, 0.44]), ...blueprint_launchpad(game)]);

    instantiate(game, [transform([9, 0.5, -9], [0, 0.17, 0, 0.98]), ...blueprint_blok(game)]);

    instantiate(game, [transform([4, 0.5, -7], [0, 0.17, 0, 0.98]), ...blueprint_blok(game)]);

    instantiate(game, [transform([53.2, 0.5, -2.6]), ...blueprint_blok(game)]);

    instantiate(game, [transform([82.26, -0.31, -6.49]), ...blueprint_blok(game)]);

    instantiate(game, [transform([77.26, -0.31, -6.49]), ...blueprint_blok(game)]);

    instantiate(game, [transform([57.6, 0.5, 0.7]), ...blueprint_obstacle_house(game)]);

    instantiate(game, [transform([48.2, 0.5, -2.6]), ...blueprint_blok(game)]);

    instantiate(game, [transform([38.2, 0.5, -2.6]), ...blueprint_blok(game)]);

    instantiate(game, [transform([33.2, 0.5, -2.6]), ...blueprint_blok(game)]);

    instantiate(game, [transform([41.2, 0.5, 3], undefined, [1, 1, 0.8]), ...blueprint_blok(game)]);

    instantiate(game, [transform([23, 0.5, -9]), ...blueprint_blok(game)]);

    instantiate(game, [
        transform([48.2, 2.7, 0], undefined, [4, 0.2, 1.2]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [
        transform([42.2, 2.9, 0], undefined, [5, 0.2, 0.2]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [
        transform([33.2, 5.1, 0], undefined, [4, 0.2, 1.2]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [
        transform([38.2, 2.7, 0], undefined, [4, 0.2, 1.2]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [
        transform([36.3, 3.4, 0], undefined, [0.2, 1.2, 1.2]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [
        transform([31.3, 5.5, 0.05], undefined, [0.2, 1, 1.2]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [
        transform([38.2, 7, 0], undefined, [4, 0.2, 1.2]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [
        transform([43.2, 6.9, 0], undefined, [5, 0.2, 0.2]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [
        transform([48.2, 7, 0], undefined, [4, 0.2, 1.2]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [
        transform([54.2, 7, 0], undefined, [6, 0.2, 1.2]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [transform([32.61, 6.41, 0]), ...blueprint_box(game)]);

    instantiate(game, [transform([57.6, 6.9, 0.7], [0, 0.71, 0, 0.71]), ...blueprint_blok(game)]);

    instantiate(game, [transform([40.4, 0.9, 3.6]), ...blueprint_fire(game)]);

    instantiate(game, [transform([66, 2, 0.5]), ...blueprint_box(game)]);

    instantiate(game, [
        transform([57.6, 4.8, 0.7], undefined, [4, 4.2, 4]),
        ...blueprint_ground(game, ground_color),
    ]);

    instantiate(game, [transform([52.4, 6.9, -2.4]), ...blueprint_fire(game)]);

    instantiate(game, [...blueprint_sun_light(game), transform()]);

    instantiate(game, [...blueprint_sun_shadow(game), transform()]);
}
