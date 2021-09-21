/**
 * @module components/com_audio_source
 */

import {AudioSynthClip} from "../../common/audio.js";
import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface AudioSource {
    /** The next clip to play. */
    Trigger?: AudioSynthClip;
    /** The clip which was triggered most recently. */
    Current?: AudioSynthClip;
    /** The clip to play by default, in a loop. */
    Idle?: AudioSynthClip;
    /** Elapsed time since the last clip change. */
    Time: number;
}

/**
 * Add the AudioSource component.
 *
 * @param i The name of the clip to play by default, in a loop.
 */
export function audio_source(i?: AudioSynthClip) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.AudioSource;
        game.World.AudioSource[entity] = {
            Idle: i,
            Time: 0,
        };
    };
}
