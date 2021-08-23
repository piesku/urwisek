import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {float, integer} from "../../common/random.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_lisek} from "../blueprints/blu_lisek.js";
import {blueprint_sun} from "../blueprints/blu_sun.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {children} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {control_player} from "../components/com_control_player.js";
import {move} from "../components/com_move.js";
import {
    render_colored_shaded,
    render_colored_shadows,
    render_instanced,
} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [...blueprint_camera(game), transform([0, 1, 3], [0, 1, 0, 0])]);

    // Sun.
    instantiate(game, [
        transform(undefined, from_euler([0, 0, 0, 0], -45, 45, 0)),
        ...blueprint_sun(game),
    ]);

    // Ground.
    let ground_size = 16;
    instantiate(game, [
        transform(undefined, undefined, [ground_size, 0, ground_size]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [1, 1, 0, 1]),
    ]);

    let trees = 100;
    for (let i = 0; i < trees; i++) {
        let z = float(-8, -0.5);
        instantiate(game, [
            transform([float(-ground_size / 2, ground_size / 2), 0, z]),
            ...blueprint_tree(game),
        ]);
    }

    let zdzblos = 10000;
    let zdz_offsets = [];
    let zdz_rotations = [];
    for (let i = 0; i < zdzblos; i++) {
        zdz_offsets.push(
            float(-ground_size / 2, ground_size / 2),
            0.45,
            float(-ground_size / 4, ground_size / 4),
            integer(0, 2)
        );
        zdz_rotations.push(...from_euler([0, 0, 0, 1], 0, 0, 0));
    }

    false &&
        instantiate(game, [
            transform([0, 0, 0]),
            render_instanced(
                game.MeshGrass,
                Float32Array.from(zdz_offsets),
                Float32Array.from(zdz_rotations),
                [1, 0.54, 0, 1, 0.84, 0]
            ),
        ]);

    // Lisek walking around.
    instantiate(game, [
        transform(),
        control_always(null, [0, 1, 0, 0]),
        move(0, 0.5),
        children(
            [
                transform([-1.5, 0, 0]),
                children([transform(), ...blueprint_lisek(game), control_player(true), move(0, 0)]),
            ],
            [
                transform([-1.5, 0, 0]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshOgon, [1, 0.5, 0, 1]),
            ]
        ),
    ]);

    // instantiate(game, [transform([0, -1, 0]), light_directional([1, 1, 1], 0.6)]);
}
