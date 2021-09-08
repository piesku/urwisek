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

let vec = (arr) => (arr ? "[" + round(arr).join(", ") + "]" : "undefined");
let vec2 = (arr) => (arr ? round(arr) : undefined);

let round = (arr) => arr.map((v) => v && v.toFixed && parseFloat(v.toFixed(2)));

let imports = new Set([
    'import {Blueprint, instantiate} from "../../common/game.js";',
    'import {from_euler} from "../../common/quat.js";',
    'import {Game} from "../game.js";',
    'import {transform} from "../components/com_transform.js";',
    'import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";',
    'import {render_colored_shadows} from "../components/com_render.js";',
    'import { Quat, Vec3 } from "../../common/math.js";',
]);

let elements = {};
let blueprints = {};
let create_instance = (name, translation, rotation, scale) => {
    switch (name) {
        case "lisek":
            return "";
        case "ogon":
        case "exit":
        case "end":
        case "bush":
        case "tree":
        case "ground":
        case "rock":
        case "box":
        case "crib":
        case "monster":
        case "branch":
        case "pushable_branch":
        case "obstacle_branch":
        case "obstacle_car":
        case "obstacle_house":
        case "obstacle_slup":
        case "obstacle_barn":
        case "obstacle_fence":
        case "spawn_bird":
        case "spawn_animal":
        case "launchpad":
            imports.add(`import {blueprint_${name}} from "../blueprints/blu_${name}.js";`);

            blueprints[name] = `blueprint_${name}`;
            elements[name] = elements[name] || [];
            elements[name].push([vec2(translation), vec2(rotation), vec2(scale)]);
            break;
        default:
            imports.add(`import {prop_${name}} from "../props/prop_${name}.js";`);

            blueprints[name] = `prop_${name}`;
            elements[name] = elements[name] || [];
            elements[name].push([vec2(translation), vec2(rotation), vec2(scale)]);
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

let transforms: Record<string, Array<[Vec3, Quat?, Vec3?]>> = ${JSON.stringify(elements)
    .replace(/\,null\,null\]/gi, "]")
    .replace(/\,null\]/gi, "]")
    .replace(/null/gi, "undefined")};

let blueprints: Record<string, (game: Game) => Blueprint<Game>> = {
    ${Object.keys(blueprints)
        .map((key) => `${key}: ${blueprints[key]}`)
        .join(",\n")}
};

export function map_${scene_name}(game: Game) {
${nodes}

    instantiate(game, [
        ...blueprint_sun_light(game),
        transform(),
    ]);

    instantiate(game, [
        ...blueprint_sun_shadow(game),
        transform(),
    ]);

    for (let key of Object.keys(transforms)) {
        let blueprint = blueprints[key];
        for (let i = 0; i < transforms[key].length; i++) {
            instantiate(game, [
                transform(transforms[key][i][0], transforms[key][i][1], transforms[key][i][2]),
                ...blueprint(game),
            ]);
        }
    }
}`;

console.log(result);
