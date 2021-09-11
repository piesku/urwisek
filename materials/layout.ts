export interface ColoredUnlitLayout {
    // Uniforms
    Pv: WebGLUniformLocation;
    World: WebGLUniformLocation;

    Color: WebGLUniformLocation;

    // Attributes
    VertexPosition: GLint;
}

export interface ColoredShadedLayout {
    // Uniforms
    Pv: WebGLUniformLocation;
    World: WebGLUniformLocation;
    Self: WebGLUniformLocation;

    DiffuseColor: WebGLUniformLocation;

    // Attributes
    VertexPosition: GLint;
    VertexNormal: GLint;
}

export interface PaletteShadedLayout {
    // Uniforms
    Pv: WebGLUniformLocation;
    World: WebGLUniformLocation;

    Palette: WebGLUniformLocation;

    // Attributes
    VertexPosition: GLint;
}

export interface ForwardShadingLayout {
    // Uniforms
    Eye: WebGLUniformLocation;
    LightPositions: WebGLUniformLocation;
}

export interface ShadowMappingLayout {
    // Uniforms
    ShadowSpace: WebGLUniformLocation;
    ShadowMap: WebGLUniformLocation;
}

export interface DepthMappingLayout {
    // Uniforms
    Pv: WebGLUniformLocation;
    World: WebGLUniformLocation;

    // Attributes
    VertexPosition: GLint;
}

export interface SkinningLayout {
    // Uniforms
    Pv: WebGLUniformLocation;
    Bones: WebGLUniformLocation;

    DiffuseColor: WebGLUniformLocation;

    // Attributes
    VertexPosition: GLint;
    VertexNormal: GLint;
    VertexWeights: GLint;
}

export interface ParticlesColoredLayout {
    // Uniforms
    Pv: WebGLUniformLocation;

    ColorStart: WebGLUniformLocation;
    ColorEnd: WebGLUniformLocation;
    Details: WebGLUniformLocation;

    // Attributes
    OriginAge: GLint;
    Direction: GLint;
}

export interface InstancedLayout {
    InstanceOffset: GLint;
    InstanceRotation: GLint;
}

export interface FogLayout {
    Eye: WebGLUniformLocation;
    FogColor: WebGLUniformLocation;
    FogDistance: WebGLUniformLocation;
}
