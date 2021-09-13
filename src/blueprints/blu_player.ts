import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {Entity} from "../../common/world.js";
import {audio_source} from "../components/com_audio_source.js";
import {bone} from "../components/com_bone.js";
import {callback} from "../components/com_callback.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {control_always} from "../components/com_control_always.js";
import {Control, control_player} from "../components/com_control_player.js";
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
        audio_source(),
        control_player(Control.Move),
        move(3, 0),
        collide(true, Layer.Player, Layer.Terrain | Layer.Movable, [0.6, 0.8, 0.8]),
        rigid_body(RigidKind.Dynamic, 0),
        children(
            // [
            //     transform(undefined, undefined, [0.6, 0.8, 0.8]),
            //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [1, 1, 1, 1]),
            // ],
            [
                named("ma"),
                transform([0, -0.42, 0], [0, 0.71, 0, 0.71]),
                control_player(Control.Rotate),
                children([
                    transform([0, 0.5, 1], undefined, [0.1, 0.1, 0.1]),
                    collide(true, Layer.None, Layer.Movable),
                    control_player(Control.Grab),
                    //render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [1, 1, 1, 1]),
                ]),
            ],
            [
                named("pa 0"),
                transform([0, -0.42, 0.2], [0, 0.71, 0, 0.71]),
                control_player(Control.Rotate),
            ],
            [
                named("pa 1"),
                transform([-0.2, -0.42, 0.2], [0, 0.71, 0, 0.71]),
                control_player(Control.Rotate),
            ],
            [
                named("pa 2"),
                transform([-0.4, -0.42, 0.2], [0, 0.71, 0, 0.71]),
                control_player(Control.Rotate),
            ],
            [named("ca"), transform([0.5, 0.5, 0], from_euler([0, 0, 0, 1], -10, 0, 0))],
            [named("sa"), transform()],
            [
                // "wrózka anchor"
                named("wa"),
                transform([4, 1, 0], [0, 0.71, 0, 0.71]),
                // children([
                //     transform(undefined, undefined, [0.1, 0.1, 0.1]),
                //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
                // ]),
            ]
        ),
    ];
}

export function instantiate_player(game: Game) {
    let player_entity = instantiate(game, [...blueprint_player(game), transform()]);

    const enum TailBoneIndex {
        Root = 0,
        Bone1,
        Bone2,
        Bone3,
    }

    let tail_root: Entity = 0;
    let tail_bone1: Entity = 0;
    let tail_bone2: Entity = 0;
    let tail_bone3: Entity;

    instantiate(game, [
        transform([-10, 0, 0.5]),
        mimic(find_first(game.World, "ma"), 0.2),
        children(
            // The mesh, animated by the player.
            [...blueprint_lisek(game), transform(), control_player(Control.Animate)],
            // The tail, animated procedurally.
            [
                transform(),
                render_colored_skinned(game.MaterialColoredSkinned, game.MeshOgon, [1, 0.5, 0, 1]),
            ]
        ),
    ]);

    instantiate(game, [
        transform(),
        mimic(find_first(game.World, "ta"), 1),
        children([
            transform([0, -0.2, -0.05], [1, 0, 0, 0]),
            control_always(null, [0, -1, 0, 0]),
            move(0, 1),
            callback((game, entity) => (tail_root = entity)),
            bone(
                TailBoneIndex.Root,
                [
                    1.0, -0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0, -0.701,
                    -0.428, 1.0,
                ]
            ),
        ]),
    ]);

    instantiate(game, [
        transform(),
        mimic(tail_root, 0.08),
        bone(
            TailBoneIndex.Bone1,
            [
                1.0, -0.0, -0.0, 0.0, 0.0, 0.132, 0.991, 0.0, 0.0, -0.991, 0.132, 0.0, -0.0, -1.1,
                -0.285, 1.0,
            ]
        ),
        children([transform([0, 0.2, 0.1]), callback((game, entity) => (tail_bone1 = entity))]),
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
        children([transform([0, 0.2, 0.1]), callback((game, entity) => (tail_bone2 = entity))]),
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
        children([transform([0, 0.2, 0.1]), callback((game, entity) => (tail_bone3 = entity))]),
    ]);

    for (let i = 0; i < game.PupsFound; i++) {
        instantiate(game, [
            transform(),
            mimic(find_first(game.World, "pa " + i), 0.2 - 0.02 * i),
            children([
                ...blueprint_lisek(game, [1, 0.5, 0, 1], 0.7 + 0.1 * i),
                transform(undefined, undefined, [0.3, 0.3, 0.3]),
                control_player(Control.Animate),
            ]),
        ]);
    }

    return player_entity;
}
