import {html} from "../../common/html.js";
import {Game} from "../game.js";

export function App(game: Game) {
    return html`
        <div
            style="
                animation: 8s ease-out 5s forwards intro;
            "
        >
            <div
                style="
                    font-family: Arial;
                    font-size: 40vmin;
                    font-weight: 600;
                    color: #fff;
                    line-height: .9;
                "
            >
                LEFT BEHIND
            </div>
            <div
                style="
                    position: relative;
                    left: 4vh;
                    font-family: Arial;
                    font-size: 3vh;
                    color: #fff;
                "
            >
                A game by Piesku.
            </div>
        </div>
    `;
}
