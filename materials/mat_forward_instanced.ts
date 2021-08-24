import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {ForwardShadingLayout, InstancedLayout, PaletteShadedLayout} from "./layout.js";

let vertex = `#version 300 es\n
    // See Game.LightPositions and Game.LightDetails.
    const int MAX_LIGHTS = 8;

    uniform mat4 pv;
    uniform mat4 world;
    uniform mat4 self;
    uniform vec3 palette[16];

    uniform int light_count;
    uniform vec4 light_positions[MAX_LIGHTS];
    uniform vec4 light_details[MAX_LIGHTS];

    in vec3 attr_position;
    in vec3 attr_normal;
    in vec4 attr_offset;
    in vec4 attr_rotation;

    out vec4 vert_color;

    void main() {
        float x = attr_rotation.x;
        float y = attr_rotation.y;
        float z = attr_rotation.z;
        float w = attr_rotation.w;

        float x2 = x + x;
        float y2 = y + y;
        float z2 = z + z;
        float xx = x * x2;
        float yx = y * x2;
        float yy = y * y2;
        float zx = z * x2;
        float zy = z * y2;
        float zz = z * z2;
        float wx = w * x2;
        float wy = w * y2;
        float wz = w * z2;

        float m0 = 1.0 - yy - zz;
        float m1 = yx + wz;
        float m2 = zx - wy;
        float m3 = 0.0;
        float m4 = yx - wz;
        float m5 = 1.0 - xx - zz;
        float m6 = zy + wx;
        float m7 = 0.0;
        float m8 = zx + wy;
        float m9 = zy - wx;
        float m10 = 1.0 - xx - yy;
        float m11 = 0.0;
        float m12 = 0.0;
        float m13 = 0.0;
        float m14 = 0.0;
        float m15 = 1.0;

        mat4 rotation = mat4(
            m0, m1, m2, m3,
            m4, m5, m6, m7,
            m8, m9, m10, m11,
            m12, m13, m14, m15
        );

        vec4 world_position = world * rotation * vec4(attr_position + attr_offset.xyz, 1.0);
        vec3 world_normal = normalize((rotation * vec4(attr_normal, 0.0) * self).xyz);
        gl_Position = pv * world_position;

        // Ambient light.
        vec3 color = palette[int(attr_offset[3])];
        vec3 light_acc = color * 0.1;

        for (int i = 0; i < MAX_LIGHTS; i++) {
            if (light_positions[i].w == 0.0) {
                break;
            }

            vec3 light_color = light_details[i].rgb;
            float light_intensity = light_details[i].a;

            vec3 light_normal;
            if (light_positions[i].w == 1.0) {
                // Directional light.
                light_normal = light_positions[i].xyz;
            } else {
                vec3 light_dir = light_positions[i].xyz - world_position.xyz;
                float light_dist = length(light_dir);
                light_normal = light_dir / light_dist;
                // Distance attenuation.
                light_intensity /= (light_dist * light_dist);
            }

            float diffuse_factor = dot(world_normal, light_normal);
            if (diffuse_factor > 0.0) {
                // Diffuse color.
                light_acc += color * diffuse_factor * light_color * light_intensity;
            }
        }

        vert_color = vec4(light_acc, 1.0);
    }

`;

let fragment = `#version 300 es\n
    precision mediump float;
    in vec4 vert_color;
    out vec4 frag_color;

    void main() {
        frag_color = vert_color;
    }

`;

export function mat_forward_instanced(
    gl: WebGL2RenderingContext
): Material<PaletteShadedLayout & InstancedLayout & ForwardShadingLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "pv")!,
            World: gl.getUniformLocation(program, "world")!,
            Self: gl.getUniformLocation(program, "self")!,
            Palette: gl.getUniformLocation(program, "palette")!,
            Eye: gl.getUniformLocation(program, "eye")!,
            LightPositions: gl.getUniformLocation(program, "light_positions")!,
            LightDetails: gl.getUniformLocation(program, "light_details")!,
            VertexPosition: gl.getAttribLocation(program, "attr_position")!,
            VertexNormal: gl.getAttribLocation(program, "attr_normal")!,
            InstanceOffset: gl.getAttribLocation(program, "attr_offset")!,
            InstanceRotation: gl.getAttribLocation(program, "attr_rotation")!,
        },
    };
}
