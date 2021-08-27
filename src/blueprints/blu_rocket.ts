import {audio_source} from "../components/com_audio_source.js";
import {children} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {disable} from "../components/com_disable.js";
import {emit_particles} from "../components/com_emit_particles.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {render_colored_shaded, render_particles_colored} from "../components/com_render.js";
import {shake} from "../components/com_shake.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {snd_rocket} from "../sounds/snd_rocket.js";
import {Has} from "../world.js";

export function blueprint_rocket(game: Game) {
    return [
        control_always([0, 0, 1], null),
        move(2, 0),
        lifespan(9),
        audio_source(true, snd_rocket),
        disable(Has.AudioSource),
        children(
            // Body 1.
            [
                transform([0, 0, 0.5], [0.7, 0, 0, 0.7], [0.4, 1, 0.4]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [3, 3, 3, 1]),
            ],
            [
                transform([0, 0, 0.8], [0.7, 0, 0, 0.7], [0.3, 1, 0.3]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [3, 3, 3, 1]),
            ],
            [
                transform([0, 0, 1.1], [0.7, 0, 0, 0.7], [0.2, 1, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [3, 3, 3, 1]),
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
