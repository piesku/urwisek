import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_cylinder(gl: WebGLRenderingContext): Mesh {
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
let vertex_arr = Float32Array.from([
    0.00, -0.50, -0.50,
    0.00, 0.50, -0.50,
    0.35, -0.50, -0.35,
    0.35, 0.50, -0.35,
    0.50, -0.50, 0.00,
    0.50, 0.50, 0.00,
    0.35, -0.50, 0.35,
    0.35, 0.50, 0.35,
    -0.00, -0.50, 0.50,
    -0.00, 0.50, 0.50,
    -0.35, -0.50, 0.35,
    -0.35, 0.50, 0.35,
    -0.50, -0.50, -0.00,
    -0.50, 0.50, -0.00,
    -0.35, -0.50, -0.35,
    -0.35, 0.50, -0.35
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    0.00, -0.63, -0.78,
    0.00, 0.63, -0.78,
    0.55, -0.63, -0.55,
    0.55, 0.63, -0.55,
    0.78, -0.63, 0.00,
    0.78, 0.63, 0.00,
    0.55, -0.63, 0.55,
    0.55, 0.63, 0.55,
    0.00, -0.63, 0.78,
    0.00, 0.63, 0.78,
    -0.55, -0.63, 0.55,
    -0.55, 0.63, 0.55,
    -0.78, -0.63, 0.00,
    -0.78, 0.63, 0.00,
    -0.55, -0.63, -0.55,
    -0.55, 0.63, -0.55
]);

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
