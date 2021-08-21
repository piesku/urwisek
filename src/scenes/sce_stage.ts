import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {float} from "../../common/random.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_character_rigged} from "../blueprints/blu_character_rigged.js";
import {blueprint_flame_colored} from "../blueprints/blu_flame_colored.js";
import {blueprint_sun} from "../blueprints/blu_sun.js";
import {render_colored_shadows, render_instanced} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [...blueprint_camera(game), transform([0, 2, 5], [0, 1, 0, 0])]);

    // Sun.
    instantiate(game, [
        transform(undefined, from_euler([0, 0, 0, 0], -45, 45, 0)),
        ...blueprint_sun(game),
    ]);

    // Ground.
    instantiate(game, [
        transform(undefined, undefined, [10, 1, 10]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [1, 1, 0, 1]),
    ]);

    // Cube.
    let radius = 0.5;
    let leaf_count = 50;
    let offsets = [];
    for (let i = 0; i < leaf_count; i++) {
        offsets.push(float(-radius, radius), float(-radius, radius), float(-radius, radius), 0);
    }

    console.log(offsets);
    instantiate(game, [
        transform([-1, 2, 0], from_euler([0, 0, 0, 0], 90, 0, 0)),
        render_instanced(game.MeshTriangle, Float32Array.from(offsets), [0, 1, 0]),
    ]);

    // Ludek.
    instantiate(game, [...blueprint_character_rigged(game), transform([1, 0.5, 0])]);

    // Fire.
    instantiate(game, [...blueprint_flame_colored(game), transform([0, 0.5, -3])]);
}
