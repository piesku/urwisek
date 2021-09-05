import {Entity} from "../common/world.js";
import {Game} from "./game.js";
import {scene_intro} from "./scenes/sce_intro.js";
import {scene_level1} from "./scenes/sce_level1.js";
import {scene_level2} from "./scenes/sce_level2.js";
import {scene_level3} from "./scenes/sce_level3.js";
import {End, Intro, Play} from "./ui/App.js";
import {Has} from "./world.js";

export const enum Action {
    ToggleFullscreen,
    ChangeSettings,
    NewGame,
    NextScene,
    EndGame,
    MonsterStep,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.ToggleFullscreen: {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.body.requestFullscreen();
            }
            break;
        }

        case Action.ChangeSettings: {
            let select = payload as HTMLSelectElement;
            game.Quality = parseInt(select.value);
            break;
        }

        case Action.NewGame: {
            game.CurrentView = Intro;
            break;
        }

        case Action.NextScene: {
            switch (game.CurrentScene) {
                case scene_intro:
                case scene_level1:
                    game.CurrentScene = scene_level2;
                    break;
                case scene_level2:
                    game.CurrentScene = scene_level3;
                    break;
            }

            game.PupsFound++;
            game.CurrentScene(game);
            game.CurrentView = Play;
            break;
        }

        case Action.EndGame: {
            let [trigger_entity] = payload as [Entity, Entity];
            game.World.Signature[trigger_entity] &= ~Has.Trigger;

            for (let i = 0; i < game.World.Signature.length; i++) {
                game.World.Signature[i] &= ~Has.ControlPlayer;
            }

            game.CurrentView = End;
            break;
        }
    }
}
