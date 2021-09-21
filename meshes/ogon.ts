import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_ogon(gl: WebGLRenderingContext): Mesh {
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
    -0.11, 0.58, -0.86,
    -0.00, 0.38, -0.48,
    -0.00, 0.25, -0.86,
    0.13, 0.52, -0.82,
    -0.15, 0.63, -1.25,
    -0.01, 0.20, -1.30,
    0.22, 0.52, -1.19,
    -0.25, 0.79, -1.76,
    -0.00, 0.14, -1.61,
    0.24, 0.55, -1.76,
    -0.21, 0.74, -2.19,
    -0.00, 0.23, -2.10,
    0.17, 0.50, -2.20,
    0.02, 0.51, -2.55
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    -0.70, 0.65, 0.29,
    -0.03, -0.16, 0.99,
    -0.10, -0.96, 0.25,
    0.85, 0.42, 0.32,
    -0.71, 0.68, 0.20,
    -0.13, -0.98, 0.15,
    0.94, 0.30, 0.16,
    -0.66, 0.75, -0.02,
    -0.09, -1.00, 0.00,
    0.96, 0.29, -0.02,
    -0.61, 0.66, -0.44,
    -0.10, -0.95, -0.29,
    0.95, 0.15, -0.28,
    0.07, 0.02, -1.00
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([]);

// prettier-ignore
let weights_arr = Float32Array.from([
    0.00, 0.93, 1.00, 0.07,
    0.00, 1.00, 0.00, 0.00,
    0.00, 0.95, 1.00, 0.05,
    0.00, 0.95, 1.00, 0.05,
    1.00, 0.94, 2.00, 0.06,
    1.00, 0.88, 2.00, 0.12,
    1.00, 0.97, 2.00, 0.03,
    2.00, 0.86, 3.00, 0.14,
    2.00, 0.91, 3.00, 0.09,
    2.00, 0.93, 3.00, 0.07,
    3.00, 1.00, 0.00, 0.00,
    3.00, 1.00, 0.00, 0.00,
    3.00, 1.00, 0.00, 0.00,
    3.00, 1.00, 0.00, 0.00
]);

// prettier-ignore
let index_arr = Uint16Array.from([
    13, 12, 10,
    13, 11, 12,
    13, 10, 11,
    12, 11, 9,
    11, 8, 9,
    11, 10, 8,
    10, 7, 8,
    8, 7, 5,
    7, 4, 5,
    7, 9, 4,
    9, 6, 4,
    10, 12, 7,
    12, 9, 7,
    6, 5, 3,
    5, 2, 3,
    5, 4, 2,
    4, 0, 2,
    4, 6, 0,
    6, 3, 0,
    9, 8, 6,
    8, 5, 6,
    1, 0, 3,
    1, 3, 2,
    2, 0, 1
]);

/*
1.00, -0.00, -0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, -1.00, 0.00, 0.00, -0.00, -0.70, -0.43, 1.00
1.00, -0.00, -0.00, 0.00, 0.00, 0.13, 0.99, 0.00, 0.00, -0.99, 0.13, 0.00, -0.00, -1.10, -0.29, 1.00
1.00, 0.00, -0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, -1.00, 0.00, 0.00, -0.00, -1.49, -0.49, 1.00
-1.00, -0.00, -0.00, 0.00, 0.00, 0.14, -0.99, 0.00, 0.00, -0.99, -0.14, 0.00, -0.00, -2.01, 0.21, 1.00
*/
