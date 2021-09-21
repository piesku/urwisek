#!/usr/bin/env node

const {readFileSync, writeFileSync} = require("fs");
const path = require("path");

if (process.argv.length !== 3) {
    console.error("Provide a GLTF file on stdin and the name of the scene:");
    console.error("  cat foo.gltf | node gltf2map.cjs foo");
    process.exit(1);
}

function float(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
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
    arr ? "[" + arr.map((v) => parseFloat(v.toFixed(2))).join(", ") + "]" : "undefined";

let imports = new Set([
    'import {instantiate} from "../../common/game.js";',
    'import {from_euler} from "../../common/quat.js";',
    'import {Game} from "../game.js";',
    'import {transform} from "../components/com_transform.js";',
    'import {blueprint_sun_light, blueprint_sun_shadow} from "../blueprints/blu_sun.js";',
    'import {render_colored_shadows} from "../components/com_render.js";',
]);

let create_instance = (name, translation, rotation, scale) => {
    switch (name) {
        case "lisek":
            return "";
        case "ogon":
            return `
    instantiate(game, [
        transform(${vec(translation)}, from_euler([0, 0, 0, 1], 0, 90, 0), ${vec(scale)}),
        render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
    ]);`;
        case "exit":
            imports.add(`import {blueprint_pup} from "../blueprints/blu_pup.js";`);
            imports.add(`import {blueprint_${name}} from "../blueprints/blu_${name}.js";`);
            return `
    instantiate(game, [
        transform(${vec(translation)}),
        ...blueprint_${name}(game),
    ]);

    instantiate(game, [
        transform(${vec(translation)}, [0, -0.71, 0, 0.71]),
        ...blueprint_pup(game),
    ]); `;
        case "end":
            imports.add(`import {blueprint_${name}} from "../blueprints/blu_${name}.js";`);
            return `
    instantiate(game, [
        transform(${vec(translation)}),
        ...blueprint_${name}(game),
    ]); `;
        case "flora":
            imports.add(`import {blueprint_tree} from "../blueprints/blu_tree.js";`);
            imports.add(`import {blueprint_bush} from "../blueprints/blu_bush.js";`);
            imports.add(`import {float, element} from "../../common/random.js";`);
            const FORESTIVITIES = {
                forest: 0.8,
                city: 0.3,
                farm: 0.5,
            };
            const forestivity = FORESTIVITIES[scene_name];
            return `
        {
            let width = ${Math.round(scale[0])};
            let depth = ${Math.round(scale[2])};
            let centerX = ${translation[0].toFixed(2)};
            let centerZ = ${translation[2].toFixed(2)};

            let Xmin = centerX - ~~(width / 2);
            let Xmax = centerX + ~~(width / 2);
            let Zmin = centerZ - ~~(depth / 2);
            let Zmax = centerZ + ~~(depth / 2);

            let number_of_trees = ~~((width * depth)/${scale[1]} * ${forestivity});
            for (let i = 0; i < number_of_trees; i++) {
                instantiate(game, [
                    transform([float(Xmin, Xmax), ${translation[1]}, float(Zmin, Zmax)]${
                scale[1] > 1 ? `, undefined, [${scale[1]}, ${scale[1] / 2}, ${scale[1]}]` : ""
            }),
                    ...element([blueprint_tree(game), blueprint_bush(game)])
                ]);
            }
        }
            `;
            break;
        case "ground":
            imports.add(`import {blueprint_${name}} from "../blueprints/blu_${name}.js";`);
            imports.add(`import {Vec4} from "../../common/math.js";`);
            return `
    instantiate(game, [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        ...blueprint_${name}(game, ground_color),
    ]);`;
        case "bush":
        case "tree":
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
        case "launchpad":
        case "fire":
        case "blok":
            imports.add(`import {blueprint_${name}} from "../blueprints/blu_${name}.js";`);
            return `
    instantiate(game, [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        ...blueprint_${name}(game),
    ]);`;
        case "spawn_bird":
            imports.add(`import {blueprint_bird} from "../blueprints/blu_bird.js";`);
            imports.add(`import {children} from "../components/com_children.js";`);
            imports.add(`import {cull} from "../components/com_cull.js";`);
            imports.add(`import {shake} from "../components/com_shake.js";`);
            imports.add(`import {spawn} from "../components/com_spawn.js";`);
            imports.add(`import {Has} from "../world.js";`);
            return `
    instantiate(game, [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(Has.Shake | Has.Spawn)]),
    ]);`;
        case "spawn_animal":
            imports.add(`import {blueprint_animal} from "../blueprints/blu_animal.js";`);
            imports.add(`import {spawn} from "../components/com_spawn.js";`);
            imports.add(`import {Has} from "../world.js";`);
            return `
    instantiate(game, [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        spawn(blueprint_animal, 1),
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

export function map_${scene_name}(game: Game, ground_color: Vec4 = [
            82 / 255,
            39 / 255,
            5 / 255,
            1,
        ]) {
${nodes.replace(/\, undefined\, undefined\)/gi, ")").replace(/\, undefined\)/gi, ")")}

    instantiate(game, [
        ...blueprint_sun_light(game),
        transform(),
    ]);

    instantiate(game, [
        ...blueprint_sun_shadow(game),
        transform(),
    ]);
}`;

console.log(result);
