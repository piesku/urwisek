/**
 * @module components/com_audio_source
 */

import {AudioClip} from "../../common/audio.js";
import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface AudioSource {
    /** The next clip to play. */
    Trigger?: AudioClip;
    /** The clip which was triggered most recently. */
    Current?: AudioClip;
    /** The clip to play by default, in a loop. */
    Idle?: AudioClip;
    /** Elapsed time since the last clip change. */
    Time: number;
}

/**
 * Add the AudioSource component.
 *
 * @param idle The name of the clip to play by default, in a loop.
 */
export function audio_source(idle?: AudioClip) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.AudioSource;
        game.World.AudioSource[entity] = {
            Idle: idle,
            Time: 0,
        };
    };
}
