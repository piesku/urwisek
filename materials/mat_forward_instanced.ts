import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {FogLayout, InstancedLayout, SingleColorLayout} from "./layout.js";

let vertex =
    "#version 300 es\nuniform mat4 A,B;uniform vec3 C;uniform vec4 D;in vec3 a,b,c,d,e;out vec4 j;void main(){vec4 o=B*mat4(mat3(b,c,d))*vec4(a+e,1.);gl_Position=A*o;j=mix(vec4(.02,.06,.04,1.),D,smoothstep(0.,1.,clamp(0.,1.,length(C-o.xyz)/15.)));}";

let fragment = "#version 300 es\nprecision mediump float;in vec4 j;out vec4 f;void main(){f=j;}";

export function mat_forward_instanced(
    gl: WebGL2RenderingContext
): Material<SingleColorLayout & InstancedLayout & FogLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "A")!,
            World: gl.getUniformLocation(program, "B")!,
            Eye: gl.getUniformLocation(program, "C")!,
            FogColor: gl.getUniformLocation(program, "D")!,

            VertexPosition: gl.getAttribLocation(program, "a")!,

            InstanceColumn1: gl.getAttribLocation(program, "b")!,
            InstanceColumn2: gl.getAttribLocation(program, "c")!,
            InstanceColumn3: gl.getAttribLocation(program, "d")!,
            InstanceColumn4: gl.getAttribLocation(program, "e")!,
        },
    };
}
