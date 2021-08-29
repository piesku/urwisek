import {Vec4} from "../../common/math.js";
import {camera_forward_perspective} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_camera(game: Game, clear_color: Vec4) {
    return [children([transform([0, 0, 5]), camera_forward_perspective(1, 0.1, 15, clear_color)])];
}
