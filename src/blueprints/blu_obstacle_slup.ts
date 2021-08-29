import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {prop_slup} from "../props/prop_slup.js";

export function blueprint_obstacle_slup(game: Game) {
    return [
        children(
            [transform(), ...prop_slup(game)],
            [
                transform([0, 2, 0], undefined, [0.2, 4, 0.2]),
                collide(false, Layer.Terrain, Layer.None),
                rigid_body(RigidKind.Static),
            ]
        ),
    ];
}
