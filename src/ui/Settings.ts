import {QualitySettings} from "../../common/game.js";
import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";

export function Settings(game: Game) {
    return html`
        Quality:
        <select onchange="$(${Action.ChangeSettings}, this)">
            <option
                value="${QualitySettings.Low}"
                ${game.Quality === QualitySettings.Low && "selected"}
            >
                Low
            </option>
            <option
                value="${QualitySettings.Medium}"
                ${game.Quality === QualitySettings.Medium && "selected"}
            >
                Medium
            </option>
            <option
                value="${QualitySettings.High}"
                ${game.Quality === QualitySettings.High && "selected"}
            >
                High
            </option>
            <option
                value="${QualitySettings.Ultra}"
                ${game.Quality === QualitySettings.Ultra && "selected"}
            >
                Ultra
            </option>
        </select>
    `;
}
