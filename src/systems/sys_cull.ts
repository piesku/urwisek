import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Cull;

export function sys_cull(game: Game, delta: number) {
    // The main camera must be instantiated after the shadow source one.
    let camera_entity = game.Cameras[1];
    let transform = game.World.Transform[camera_entity];
    let x = transform.World[12];

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i, x);
        }
    }
}

function update(game: Game, entity: Entity, camera_x: number) {
    let cull = game.World.Cull[entity];
    let transform = game.World.Transform[entity];
    let x = transform.World[12];

    if (Math.abs(x - camera_x) > 15) {
        game.World.Signature[entity] &= ~cull.Mask;
    } else {
        game.World.Signature[entity] |= cull.Mask;
    }
}
