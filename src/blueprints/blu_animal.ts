import {Vec4} from "../../common/math.js";
import {element, float} from "../../common/random.js";
import {children} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {cull} from "../components/com_cull.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {blueprint_lisek} from "./blu_lisek.js";

const colors: Array<Vec4> = [
    [0.1, 0.1, 0.1, 1],
    [0.2, 0.2, 0.2, 1],
];

export function blueprint_animal(game: Game) {
    let r = float();

    if (r < 0.1) {
        return [
            control_always([0, 0, 1], null, "walk"),
            move(float(1, 1.2), 0),
            lifespan(100),
            children([
                transform(undefined, undefined, [2, 2, 2]),
                cull(Has.Render | Has.Children),
                ...blueprint_lisek(game, 1, undefined, element(colors)),
            ]),
        ];
    }

    if (r < 0.5) {
        return [
            control_always([0, 0, 1], null, "walk"),
            move(float(2, 2.2), 0),
            lifespan(50),
            children([
                transform(undefined, undefined, [1, 1.5, 1]),
                cull(Has.Render | Has.Children),
                ...blueprint_lisek(game, 0.2, undefined, element(colors)),
            ]),
        ];
    }

    return [
        control_always([0, 0, 1], null, "jump"),
        move(float(3, 3.2), 0),
        lifespan(30),
        children([
            transform(undefined, undefined, [0.5, 0.5, 1]),
            cull(Has.Render | Has.Children),
            ...blueprint_lisek(game, 0.1, undefined, element(colors)),
        ]),
    ];
}
