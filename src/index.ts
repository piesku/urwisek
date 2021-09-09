import {dispatch} from "./actions.js";
import {Game} from "./game.js";
import {scene_intro} from "./scenes/sce_intro.js";

let game = new Game();
scene_intro(game);
game.Start();

// @ts-ignore
window.$ = dispatch.bind(null, game);
