import {children} from "../components/com_children.js";
import {emit_particles} from "../components/com_emit_particles.js";
import {light} from "../components/com_light.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {render_particles_colored} from "../components/com_render.js";
import {shake} from "../components/com_shake.js";
import {task_timeout} from "../components/com_task.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_pixie(game: Game) {
    return [
        // "wrózka anchor"
        mimic(find_first(game.World, "wa"), 0.02),
        light(1.5),
        children([
            transform(),
            shake(0.1),
            emit_particles(1, 0.1, 0.1),
            render_particles_colored([1, 1, 1, 1], 8, [0.5, 0.5, 1, 1], 1),
        ]),
        task_timeout(7, (entity) => {
            let mimic = game.World.Mimic[entity];
            mimic.Target = find_first(game.World, "exit");
        }),
    ];
}
