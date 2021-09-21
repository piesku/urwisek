import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {prop_barn} from "../props/prop_barn.js";

export function blueprint_obstacle_barn(game: Game) {
    return [
        children(
            [transform(), ...prop_barn(game)],
            [
                transform([0, 1, 0], undefined, [3, 2, 3]),
                collide(false, Layer.Terrain | Layer.SurfaceWood, Layer.None),
                rigid_body(RigidKind.Static),
            ]
        ),
    ];
}
