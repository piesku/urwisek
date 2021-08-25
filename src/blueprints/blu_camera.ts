import {Vec4} from "../../common/math.js";
import {from_euler} from "../../common/quat.js";
import {camera_forward_perspective} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_camera(game: Game, clear_color: Vec4) {
    return [
        mimic(find_first(game.World, "camera anchor"), 0.01),
        children([
            transform([0, 1, 5], from_euler([0, 0, 0, 1], 10, 0, 0)),
            children([transform(), camera_forward_perspective(1, 0.1, 15, clear_color)]),
        ]),
    ];
}
