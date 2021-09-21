import {Action} from "../actions.js";
import {Game} from "../game.js";

export function App(game: Game) {
    return game.CurrentView(game);
}

export function Title(game: Game) {
    return `
        <div
            style="
                margin: 40vh -1vw 0;
                font-size: 16vw;
                font-weight: 600;
            "
        >
            ESCAPE
        </div>
        <div>
            Earth can no longer support life.<br>
            Humans are leaving.<br><br>
            <em onclick="$(${Action.NewGame})">Play Now</em>
        </div>
    `;
}

export function Play(game: Game) {
    return "";
}

export function End(game: Game) {
    return `
        <div
            style="
                margin: 20vh -1vw 0;
                font-size: 12vw;
                font-weight: 600;
            "
        >
            THE END
        </div>
        <div>
            Not all of us will make it.<br>
            Stop climate change now.<br>
        </div>
    `;
}
