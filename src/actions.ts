import {Game} from "./game.js";
import {scene_intro} from "./scenes/sce_intro.js";
import {scene_level1} from "./scenes/sce_level1.js";
import {scene_level2} from "./scenes/sce_level2.js";
import {Intro} from "./ui/App.js";

export const enum Action {
    ToggleFullscreen,
    ChangeSettings,
    NewGame,
    NextScene,
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
                    alert("Thanks for playtesting!");
                    game.CurrentScene = scene_intro;
                    break;
            }

            game.CurrentScene(game);
            break;
        }
    }
}
