import {AudioSynthClip} from "../../common/audio.js";

export let snd_walk2: AudioSynthClip = {
    Tracks: [
        {
            Instrument: [
                3,
                "lowpass",
                8,
                0,
                false,
                false,
                8,
                8,
                [
                    ["sine", 8, 1, 1, 3, 8, false, false, 8, 8, 8],
                    [false, 8, 1, 2, 3],
                ],
            ],
            Notes: [48],
        },
    ],
    Exit: 0.25,
};
