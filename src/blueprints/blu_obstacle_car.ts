import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {prop_car2} from "../props/prop_car2.js";

export function blueprint_obstacle_car(game: Game) {
    return [
        children(
            [transform(), ...prop_car2(game)],
            [
                transform([0, 0.8, 0], undefined, [4, 1, 2]),
                collide(false, Layer.Terrain | Layer.SurfaceMetal, Layer.None),
                rigid_body(RigidKind.Static),
            ]
        ),
    ];
}
