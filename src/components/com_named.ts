/**
 * @module components/com_named
 */

import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has, World} from "../world.js";

export interface Named {
    Name: Names;
}

export const enum Names {
    None,
    SunAnchor,
    TailAnchor,
    PixieAnchor,
    CameraAnchor,
    Launchpad,
    MeshAnchor,
    Pup,
    PupAnchor0,
    PupAnchor1,
    PupAnchor2,
    Exit,
}

export function named(Name: Names) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Named;
        game.World.Named[entity] = {Name};
    };
}

export function find_first(world: World, name: Names, start_at: Entity = 0): Entity {
    for (let i = start_at; i < world.Signature.length; i++) {
        if (world.Signature[i] & Has.Named && world.Named[i].Name === name) {
            return i;
        }
    }

    throw `No entity named ${name}.`;
}
