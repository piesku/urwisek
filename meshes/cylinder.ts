import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_cylinder(gl: WebGLRenderingContext): Mesh {
    let vertex_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
    gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);

    let normal_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
    gl.bufferData(GL_ARRAY_BUFFER, normal_arr, GL_STATIC_DRAW);

    let texcoord_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
    gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr, GL_STATIC_DRAW);

    let weights_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
    gl.bufferData(GL_ARRAY_BUFFER, weights_arr, GL_STATIC_DRAW);

    let index_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
    gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr, GL_STATIC_DRAW);

    return {
        VertexBuffer: vertex_buf,
        VertexArray: vertex_arr,
        NormalBuffer: normal_buf,
        NormalArray: normal_arr,
        TexCoordBuffer: texcoord_buf,
        TexCoordArray: texcoord_arr,
        WeightsBuffer: weights_buf,
        WeightsArray: weights_arr,
        IndexBuffer: index_buf,
        IndexArray: index_arr,
        IndexCount: index_arr.length,
    };
}

// prettier-ignore
let vertex_arr = Float32Array.from([
    0.000, -0.250, -0.250,
    0.000, 0.250, -0.250,
    0.177, -0.250, -0.177,
    0.177, 0.250, -0.177,
    0.250, -0.250, 0.000,
    0.250, 0.250, 0.000,
    0.177, -0.250, 0.177,
    0.177, 0.250, 0.177,
    -0.000, -0.250, 0.250,
    -0.000, 0.250, 0.250,
    -0.177, -0.250, 0.177,
    -0.177, 0.250, 0.177,
    -0.250, -0.250, -0.000,
    -0.250, 0.250, -0.000,
    -0.177, -0.250, -0.177,
    -0.177, 0.250, -0.177
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    0.000, -0.630, -0.776,
    0.000, 0.630, -0.776,
    0.549, -0.630, -0.549,
    0.549, 0.630, -0.549,
    0.776, -0.630, 0.000,
    0.776, 0.630, 0.000,
    0.549, -0.630, 0.549,
    0.549, 0.630, 0.549,
    0.000, -0.630, 0.776,
    0.000, 0.630, 0.776,
    -0.549, -0.630, 0.549,
    -0.549, 0.630, 0.549,
    -0.776, -0.630, 0.000,
    -0.776, 0.630, 0.000,
    -0.549, -0.630, -0.549,
    -0.549, 0.630, -0.549
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([]);

// prettier-ignore
let weights_arr = Float32Array.from([]);

// prettier-ignore
let index_arr = Uint16Array.from([
    14, 10, 6,
    6, 2, 14,
    14, 12, 10,
    10, 8, 6,
    6, 4, 2,
    2, 0, 14,
    0, 1, 14,
    1, 15, 14,
    14, 15, 12,
    15, 13, 12,
    5, 9, 13,
    13, 1, 5,
    5, 7, 9,
    9, 11, 13,
    13, 15, 1,
    1, 3, 5,
    12, 13, 10,
    13, 11, 10,
    10, 11, 8,
    11, 9, 8,
    8, 9, 6,
    9, 7, 6,
    6, 7, 4,
    7, 5, 4,
    4, 5, 2,
    5, 3, 2,
    2, 3, 0,
    3, 1, 0
]);
