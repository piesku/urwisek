import {dispatch} from "./actions.js";
import {Game} from "./game.js";
import {scene_level1} from "./scenes/sce_level1.js";
import {scene_level2} from "./scenes/sce_level2.js";

let game = new Game();
false && scene_level1(game);
true && scene_level2(game);
game.Start();

// @ts-ignore
window.$ = dispatch.bind(null, game);

// @ts-ignore
window.game = game;
