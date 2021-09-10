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
    -0.111, 0.575, -0.859,
    -0.000, 0.384, -0.481,
    -0.000, 0.251, -0.862,
    0.131, 0.518, -0.819,
    -0.152, 0.634, -1.248,
    -0.008, 0.196, -1.300,
    0.216, 0.518, -1.191,
    -0.247, 0.793, -1.762,
    -0.000, 0.141, -1.608,
    0.242, 0.549, -1.756,
    -0.208, 0.738, -2.194,
    -0.000, 0.234, -2.101,
    0.167, 0.495, -2.202,
    0.020, 0.509, -2.548
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    -0.701, 0.652, 0.289,
    -0.030, -0.161, 0.986,
    -0.097, -0.964, 0.248,
    0.848, 0.425, 0.317,
    -0.708, 0.678, 0.198,
    -0.131, -0.980, 0.148,
    0.940, 0.301, 0.159,
    -0.662, 0.749, -0.020,
    -0.089, -0.996, 0.005,
    0.956, 0.294, -0.017,
    -0.606, 0.664, -0.439,
    -0.100, -0.951, -0.292,
    0.948, 0.155, -0.277,
    0.066, 0.019, -0.998
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([]);

// prettier-ignore
let weights_arr = Float32Array.from([
    0.000, 0.933, 1.000, 0.067,
    0.000, 1.000, 0.000, 0.000,
    0.000, 0.946, 1.000, 0.054,
    0.000, 0.953, 1.000, 0.047,
    1.000, 0.942, 2.000, 0.058,
    1.000, 0.877, 2.000, 0.123,
    1.000, 0.970, 2.000, 0.030,
    2.000, 0.858, 3.000, 0.142,
    2.000, 0.911, 3.000, 0.089,
    2.000, 0.932, 3.000, 0.068,
    3.000, 1.000, 0.000, 0.000,
    3.000, 1.000, 0.000, 0.000,
    3.000, 1.000, 0.000, 0.000,
    3.000, 1.000, 0.000, 0.000
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
1.000, -0.000, -0.000, 0.000, 0.000, 0.000, 1.000, 0.000, 0.000, -1.000, 0.000, 0.000, -0.000, -0.701, -0.428, 1.000
1.000, -0.000, -0.000, 0.000, 0.000, 0.132, 0.991, 0.000, 0.000, -0.991, 0.132, 0.000, -0.000, -1.100, -0.285, 1.000
1.000, 0.000, -0.000, 0.000, 0.000, 0.000, 1.000, 0.000, 0.000, -1.000, 0.000, 0.000, -0.000, -1.492, -0.487, 1.000
-1.000, -0.000, -0.000, 0.000, 0.000, 0.137, -0.991, 0.000, 0.000, -0.991, -0.137, 0.000, -0.000, -2.009, 0.214, 1.000
*/
