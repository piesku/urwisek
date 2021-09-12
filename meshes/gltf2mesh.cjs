#!/usr/bin/env node

const {readFileSync} = require("fs");

if (process.argv.length !== 3) {
    console.error("Provide a GLTF file on stdin and the name of the mesh:");
    console.error("  cat foo.gltf | node gltf2mesh.cjs foo");
    process.exit(1);
}

const DEC = 2;
process.stdin.resume();
let json = readFileSync(process.stdin.fd, "utf8");
process.stdin.pause();

function break_every(count, elements, decimals = 0) {
    if (elements.length === 0) {
        return "";
    }

    let output = "\n    " + elements[0].toFixed(decimals);
    for (let i = 1; i < elements.length; i++) {
        let elem = elements[i].toFixed(decimals);
        if (i % count > 0) {
            output += ", " + elem;
        } else {
            output += ",\n    " + elem;
        }
    }
    return output + "\n";
}

function data_uri_to_buffer(uri) {
    let data = uri.split(",")[1];
    let buf = Buffer.from(data, "base64");
    return buf;
}

let gltf = JSON.parse(json);
let buffer = data_uri_to_buffer(gltf.buffers[0].uri);

let mesh = gltf.meshes[0];
let primitive = mesh.primitives[0];

let position_accessor = gltf.accessors[primitive.attributes.POSITION];
let position_view = gltf.bufferViews[position_accessor.bufferView];
let position_data = new Float32Array(
    buffer.buffer,
    buffer.byteOffset + position_view.byteOffset,
    position_view.byteLength / 4
);

let vertex_count = position_data.length / 3;

let normal_accessor = gltf.accessors[primitive.attributes.NORMAL];
let normal_view = gltf.bufferViews[normal_accessor.bufferView];
let normal_data = new Float32Array(
    buffer.buffer,
    buffer.byteOffset + normal_view.byteOffset,
    normal_view.byteLength / 4
);

let joints_data;
if (primitive.attributes.JOINTS_0) {
    let joints_accessor = gltf.accessors[primitive.attributes.JOINTS_0];
    let joints_view = gltf.bufferViews[joints_accessor.bufferView];
    joints_data = new Uint8Array(
        buffer.buffer,
        buffer.byteOffset + joints_view.byteOffset,
        joints_view.byteLength
    );
} else {
    joints_data = new Uint8Array();
}

let weights_data;
if (primitive.attributes.WEIGHTS_0) {
    let weights_accessor = gltf.accessors[primitive.attributes.WEIGHTS_0];
    let weights_view = gltf.bufferViews[weights_accessor.bufferView];
    weights_data = new Float32Array(
        buffer.buffer,
        buffer.byteOffset + weights_view.byteOffset,
        weights_view.byteLength / 4
    );
} else {
    weights_data = new Float32Array();
}

let index_accessor = gltf.accessors[primitive.indices];
let index_view = gltf.bufferViews[index_accessor.bufferView];
let index_data = new Uint16Array(
    buffer.buffer,
    buffer.byteOffset + index_view.byteOffset,
    index_view.byteLength / 2
);

let weighted_joints = [];
if (joints_data.length > 0 && weights_data.length > 0) {
    for (let i = 0; i < vertex_count; i++) {
        weighted_joints.push(
            joints_data[4 * i + 0],
            weights_data[4 * i + 0],
            joints_data[4 * i + 1],
            weights_data[4 * i + 1]
        );
    }
}

console.log(`\
import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_${process.argv[2]}(gl: WebGLRenderingContext): Mesh {
    let vertex_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
    gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);

    let normal_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
    gl.bufferData(GL_ARRAY_BUFFER, normal_arr, GL_STATIC_DRAW);

    let weights_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
    gl.bufferData(GL_ARRAY_BUFFER, weights_arr, GL_STATIC_DRAW);

    let index_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
    gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr, GL_STATIC_DRAW);

    return {
        VertexBuffer: vertex_buf,
        NormalBuffer: normal_buf,
        WeightsBuffer: weights_buf,
        IndexBuffer: index_buf,
        IndexCount: index_arr.length,
    };
}

// prettier-ignore
let vertex_arr = Float32Array.from([${break_every(3, position_data, DEC)}]);

// prettier-ignore
let normal_arr = Float32Array.from([${break_every(3, normal_data, DEC)}]);

// prettier-ignore
let weights_arr = Float32Array.from([${break_every(4, weighted_joints, DEC)}]);

// prettier-ignore
let index_arr = Uint16Array.from([${break_every(
    3,
    Array.from(index_data)
        // Flatten faces into one big index array.
        .flat(1)
        // Both Blender and Assimp triangulate polygons starting from the first
        // vertex and going CCW tri-by-tri. The result is that adjacent tris
        // share their first vertex rather than the last which breaks flat
        // shading. In OpenGL, the provoking vertex of a primitive is by
        // default set to the last one. WebGL doesn't expose the
        // glProvokingVertex API to change the default. By reversing the index
        // array, the tri get drawn in reverse order and the shared vertices
        // become last.
        .reverse()
)}]);`);

if (gltf.skins) {
    let skin = gltf.skins[0];
    let bind_poses_accessor = gltf.accessors[skin.inverseBindMatrices];
    let bind_poses_view = gltf.bufferViews[bind_poses_accessor.bufferView];
    let bind_poses_data = new Float32Array(
        buffer.buffer,
        buffer.byteOffset + bind_poses_view.byteOffset,
        bind_poses_view.byteLength / 4
    );

    console.log("\n/*");
    for (let j = 0; j < bind_poses_accessor.count; j++) {
        let mat = bind_poses_data.subarray(j * 16, j * 16 + 16);
        console.log(Array.from(mat, (x) => x.toFixed(DEC)).join(", "));
    }
    console.log("*/");
}
