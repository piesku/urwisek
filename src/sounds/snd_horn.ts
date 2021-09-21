import {AudioSynthClip} from "../../common/audio.js";

export let snd_horn: AudioSynthClip = {
    Instrument: [
        5,
        "lowpass",
        8,
        0,
        false,
        false,
        8,
        8,
        [
            ["sine", 8, 8, 12, 14, 8, false],
            ["triangle", 6, 7, 12, 15, 15, false],
            [false, 4, 15, 15, 15],
        ],
    ],
    Notes: [24, 26, 28, 29, 31, 33, 35, 36, 38, 40],
    Exit: 7,
};
