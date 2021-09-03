import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {prop_fence} from "../props/prop_fence.js";

export function blueprint_obstacle_fence(game: Game) {
    return [
        children(
            [transform(), ...prop_fence(game)],
            [
                transform([0, 0.7, 0.5], undefined, [0.1, 1.2, 2]),
                collide(false, Layer.Terrain | Layer.SurfaceWood, Layer.None),
                rigid_body(RigidKind.Static),
            ]
        ),
    ];
}
