import {collide} from "../components/com_collide.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {Game, Layer} from "../game.js";
import {prop_car2} from "../props/prop_car2.js";

export function blueprint_obstacle_car(game: Game) {
    return [
        collide(true, Layer.Obstacle, Layer.Terrain | Layer.Obstacle, [4, 1, 2]),
        rigid_body(RigidKind.Static),
        ...prop_car2(game),
    ];
}
