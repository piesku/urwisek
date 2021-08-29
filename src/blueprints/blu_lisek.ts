import {ease_in_out_quart, ease_out_quart} from "../../common/easing.js";
import {Vec4} from "../../common/math.js";
import {from_euler} from "../../common/quat.js";
import {Action} from "../actions.js";
import {animate, AnimationFlag} from "../components/com_animate.js";
import {bone} from "../components/com_bone.js";
import {children} from "../components/com_children.js";
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

export function blueprint_lisek(
    game: Game,
    animation_step_length = 0.2,
    actionOnEachStep?: Action,
    color: Vec4 = [1, 0.5, 0, 1]
) {
    return [
        render_colored_skinned(game.MaterialColoredPhongSkinned, game.MeshLisek, color, 0),
        children([
            transform([0, 0.35, -0.47], [0.672, 0, 0, 0.74]),
            children([
                transform(),
                bone(
                    BoneIndex.Root,
                    [
                        1.0, 0.0, 0.0, 0.0, 0.0, 0.096, -0.995, 0.0, 0.0, 0.995, 0.096, 0.0, 0.0,
                        0.433, 0.395, 1.0,
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
                    jump: {
                        Keyframes: [
                            {
                                Timestamp: 0.0,
                                Translation: [0, 0.63, 0],
                            },
                            {
                                Timestamp: animation_step_length,
                                Translation: [0, 1.13, 0],
                                Ease: ease_in_out_quart,
                            },
                            {
                                Timestamp: animation_step_length * 2,
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
                        children([
                            transform(),
                            bone(
                                BoneIndex.Head,
                                [
                                    1.0, 0.0, 0.0, 0.0, 0.0, 0.795, -0.606, 0.0, 0.0, 0.606, 0.795,
                                    0.0, 0.0, -0.306, 0.251, 1.0,
                                ]
                            ),
                            animate({
                                idle: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0.0,
                                            Rotation: [0, 0.088, 0.116, 0.989],
                                            Ease: ease_in_out_quart,
                                        },
                                        {
                                            Timestamp: animation_step_length * 5,
                                            Rotation: [0, -0.088, -0.116, 0.989],
                                            Ease: ease_in_out_quart,
                                        },
                                    ],
                                },
                                walk: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0.0,
                                            Rotation: [0.087, 0.0, 0.0, 0.996],
                                        },
                                        {
                                            Timestamp: animation_step_length,
                                            Rotation: [0, 0.0, 0.0, 1],
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
                                            Timestamp: animation_step_length,
                                            Rotation: from_euler([0, 0, 0, 1], -15, 0, 0),
                                            Ease: ease_in_out_quart,
                                        },
                                        {
                                            Timestamp: animation_step_length * 2,
                                            Rotation: from_euler([0, 0, 0, 1], 0, 0, 0),
                                            Ease: ease_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.None,
                                },
                            }),
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
                                            Rotation: [-0.174, 0.0, 0.0, 0.985],
                                            ActionOnEnd: actionOnEachStep,
                                        },
                                        {
                                            Timestamp: animation_step_length,
                                            Rotation: [0.174, 0.0, 0.0, 0.985],
                                            ActionOnEnd: actionOnEachStep,
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
                                            Timestamp: animation_step_length,
                                            Rotation: from_euler([0, 0, 0, 1], 0, 0, 135),
                                            Ease: ease_in_out_quart,
                                        },
                                        {
                                            Timestamp: animation_step_length * 2,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.None,
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
                                            Rotation: [0.174, 0.0, 0.0, 0.985],
                                        },
                                        {
                                            Timestamp: animation_step_length,
                                            Rotation: [-0.174, 0.0, 0.0, 0.985],
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
                                            Timestamp: animation_step_length,
                                            Rotation: from_euler([0, 0, 0, 1], 0, 0, -135),
                                            Ease: ease_in_out_quart,
                                        },
                                        {
                                            Timestamp: animation_step_length * 2,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.None,
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
                                            Rotation: [0.131, 0.0, 0.0, 0.991],
                                        },
                                        {
                                            Timestamp: animation_step_length,
                                            Rotation: [-0.131, 0.0, 0.0, 0.991],
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
                                            Timestamp: animation_step_length,
                                            Rotation: from_euler([0, 0, 0, 1], 0, 0, 45),
                                            Ease: ease_in_out_quart,
                                        },
                                        {
                                            Timestamp: animation_step_length * 2,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.None,
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
                                            Rotation: [-0.131, 0.0, 0.0, 0.991],
                                        },
                                        {
                                            Timestamp: animation_step_length,
                                            Rotation: [0.131, 0.0, 0.0, 0.991],
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
                                            Timestamp: animation_step_length,
                                            Rotation: from_euler([0, 0, 0, 1], 0, 0, -45),
                                            Ease: ease_in_out_quart,
                                        },
                                        {
                                            Timestamp: animation_step_length * 2,
                                            Rotation: [0, 0, 0, 1],
                                            Ease: ease_out_quart,
                                        },
                                    ],
                                    Flags: AnimationFlag.None,
                                },
                            }),
                        ]),
                    ]
                ),
            ]),
        ]),
    ];
}
