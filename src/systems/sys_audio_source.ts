/**
 * @module systems/sys_audio_source
 */

import {play_synth_random} from "../../common/audio.js";
import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.AudioSource;

export function sys_audio_source(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let audio_source = game.World.AudioSource[entity];

    if (audio_source.Current) {
        audio_source.Time += delta;
        if (audio_source.Time > audio_source.Current.Exit) {
            // This clip can now be exited from. Note: We might clear Current
            // before the clip actually ends, if Exit < duration. That's OK, as
            // we don't attempt to stop the current audio anyways.
            // TODO Schedule notes from Current progressively rather than all at once.
            audio_source.Current = undefined;
        }
    }

    if (audio_source.Trigger && !audio_source.Current) {
        play_synth_random(game.Audio, audio_source.Trigger);

        audio_source.Current = audio_source.Trigger;
        audio_source.Time = 0;
    }

    // Audio triggers are only valid in the frame they're set; they don't stack
    // up. Otherwise sound effects would go out of sync with the game logic.
    // Reset the trigger to the default or undefined, regardless of whether it
    // triggered a new clip to play.
    audio_source.Trigger = audio_source.Idle;
}
