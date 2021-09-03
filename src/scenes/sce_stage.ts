import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {float, integer} from "../../common/random.js";
import {blueprint_box} from "../blueprints/blu_box.js";
import {blueprint_bush} from "../blueprints/blu_bush.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {render_colored_shadows, render_instanced} from "../components/com_render.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {prop_car2} from "../props/prop_car2.js";
import {prop_house} from "../props/prop_house.js";
import {prop_slup} from "../props/prop_slup.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    // Ground.
    let ground_size = 16;
    let ground_height = 50;
    instantiate(game, [
        transform([0, -ground_height / 2, 0], undefined, [ground_size, ground_height, ground_size]),
        collide(false, Layer.Terrain | Layer.SurfaceGround, Layer.None),
        rigid_body(RigidKind.Static),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.5, 0.5, 0.5, 1]),
    ]);

    let trees = 8;
    for (let i = 0; i < trees; i++) {
        let z = float(-8, -0.5);
        instantiate(game, [
            transform([float(-ground_size / 2, ground_size / 2), 0, z]),
            ...blueprint_tree(game),
        ]);
    }

    let zdzblos = 80;
    let zdz_scale = 0.5;
    let zdz_offsets = [];
    let zdz_rotations = [];
    for (let i = 0; i < zdzblos; i++) {
        zdz_offsets.push(
            float(-ground_size / 2 / zdz_scale, ground_size / 2 / zdz_scale),
            0.2,
            float(-ground_size / 4 / zdz_scale, ground_size / 4 / zdz_scale),
            integer(0, 2)
        );
        zdz_rotations.push(...from_euler([0, 0, 0, 1], 0, 0, 0));
    }

    instantiate(game, [
        transform([0, 0, 0], undefined, [zdz_scale, zdz_scale, zdz_scale]),
        render_instanced(
            game.MeshGrass,
            Float32Array.from(zdz_offsets),
            Float32Array.from(zdz_rotations),
            [1, 0.54, 0, 1, 0.84, 0]
        ),
    ]);

    instantiate_player(game, [-1, 1, 1]);
    instantiate(game, [...blueprint_box(game), transform([2.5, 5, 1])]);
    instantiate(game, [...blueprint_box(game), transform([2.4, 8, 1])]);

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
        mimic(find_first(game.World, "camera anchor"), 0.05),
    ]);
}
