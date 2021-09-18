import {instantiate} from "../common/game.js";
import {Control, control_player} from "./components/com_control_player.js";
import {mimic} from "./components/com_mimic.js";
import {find_first} from "./components/com_named.js";
import {task_timeout} from "./components/com_task.js";
import {Game} from "./game.js";
import {scene_intro} from "./scenes/sce_intro.js";
import {scene_level2} from "./scenes/sce_level2.js";
import {scene_level3} from "./scenes/sce_level3.js";
import {snd_ping} from "./sounds/snd_ping.js";
import {End, Play} from "./ui/App.js";
import {Has} from "./world.js";

export const enum Action {
    ChangeSettings,
    NewGame,
    NextScene,
    EndGame,
    MonsterStep,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        // case Action.ChangeSettings: {
        //     let select = payload as HTMLSelectElement;
        //     game.Quality = select.value as unknown as number;
        //     break;
        // }

        case Action.NewGame: {
            game.Audio.resume();
            game.CurrentView = Play;
            break;
        }

        case Action.NextScene: {
            switch (game.CurrentScene) {
                case scene_intro:
                case scene_level2:
                    instantiate(game, [
                        task_timeout(2, () => {
                            requestAnimationFrame(() => {
                                game.CurrentScene(game);
                                game.CurrentView = Play;
                            });
                        }),
                    ]);
                    break;
            }

            switch (game.CurrentScene) {
                case scene_intro:
                    game.CurrentScene = scene_level2;
                    break;
                case scene_level2:
                    game.CurrentScene = scene_level3;
                    break;
            }

            let pup_entity = find_first(game.World, "pup");
            let pup_anchor = find_first(game.World, "pa " + game.PupsFound);

            game.World.AudioSource[pup_entity].Trigger = snd_ping;
            mimic(pup_anchor, 0.2)(game, pup_entity);
            let pup_lisek = game.World.Children[pup_entity].Children[0];
            control_player(Control.Animate)(game, pup_lisek);

            game.PupsFound++;
            break;
        }

        case Action.EndGame: {
            for (let i = 0; i < game.World.Signature.length; i++) {
                game.World.Signature[i] &= ~Has.ControlPlayer;
            }

            let launchpad_entity = find_first(game.World, "launchpad");
            game.World.Signature[launchpad_entity] |=
                Has.ControlAlways | Has.AudioSource | Has.Lifespan;

            instantiate(game, [
                task_timeout(2, () => {
                    game.CurrentView = End;
                }),
            ]);

            break;
        }
    }
}
