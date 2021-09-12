import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_lisek(gl: WebGLRenderingContext): Mesh {
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
    0.1, 0.4, 0.0,
    0.1, -0.0, -0.0,
    0.1, 0.2, -0.3,
    0.1, 0.4, -0.6,
    0.1, -0.0, -0.5,
    0.1, 0.7, 0.2,
    0.2, 0.9, 0.1,
    -0.1, 0.4, 0.0,
    0.0, 0.5, -0.0,
    0.0, 0.2, -0.0,
    -0.1, -0.0, -0.0,
    -0.1, 0.2, -0.3,
    0.0, 0.2, -0.5,
    -0.1, 0.4, -0.6,
    0.0, 0.4, -0.6,
    -0.1, -0.0, -0.5,
    -0.1, 0.7, 0.2,
    0.0, 0.6, 0.4,
    -0.2, 0.9, 0.1,
    0.0, 0.7, 0.2
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    1.0, 0.0, 0.1,
    -0.0, -1.0, 0.3,
    0.8, -0.6, -0.1,
    0.7, 0.4, -0.6,
    0.0, -1.0, -0.2,
    0.7, 0.2, 0.7,
    0.4, 0.9, -0.1,
    -1.0, 0.0, 0.1,
    0.0, 0.8, -0.6,
    0.0, -0.6, 0.8,
    0.0, -1.0, 0.3,
    -0.8, -0.6, -0.1,
    0.0, -0.5, -0.9,
    -0.7, 0.4, -0.6,
    0.0, 0.6, -0.8,
    -0.0, -1.0, -0.2,
    -0.7, 0.2, 0.7,
    0.0, -0.0, 1.0,
    -0.4, 0.9, -0.1,
    0.0, 0.9, 0.4
]);

// prettier-ignore
let weights_arr = Float32Array.from([
    2.0, 0.9, 1.0, 0.1,
    2.0, 1.0, 0.0, 0.0,
    4.0, 0.5, 2.0, 0.5,
    4.0, 0.9, 0.0, 0.1,
    4.0, 1.0, 0.0, 0.0,
    1.0, 0.9, 2.0, 0.1,
    1.0, 1.0, 0.0, 0.0,
    3.0, 0.9, 1.0, 0.1,
    1.0, 1.0, 0.0, 0.0,
    2.0, 0.5, 3.0, 0.5,
    3.0, 1.0, 0.0, 0.0,
    5.0, 0.5, 3.0, 0.5,
    0.0, 1.0, 0.0, 0.0,
    5.0, 0.9, 0.0, 0.1,
    0.0, 1.0, 0.0, 0.0,
    5.0, 1.0, 0.0, 0.0,
    1.0, 0.9, 3.0, 0.1,
    1.0, 1.0, 0.0, 0.0,
    1.0, 1.0, 0.0, 0.0,
    1.0, 1.0, 0.0, 0.0
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
1.0, 0.0, 0.0, 0.0, 0.0, 0.1, -1.0, 0.0, 0.0, 1.0, 0.1, 0.0, 0.0, 0.4, 0.4, 1.0
1.0, 0.0, 0.0, 0.0, 0.0, 0.8, -0.6, 0.0, 0.0, 0.6, 0.8, 0.0, 0.0, -0.3, 0.3, 1.0
1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0, -0.1, 0.4, -0.0, 1.0
1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0, 0.1, 0.4, -0.0, 1.0
1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.1, 0.0, 0.0, -0.1, -1.0, 0.0, -0.1, 0.3, -0.5, 1.0
1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.1, 0.0, 0.0, -0.1, -1.0, 0.0, 0.1, 0.3, -0.5, 1.0
*/
