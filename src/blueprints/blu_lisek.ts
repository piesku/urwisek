import {ease_in_out_quart, ease_out_quart} from "../../common/easing.js";
import {Vec4} from "../../common/math.js";
import {animate, AnimationFlag} from "../components/com_animate.js";
import {bone} from "../components/com_bone.js";
import {children} from "../components/com_children.js";
import {cull} from "../components/com_cull.js";
import {named} from "../components/com_named.js";
import {render_colored_skinned} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const enum BoneIndex {
    Root = 0,
    Head,
    ArmL,
    ArmR,
    HipL,
    HipR,
}

const jump_keytime_1 = 0.2;
const jump_keytime_2 = 0.6;
const jump_keytime_3 = 1;

const sit_keytime_1 = 9;
const sit_keytime_2 = sit_keytime_1 + 1;
const sit_keytime_3 = sit_keytime_2 + 5;
const sit_keytime_4 = sit_keytime_3 + 1;

export function blueprint_lisek(game: Game, color: Vec4 = [1, 0.5, 0, 1], timescale = 1) {
    return [
        render_colored_skinned(game.MaterialColoredSkinned, game.MeshLisek, color),
        children([
            transform([0, 0.35, -0.47], [0.672, 0, 0, 0.74]),
            children([
                transform(),
                // Only the player's lisek has the tail, and only it has timescale=1.
                named(timescale === 1 ? "ta" : ""),
                bone(
                    BoneIndex.Root,
                    [
                        1.0, 0.0, 0.0, 0.0, 0.0, 0.096, -0.995, 0.0, 0.0, 0.995, 0.096, 0.0, 0.0,
                        0.433, 0.395, 1.0,
                    ]
                ),
                cull(Has.Animate),
                animate({
                    i: {
                        Keyframes: [
                            {
                                Timestamp: 0,
                                Translation: [0, 0, 0],
                                Rotation: [0, 0, 0, 1],
                            },
                            {
                                Timestamp: sit_keytime_1 * timescale,
                                Translation: [0, 0, 0],
                                Rotation: [0, 0, 0, 1],
                            },
                            {
                                Timestamp: sit_keytime_2 * timescale,
                                Translation: [0, -0.044, 0.289],
                                Rotation: [-0.288, 0, 0, 0.958],
                                Ease: ease_in_out_quart,
                            },
                            {
                                Timestamp: sit_keytime_3 * timescale,
                                Translation: [0, -0.044, 0.289],
                                Rotation: [-0.288, 0, 0, 0.958],
                            },
                            {
                                Timestamp: sit_keytime_4 * timescale,
                                Translation: [0, 0, 0],
                                Rotation: [0, 0, 0, 1],
                                Ease: ease_in_out_quart,
                            },
                        ],
                        Flags: AnimationFlag.Loop | AnimationFlag.EarlyExit,
                    },
                    w: {
                        Keyframes: [
                            {
                                Timestamp: 0,
                                Translation: [0, 0, 0],
                                Rotation: [0, 0, 0, 1],
                            },
                        ],
                        Flags: AnimationFlag.EarlyExit | AnimationFlag.Alternate,
                    },
                    j: {
                        Keyframes: [
                            {
                                Timestamp: 0.0,
                                Translation: [0, 0, 0],
                                Rotation: [0, 0, 0, 1],
                            },
                            {
                                Timestamp: jump_keytime_1 * timescale,
                                Translation: [0, 0, 0],
                                Rotation: [-0.131, 0, 0, 0.991],
                                Ease: ease_out_quart,
                            },
                            {
                                Timestamp: jump_keytime_2 * timescale,
                                Translation: [0, 0, 0],
                                Rotation: [0.087, 0, 0, 0.996],
                            },
                            {
                                Timestamp: jump_keytime_3 * timescale,
                                Translation: [0, 0, 0],
                                Rotation: [0, 0, 0, 1],
                                Ease: ease_out_quart,
                            },
                        ],
                        Flags: AnimationFlag.EarlyExit,
                    },
                }),
                children(
                    [
                        transform([0, 0.46, 0], [-0.4, 0, 0, 0.92]),
                        children([
                            // An intermediate joint to allow two i cycles for the head.
                            transform(),
                            cull(Has.Animate),
                            animate({
                                i: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                        {
                                            Timestamp: sit_keytime_1 * timescale,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                        {
                                            Timestamp: sit_keytime_2 * timescale,
                                            Rotation: [0.371, 0, 0, 0.929],
                                            Ease: ease_in_out_quart,
                                        },
                                        {
                                            Timestamp: sit_keytime_3 * timescale,
                                            Rotation: [0.371, 0, 0, 0.929],
                                        },
                                        {
                                            Timestamp: sit_keytime_4 * timescale,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_in_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.Loop | AnimationFlag.EarlyExit,
                                },
                                w: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                    ],
                                    Flags: AnimationFlag.EarlyExit | AnimationFlag.Alternate,
                                },
                                j: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                    ],
                                    Flags: AnimationFlag.EarlyExit,
                                },
                            }),
                            children([
                                transform(),
                                bone(
                                    BoneIndex.Head,
                                    [
                                        1.0, 0.0, 0.0, 0.0, 0.0, 0.795, -0.606, 0.0, 0.0, 0.606,
                                        0.795, 0.0, 0.0, -0.306, 0.251, 1.0,
                                    ]
                                ),
                                cull(Has.Animate),
                                animate({
                                    i: {
                                        Keyframes: [
                                            {
                                                Timestamp: 0.0,
                                                Rotation: [0, 0.088, 0.116, 0.989],
                                                Ease: ease_in_out_quart,
                                            },
                                            {
                                                Timestamp: 1 * timescale,
                                                Rotation: [0, -0.088, -0.116, 0.989],
                                                Ease: ease_in_out_quart,
                                            },
                                        ],
                                    },
                                    w: {
                                        Keyframes: [
                                            {
                                                Timestamp: 0.0,
                                                Rotation: [0.087, 0.0, 0.0, 0.996],
                                            },
                                            {
                                                Timestamp: 0.2 * timescale,
                                                Rotation: [0, 0.0, 0.0, 1],
                                            },
                                        ],
                                        Flags: AnimationFlag.EarlyExit | AnimationFlag.Alternate,
                                    },
                                    j: {
                                        Keyframes: [
                                            {
                                                Timestamp: 0.0,
                                                Rotation: [0, 0, 0, 1],
                                            },
                                            {
                                                Timestamp: jump_keytime_1 * timescale,
                                                Rotation: [0.216, 0, 0, 0.976],
                                                Ease: ease_out_quart,
                                            },
                                            {
                                                Timestamp: jump_keytime_2 * timescale,
                                                Rotation: [0.216, 0, 0, 0.976],
                                            },
                                            {
                                                Timestamp: jump_keytime_3 * timescale,
                                                Rotation: [0, 0, 0, 1],
                                                Ease: ease_out_quart,
                                            },
                                        ],
                                        Flags: AnimationFlag.EarlyExit,
                                    },
                                }),
                            ]),
                        ]),
                    ],
                    [
                        transform([0.07, 0.46, 0], [0.74, 0, 0, 0.672]),
                        children([
                            transform(),
                            bone(
                                BoneIndex.ArmL,
                                [
                                    1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0,
                                    -0.073, 0.395, -0.015, 1.0,
                                ]
                            ),
                            cull(Has.Animate),
                            animate({
                                i: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                    ],
                                },
                                w: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [-0.174, 0.0, 0.0, 0.985],
                                        },
                                        {
                                            Timestamp: 0.2 * timescale,
                                            Rotation: [0.131, 0.0, 0.0, 0.991],
                                        },
                                    ],
                                    Flags: AnimationFlag.EarlyExit | AnimationFlag.Alternate,
                                },
                                j: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0.0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                        {
                                            Timestamp: jump_keytime_1 * timescale,
                                            Rotation: [-0.259, 0, 0, 0.966],
                                            Ease: ease_out_quart,
                                        },
                                        {
                                            Timestamp: jump_keytime_2 * timescale,
                                            Rotation: [-0.259, 0, 0, 0.966],
                                        },
                                        {
                                            Timestamp: jump_keytime_3 * timescale,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.EarlyExit,
                                },
                            }),
                        ]),
                    ],
                    [
                        transform([-0.07, 0.46, 0], [0.74, 0, 0, 0.672]),
                        children([
                            transform(),
                            bone(
                                BoneIndex.ArmR,
                                [
                                    1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0,
                                    0.073, 0.395, -0.015, 1.0,
                                ]
                            ),
                            cull(Has.Animate),
                            animate({
                                i: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                    ],
                                },
                                w: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0.131, 0.0, 0.0, 0.991],
                                        },
                                        {
                                            Timestamp: 0.2 * timescale,
                                            Rotation: [-0.174, 0.0, 0.0, 0.985],
                                        },
                                    ],
                                    Flags: AnimationFlag.EarlyExit | AnimationFlag.Alternate,
                                },
                                j: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0.0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                        {
                                            Timestamp: jump_keytime_1 * timescale,
                                            Rotation: [-0.301, 0, 0, 0.954],
                                            Ease: ease_out_quart,
                                        },
                                        {
                                            Timestamp: jump_keytime_2 * timescale,
                                            Rotation: [-0.301, 0, 0, 0.954],
                                        },
                                        {
                                            Timestamp: jump_keytime_3 * timescale,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.EarlyExit,
                                },
                            }),
                        ]),
                    ],
                    [
                        transform([0.07, 0, 0], [0.753, 0, 0, 0.658]),
                        children([
                            transform(),
                            bone(
                                BoneIndex.HipL,
                                [
                                    1.0, 0.0, 0.0, 0.0, 0.0, -0.992, 0.124, 0.0, 0.0, -0.124,
                                    -0.992, 0.0, -0.073, 0.291, -0.509, 1.0,
                                ]
                            ),
                            cull(Has.Animate),
                            animate({
                                i: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                        {
                                            Timestamp: sit_keytime_1 * timescale,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                        {
                                            Timestamp: sit_keytime_2 * timescale,
                                            Rotation: [-0.492, 0, 0, 0.87],
                                            Ease: ease_in_out_quart,
                                        },
                                        {
                                            Timestamp: sit_keytime_3 * timescale,
                                            Rotation: [-0.492, 0, 0, 0.87],
                                        },
                                        {
                                            Timestamp: sit_keytime_4 * timescale,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_in_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.Loop | AnimationFlag.EarlyExit,
                                },
                                w: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0.131, 0.0, 0.0, 0.991],
                                        },
                                        {
                                            Timestamp: 0.2 * timescale,
                                            Rotation: [-0.131, 0.0, 0.0, 0.991],
                                        },
                                    ],
                                    Flags: AnimationFlag.EarlyExit | AnimationFlag.Alternate,
                                },
                                j: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0.0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                        {
                                            Timestamp: jump_keytime_1 * timescale,
                                            Rotation: [0.383, 0, 0, 0.924],
                                            Ease: ease_out_quart,
                                        },
                                        {
                                            Timestamp: jump_keytime_2 * timescale,
                                            Rotation: [0.383, 0, 0, 0.924],
                                        },
                                        {
                                            Timestamp: jump_keytime_3 * timescale,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.EarlyExit,
                                },
                            }),
                        ]),
                    ],
                    [
                        transform([-0.07, 0, 0], [0.753, 0, 0, 0.658]),
                        children([
                            transform(),
                            bone(
                                BoneIndex.HipR,
                                [
                                    1.0, 0.0, 0.0, 0.0, 0.0, -0.992, 0.124, 0.0, 0.0, -0.124,
                                    -0.992, 0.0, 0.073, 0.291, -0.509, 1.0,
                                ]
                            ),
                            cull(Has.Animate),
                            animate({
                                i: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                        {
                                            Timestamp: sit_keytime_1 * timescale,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                        {
                                            Timestamp: sit_keytime_2 * timescale,
                                            Rotation: [-0.468, 0, 0, 0.884],
                                            Ease: ease_in_out_quart,
                                        },
                                        {
                                            Timestamp: sit_keytime_3 * timescale,
                                            Rotation: [-0.468, 0, 0, 0.884],
                                        },
                                        {
                                            Timestamp: sit_keytime_4 * timescale,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_in_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.Loop | AnimationFlag.EarlyExit,
                                },
                                w: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [-0.131, 0.0, 0.0, 0.991],
                                        },
                                        {
                                            Timestamp: 0.2 * timescale,
                                            Rotation: [0.131, 0.0, 0.0, 0.991],
                                        },
                                    ],
                                    Flags: AnimationFlag.EarlyExit | AnimationFlag.Alternate,
                                },
                                j: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0.0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                        {
                                            Timestamp: jump_keytime_1 * timescale,
                                            Rotation: [0.301, 0, 0, 0.954],
                                            Ease: ease_out_quart,
                                        },
                                        {
                                            Timestamp: jump_keytime_2 * timescale,
                                            Rotation: [0.301, 0, 0, 0.954],
                                        },
                                        {
                                            Timestamp: jump_keytime_3 * timescale,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.EarlyExit,
                                },
                            }),
                        ]),
                    ]
                ),
            ]),
        ]),
    ];
}
