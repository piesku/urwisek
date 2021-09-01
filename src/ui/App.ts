import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {scene_intro} from "../scenes/sce_intro.js";

export function App(game: Game) {
    if (game.CurrentScene === scene_intro) {
        return game.CurrentView();
    }

    return "";
}

export function Title() {
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
        <div
            onclick="$(${Action.NewGame})"
            style="
                position: absolute;
                right: 2vw;
                bottom: 2vw;
                font-size: 1rem;
                font-style: italic;
                animation: 2s infinite blink;
            "
        >
            New Game
        </div>
    `;
}

export function Intro() {
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
