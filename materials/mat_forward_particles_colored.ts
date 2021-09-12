import {link, Material} from "../common/material.js";
import {GL_POINTS} from "../common/webgl.js";
import {FogLayout, ParticlesColoredLayout} from "./layout.js";

let vertex =
    "#version 300 es\nuniform mat4 A;uniform vec4 D,E,F,G;uniform vec3 C;in vec4 a;in vec3 b;out vec4 j;void main(){vec3 p=b*G.y;vec4 o=vec4(a.xyz+p*a.w,1.);gl_Position=A*o;float t=a.w/G.x;gl_PointSize=mix(G.z,G.w,t);j=mix(mix(E,F,t),D,smoothstep(0.,1.,clamp(0.,1.,length(C-o.xyz)/15.)));}";

let fragment = "#version 300 es\nprecision mediump float;in vec4 j;out vec4 f;void main(){f=j;}";

export function mat_forward_particles_colored(
    gl: WebGL2RenderingContext
): Material<ParticlesColoredLayout & FogLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_POINTS,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "A")!,
            Eye: gl.getUniformLocation(program, "C")!,
            FogColor: gl.getUniformLocation(program, "D")!,

            ColorStart: gl.getUniformLocation(program, "E")!,
            ColorEnd: gl.getUniformLocation(program, "F")!,
            Details: gl.getUniformLocation(program, "G")!,

            OriginAge: gl.getAttribLocation(program, "a")!,
            Direction: gl.getAttribLocation(program, "b")!,
        },
    };
}
