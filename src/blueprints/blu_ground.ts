import {collide} from "../components/com_collide.js";
import {render_colored_shadows} from "../components/com_render.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {Game, Layer} from "../game.js";

export function blueprint_ground(game: Game) {
    return [
        collide(false, Layer.Terrain | Layer.SurfaceGround, Layer.None),
        rigid_body(RigidKind.Static),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [
            82 / 255,
            39 / 255,
            5 / 255,
            1,
        ]),
    ];
}
