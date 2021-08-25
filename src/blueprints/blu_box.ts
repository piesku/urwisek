import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {render_colored_shaded} from "../components/com_render.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";

export function blueprint_box(game: Game) {
    return [
        collide(true, Layer.Obstacle, Layer.Terrain | Layer.Player),
        rigid_body(RigidKind.Dynamic),
        children(
            [
                transform(undefined, undefined, undefined),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.342, 0.17, 0.035, 1]
                ),
            ],

            [
                transform(
                    [0.17110759019851685, 0.6197071075439453, 0],
                    [0, 0, 0.5735764503479004, 0.8191520571708679],
                    [0.03887861594557762, 0.699999988079071, 1]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.342, 0.17, 0.035, 1]
                ),
            ],

            [
                transform(
                    [-0.2931903600692749, 0.536466121673584, 0],
                    [0, 0, -0.6427876353263855, 0.766044557094574],
                    [0.03887861594557762, 0.42000001668930054, 1]
                ),
                render_colored_shaded(
                    game.MaterialColoredShaded,
                    game.MeshCube,
                    [0.342, 0.17, 0.035, 1]
                ),
            ]
        ),
    ];
}
