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

let vec = (arr) => (arr ? "[" + arr.join(", ") + "]" : "undefined");

let create_child = (mesh, translation, rotation, scale) => {
    return `
    [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        render_colored_shaded(
            game.MaterialColoredShaded,
            game.Mesh${mesh},
            color
        ),
    ]`;
};

let gltf = JSON.parse(json);
let nodes = gltf.nodes;

let result = `\
import {Vec4} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

let color: Vec4 = [0.4, 0.2, 0.5, 1];
export function blueprint_${blueprint_name}(game: Game) {
    return [
        children(${nodes
            .map((node) =>
                create_child(node.name.split(".")[0], node.translation, node.rotation, node.scale)
            )
            .join(",\n")}),
    ];
}
`;

writeFileSync(path.join("..", "src", "blueprints", `blu_${blueprint_name}.ts`), result);
