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
        collide(true, Layer.Player, Layer.Terrain | Layer.Obstacle, [0.6, 0.8, 0.8]),
        rigid_body(RigidKind.Dynamic, 0),
        children(
            // [
            //     transform(undefined, undefined, [0.6, 0.8, 0.8]),
            //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [1, 1, 1, 1]),
            // ],
            [
                named("mesh anchor"),
                transform([0, -0.42, 0], [0, 0.7, 0, 0.7]),
                control_player(false, true, false),
            ],
            [named("camera anchor"), transform([0.5, -0.5, 0])]
        ),
    ];
}
