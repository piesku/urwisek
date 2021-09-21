import {from_euler} from "../../common/quat.js";
import {camera_depth_ortho} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {light} from "../components/com_light.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_sun_light(game: Game) {
    return [children([transform([10, 10, 10]), light(0.9)])];
}

export function blueprint_sun_shadow(game: Game) {
    return [
        mimic(find_first(game.World, "sa"), 0.01),
        children([
            transform([10, 10, -10], from_euler([0, 0, 0, 1], -35, 135, 0)),
            camera_depth_ortho(game.Targets.Sun, 8, 1, 100),
            light(0.6),
        ]),
    ];
}
