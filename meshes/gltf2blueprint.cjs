#!/usr/bin/env node

const {readFileSync, writeFileSync} = require("fs");
const path = require("path");

if (process.argv.length !== 3) {
    console.error("Provide a GLTF file on stdin and the name of the blueprint:");
    console.error("  cat foo.gltf | node gltf2blueprint.cjs foo");
    process.exit(1);
}

process.stdin.resume();
let json = readFileSync(process.stdin.fd, "utf8");
process.stdin.pause();

let blueprint_name = process.argv[2]
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

let vec = (arr) =>
    arr ? "[" + arr.map((v) => parseFloat(v.toFixed(3))).join(", ") + "]" : "undefined";

let create_child = (mesh, translation, rotation, scale, color) => {
    return `
    [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.Mesh${mesh},
            ${vec(color)}
        ),
    ]`;
};

let gltf = JSON.parse(json);
let nodes = gltf.nodes;
let colors = gltf.materials.map((mat) =>
    mat.pbrMetallicRoughness.baseColorFactor.map((col) => parseFloat(col.toFixed(3)))
);
let color_map = gltf.meshes.reduce((acc, curr) => {
    acc[curr.name] = colors[curr.primitives[0].material];
    return acc;
}, {});

let result = `\
import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_${blueprint_name}(game: Game) {
    return [
        children(${nodes
            .map((node) =>
                create_child(
                    node.name.split(".")[0],
                    node.translation.map((e) => e / 2),
                    node.rotation,
                    node.scale,
                    color_map[node.name] || color_map["Cylinder.001"]
                )
            )
            .join(",\n")}),
    ];
}
`;

writeFileSync(path.join("..", "src", "blueprints", `blu_${blueprint_name}.ts`), result);
