import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_cube(gl: WebGLRenderingContext): Mesh {
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
    -0.500, -0.500, 0.500,
    -0.500, -0.500, 0.500,
    -0.500, -0.500, 0.500,
    -0.500, 0.500, 0.500,
    -0.500, 0.500, 0.500,
    -0.500, 0.500, 0.500,
    -0.500, -0.500, -0.500,
    -0.500, -0.500, -0.500,
    -0.500, -0.500, -0.500,
    -0.500, 0.500, -0.500,
    -0.500, 0.500, -0.500,
    -0.500, 0.500, -0.500,
    0.500, -0.500, 0.500,
    0.500, -0.500, 0.500,
    0.500, -0.500, 0.500,
    0.500, 0.500, 0.500,
    0.500, 0.500, 0.500,
    0.500, 0.500, 0.500,
    0.500, -0.500, -0.500,
    0.500, -0.500, -0.500,
    0.500, -0.500, -0.500,
    0.500, 0.500, -0.500,
    0.500, 0.500, -0.500,
    0.500, 0.500, -0.500
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    -1.000, 0.000, 0.000,
    0.000, -1.000, 0.000,
    0.000, 0.000, 1.000,
    -1.000, 0.000, 0.000,
    0.000, 0.000, 1.000,
    0.000, 1.000, 0.000,
    -1.000, 0.000, 0.000,
    0.000, -1.000, 0.000,
    0.000, 0.000, -1.000,
    -1.000, 0.000, 0.000,
    0.000, 0.000, -1.000,
    0.000, 1.000, 0.000,
    0.000, -1.000, 0.000,
    0.000, 0.000, 1.000,
    1.000, 0.000, 0.000,
    0.000, 0.000, 1.000,
    0.000, 1.000, 0.000,
    1.000, 0.000, 0.000,
    0.000, -1.000, 0.000,
    0.000, 0.000, -1.000,
    1.000, 0.000, 0.000,
    0.000, 0.000, -1.000,
    0.000, 1.000, 0.000,
    1.000, 0.000, 0.000
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([]);

// prettier-ignore
let weights_arr = Float32Array.from([]);

// prettier-ignore
let index_arr = Uint16Array.from([
    16, 5, 22,
    5, 11, 22,
    1, 12, 7,
    12, 18, 7,
    2, 4, 13,
    4, 15, 13,
    14, 17, 20,
    17, 23, 20,
    19, 21, 8,
    21, 10, 8,
    6, 9, 0,
    9, 3, 0
]);
