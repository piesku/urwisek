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
    0, -0.25, -0.25,
    0, 0.25, -0.25,
    0.176777, 0.25, -0.176777,
    0.176777, -0.25, -0.176777,
    0.176777, -0.25, -0.176777,
    0.176777, 0.25, -0.176777,
    0.25, 0.25, 0,
    0.25, -0.25, 0,
    0.25, -0.25, 0,
    0.25, 0.25, 0,
    0.176777, 0.25, 0.176777,
    0.176777, -0.25, 0.176777,
    0.176777, -0.25, 0.176777,
    0.176777, 0.25, 0.176777,
    0, 0.25, 0.25,
    0, -0.25, 0.25,
    0, -0.25, 0.25,
    0, 0.25, 0.25,
    -0.176777, 0.25, 0.176777,
    -0.176777, -0.25, 0.176777,
    -0.176777, -0.25, 0.176777,
    -0.176777, 0.25, 0.176777,
    -0.25, 0.25, 0,
    -0.25, -0.25, 0,
    0.176777, 0.25, -0.176777,
    0, 0.25, -0.25,
    -0.176777, 0.25, -0.176777,
    -0.25, 0.25, 0,
    -0.176777, 0.25, 0.176777,
    0, 0.25, 0.25,
    0.176777, 0.25, 0.176777,
    0.25, 0.25, 0,
    -0.25, -0.25, 0,
    -0.25, 0.25, 0,
    -0.176777, 0.25, -0.176777,
    -0.176777, -0.25, -0.176777,
    -0.176777, -0.25, -0.176777,
    -0.176777, 0.25, -0.176777,
    0, 0.25, -0.25,
    0, -0.25, -0.25,
    0, -0.25, -0.25,
    0.176777, -0.25, -0.176777,
    0.25, -0.25, 0,
    0.176777, -0.25, 0.176777,
    0, -0.25, 0.25,
    -0.176777, -0.25, 0.176777,
    -0.25, -0.25, 0,
    -0.176777, -0.25, -0.176777
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    0.3827, 0, -0.9239,
    0.3827, 0, -0.9239,
    0.3827, 0, -0.9239,
    0.3827, 0, -0.9239,
    0.9239, 0, -0.3827,
    0.9239, 0, -0.3827,
    0.9239, 0, -0.3827,
    0.9239, 0, -0.3827,
    0.9239, 0, 0.3827,
    0.9239, 0, 0.3827,
    0.9239, 0, 0.3827,
    0.9239, 0, 0.3827,
    0.3827, 0, 0.9239,
    0.3827, 0, 0.9239,
    0.3827, 0, 0.9239,
    0.3827, 0, 0.9239,
    -0.3827, 0, 0.9239,
    -0.3827, 0, 0.9239,
    -0.3827, 0, 0.9239,
    -0.3827, 0, 0.9239,
    -0.9239, 0, 0.3827,
    -0.9239, 0, 0.3827,
    -0.9239, 0, 0.3827,
    -0.9239, 0, 0.3827,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    -0.9239, 0, -0.3827,
    -0.9239, 0, -0.3827,
    -0.9239, 0, -0.3827,
    -0.9239, 0, -0.3827,
    -0.3827, 0, -0.9239,
    -0.3827, 0, -0.9239,
    -0.3827, 0, -0.9239,
    -0.3827, 0, -0.9239,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([
    1, 0.5,
    1, 1,
    0.875, 1,
    0.875, 0.5,
    0.875, 0.5,
    0.875, 1,
    0.75, 1,
    0.75, 0.5,
    0.75, 0.5,
    0.75, 1,
    0.625, 1,
    0.625, 0.5,
    0.625, 0.5,
    0.625, 1,
    0.5, 1,
    0.5, 0.5,
    0.5, 0.5,
    0.5, 1,
    0.375, 1,
    0.375, 0.5,
    0.375, 0.5,
    0.375, 1,
    0.25, 1,
    0.25, 0.5,
    0.419706, 0.419706,
    0.25, 0.49,
    0.080294, 0.419706,
    0.01, 0.25,
    0.080294, 0.080294,
    0.25, 0.01,
    0.419706, 0.080294,
    0.49, 0.25,
    0.25, 0.5,
    0.25, 1,
    0.125, 1,
    0.125, 0.5,
    0.125, 0.5,
    0.125, 1,
    0, 1,
    0, 0.5,
    0.75, 0.49,
    0.919706, 0.419706,
    0.99, 0.25,
    0.919706, 0.080294,
    0.75, 0.01,
    0.580294, 0.080294,
    0.51, 0.25,
    0.580294, 0.419706
]);

// prettier-ignore
let weights_arr = Float32Array.from([
    // Weights must be assigned manually for now b/c OBJ doesn't support them.
    // WARNING: Remaking the mesh file will overwrite your weights here.
]);

// prettier-ignore
let index_arr = Uint16Array.from([
    47, 46, 45,
    45, 44, 47,
    44, 43, 47,
    43, 42, 47,
    42, 41, 47,
    41, 40, 47,
    39, 38, 36,
    38, 37, 36,
    35, 34, 32,
    34, 33, 32,
    31, 30, 29,
    29, 28, 31,
    28, 27, 31,
    27, 26, 31,
    26, 25, 31,
    25, 24, 31,
    23, 22, 20,
    22, 21, 20,
    19, 18, 16,
    18, 17, 16,
    15, 14, 12,
    14, 13, 12,
    11, 10, 8,
    10, 9, 8,
    7, 6, 4,
    6, 5, 4,
    3, 2, 0,
    2, 1, 0
]);
