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
    0.221, 0.661, 0.032,
    0.110, -0.000, -0.012,
    0.199, 0.351, -0.421,
    0.132, 0.615, -0.826,
    0.110, -0.001, -0.782,
    0.154, 1.033, 0.252,
    0.264, 1.341, 0.120,
    -0.221, 0.661, 0.032,
    0.000, 0.725, -0.056,
    0.000, 0.329, -0.017,
    -0.110, -0.000, -0.012,
    -0.199, 0.351, -0.421,
    0.000, 0.329, -0.795,
    -0.132, 0.615, -0.826,
    0.000, 0.649, -0.879,
    -0.110, -0.001, -0.782,
    -0.154, 1.033, 0.252,
    0.000, 0.857, 0.560,
    -0.264, 1.341, 0.120,
    0.000, 1.121, 0.252
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    0.997, 0.009, 0.083,
    -0.007, -0.962, 0.275,
    0.797, -0.599, -0.074,
    0.688, 0.428, -0.586,
    0.035, -0.971, -0.235,
    0.726, 0.191, 0.661,
    0.417, 0.903, -0.104,
    -0.997, 0.009, 0.083,
    0.000, 0.785, -0.620,
    0.000, -0.590, 0.807,
    0.007, -0.962, 0.275,
    -0.797, -0.599, -0.074,
    0.000, -0.472, -0.882,
    -0.688, 0.428, -0.586,
    0.000, 0.571, -0.821,
    -0.035, -0.971, -0.235,
    -0.726, 0.191, 0.661,
    0.000, -0.039, 0.999,
    -0.417, 0.903, -0.104,
    0.000, 0.932, 0.363
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([]);

// prettier-ignore
let weights_arr = Float32Array.from([
    2.000, 0.918, 1.000, 0.082,
    2.000, 1.000, 0.000, 0.000,
    4.000, 0.500, 2.000, 0.500,
    4.000, 0.907, 0.000, 0.093,
    4.000, 1.000, 0.000, 0.000,
    1.000, 0.893, 2.000, 0.107,
    1.000, 1.000, 0.000, 0.000,
    3.000, 0.918, 1.000, 0.082,
    1.000, 1.000, 0.000, 0.000,
    2.000, 0.500, 3.000, 0.500,
    3.000, 1.000, 0.000, 0.000,
    5.000, 0.500, 3.000, 0.500,
    0.000, 1.000, 0.000, 0.000,
    5.000, 0.907, 0.000, 0.093,
    0.000, 1.000, 0.000, 0.000,
    5.000, 1.000, 0.000, 0.000,
    1.000, 0.893, 3.000, 0.107,
    1.000, 1.000, 0.000, 0.000,
    1.000, 1.000, 0.000, 0.000,
    1.000, 1.000, 0.000, 0.000
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
