import {collide} from "../components/com_collide.js";
import {disable} from "../components/com_disable.js";
import {mimic} from "../components/com_mimic.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {Game, Layer} from "../game.js";
import {prop_box} from "../props/prop_box.js";
import {Has} from "../world.js";

export function blueprint_box(game: Game) {
    return [
        collide(true, Layer.Movable | Layer.SurfaceWood, Layer.Terrain | Layer.Movable),
        rigid_body(RigidKind.Dynamic),
        mimic(0),
        disable(Has.Mimic),
        ...prop_box(game),
    ];
}
