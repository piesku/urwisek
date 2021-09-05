import {Vec4} from "../../common/math.js";
import {element} from "../../common/random.js";
import {animate} from "../components/com_animate.js";
import {bone} from "../components/com_bone.js";
import {children} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {render_colored_skinned} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

const enum BoneIndex {
    Root = 0,
    WingL,
    WingR,
}

const fly_keytime_1 = 0.6;
const colors: Array<Vec4> = [
    [0.1, 0.1, 0.1, 1],
    [0.2, 0.2, 0.2, 1],
    [0.3, 0.3, 0.3, 1],
];

export function blueprint_bird(game: Game) {
    return [
        control_always([0, 0, 1], null, "walk"),
        move(1, 0),
        lifespan(10),
        render_colored_skinned(game.MaterialColoredSkinned, game.MeshLeaf, element(colors), 0),
        children([
            transform(),
            children([
                transform(),
                bone(
                    BoneIndex.Root,
                    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]
                ),
                animate({
                    idle: {
                        Keyframes: [
                            {
                                Timestamp: 0,
                                Translation: [0, 0, 0],
                            },
                        ],
                    },
                    walk: {
                        Keyframes: [
                            {
                                Timestamp: 0,
                                Translation: [0, -0.05, 0],
                            },
                            {
                                Timestamp: fly_keytime_1,
                                Translation: [0, 0.01, 0],
                            },
                        ],
                    },
                }),
                children(
                    [
                        transform(undefined, [0, 0, -0.628, 0.778]),
                        children([
                            transform(),
                            bone(
                                BoneIndex.WingL,
                                [
                                    0.124, 0.992, 0.0, 0.0, -0.992, 0.124, -0.0, 0.0, -0.0, -0.0,
                                    1.0, 0.0, -0.0, -0.0, -0.0, 1.0,
                                ]
                            ),
                            animate({
                                idle: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                    ],
                                },
                                walk: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, 0.044, 0.999],
                                        },
                                        {
                                            Timestamp: fly_keytime_1,
                                            Rotation: [0, 0, -0.342, 0.94],
                                        },
                                    ],
                                },
                            }),
                        ]),
                    ],
                    [
                        transform(undefined, [0, 0, 0.628, 0.778]),
                        children([
                            transform(),
                            bone(
                                BoneIndex.WingR,
                                [
                                    0.124, -0.992, -0.0, 0.0, 0.992, 0.124, -0.0, 0.0, 0.0, -0.0,
                                    1.0, 0.0, 0.0, -0.0, -0.0, 1.0,
                                ]
                            ),
                            animate({
                                idle: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, 0, 1],
                                        },
                                    ],
                                },
                                walk: {
                                    Keyframes: [
                                        {
                                            Timestamp: 0,
                                            Rotation: [0, 0, -0.044, 0.999],
                                        },
                                        {
                                            Timestamp: fly_keytime_1,
                                            Rotation: [0, 0, 0.342, 0.94],
                                        },
                                    ],
                                },
                            }),
                        ]),
                    ]
                ),
            ]),
        ]),
    ];
}
