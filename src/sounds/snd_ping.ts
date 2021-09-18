import {AudioSynthClip} from "../../common/audio.js";

export let snd_ping: AudioSynthClip = {
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
            ["sine", 7, 3, 4, 10, 8, false],
            ["triangle", 7, 3, 4, 11, 2, false],
        ],
    ],
    Notes: [66, 68, 70],
    Exit: 5,
};
