import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {FogLayout, ForwardShadingLayout, SkinningLayout} from "../materials/layout.js";

let vertex = `#version 300 es\n
    uniform mat4 pv;
    uniform mat4 bones[6];

    in vec3 attr_position;
    in vec3 attr_normal;
    in vec4 attr_weights;

    out vec4 vert_position;
    out vec3 vert_normal;

    mat4 world_weighted(vec4 weights) {
        return weights[1] * bones[int(weights[0])] + weights[3] * bones[int(weights[2])];
    }

    void main() {
        mat4 bone_world = world_weighted(attr_weights);
        vert_position = bone_world * vec4(attr_position, 1.0);
        vert_normal = normalize(mat3(bone_world) * attr_normal);
        gl_Position = pv * vert_position;
    }
`;

let fragment = `#version 300 es\n
    precision mediump float;

    // See Game.LightPositions and Game.LightDetails.
    const int MAX_LIGHTS = 8;

    uniform vec3 eye;
    uniform vec4 diffuse_color;
    uniform vec4 light_positions[MAX_LIGHTS];
    uniform vec4 fog_color;

    in vec4 vert_position;
    in vec3 vert_normal;

    out vec4 frag_color;

    const float bands = 2.0;
    float posterize(float factor) {
        return floor(factor * bands) / bands;
    }

    void main() {
        vec3 world_normal = normalize(vert_normal);

        // Ambient light.
        vec3 light_acc = diffuse_color.rgb * 0.5;

        for (int i = 0; i < MAX_LIGHTS; i++) {
            float light_intensity = light_positions[i].w;
            if (light_intensity == 0.0) {
                break;
            }

            vec3 light_normal;
            if (light_intensity < 1.0) {
                // Directional light.
                light_normal = light_positions[i].xyz;
            } else {
                vec3 light_dir = light_positions[i].xyz - vert_position.xyz;
                float light_dist = length(light_dir);
                light_normal = light_dir / light_dist;
                // Distance attenuation.
                light_intensity /= (light_dist * light_dist);
            }

            float diffuse_factor = dot(world_normal, light_normal);
            if (diffuse_factor > 0.0) {
                // Diffuse color. Light is always white.
                light_acc += diffuse_color.rgb * posterize(diffuse_factor * light_intensity);
            }
        }

        frag_color = vec4(light_acc, 1.0);

        float eye_distance = length(eye - vert_position.xyz);
        float fog_amount = clamp(0.0, 1.0, eye_distance / 15.0);
        frag_color = mix(frag_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
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
            Pv: gl.getUniformLocation(program, "pv")!,

            DiffuseColor: gl.getUniformLocation(program, "diffuse_color")!,

            Eye: gl.getUniformLocation(program, "eye")!,
            LightPositions: gl.getUniformLocation(program, "light_positions")!,

            VertexPosition: gl.getAttribLocation(program, "attr_position")!,
            VertexNormal: gl.getAttribLocation(program, "attr_normal")!,

            FogColor: gl.getUniformLocation(program, "fog_color")!,

            Bones: gl.getUniformLocation(program, "bones")!,
            VertexWeights: gl.getAttribLocation(program, "attr_weights")!,
        },
    };
}
