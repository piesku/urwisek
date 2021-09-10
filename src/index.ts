import {dispatch} from "./actions.js";
import {Game} from "./game.js";
import {scene_level2} from "./scenes/sce_level2.js";
import {scene_level3} from "./scenes/sce_level3.js";
import {scene_stage} from "./scenes/sce_stage.js";

let game = new Game();
// Bundle all scenes into the build.
// @ts-ignore
window.scenes = [scene_level2, scene_level3, scene_stage];
// @ts-ignore ⮮ CHANGE ME HERE.
window.scenes[0](game);
game.Start();

// @ts-ignore
window.$ = dispatch.bind(null, game);

// @ts-ignore
window.game = game;
