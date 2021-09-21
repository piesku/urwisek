import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_leaf(gl: WebGLRenderingContext): Mesh {
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
    -0.17, 0.02, 0.00,
    0.00, 0.00, 0.06,
    -0.00, 0.00, -0.07,
    0.18, 0.02, -0.00
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    0.09, 1.00, 0.00,
    -0.01, 1.00, 0.00,
    -0.01, 1.00, 0.00,
    -0.12, 0.99, 0.00
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([]);

// prettier-ignore
let weights_arr = Float32Array.from([
    2.00, 1.00, 0.00, 0.00,
    0.00, 1.00, 0.00, 0.00,
    0.00, 1.00, 0.00, 0.00,
    1.00, 1.00, 0.00, 0.00
]);

// prettier-ignore
let index_arr = Uint16Array.from([
    2, 3, 1,
    0, 2, 1
]);

/*
1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00, 0.00, 0.00, 0.00, 0.00, 1.00
0.12, 0.99, 0.00, 0.00, -0.99, 0.12, -0.00, 0.00, -0.00, -0.00, 1.00, 0.00, -0.00, -0.00, -0.00, 1.00
0.12, -0.99, -0.00, 0.00, 0.99, 0.12, -0.00, 0.00, 0.00, -0.00, 1.00, 0.00, 0.00, -0.00, -0.00, 1.00
*/
