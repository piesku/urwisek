import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {blueprint_branch} from "./blu_branch.js";

export function blueprint_obstacle_branch(game: Game) {
    return [
        children(
            [transform(), ...blueprint_branch(game)],
            [
                transform(undefined, undefined, [0.5, 1, 0.25]),
                collide(false, Layer.Terrain, Layer.None),
                rigid_body(RigidKind.Static),
            ]
        ),
    ];
}
