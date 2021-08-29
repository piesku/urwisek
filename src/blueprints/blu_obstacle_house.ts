import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {prop_house} from "../props/prop_house.js";

export function blueprint_obstacle_house(game: Game) {
    return [
        children(
            [transform(), ...prop_house(game)],
            [
                transform([0, 1.7, 0], undefined, [3, 3, 3]),
                collide(false, Layer.Terrain, Layer.None),
                rigid_body(RigidKind.Static),
            ],

            [
                transform([-2.25, 1.7, 0], undefined, [1.5, 0.1, 3]),
                collide(false, Layer.Terrain, Layer.None),
                rigid_body(RigidKind.Static),
            ],

            [
                transform([-0.8, 0.1, 0], undefined, [4.9, 0.2, 3.4]),
                collide(false, Layer.Terrain, Layer.None),
                rigid_body(RigidKind.Static),
            ]
        ),
    ];
}
