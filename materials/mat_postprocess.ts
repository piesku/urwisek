import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {PostprocessLayout} from "./layout.js";

let vertex = `#version 300 es\n
    in vec3 attr_position;
    in vec2 attr_texcoord;
    out vec2 vert_texcoord;

    void main() {
        gl_Position = vec4(attr_position, 1.0);
        vert_texcoord = attr_texcoord;
    }
`;

let fragment = `#version 300 es\n
    precision mediump float;

    uniform sampler2D sampler;

    in vec2 vert_texcoord;
    out vec4 frag_color;

    void main() {
        frag_color = texture(sampler, vert_texcoord * vec2(1, -1));
    }
`;

export function mat_postprocess(gl: WebGL2RenderingContext): Material<PostprocessLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Sampler: gl.getUniformLocation(program, "sampler")!,
            VertexPosition: gl.getAttribLocation(program, "attr_position")!,
            VertexTexcoord: gl.getAttribLocation(program, "attr_texcoord")!,
        },
    };
}
