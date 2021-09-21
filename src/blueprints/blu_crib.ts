import {ease_in_out_quart} from "../../common/easing.js";
import {from_euler} from "../../common/quat.js";
import {animate} from "../components/com_animate.js";
import {children} from "../components/com_children.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {prop_crib} from "../props/prop_crib.js";

export function blueprint_crib(game: Game) {
    return [
        children([
            transform(),
            animate({
                i: {
                    Keyframes: [
                        {
                            Timestamp: 0.0,
                            Rotation: from_euler([0, 0, 0, 1], -25, 0, 0),
                            Ease: ease_in_out_quart,
                        },
                        {
                            Timestamp: 2.0,
                            Rotation: from_euler([0, 0, 0, 1], 25, 0, 0),
                            Ease: ease_in_out_quart,
                        },
                    ],
                },
            }),
            ...prop_crib(game),
        ]),
    ];
}
