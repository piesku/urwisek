import {from_euler} from "../../common/quat.js";
import {float} from "../../common/random.js";
import {audio_source} from "../components/com_audio_source.js";
import {children} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {disable} from "../components/com_disable.js";
import {emit_particles} from "../components/com_emit_particles.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {render_particles_colored} from "../components/com_render.js";
import {shake} from "../components/com_shake.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {prop_rocket} from "../props/prop_rocket.js";
import {snd_rocket} from "../sounds/snd_rocket.js";
import {Has} from "../world.js";

export function blueprint_rocket(game: Game) {
    return [
        control_always([0, 0, 1], null),
        move(float(1, 3), 0),
        lifespan(25),
        audio_source(snd_rocket),
        disable(Has.AudioSource),
        children(
            // Body 1.
            [
                transform(undefined, from_euler([0, 0, 0, 1], 0, -90, -90), [0.1, 0.1, 0.1]),
                ...prop_rocket(game),
            ],
            // Jet exhaust.
            [
                transform(undefined, [0, 1, 0, 0]),
                shake(0.02),
                emit_particles(1, 0.01, 1),
                render_particles_colored([1, 0.5, 0, 1], 10, [0.56, 0.33, 0.24, 1], 2),
            ]
        ),
    ];
}
