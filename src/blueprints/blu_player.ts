import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {control_player} from "../components/com_control_player.js";
import {move} from "../components/com_move.js";
import {named} from "../components/com_named.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";

export function blueprint_player(game: Game) {
    return [
        control_player(true, false, false),
        move(1.5, 0),
        collide(true, Layer.Player, Layer.Terrain),
        rigid_body(RigidKind.Dynamic, 0),
        children(
            [
                named("mesh anchor"),
                transform([0, -0.51, 0], [0, 0.7, 0, 0.7]),
                control_player(false, true, false),
            ],
            [named("camera anchor"), transform([0.5, -1, 0])]
        ),
    ];
}
