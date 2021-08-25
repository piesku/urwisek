import {ease_in_out_quart, ease_out_quart} from "../../common/easing.js";
import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {Entity} from "../../common/world.js";
import {animate, AnimationFlag} from "../components/com_animate.js";
import {bone} from "../components/com_bone.js";
import {callback} from "../components/com_callback.js";
import {children} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {control_player} from "../components/com_control_player.js";
import {mimic} from "../components/com_mimic.js";
import {move} from "../components/com_move.js";
import {render_colored_skinned} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

const enum BoneIndex {
    Root = 0,
    Head,
    ArmL,
    ArmR,
    HipL,
    HipR,
}

export function blueprint_lisek(game: Game) {
    return [
        render_colored_skinned(game.MaterialColoredPhongSkinned, game.MeshLisek, [1, 0.5, 0, 1], 0),
        children([
            transform([0, 0.35, -0.47], [0.672, 0, 0, 0.74]),
            bone(
                BoneIndex.Root,
                [
                    1.0, 0.0, 0.0, 0.0, 0.0, 0.096, -0.995, 0.0, 0.0, 0.995, 0.096, 0.0, 0.0, 0.433,
                    0.395, 1.0,
                ]
            ),
            animate({
                idle: {
                    Keyframes: [
                        {
                            Timestamp: Infinity,
                            Translation: [0, 0.35, -0.47],
                            Rotation: [0.672, 0, 0, 0.74],
                        },
                    ],
                },
                jump: {
                    Keyframes: [
                        {
                            Timestamp: 0.0,
                            Translation: [0, 0.63, 0],
                        },
                        {
                            Timestamp: 0.2,
                            Translation: [0, 1.13, 0],
                            Ease: ease_in_out_quart,
                        },
                        {
                            Timestamp: 0.4,
                            Translation: [0, 0.63, 0],
                            Ease: ease_out_quart,
                        },
                    ],
                    Flags: AnimationFlag.None,
                },
            }),
            children(
                [
                    transform([0, 0.46, 0], [-0.4, 0, 0, 0.92]),
                    bone(
                        BoneIndex.Head,
                        [
                            1.0, 0.0, 0.0, 0.0, 0.0, 0.795, -0.606, 0.0, 0.0, 0.606, 0.795, 0.0,
                            0.0, -0.306, 0.251, 1.0,
                        ]
                    ),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: from_euler([0, 0, 0, 1], -30, 15, 0),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: 1,
                                    Rotation: from_euler([0, 0, 0, 1], -30, -15, 0),
                                    Ease: ease_in_out_quart,
                                },
                            ],
                        },
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: from_euler([0, 0, 0, 1], -30, 0, 5),
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 1], -30, 0, -5),
                                },
                            ],
                        },
                        jump: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: [0, 0, 0, 1],
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 1], -15, 0, 0),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: 0.4,
                                    Rotation: from_euler([0, 0, 0, 1], 0, 0, 0),
                                    Ease: ease_out_quart,
                                },
                            ],
                            Flags: AnimationFlag.None,
                        },
                    }),
                ],
                [
                    transform([0.07, 0.46, 0], [0.74, 0, 0, 0.672]),
                    bone(
                        BoneIndex.ArmL,
                        [
                            1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0, -0.073,
                            0.395, -0.015, 1.0,
                        ]
                    ),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                },
                            ],
                        },
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Rotation: from_euler([0, 0, 0, 1], 80, 0, 0),
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 1], 125, 0, 0),
                                },
                            ],
                        },
                        jump: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: [0, 0, 0, 1],
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 1], 0, 0, 135),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: 0.4,
                                    Rotation: [0, 0, 0, 1],
                                    Ease: ease_out_quart,
                                },
                            ],
                            Flags: AnimationFlag.None,
                        },
                    }),
                ],
                [
                    transform([-0.07, 0.46, 0], [0.74, 0, 0, 0.672]),
                    bone(
                        BoneIndex.ArmR,
                        [
                            1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0, 0.073,
                            0.395, -0.015, 1.0,
                        ]
                    ),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                },
                            ],
                        },
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Rotation: from_euler([0, 0, 0, 1], 125, 0, 0),
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 1], 80, 0, 0),
                                },
                            ],
                        },
                        jump: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: [0, 0, 0, 1],
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 1], 0, 0, -135),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: 0.4,
                                    Rotation: [0, 0, 0, 1],
                                    Ease: ease_out_quart,
                                },
                            ],
                            Flags: AnimationFlag.None,
                        },
                    }),
                ],
                [
                    transform([0.07, 0, 0], [0.753, 0, 0, 0.658]),
                    bone(
                        BoneIndex.HipL,
                        [
                            1.0, 0.0, 0.0, 0.0, 0.0, -0.992, 0.124, 0.0, 0.0, -0.124, -0.992, 0.0,
                            -0.073, 0.291, -0.509, 1.0,
                        ]
                    ),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                },
                            ],
                        },
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Rotation: from_euler([0, 0, 0, 1], 125, 0, 0),
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 1], 80, 0, 0),
                                },
                            ],
                        },
                        jump: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: [0, 0, 0, 1],
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 1], 0, 0, 45),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: 0.4,
                                    Rotation: [0, 0, 0, 1],
                                    Ease: ease_out_quart,
                                },
                            ],
                            Flags: AnimationFlag.None,
                        },
                    }),
                ],
                [
                    transform([-0.07, 0, 0], [0.753, 0, 0, 0.658]),
                    bone(
                        BoneIndex.HipR,
                        [
                            1.0, 0.0, 0.0, 0.0, 0.0, -0.992, 0.124, 0.0, 0.0, -0.124, -0.992, 0.0,
                            0.073, 0.291, -0.509, 1.0,
                        ]
                    ),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                },
                            ],
                        },
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Rotation: from_euler([0, 0, 0, 1], 80, 0, 0),
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 1], 125, 0, 0),
                                },
                            ],
                        },
                        jump: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: [0, 0, 0, 1],
                                },
                                {
                                    Timestamp: 0.2,
                                    Rotation: from_euler([0, 0, 0, 1], 0, 0, -45),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: 0.4,
                                    Rotation: [0, 0, 0, 1],
                                    Ease: ease_out_quart,
                                },
                            ],
                            Flags: AnimationFlag.None,
                        },
                    }),
                ]
            ),
        ]),
    ];
}

export function instantiate_lisek(game: Game) {
    let tailbone: Entity = 0;
    // Lisek NOT walking around.
    let lisek_entity = instantiate(game, [
        transform([-2.2, 0, -1], from_euler([0, 0, 0, 1], 0, 90, 0)),
        // control_always(null, [0, 1, 0, 0]),
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

    return lisek_entity;
}
