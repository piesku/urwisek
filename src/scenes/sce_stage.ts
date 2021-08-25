import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {float, integer} from "../../common/random.js";
import {Entity} from "../../common/world.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_car} from "../blueprints/blu_car.js";
import {blueprint_lisek} from "../blueprints/blu_lisek.js";
import {blueprint_sun} from "../blueprints/blu_sun.js";
import {blueprint_tree} from "../blueprints/blu_tree.js";
import {bone} from "../components/com_bone.js";
import {callback} from "../components/com_callback.js";
import {children} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {control_player} from "../components/com_control_player.js";
import {mimic} from "../components/com_mimic.js";
import {move} from "../components/com_move.js";
import {
    render_colored_shadows,
    render_colored_skinned,
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
        transform(undefined, from_euler([0, 0, 0, 1], 0, 90, 0)),
        ...blueprint_sun(game),
    ]);

    // Ground.
    let ground_size = 16;
    instantiate(game, [
        transform(undefined, undefined, [ground_size, 0, ground_size]),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.5, 0.2, 0.2, 1]),
    ]);

    instantiate(game, [
        transform([0, 0.1, 5], from_euler([0, 0, 0, 1], 0, 90, 0)),
        control_always(null, [0, 1, 0, 0]),
        move(0, 1.5),
        ...blueprint_car(game),
    ]);

    let trees = 100;
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

    let tailbone: Entity = 0;
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
                render_colored_skinned(
                    game.MaterialColoredPhongSkinned,
                    game.MeshOgon,
                    [1, 0.5, 0, 1]
                ),
            ],
            [
                transform([-1.5, 0.4, -0.4], from_euler([0, 0, 0, 0], -90, 0, 0)),
                children([
                    transform(),
                    control_always(null, [0, 1, 0, 0]),
                    move(0, 5),
                    children([transform(), callback((game, entity) => (tailbone = entity))]),
                ]),
            ]
        ),
    ]);

    {
        const enum BoneIndex {
            Root = 0,
            Bone1,
            Bone2,
            Bone3,
            Bone4,
        }

        let tailbone0 = instantiate(game, [
            transform(),
            mimic(tailbone, 0.1),
            bone(
                BoneIndex.Root,
                [
                    1.0, -0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0, -0.701,
                    -0.428, 1.0,
                ]
            ),
            // children([
            //     transform(undefined, undefined, [0.1, 0.1, 0.1]),
            //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
            // ]),
        ]);

        let tailbone1 = instantiate(game, [
            transform(),
            mimic(tailbone0, 0.08),
            bone(
                BoneIndex.Bone1,
                [
                    1.0, -0.0, -0.0, 0.0, 0.0, 0.132, 0.991, 0.0, 0.0, -0.991, 0.132, 0.0, -0.0,
                    -1.1, -0.285, 1.0,
                ]
            ),
            // children([
            //     transform(undefined, undefined, [0.1, 0.1, 0.1]),
            //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
            // ]),
        ]);

        let tailbone2 = instantiate(game, [
            transform(),
            mimic(tailbone1, 0.06),
            bone(
                BoneIndex.Bone2,
                [
                    1.0, -0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0, -1.492,
                    -0.487, 1.0,
                ]
            ),
            // children([
            //     transform(undefined, undefined, [0.1, 0.1, 0.1]),
            //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
            // ]),
        ]);

        let tailbone3 = instantiate(game, [
            transform(),
            mimic(tailbone2, 0.04),
            bone(
                BoneIndex.Bone3,
                [
                    -1.0, -0.0, -0.0, 0.0, 0.0, 0.137, -0.991, 0.0, 0.0, -0.991, -0.137, 0.0, -0.0,
                    -2.009, 0.214, 1.0,
                ]
            ),
            // children([
            //     transform(undefined, undefined, [0.1, 0.1, 0.1]),
            //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
            // ]),
        ]);

        let tailbone4 = instantiate(game, [
            transform(),
            mimic(tailbone3, 0.02),
            bone(
                BoneIndex.Bone4,
                [
                    -1.0, 0.0, -0.0, 0.0, 0.0, -0.204, -0.979, 0.0, -0.0, -0.979, 0.204, 0.0, -0.0,
                    -2.224, 1.021, 1.0,
                ]
            ),
            // children([
            //     transform(undefined, undefined, [0.1, 0.1, 0.1]),
            //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
            // ]),
        ]);
    }
}
