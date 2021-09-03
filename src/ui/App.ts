import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {scene_intro} from "../scenes/sce_intro.js";
import {Settings} from "./Settings.js";

export function App(game: Game) {
    if (game.CurrentScene === scene_intro) {
        return game.CurrentView(game);
    }

    return "";
}

export function Title(game: Game) {
    return html`
        <div
            style="
                margin: 60vh 2vw 0;
                font-size: 12vw;
                font-weight: 600;
                line-height: .9;
            "
        >
            LEFT BEHIND
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
            <div>${Settings(game)}</div>
        </nav>
    `;
}

export function Intro(game: Game) {
    return html`
        <div
            style="
                animation: 8s ease-out 1s forwards intro;
            "
        >
            <div
                style="
                    margin: 60vh 2vw 0;
                    font-size: 4vw;
                "
            >
                Mankind has found a new home in the stars.<br />Life on Earth continues.
            </div>
        </div>
    `;
}
