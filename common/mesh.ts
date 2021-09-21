export interface Mesh {
    VertexBuffer: WebGLBuffer;
    NormalBuffer: WebGLBuffer;
    TexCoordBuffer: WebGLBuffer;
    WeightsBuffer: WebGLBuffer;
    IndexBuffer: WebGLBuffer;
    IndexCount: number;
}
