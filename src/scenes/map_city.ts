import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {element, float} from "../../common/random.js";
import {blueprint_animal} from "../blueprints/blu_animal.js";
import {blueprint_bird} from "../blueprints/blu_bird.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {blueprint_exit} from "../blueprints/blu_exit.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_obstacle_car} from "../blueprints/blu_obstacle_car.js";
import {blueprint_obstacle_house} from "../blueprints/blu_obstacle_house.js";
import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {render_colored_shadows} from "../components/com_render.js";
import {shake} from "../components/com_shake.js";
import {spawn} from "../components/com_spawn.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {prop_car2} from "../props/prop_car2.js";
import {prop_house} from "../props/prop_house.js";
import {prop_slup} from "../props/prop_slup.js";
import {Has} from "../world.js";

export function map_city(game: Game) {
    instantiate(game, [
        transform([7.532, -0.5, 1.453], [0, 0.707, 0, 0.707], [4, 2.003, 30]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([30.675, -1.198, 1.453], [0, 0.707, 0, 0.707], [4, 2.003, 17.76]),
        ...blueprint_ground(game),
    ]);

    instantiate(game, [
        transform([71.785, -1.477, 1.453], [0, 0.707, 0, 0.707], [4, 2.003, 6.11]),
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

    instantiate(game, [
        transform([17.043, -4.406, -9.364], from_euler([0, 0, 0, 1], 0, 90, 0), [5, 10, 10]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([29.067, -2.849, -9.198], from_euler([0, 0, 0, 1], 0, 90, 0), [5, 10, 10]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([40.236, -9.323, -9.025], from_euler([0, 0, 0, 1], 0, 90, 0), [12, 22, 8]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([11.667, 0.5, -2.491], undefined, undefined),
        ...prop_house(game),
    ]);

    instantiate(game, [
        transform([-2.899, 0.435, -5.704], [0, 0.906, 0, 0.423], [0.5, 0.5, 0.5]),
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
        transform([-0.619, 3.323, -8.257], undefined, [0.2, 0.2, 0.2]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([-4.671, 2.776, -8.403], undefined, [0.15, 0.15, 0.15]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([23.85, 0.109, -5.148], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([21.289, 5.84, -7.257], undefined, [0.2, 0.2, 0.2]),
        ...prop_slup(game),
    ]);

    instantiate(game, [
        transform([31.045, 0.743, -1.14], undefined, undefined),
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
        transform([54.036, 0.5, 0.827], undefined, undefined),
        ...blueprint_obstacle_house(game),
    ]);

    instantiate(game, [
        transform([28.606, 0.975, 0], undefined, undefined),
        ...blueprint_box(game),
    ]);

    instantiate(game, [
        transform([21.958, 1, -2.347], [-0.442, 0.55, 0.563, 0.431], [0.4, 0.4, 0.4]),
        ...prop_car2(game),
    ]);

    instantiate(game, [
        transform([56.116, 0.236, 2.713], undefined, undefined),
        ...prop_slup(game),
    ]);

    instantiate(game, [transform([54.23, 4.091, 0], undefined, undefined), ...blueprint_box(game)]);

    instantiate(game, [
        transform([28.606, 2.405, 0], undefined, undefined),
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
        transform([41.695, 2.405, 0], undefined, undefined),
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
        transform([85.091, -10.266, -9.025], from_euler([0, 0, 0, 1], 0, 90, 0), [12, 22, 8]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
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

    instantiate(game, [transform([77, 1.5, 0]), ...blueprint_exit(game)]);

    instantiate(game, [
        transform([-3, 2, -2], [0.011, 0.755, 0.122, 0.644]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [
        transform([14, 2, -2], [0.011, 0.755, 0.122, 0.644]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [
        transform([33, 2, -2], [0.011, 0.755, 0.122, 0.644]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [
        transform([53, 2, -2], [0.011, 0.755, 0.122, 0.644]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [
        transform([73, 2, -2], [0.011, 0.755, 0.122, 0.644]),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);

    instantiate(game, [transform([-7, 0.5, -5], [0, 0.707, 0, 0.707]), spawn(blueprint_animal, 1)]);

    {
        let width = 28;
        let depth = 6;
        let centerX = 6.0;
        let centerZ = -5.0;

        let Xmin = centerX - ~~(width / 2);
        let Xmax = centerX + ~~(width / 2);
        let Zmin = centerZ - ~~(depth / 2);
        let Zmax = centerZ + ~~(depth / 2);

        let number_of_trees = ~~(width * 0.9);
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

        let number_of_trees = ~~(width * 0.9);
        for (let i = 0; i < number_of_trees; i++) {
            instantiate(game, [
                transform([float(Xmin, Xmax), 0, float(Zmin, Zmax)]),
                ...element([blueprint_tree(game), blueprint_bush(game)]),
            ]);
        }
    }

    instantiate(game, [
        transform([-4.431, 0.435, -4.418], [0, 0.906, 0, 0.423], [0.5, 0.5, 0.5]),
        ...prop_house(game),
    ]);

    instantiate(game, [
        transform([-1.367, 0.435, -6.989], [0, 0.906, 0, 0.423], [0.5, 0.5, 0.5]),
        ...prop_house(game),
    ]);

    instantiate(game, [...blueprint_sun_light(game), transform()]);

    instantiate(game, [...blueprint_sun_shadow(game), transform()]);
}
