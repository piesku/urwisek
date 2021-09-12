import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {
    ColoredShadedLayout,
    FogLayout,
    ForwardShadingLayout,
    ShadowMappingLayout,
} from "./layout.js";

let vertex = `#version 300 es\n

    uniform mat4 A;
    uniform mat4 B;
    uniform mat4 C;

    in vec3 a;
    in vec3 b;

    out vec4 j;
    out vec3 k;

    void main() {
        j = B * vec4(a, 1.0);
        k = (vec4(b, 1.0) * C).xyz;
        gl_Position = A * j;
    }
`;

let fragment = `#version 300 es\n
    precision mediump float;
    precision lowp sampler2DShadow;

    uniform vec3 E;
    uniform vec4 D;
    uniform vec4 F[8];
    uniform mat4 G;
    uniform sampler2DShadow H;
    uniform vec4 I;

    in vec4 j;
    in vec3 k;

    out vec4 f;

    float w(vec4 o) {
        vec4 p = G * o;
        vec3 q = p.xyz / p.w;
        q = q * 0.5 + 0.5;
        q.z -= 0.001;

        return texture(H, q) * 0.5 + 0.5;
    }

    void main() {
        vec3 o = normalize(k);

        // Ambient light.
        vec3 p = D.rgb * 0.1;

        for (int i = 0; i < 8; i++) {
            float q = F[i].w;
            if (q == 0.0) {
                break;
            }

            vec3 r;
            if (q < 1.0) {
                r = F[i].xyz;
            } else {
                vec3 s = F[i].xyz - j.xyz;
                float t = length(s);
                r = s / t;
                q /= (t * t);
            }

            float u = dot(o, r);
            if (u > 0.0) {
                p += D.rgb * u * q;
            }
        }

        f = mix(vec4(p * w(j), 1.0), I,
                        smoothstep(0.0, 1.0, clamp(0.0, 1.0, length(E - j.xyz) / 15.0)));
    }
`;

export function mat_forward_colored_shadows(
    gl: WebGL2RenderingContext
): Material<ColoredShadedLayout & ForwardShadingLayout & ShadowMappingLayout & FogLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "A")!,
            World: gl.getUniformLocation(program, "B")!,
            Self: gl.getUniformLocation(program, "C")!,

            DiffuseColor: gl.getUniformLocation(program, "D")!,

            Eye: gl.getUniformLocation(program, "E")!,
            LightPositions: gl.getUniformLocation(program, "F")!,

            ShadowSpace: gl.getUniformLocation(program, "G")!,
            ShadowMap: gl.getUniformLocation(program, "H")!,

            FogColor: gl.getUniformLocation(program, "I")!,

            VertexPosition: gl.getAttribLocation(program, "a")!,
            VertexNormal: gl.getAttribLocation(program, "b")!,
        },
    };
}
