import {audio_source} from "../components/com_audio_source.js";
import {children} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {disable} from "../components/com_disable.js";
import {emit_particles} from "../components/com_emit_particles.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {named} from "../components/com_named.js";
import {render_particles_colored} from "../components/com_render.js";
import {shake} from "../components/com_shake.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {prop_rocket} from "../props/prop_rocket.js";
import {snd_rocket} from "../sounds/snd_rocket.js";
import {Has} from "../world.js";

export function blueprint_launchpad(game: Game) {
    return [
        named("launchpad"),
        control_always([0, 1, 0], null),
        audio_source(snd_rocket),
        lifespan(25),
        disable(Has.ControlAlways | Has.AudioSource | Has.Lifespan),
        move(5, 0),
        children([
            transform(),
            shake(0.01),
            children(
                [transform([0, -30, 0], undefined, [3, 3, 3]), ...prop_rocket(game)],
                [
                    transform([0, -30, 0], [0.71, 0, 0, 0.71]),
                    children([
                        transform(),
                        shake(0.1),
                        emit_particles(2, 0.01, 5),
                        render_particles_colored([1, 1, 1, 1], 200, [1, 0.5, 0, 1], 500),
                    ]),
                ]
            ),
        ]),
    ];
}
