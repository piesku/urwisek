import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {prop_panelki} from "../props/prop_panelki.js";

export function blueprint_obstacle_house(game: Game) {
    return [
        children(
            [transform(), ...prop_panelki(game)],
            [
                transform([0, 0, 0], undefined, [4, 4.4, 4]),
                collide(false, Layer.Terrain | Layer.SurfaceWood, Layer.None),
                rigid_body(RigidKind.Static),
            ]
        ),
    ];
}
