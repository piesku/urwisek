import {ease_in_out_sine} from "../../common/easing.js";
import {from_euler} from "../../common/quat.js";
import {animate} from "../components/com_animate.js";
import {Game} from "../game.js";
import {prop_crib} from "../props/prop_crib.js";

export function blueprint_crib(game: Game) {
    return [
        animate({
            idle: {
                Keyframes: [
                    {
                        Timestamp: 0.0,
                        Rotation: from_euler([0, 0, 0, 1], -25, 0, 0),
                        Ease: ease_in_out_sine,
                    },
                    {
                        Timestamp: 2.0,
                        Rotation: from_euler([0, 0, 0, 1], 25, 0, 0),
                        Ease: ease_in_out_sine,
                    },
                ],
            },
        }),
        ...prop_crib(game),
    ];
}
