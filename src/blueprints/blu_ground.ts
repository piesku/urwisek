import {Vec4} from "../../common/math.js";
import {collide} from "../components/com_collide.js";
import {render_colored_shadows} from "../components/com_render.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {Game, Layer} from "../game.js";

export function blueprint_ground(game: Game, ground_color: Vec4) {
    return [
        collide(false, Layer.Terrain | Layer.SurfaceGround, Layer.None),
        rigid_body(RigidKind.Static),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, ground_color),
    ];
}
