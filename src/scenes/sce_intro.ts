import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_pixie} from "../blueprints/blu_pixie.js";
import {blueprint_rocket} from "../blueprints/blu_rocket.js";
import {children, destroy_all} from "../components/com_children.js";
import {disable} from "../components/com_disable.js";
import {emit_particles} from "../components/com_emit_particles.js";
import {mimic} from "../components/com_mimic.js";
import {find_first} from "../components/com_named.js";
import {render_particles_colored} from "../components/com_render.js";
import {shake} from "../components/com_shake.js";
import {spawn} from "../components/com_spawn.js";
import {task_timeout, task_until} from "../components/com_task.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Intro} from "../ui/App.js";
import {Has, World} from "../world.js";
import {map_city} from "./map_city.js";

export function scene_intro(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    map_city(game);

    let starfield_entity = instantiate(game, [
        transform([2, 17, -5]),
        children([
            transform(),
            shake(5),
            emit_particles(20, 0.1, 0),
            render_particles_colored([1, 1, 1, 1], 2, [0.5, 0.5, 1, 1], 1),
        ]),
    ]);

    let rocket_spawner_entity = instantiate(game, [
        transform([-5, 10, -3], from_euler([0, 0, 0, 1], -45, 110, 0)),
        children([transform(), shake(3), spawn(blueprint_rocket, 3)]),
    ]);

    let camera_entity = instantiate(game, [
        ...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
        transform([0, 15, 0], from_euler([0, 0, 0, 1], 10, 0, 0)),
        mimic(find_first(game.World, "camera anchor"), 0.01),
        disable(Has.Mimic),
    ]);

    // Animate the camera during the intro.
    instantiate(game, [
        task_until(
            () => game.CurrentView === Intro,
            () => {
                // No more rockets.
                destroy_all(game.World, rocket_spawner_entity);
                instantiate(game, [
                    task_timeout(5, () => {
                        game.World.Signature[camera_entity] |= Has.Mimic;
                    }),
                ]);
                instantiate(game, [
                    task_timeout(7, () => {
                        instantiate(game, [...blueprint_pixie(game), transform([-20, 5, 0])]);
                    }),
                ]);
                instantiate(game, [
                    task_timeout(13, () => {
                        game.World.Mimic[camera_entity].Stiffness = 0.05;
                        destroy_all(game.World, starfield_entity);
                    }),
                ]);
            }
        ),
    ]);
}
