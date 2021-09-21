import {from_euler} from "../../common/quat.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {disable} from "../components/com_disable.js";
import {mimic} from "../components/com_mimic.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {Has} from "../world.js";
import {blueprint_branch} from "./blu_branch.js";

export function blueprint_pushable_branch(game: Game) {
    return [
        mimic(0),
        disable(Has.Mimic),
        rigid_body(RigidKind.Dynamic),
        collide(
            true,
            Layer.Movable | Layer.SurfaceWood,
            Layer.Terrain | Layer.Movable,
            [6, 0.5, 0.5]
        ),
        children([
            transform([0, 0, 0], from_euler([0, 0, 0, 1], 0, 0, 90), [0.5, 6, 0.5]),
            ...blueprint_branch(game),
        ]),
    ];
}
