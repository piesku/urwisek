import {Action} from "../actions.js";
import {Game} from "../game.js";

export function App(game: Game) {
    return game.CurrentView(game);
}

export function Title(game: Game) {
    return `
        <div
            style="
                margin: 40vh 2vw 0;
                font-size: 16vw;
                font-weight: 600;
            "
        >
            EXODUS
        </div>
        <nav
            style="
                margin: 2vh 3vw;
                font-size: 1rem;
                font-style: italic;
                line-height: 2;
            "
        >
            <div onclick="$(${Action.NewGame})">New Game</div>
        </nav>
    `;
}

export function Play(game: Game) {
    return "";
}

export function End(game: Game) {
    return `
        <div
            style="
                margin: 20vh 2vw 0;
                font-size: 12vw;
                font-weight: 600;
                opacity: 0;
                animation: 1s 4s forwards fadein;
            "
        >
            THE END
        </div>
    `;
}
