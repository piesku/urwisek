#!/usr/bin/env node

const {readFileSync, writeFileSync} = require("fs");
const path = require("path");

if (process.argv.length !== 3) {
    console.error("Provide a GLTF file on stdin and the name of the scene:");
    console.error("  cat foo.gltf | node gltf2map.cjs foo");
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
let imports = new Set([
    'import {instantiate} from "../../common/game.js";',
    'import {from_euler} from "../../common/quat.js";',
    'import {Game} from "../game.js";',
    'import { transform } from "../components/com_transform.js";',
    'import { blueprint_sun } from "../blueprints/blu_sun.js";',
    'import { render_colored_shadows } from "../components/com_render.js";',
]);

let create_instance = (name, translation, rotation, scale) => {
    switch (name) {
        case "lisek":
            imports.add(`import {instantiate_player} from "../blueprints/blu_player.js";`);
            starting_translation = translation || starting_translation;
            return `
    instantiate_player(game, ${vec(translation)});`;
        case "ogon":
            return `
    instantiate(game, [
        transform(${vec(translation)}, from_euler([0, 0, 0, 1], 0, 90, 0), ${vec(scale)}),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);`;
        case "ground":
        case "bush":
        case "tree":
        case "box":
        case "obstacle_car":
        case "obstacle_house":
        case "obstacle_slup":
        case "obstacle_barn":
        case "obstacle_fence":
            imports.add(`import {blueprint_${name}} from "../blueprints/blu_${name}.js";`);
            return `
    instantiate(game, [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        ...blueprint_${name}(game),
    ]);`;
        default:
            imports.add(`import {prop_${name}} from "../props/prop_${name}.js";`);
            return `
    instantiate(game, [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        ...prop_${name}(game),
    ]);`;
    }
};

let gltf = JSON.parse(json);
let nodes = gltf.nodes
    .map((node) =>
        create_instance(
            node.name.toLowerCase().split(".")[0],
            node.translation,
            node.rotation,
            node.scale
        )
    )
    .join("\n");

let result = `\
${Array.from(imports).join("\n")}

export function map_${scene_name}(game: Game) {
    instantiate(game, [
        transform(undefined, from_euler([0, 0, 0, 1], 0, 90, 0)),
        ...blueprint_sun(game),
    ]);
${nodes}
}`;

console.log(result);
