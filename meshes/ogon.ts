import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_ogon(gl: WebGLRenderingContext): Mesh {
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
    -0.1, 0.6, -0.9,
    -0.0, 0.4, -0.5,
    -0.0, 0.3, -0.9,
    0.1, 0.5, -0.8,
    -0.2, 0.6, -1.2,
    -0.0, 0.2, -1.3,
    0.2, 0.5, -1.2,
    -0.2, 0.8, -1.8,
    -0.0, 0.1, -1.6,
    0.2, 0.5, -1.8,
    -0.2, 0.7, -2.2,
    -0.0, 0.2, -2.1,
    0.2, 0.5, -2.2,
    0.0, 0.5, -2.5
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    -0.7, 0.7, 0.3,
    -0.0, -0.2, 1.0,
    -0.1, -1.0, 0.2,
    0.8, 0.4, 0.3,
    -0.7, 0.7, 0.2,
    -0.1, -1.0, 0.1,
    0.9, 0.3, 0.2,
    -0.7, 0.7, -0.0,
    -0.1, -1.0, 0.0,
    1.0, 0.3, -0.0,
    -0.6, 0.7, -0.4,
    -0.1, -1.0, -0.3,
    0.9, 0.2, -0.3,
    0.1, 0.0, -1.0
]);

// prettier-ignore
let weights_arr = Float32Array.from([
    0.0, 0.9, 1.0, 0.1,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.9, 1.0, 0.1,
    0.0, 1.0, 1.0, 0.0,
    1.0, 0.9, 2.0, 0.1,
    1.0, 0.9, 2.0, 0.1,
    1.0, 1.0, 2.0, 0.0,
    2.0, 0.9, 3.0, 0.1,
    2.0, 0.9, 3.0, 0.1,
    2.0, 0.9, 3.0, 0.1,
    3.0, 1.0, 0.0, 0.0,
    3.0, 1.0, 0.0, 0.0,
    3.0, 1.0, 0.0, 0.0,
    3.0, 1.0, 0.0, 0.0
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
1.0, -0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0, -0.7, -0.4, 1.0
1.0, -0.0, -0.0, 0.0, 0.0, 0.1, 1.0, 0.0, 0.0, -1.0, 0.1, 0.0, -0.0, -1.1, -0.3, 1.0
1.0, 0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0, -1.5, -0.5, 1.0
-1.0, -0.0, -0.0, 0.0, 0.0, 0.1, -1.0, 0.0, 0.0, -1.0, -0.1, 0.0, -0.0, -2.0, 0.2, 1.0
*/
