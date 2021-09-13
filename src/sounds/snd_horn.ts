import {AudioSynthClip} from "../../common/audio.js";

export let snd_horn: AudioSynthClip = {
    Instrument: [
        5,
        "lowpass",
        8,
        0,
        true,
        "triangle",
        4,
        4,
        [
            ["sine", 8, 8, 12, 14, 8, false],
            ["triangle", 6, 7, 12, 15, 15, false],
        ],
    ],
    Notes: [24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 0, 0, 0, 0],
    Exit: 6,
};
