import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {float, integer} from "../../common/random.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {instantiate_lisek} from "../blueprints/blu_lisek.js";
import {blueprint_slup} from "../blueprints/blu_slup.js";
import {blueprint_sun} from "../blueprints/blu_sun.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {render_colored_shadows, render_instanced} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game),
        transform([0, 1, 6], from_euler([0, 0, 0, 1], -25, 180, 0)),
    ]);

    // Sun.
    instantiate(game, [
        transform(undefined, from_euler([0, 0, 0, 1], 0, 90, 0)),
        ...blueprint_sun(game),
    ]);

    // Ground.
    let ground_size = 16;
    instantiate(game, [
        transform(undefined, undefined, [ground_size, 0, ground_size]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.5, 0.2, 0.2, 1]),
    ]);

    let trees = 0;
    for (let i = 0; i < trees; i++) {
        let z = float(-8, -0.5);
        instantiate(game, [
            transform([float(-ground_size / 2, ground_size / 2), 0, z]),
            ...blueprint_tree(game),
        ]);
    }

    let zdzblos = 0;
    let zdz_scale = 0.3;
    let zdz_offsets = [];
    let zdz_rotations = [];
    for (let i = 0; i < zdzblos; i++) {
        zdz_offsets.push(
            float(-ground_size / 2 / zdz_scale, ground_size / 2 / zdz_scale),
            0.45,
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

    instantiate_lisek(game);

    instantiate(game, [
        transform([0, -3, -3], from_euler([0, 0, 0, 1], 0, 180, 0)),
        ...blueprint_slup(game),
    ]);
}
