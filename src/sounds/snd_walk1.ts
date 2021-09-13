import {AudioSynthClip} from "../../common/audio.js";

export let snd_walk1: AudioSynthClip = {
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
            ["sine", 8, 1, 1, 3, 8, false],
            [false, 8, 2, 2, 2],
        ],
    ],
    Notes: [48],
    Exit: 0.25,
};
