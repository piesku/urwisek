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

export interface TexturedUnlitLayout {
    // Uniforms
    Pv: WebGLUniformLocation;
    World: WebGLUniformLocation;

    TextureMap: WebGLUniformLocation;
    Color: WebGLUniformLocation;

    // Attributes
    VertexPosition: GLint;
    VertexTexCoord: GLint;
}

export interface TexturedShadedLayout {
    // Uniforms
    Pv: WebGLUniformLocation;
    World: WebGLUniformLocation;
    Self: WebGLUniformLocation;

    DiffuseMap: WebGLUniformLocation;
    DiffuseColor: WebGLUniformLocation;
    SpecularColor: WebGLUniformLocation;
    Shininess: WebGLUniformLocation;

    // Attributes
    VertexPosition: GLint;
    VertexTexCoord: GLint;
    VertexNormal: GLint;
}

export interface MappedShadedLayout {
    // Uniforms
    Pv: WebGLUniformLocation;
    World: WebGLUniformLocation;
    Self: WebGLUniformLocation;

    DiffuseMap: WebGLUniformLocation;
    DiffuseColor: WebGLUniformLocation;
    NormalMap: WebGLUniformLocation;
    RoughnessMap: WebGLUniformLocation;

    // Attributes
    VertexPosition: GLint;
    VertexTexCoord: GLint;
    VertexNormal: GLint;
    VertexTangent: GLint;
    VertexBitangent: GLint;
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
    LightDetails: WebGLUniformLocation;
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

export interface DeferredPostprocessLayout {
    // Uniforms
    DiffuseMap: WebGLUniformLocation;
    SpecularMap: WebGLUniformLocation;
    PositionMap: WebGLUniformLocation;
    NormalMap: WebGLUniformLocation;
    DepthMap: WebGLUniformLocation;

    // Attributes
    VertexPosition: GLint;
    VertexTexcoord: GLint;
}

export interface SkinningLayout {
    // Uniforms
    Bones: WebGLUniformLocation;

    // Attributes
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

export interface ParticlesTexturedLayout {
    // Uniforms
    Pv: WebGLUniformLocation;

    TextureMap: WebGLUniformLocation;
    ColorStart: WebGLUniformLocation;
    ColorEnd: WebGLUniformLocation;
    Details: WebGLUniformLocation;

    // Attributes
    OriginAge: GLint;
    DirectionSeed: GLint;
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
