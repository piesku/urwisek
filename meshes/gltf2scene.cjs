#!/usr/bin/env node

const {readFileSync, writeFileSync} = require("fs");
const path = require("path");

if (process.argv.length !== 3) {
    console.error("Provide a GLTF file on stdin and the name of the scene:");
    console.error("  cat foo.gltf | node gltf2scene.cjs foo");
    process.exit(1);
}

process.stdin.resume();
let json = readFileSync(process.stdin.fd, "utf8");
process.stdin.pause();

let scene_name = process.argv[2]
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

let vec = (arr) =>
    arr ? "[" + arr.map((v) => parseFloat(v.toFixed(3))).join(", ") + "]" : "undefined";

let starting_translation = [0, 0, 0];

let create_instance = (name, translation, rotation, scale) => {
    switch (name) {
        case "lisek":
            starting_translation = translation || starting_translation;
            return `
    instantiate_player(game, ${vec(translation)});
    `;
        case "ogon":
            return `
    instantiate(game, [
        transform(${vec(translation)}, from_euler([0, 0, 0, 1], 0, 90, 0), ${vec(scale)}),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);
    `;
        default:
            return `
    instantiate(game, [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        ...prop_${name}(game),
    ]);`;
    }
};

let gltf = JSON.parse(json);
let nodes = gltf.nodes;

let result = `\
import {instantiate} from "../../common/game.js";
import {from_euler} from "../../common/quat.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_sun} from "../blueprints/blu_sun.js";
import {blueprint_bush, blueprint_tree} from "../blueprints/blu_tree.js";
import {instantiate_player} from "../blueprints/blu_player.js";
import {prop_barn} from "../props/prop_barn.js";
import {prop_car2} from "../props/prop_car2.js";
import {prop_fence} from "../props/prop_fence.js";
import {prop_silo} from "../props/prop_silo.js";
import {prop_slup} from "../props/prop_slup.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_${scene_name}(game: Game) {
    game.World = new World();
    game.ViewportResized = true;

    instantiate(game, [
        transform(undefined, from_euler([0, 0, 0, 1], 0, 90, 0)),
        ...blueprint_sun(game),
    ]);

    ${nodes
        .map((node) =>
            create_instance(
                node.name.toLowerCase().split(".")[0],
                node.translation,
                node.rotation,
                node.scale
            )
        )
        .join("\n")}

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game, [255 / 255, 215 / 255, 55 / 255, 1]),
        transform(${vec(starting_translation)}, from_euler([0, 0, 0, 1], -30, 0, 0)),
    ]);
}
`;

writeFileSync(path.join("..", "src", "scenes", `sce_${scene_name}.ts`), result);
