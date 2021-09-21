import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_lisek(gl: WebGLRenderingContext): Mesh {
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
        NormalBuffer: normal_buf,
        TexCoordBuffer: texcoord_buf,
        WeightsBuffer: weights_buf,
        IndexBuffer: index_buf,
        IndexCount: index_arr.length,
    };
}

// prettier-ignore
let vertex_arr = Float32Array.from([
    0.15, 0.44, 0.02,
    0.07, -0.00, -0.01,
    0.13, 0.23, -0.28,
    0.09, 0.41, -0.55,
    0.07, -0.00, -0.52,
    0.10, 0.69, 0.17,
    0.18, 0.89, 0.08,
    -0.15, 0.44, 0.02,
    0.00, 0.48, -0.04,
    0.00, 0.22, -0.01,
    -0.07, -0.00, -0.01,
    -0.13, 0.23, -0.28,
    0.00, 0.22, -0.53,
    -0.09, 0.41, -0.55,
    0.00, 0.43, -0.58,
    -0.07, -0.00, -0.52,
    -0.10, 0.69, 0.17,
    0.00, 0.57, 0.37,
    -0.18, 0.89, 0.08,
    0.00, 0.75, 0.17
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    1.00, 0.01, 0.08,
    -0.01, -0.96, 0.27,
    0.80, -0.60, -0.07,
    0.69, 0.43, -0.59,
    0.04, -0.97, -0.24,
    0.73, 0.19, 0.66,
    0.42, 0.90, -0.10,
    -1.00, 0.01, 0.08,
    0.00, 0.78, -0.62,
    0.00, -0.59, 0.81,
    0.01, -0.96, 0.27,
    -0.80, -0.60, -0.07,
    0.00, -0.47, -0.88,
    -0.69, 0.43, -0.59,
    0.00, 0.57, -0.82,
    -0.04, -0.97, -0.24,
    -0.73, 0.19, 0.66,
    0.00, -0.04, 1.00,
    -0.42, 0.90, -0.10,
    0.00, 0.93, 0.36
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([]);

// prettier-ignore
let weights_arr = Float32Array.from([
    2.00, 0.92, 1.00, 0.08,
    2.00, 1.00, 0.00, 0.00,
    4.00, 0.50, 2.00, 0.50,
    4.00, 0.91, 0.00, 0.09,
    4.00, 1.00, 0.00, 0.00,
    1.00, 0.89, 2.00, 0.11,
    1.00, 1.00, 0.00, 0.00,
    3.00, 0.92, 1.00, 0.08,
    1.00, 1.00, 0.00, 0.00,
    2.00, 0.50, 3.00, 0.50,
    3.00, 1.00, 0.00, 0.00,
    5.00, 0.50, 3.00, 0.50,
    0.00, 1.00, 0.00, 0.00,
    5.00, 0.91, 0.00, 0.09,
    0.00, 1.00, 0.00, 0.00,
    5.00, 1.00, 0.00, 0.00,
    1.00, 0.89, 3.00, 0.11,
    1.00, 1.00, 0.00, 0.00,
    1.00, 1.00, 0.00, 0.00,
    1.00, 1.00, 0.00, 0.00
]);

// prettier-ignore
let index_arr = Uint16Array.from([
    18, 19, 16,
    19, 17, 16,
    7, 13, 8,
    16, 17, 7,
    19, 18, 8,
    8, 18, 7,
    7, 17, 9,
    7, 18, 16,
    12, 11, 9,
    11, 15, 13,
    12, 15, 11,
    12, 14, 13,
    13, 15, 12,
    11, 13, 7,
    13, 14, 8,
    9, 10, 7,
    11, 10, 9,
    7, 10, 11,
    19, 6, 5,
    17, 19, 5,
    3, 0, 8,
    17, 5, 0,
    6, 19, 8,
    6, 8, 0,
    17, 0, 9,
    6, 0, 5,
    2, 12, 9,
    4, 2, 3,
    4, 12, 2,
    14, 12, 3,
    4, 3, 12,
    3, 2, 0,
    14, 3, 8,
    1, 9, 0,
    1, 2, 9,
    1, 0, 2
]);

/*
1.00, 0.00, 0.00, 0.00, 0.00, 0.10, -1.00, 0.00, 0.00, 1.00, 0.10, 0.00, 0.00, 0.43, 0.40, 1.00
1.00, 0.00, 0.00, 0.00, 0.00, 0.80, -0.61, 0.00, 0.00, 0.61, 0.80, 0.00, 0.00, -0.31, 0.25, 1.00
1.00, 0.00, 0.00, 0.00, 0.00, -1.00, 0.00, 0.00, 0.00, -0.00, -1.00, 0.00, -0.07, 0.40, -0.01, 1.00
1.00, 0.00, 0.00, 0.00, 0.00, -1.00, 0.00, 0.00, 0.00, -0.00, -1.00, 0.00, 0.07, 0.40, -0.01, 1.00
1.00, 0.00, 0.00, 0.00, 0.00, -0.99, 0.12, 0.00, 0.00, -0.12, -0.99, 0.00, -0.07, 0.29, -0.51, 1.00
1.00, 0.00, 0.00, 0.00, 0.00, -0.99, 0.12, 0.00, 0.00, -0.12, -0.99, 0.00, 0.07, 0.29, -0.51, 1.00
*/
