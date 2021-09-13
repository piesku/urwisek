import {AudioSynthClip} from "../../common/audio.js";

export let snd_walk3: AudioSynthClip = {
    Instrument: [
        8,
        "bandpass",
        8,
        2,
        false,
        false,
        8,
        8,
        [
            ["square", 3, 1, 1, 2, 8, false],
            [false, 3, 2, 2, 3],
        ],
    ],
    Notes: [48],
    Exit: 0.25,
};
