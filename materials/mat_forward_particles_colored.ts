import {link, Material} from "../common/material.js";
import {GL_POINTS} from "../common/webgl.js";
import {ParticlesColoredLayout} from "./layout.js";

let vertex =
    "#version 300 es\nuniform mat4 A;uniform vec4 B,C,D;in vec4 a;in vec3 b;out vec4 j;void main(){vec3 o=b*D.y;gl_Position=A*vec4(a.xyz+o*a.w,1.);float t=a.w/D.x;gl_PointSize=mix(D.z,D.w,t);j=mix(B,C,t);}";

let fragment = "#version 300 es\nprecision mediump float;in vec4 j;out vec4 f;void main(){f=j;}";

export function mat_forward_particles_colored(
    gl: WebGL2RenderingContext
): Material<ParticlesColoredLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_POINTS,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "A")!,

            ColorStart: gl.getUniformLocation(program, "B")!,
            ColorEnd: gl.getUniformLocation(program, "C")!,
            Details: gl.getUniformLocation(program, "D")!,

            OriginAge: gl.getAttribLocation(program, "a")!,
            Direction: gl.getAttribLocation(program, "b")!,
        },
    };
}
