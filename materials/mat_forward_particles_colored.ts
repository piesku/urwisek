import {link, Material} from "../common/material.js";
import {GL_POINTS} from "../common/webgl.js";
import {FogLayout, ParticlesColoredLayout} from "./layout.js";

let vertex = `#version 300 es\n
    uniform mat4 pv;
    uniform vec3 eye;
    uniform vec4 fog_color;
    uniform vec4 color_start;
    uniform vec4 color_end;
    // [x: lifespan, y: speed, z: size_start, w: size_end];
    uniform vec4 details;

    // [x, y, z, w: age]
    in vec4 attr_origin_age;
    in vec3 attr_direction;

    out vec4 vert_color;

    void main() {
        // Move the particle along the direction axis.
        vec3 velocity = attr_direction * details.y;
        vec4 world_position = vec4(attr_origin_age.xyz + velocity * attr_origin_age.w, 1.0);
        gl_Position = pv * world_position;

        // Interpolate color and size.
        float t = attr_origin_age.w / details.x;
        gl_PointSize = mix(details.z, details.w, t);
        vert_color = mix(color_start, color_end, t);

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

export function mat_forward_particles_colored(
    gl: WebGL2RenderingContext
): Material<ParticlesColoredLayout & FogLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_POINTS,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "pv")!,
            Eye: gl.getUniformLocation(program, "eye")!,
            FogColor: gl.getUniformLocation(program, "fog_color")!,

            ColorStart: gl.getUniformLocation(program, "color_start")!,
            ColorEnd: gl.getUniformLocation(program, "color_end")!,
            Details: gl.getUniformLocation(program, "details")!,

            OriginAge: gl.getAttribLocation(program, "attr_origin_age")!,
            Direction: gl.getAttribLocation(program, "attr_direction")!,
        },
    };
}
