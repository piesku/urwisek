import {AudioClipKind, AudioSynthClip} from "../../common/audio.js";

export let snd_walk1: AudioSynthClip = {
    Kind: AudioClipKind.Synth,
    Tracks: [
        {
            Instrument: [
                3,
                "lowpass",
                9,
                0,
                false,
                false,
                8,
                8,
                [
                    ["sine", 8, 1, 1, 3, 8, false, false, 8, 8, 8],
                    [false, 8, 2, 2, 2],
                ],
            ],
            Notes: [48],
        },
    ],
    Exit: 0.25,
};
