import {children} from "../components/com_children.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {prop_panelki} from "../props/prop_panelki.js";

export function blueprint_blok(game: Game) {
    return [
        children(
            [transform(), ...prop_panelki(game)],
            [transform([0, 2.2, 0], [0, 1, 0, 0]), ...prop_panelki(game)],
            [transform([0, 2.2 * 2, 0]), ...prop_panelki(game)]
        ),
    ];
}
