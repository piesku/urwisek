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
    0.040103, 0, 0.044704,
    -0.054562, 0, -0.050619,
    -0.124883, 0.01643, 0.126198,
    0.040103, 0, 0.044704,
    0.12554, 0.021688, -0.126198,
    -0.054562, 0, -0.050619
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    0.0665, 0.9956, -0.0661,
    0.0665, 0.9956, -0.0661,
    0.0665, 0.9956, -0.0661,
    -0.0844, 0.9929, 0.0838,
    -0.0844, 0.9929, 0.0838,
    -0.0844, 0.9929, 0.0838
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([
    1, 0,
    0, 1,
    0, 0,
    1, 0,
    1, 1,
    0, 1
]);

// prettier-ignore
let weights_arr = Float32Array.from([
    // Weights must be assigned manually for now b/c OBJ doesn't support them.
    // WARNING: Remaking the mesh file will overwrite your weights here.
]);

// prettier-ignore
let index_arr = Uint16Array.from([
    5, 4, 3,
    2, 1, 0
]);
