import {Game} from "./game.js";
import {Intro} from "./ui/App.js";

export const enum Action {
    ToggleFullscreen,
    NewGame,
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
        case Action.NewGame: {
            game.CurrentView = Intro;
            break;
        }
    }
}
