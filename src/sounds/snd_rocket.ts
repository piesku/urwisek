import {AudioClipKind, AudioSynthClip} from "../../common/audio.js";

export let snd_rocket: AudioSynthClip = {
    Kind: AudioClipKind.Synth,
    Tracks: [
        {
            Instrument: [8, "lowpass", 9, 8, false, false, 8, 1, [[false, 8, 5, 0, 9]]],
            Notes: [77],
        },
    ],
    Exit: 0.1,
};
