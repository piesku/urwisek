import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {FogLayout, InstancedLayout, SingleColorLayout} from "./layout.js";

let vertex = `#version 300 es\n

    uniform mat4 pv;
    uniform mat4 world;

    uniform vec3 eye;
    uniform vec4 fog_color;

    in vec3 attr_position;
    in vec3 attr_column1;
    in vec3 attr_column2;
    in vec3 attr_column3;
    in vec3 attr_column4;

    out vec4 vert_color;

    void main() {
        mat3 rotation = mat3(
            attr_column1,
            attr_column2,
            attr_column3
        );

        vec4 world_position = world * mat4(rotation) * vec4(attr_position + attr_column4, 1.0);
        gl_Position = pv * world_position;

        // Ambient light only.
        vert_color = vec4(0.02, 0.06, 0.04, 1.0);

        float eye_distance = length(eye - world_position.xyz);
        float fog_amount = clamp(0.0, 1.0, eye_distance / 15.0);
        vert_color = mix(vert_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
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
): Material<SingleColorLayout & InstancedLayout & FogLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "pv")!,
            World: gl.getUniformLocation(program, "world")!,
            Eye: gl.getUniformLocation(program, "eye")!,
            FogColor: gl.getUniformLocation(program, "fog_color")!,

            VertexPosition: gl.getAttribLocation(program, "attr_position")!,

            InstanceColumn1: gl.getAttribLocation(program, "attr_column1")!,
            InstanceColumn2: gl.getAttribLocation(program, "attr_column2")!,
            InstanceColumn3: gl.getAttribLocation(program, "attr_column3")!,
            InstanceColumn4: gl.getAttribLocation(program, "attr_column4")!,
        },
    };
}
