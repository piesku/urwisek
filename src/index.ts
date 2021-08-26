import {dispatch} from "./actions.js";
import {Game} from "./game.js";
import {scene_level_city} from "./scenes/sce_level_city.js";
import {scene_stage} from "./scenes/sce_stage.js";

let game = new Game();
false && scene_stage(game);
true && scene_level_city(game);
game.Start();

// @ts-ignore
window.$ = dispatch.bind(null, game);

// @ts-ignore
window.game = game;
