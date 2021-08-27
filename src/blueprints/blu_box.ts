import {collide} from "../components/com_collide.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {Game, Layer} from "../game.js";
import {prop_box} from "../props/prop_box.js";

export function blueprint_box(game: Game) {
    return [
        collide(true, Layer.Obstacle, Layer.Terrain | Layer.Player | Layer.Obstacle),
        rigid_body(RigidKind.Dynamic),
        ...prop_box(game),
    ];
}
