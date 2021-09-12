import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_leaf(gl: WebGLRenderingContext): Mesh {
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
    -0.2, 0.0, 0.0,
    0.0, 0.0, 0.1,
    -0.0, 0.0, -0.1,
    0.2, 0.0, -0.0
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    0.1, 1.0, 0.0,
    -0.0, 1.0, 0.0,
    -0.0, 1.0, 0.0,
    -0.1, 1.0, 0.0
]);

// prettier-ignore
let weights_arr = Float32Array.from([
    2.0, 1.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    1.0, 1.0, 0.0, 0.0
]);

// prettier-ignore
let index_arr = Uint16Array.from([
    2, 3, 1,
    0, 2, 1
]);

/*
1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0
0.1, 1.0, 0.0, 0.0, -1.0, 0.1, -0.0, 0.0, -0.0, -0.0, 1.0, 0.0, -0.0, -0.0, -0.0, 1.0
0.1, -1.0, -0.0, 0.0, 1.0, 0.1, -0.0, 0.0, 0.0, -0.0, 1.0, 0.0, 0.0, -0.0, -0.0, 1.0
*/
