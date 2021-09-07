import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {Settings} from "./Settings.js";

export function App(game: Game) {
    return game.CurrentView(game);
}

export function Title(game: Game) {
    return html`
        <div
            style="
                margin: 40vh 2vw 0;
                font-size: 16vw;
                font-weight: 600;
            "
        >
            NOAH
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
                animation: 6s ease-out 1s forwards intro;
            "
        >
            <div
                style="
                    margin: 60vh 2vw 0;
                    font-size: 4vw;
                "
            >
                Humans have destroyed Earth and ran away.<br />Reach the Ark!
            </div>
        </div>
    `;
}

export function Play(game: Game) {
    return "";
}

export function End(game: Game) {
    return html`
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
