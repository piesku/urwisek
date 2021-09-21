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
            ["sine", 6, 3, 4, 10, 8, false],
            ["triangle", 6, 3, 4, 11, 10, false],
        ],
    ],
    Notes: [78, 80, 82],
    Exit: 99,
};
