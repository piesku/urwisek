import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {DepthMappingInstancedLayout} from "./layout.js";

let vertex = `#version 300 es\n

    uniform mat4 pv;
    uniform mat4 world;
    uniform mat4 self;

    in vec3 attr_position;
    in vec4 attr_offset;
    in vec4 attr_offset_rotation;

    void main() {
        float x = attr_offset_rotation.x;
        float y = attr_offset_rotation.y;
        float z = attr_offset_rotation.z;
        float w = attr_offset_rotation.w;

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
        gl_Position = pv * world_position;
    }
`;

let fragment = `#version 300 es\n
    precision mediump float;

    out vec4 frag_color;

    void main() {
        // Visualization only. Actual z is saved in the depth buffer.
        float z = gl_FragCoord.z * 10.0;
        frag_color = vec4(z, z, z, 1.0);
    }
`;

export function mat_forward_depth_instanced(
    gl: WebGL2RenderingContext
): Material<DepthMappingInstancedLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "pv")!,
            World: gl.getUniformLocation(program, "world")!,
            Self: gl.getUniformLocation(program, "self")!,
            VertexPosition: gl.getAttribLocation(program, "attr_position")!,
            VertexOffset: gl.getAttribLocation(program, "attr_offset")!,
            VertexOffsetRotation: gl.getAttribLocation(program, "attr_offset_rotation")!,
        },
    };
}
