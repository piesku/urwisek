import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {float} from "../../common/random.js";
import {blueprint_bird} from "../blueprints/blu_bird.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {children} from "../components/com_children.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {render_colored_shadows} from "../components/com_render.js";
import {shake} from "../components/com_shake.js";
import {spawn} from "../components/com_spawn.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {prop_car2} from "../props/prop_car2.js";
import {prop_house} from "../props/prop_house.js";
import {prop_slup} from "../props/prop_slup.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    // Ground.
    let ground_size = 16;
    let ground_height = 5;
    instantiate(game, [
        transform([0, -ground_height / 2, 0], undefined, [ground_size, ground_height, ground_size]),
        ...blueprint_ground(game, [0, 0, 0, 1]),
    ]);

    let slups = 2;
    for (let i = 0; i < slups; i++) {
        instantiate(game, [
            transform(
                [float(-ground_size / 2, ground_size / 2), 0, float(-3, 0)],
                from_euler([0, 0, 0, 1], 0, float(-180, 180), 0)
            ),
            ...prop_slup(game),
        ]);
    }

    let trees = 8;
    for (let i = 0; i < trees; i++) {
        let z = float(-8, -0.5);
        instantiate(game, [
            transform([float(-ground_size / 2, ground_size / 2), 0, z]),
            ...blueprint_tree(game),
        ]);
    }

    instantiate_player(game);
    instantiate(game, [...blueprint_box(game), transform([2.5, 6, 1])]);
    instantiate(game, [...blueprint_box(game), transform([2.4, 8, 1])]);

    instantiate(game, [
        transform([-4, 2, -1], from_euler([0, 0, 0, 1], -10, 100, 10)),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5)]),
    ]);

    instantiate(game, [
        transform([-4, 0, -1], from_euler([0, 0, 0, 1], 0, -35 + 180, 0), [0.6, 0.6, 0.6]),
        ...prop_car2(game),
    ]);

    instantiate(game, [
        transform([20, -12, -5], from_euler([0, 0, 0, 1], 0, 90, 0), [30, 30, 30]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([55, -10, -5.5], from_euler([0, 0, 0, 1], 0, 90, 0), [20, 20, 20]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);

    instantiate(game, [
        transform([4.4, 0, -2], from_euler([0, 0, 0, 1], 0, 12, 0), [1, 1, 1]),
        children(
            [transform(), ...prop_house(game)],
            [transform([0.5, 0, 1.5]), ...blueprint_bush(game)]
        ),
    ]);

    instantiate(game, [transform([-4, -0.3, 0.5]), ...blueprint_bush(game)]);

    instantiate(game, [transform([2.5, 0.2, 3.5]), ...blueprint_bush(game)]);

    // Sun.
    instantiate(game, [...blueprint_sun_light(game), transform()]);
    instantiate(game, [...blueprint_sun_shadow(game), transform()]);

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
        transform([0, 0, 0], from_euler([0, 0, 0, 1], -30, 0, 0)),
        mimic(find_first(game.World, "ca"), 0.05),
    ]);
}
