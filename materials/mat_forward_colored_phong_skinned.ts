import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {FogLayout, ForwardShadingLayout, SkinningLayout} from "../materials/layout.js";

let vertex = `#version 300 es\n
    uniform mat4 A;
    uniform mat4 F[6];

    in vec3 a;
    in vec3 b;
    in vec4 c;

    out vec4 j;
    out vec3 k;

    void main() {
        mat4 p = c[1] * F[int(c[0])] + c[3] * F[int(c[2])];
        j = p * vec4(a, 1.0);
        k = normalize(mat3(p) * b);
        gl_Position = A * j;
    }
`;

let fragment = `#version 300 es\n
    precision mediump float;

    uniform vec3 C;
    uniform vec4 B;
    uniform vec4 D[8];
    uniform vec4 E;

    in vec4 j;
    in vec3 k;

    out vec4 f;

    void main() {
        // Ambient light.
        vec3 p = B.xyz * .5;

        for (int i = 0; i < 8; i++) {
            float q = D[i].w;
            if (q == 0.0) {
                break;
            }

            vec3 r;
            if (q < 1.0) {
                // Directional light.
                r = D[i].xyz;
            } else {
                vec3 s = D[i].xyz - j.xyz;
                float t = length(s);
                r = s / t;
                // Distance attenuation.
                q /= (t * t);
            }

            float u = dot(normalize(k), r);
            if (u > 0.0) {
                // Diffuse color. Light is always white.
                p += B.xyz * floor(u * q * 2.) / 2.;
            }
        }

        f = mix(vec4(p, 1.0), E,
                        smoothstep(0., 1., clamp(0., 1., length(C - j.xyz) / 15.)));
    }
`;

export function mat_forward_colored_phong_skinned(
    gl: WebGL2RenderingContext
): Material<ForwardShadingLayout & SkinningLayout & FogLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "A")!,

            DiffuseColor: gl.getUniformLocation(program, "B")!,

            Eye: gl.getUniformLocation(program, "C")!,
            LightPositions: gl.getUniformLocation(program, "D")!,

            VertexPosition: gl.getAttribLocation(program, "a")!,
            VertexNormal: gl.getAttribLocation(program, "b")!,

            FogColor: gl.getUniformLocation(program, "E")!,

            Bones: gl.getUniformLocation(program, "F")!,
            VertexWeights: gl.getAttribLocation(program, "c")!,
        },
    };
}
