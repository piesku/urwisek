import {instantiate} from "../../common/game.js";
import {Vec3} from "../../common/math.js";
import {from_euler} from "../../common/quat.js";
import {Entity} from "../../common/world.js";
import {audio_listener} from "../components/com_audio_listener.js";
import {bone} from "../components/com_bone.js";
import {callback} from "../components/com_callback.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {control_always} from "../components/com_control_always.js";
import {control_player} from "../components/com_control_player.js";
import {mimic} from "../components/com_mimic.js";
import {move} from "../components/com_move.js";
import {find_first, named} from "../components/com_named.js";
import {render_colored_skinned} from "../components/com_render.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {blueprint_lisek} from "./blu_lisek.js";

function blueprint_player(game: Game) {
    return [
        audio_listener(),
        control_player(true, false, false),
        move(1.5, 0),
        collide(true, Layer.Player, Layer.Terrain | Layer.Obstacle, [0.6, 0.8, 0.8]),
        rigid_body(RigidKind.Dynamic, 0),
        children(
            // [
            //     transform(undefined, undefined, [0.6, 0.8, 0.8]),
            //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [1, 1, 1, 1]),
            // ],
            [
                named("mesh anchor"),
                transform([0, -0.42, 0], [0, 0.7, 0, 0.7]),
                control_player(false, true, false),
            ],
            [named("camera anchor"), transform([0.5, -0.5, 0])],
            [
                named("guide anchor"),
                transform([4, 1, 0], [0, 0.7, 0, 0.7]),
                // children([
                //     transform(undefined, undefined, [0.1, 0.1, 0.1]),
                //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
                // ]),
            ]
        ),
    ];
}

export function instantiate_player(game: Game, translation: Vec3) {
    instantiate(game, [...blueprint_player(game), transform(translation)]);

    const enum TailBoneIndex {
        Root = 0,
        Bone1,
        Bone2,
        Bone3,
        Bone4,
    }

    let tail_attachment: Entity = 0;
    let tail_bone1: Entity = 0;
    let tail_bone2: Entity = 0;
    let tail_bone3: Entity = 0;
    let tail_bone4: Entity = 0;

    let lisek_entity = instantiate(game, [
        transform([-10, 0, 0.5]),
        mimic(find_first(game.World, "mesh anchor"), 0.2),
        children(
            // The mesh, animated by the player.
            [...blueprint_lisek(game), transform(), control_player(false, false, true)],
            // The tail, animated procedurally.
            [
                transform(),
                render_colored_skinned(
                    game.MaterialColoredPhongSkinned,
                    game.MeshOgon,
                    [1, 0.5, 0, 1]
                ),
            ],
            // The tail attachment, animated procedurally.
            [
                transform([0, 0.4, -0.7], from_euler([0, 0, 0, 0], -90, 0, 0)),
                children([
                    transform(),
                    control_always(null, [0, 1, 0, 0]),
                    move(0, 1),
                    callback((game, entity) => (tail_attachment = entity)),
                    bone(
                        TailBoneIndex.Root,
                        [
                            1.0, -0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0,
                            -0.701, -0.428, 1.0,
                        ]
                    ),
                    // children([
                    //     transform(undefined, undefined, [0.1, 0.1, 0.1]),
                    //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
                    // ]),
                ]),
            ]
        ),
    ]);

    instantiate(game, [
        transform(),
        mimic(tail_attachment, 0.08),
        bone(
            TailBoneIndex.Bone1,
            [
                1.0, -0.0, -0.0, 0.0, 0.0, 0.132, 0.991, 0.0, 0.0, -0.991, 0.132, 0.0, -0.0, -1.1,
                -0.285, 1.0,
            ]
        ),
        children([
            transform([0, 0.2, 0.1], undefined, [0.1, 0.1, 0.1]),
            callback((game, entity) => (tail_bone1 = entity)),
            // render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
        ]),
    ]);

    instantiate(game, [
        transform(),
        mimic(tail_bone1, 0.06),
        bone(
            TailBoneIndex.Bone2,
            [
                1.0, -0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0, -1.492, -0.487,
                1.0,
            ]
        ),
        children([
            transform([0, 0.2, 0.1], undefined, [0.1, 0.1, 0.1]),
            callback((game, entity) => (tail_bone2 = entity)),
            // render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
        ]),
    ]);

    instantiate(game, [
        transform(),
        mimic(tail_bone2, 0.04),
        bone(
            TailBoneIndex.Bone3,
            [
                -1.0, -0.0, -0.0, 0.0, 0.0, 0.137, -0.991, 0.0, 0.0, -0.991, -0.137, 0.0, -0.0,
                -2.009, 0.214, 1.0,
            ]
        ),
        children([
            transform([0, 0.2, 0.1], undefined, [0.1, 0.1, 0.1]),
            callback((game, entity) => (tail_bone3 = entity)),
            // render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
        ]),
    ]);

    instantiate(game, [
        transform(),
        mimic(tail_bone3, 0.02),
        bone(
            TailBoneIndex.Bone4,
            [
                -1.0, 0.0, -0.0, 0.0, 0.0, -0.204, -0.979, 0.0, -0.0, -0.979, 0.204, 0.0, -0.0,
                -2.224, 1.021, 1.0,
            ]
        ),
        children([
            transform([0, 0.2, 0.1], undefined, [0.1, 0.1, 0.1]),
            callback((game, entity) => (tail_bone4 = entity)),
            // render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
        ]),
    ]);

    return lisek_entity;
}
