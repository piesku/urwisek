import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_lisek} from "../blueprints/blu_lisek.js";
import {blueprint_pixie} from "../blueprints/blu_pixie.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {blueprint_rocket} from "../blueprints/blu_rocket.js";
import {audio_source} from "../components/com_audio_source.js";
import {children, destroy_all} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {disable} from "../components/com_disable.js";
import {emit_particles} from "../components/com_emit_particles.js";
import {lifespan} from "../components/com_lifespan.js";
import {mimic} from "../components/com_mimic.js";
import {move} from "../components/com_move.js";
import {find_first, named} from "../components/com_named.js";
import {render_particles_colored} from "../components/com_render.js";
import {shake} from "../components/com_shake.js";
import {spawn} from "../components/com_spawn.js";
import {task_timeout, task_until} from "../components/com_task.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {snd_chirp1} from "../sounds/snd_chirp1.js";
import {snd_horn} from "../sounds/snd_horn.js";
import {snd_wind} from "../sounds/snd_wind.js";
import {Play} from "../ui/App.js";
import {Has, World} from "../world.js";
import {map_forest} from "./map_forest.js";

export function scene_intro(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    instantiate(game, [
        children([audio_source(snd_horn)], [audio_source(snd_chirp1)], [audio_source(snd_wind)]),
    ]);

    let camera_anchor_intro = instantiate(game, [transform([0, 0.5, -3]), named("ca")]);

    let player_entity = instantiate_player(game);
    game.World.Signature[player_entity] &= ~Has.ControlPlayer;

    map_forest(game);

    let starfield_entity = instantiate(game, [
        transform([0, 26, -2], from_euler([0, 0, 0, 1], 10, 0, 0), [17, 10, 1]),
        children([
            transform(),
            shake(0.5),
            emit_particles(20, 0.1, 0),
            render_particles_colored([1, 1, 1, 1], 5, [0.5, 0.5, 1, 1], 2),
        ]),
    ]);

    let rocket_spawner_entity = instantiate(game, [
        transform([-5, 20, -1], from_euler([0, 0, 0, 1], -45, 110, 0)),
        children([transform(), shake(3), spawn(blueprint_rocket, 3)]),
    ]);

    let camera_entity = instantiate(game, [
        ...blueprint_camera(game, [0.4, 0.6, 0.4, 1]),
        transform([0, 25, 0], from_euler([0, 0, 0, 1], 10, 0, 0)),
        mimic(find_first(game.World, "ca"), 0.02),
        disable(Has.Mimic),
    ]);

    let pups = [
        instantiate(game, [
            ...blueprint_lisek(game, [1, 0.5, 0, 1], 0.7),
            transform([1, 0, 0], [0, 0.71, 0, 0.71], [0.3, 0.3, 0.3]),
            move(2.5, 0),
        ]),
        instantiate(game, [
            ...blueprint_lisek(game, [1, 0.5, 0, 1], 0.8),
            transform([0.3, 0, -0.5], [0, 0.71, 0, 0.71], [0.3, 0.3, 0.3]),
            move(2.6, 0),
        ]),
        instantiate(game, [
            ...blueprint_lisek(game, [1, 0.5, 0, 1], 0.9),
            transform([-0.2, 0, 0.3], [0, 0.71, 0, 0.71], [0.3, 0.3, 0.3]),
            move(2.7, 0),
        ]),
    ];

    // The into animation.
    instantiate(game, [
        task_until(
            () => game.CurrentView === Play,
            () => {
                // No more rockets.
                destroy_all(game.World, rocket_spawner_entity);

                instantiate(game, [
                    children(
                        [
                            task_timeout(1, () => {
                                // Pedestal the camera down.
                                game.World.Signature[camera_entity] |= Has.Mimic;
                            }),
                        ],
                        [
                            task_timeout(6, () => {
                                // The pups flee.
                                for (let pup of pups) {
                                    control_always([0, 0, 1], null, "j")(game, pup);
                                    lifespan(7)(game, pup);
                                }
                            }),
                        ],
                        [
                            task_timeout(8, () => {
                                // No more stars.
                                destroy_all(game.World, starfield_entity);

                                // Increase the camera's responsiveness.
                                let mimic = game.World.Mimic[camera_entity];
                                mimic.Target = find_first(
                                    game.World,
                                    "ca",
                                    camera_anchor_intro + 1
                                );
                                mimic.Stiffness = 0.05;

                                // Spawn the pixie.
                                instantiate(game, [
                                    ...blueprint_pixie(game),
                                    transform([-20, 5, 0]),
                                ]);
                            }),
                        ],
                        [
                            task_timeout(9, () => {
                                game.World.Signature[player_entity] |= Has.ControlPlayer;
                            }),
                        ]
                    ),
                ]);
            }
        ),
    ]);
}
