(function () {















/**
* Passed to clear to clear the current depth buffer.
* @constant {number}
*/
const GL_DEPTH_BUFFER_BIT = 0x00000100;
/**
* Passed to clear to clear the current color buffer.
* @constant {number}
*/
const GL_COLOR_BUFFER_BIT = 0x00004000;


/**
* Passed to drawElements or drawArrays to draw single points.
* @constant {number}
*/
const GL_POINTS = 0x0000;
/**
* Passed to drawElements or drawArrays to draw lines. Each set of two vertices is treated as a separate line segment.
* @constant {number}
*/
const GL_LINE_LOOP = 0x0002;
/**
* Passed to drawElements or drawArrays to draw triangles. Each set of three vertices creates a separate triangle.
* @constant {number}
*/
const GL_TRIANGLES = 0x0004;


/**
* Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and not change often.
* @constant {number}
*/
const GL_STATIC_DRAW = 0x88e4;
/**
* Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and change often.
* @constant {number}
*/
const GL_DYNAMIC_DRAW = 0x88e8;
/**
* Passed to bindBuffer or bufferData to specify the type of buffer being used.
* @constant {number}
*/
const GL_ARRAY_BUFFER = 0x8892;
/**
* Passed to bindBuffer or bufferData to specify the type of buffer being used.
* @constant {number}
*/
const GL_ELEMENT_ARRAY_BUFFER = 0x8893;


/**
* Passed to enable/disable to turn on/off culling. Can also be used with getParameter to find the current culling method.
* @constant {number}
*/
const GL_CULL_FACE = 0x0b44;
/**
* Passed to enable/disable to turn on/off the depth test. Can also be used with getParameter to query the depth test.
* @constant {number}
*/
const GL_DEPTH_TEST = 0x0b71;


/**
* Passed to frontFace to specify the front face of a polygon is drawn in the clockwise direction,
* @constant {number}
*/
const GL_CW = 0x0900;
/**
* @constant {number}
*/
const GL_DATA_UNSIGNED_BYTE = 0x1401;
/**
* @constant {number}
*/
const GL_DATA_UNSIGNED_INT = 0x1405;

/**
* @constant {number}
*/
const GL_DEPTH_COMPONENT = 0x1902;
/**
* @constant {number}
*/
const GL_RGBA = 0x1908;


/**
* Passed to createShader to define a fragment shader.
* @constant {number}
*/
const GL_FRAGMENT_SHADER = 0x8b30;
/**
* Passed to createShader to define a vertex shader.
* @constant {number}
*/
const GL_VERTEX_SHADER = 0x8b31;
/**
* Passed to getShaderParamter to get the status of the compilation. Returns false if the shader was not compiled. You can then query getShaderInfoLog to find the exact error.
* @constant {number}
*/
const GL_COMPILE_STATUS = 0x8b81;
/**
* Passed to getProgramParameter after calling linkProgram to determine if a program was linked correctly. Returns false if there were errors. Use getProgramInfoLog to find the exact error.
* @constant {number}
*/
const GL_LINK_STATUS = 0x8b82;
/**
* @constant {number}
*/
const GL_LINEAR = 0x2601;
/**
* @constant {number}
*/
const GL_TEXTURE_MAG_FILTER = 0x2800;
/**
* @constant {number}
*/
const GL_TEXTURE_MIN_FILTER = 0x2801;
/**
* @constant {number}
*/
const GL_TEXTURE_WRAP_S = 0x2802;
/**
* @constant {number}
*/
const GL_TEXTURE_WRAP_T = 0x2803;
/**
* @constant {number}
*/
const GL_TEXTURE_2D = 0x0de1;
/**
* A texture unit.
* @constant {number}
*/
const GL_TEXTURE0 = 0x84c0;
/**
* @constant {number}
*/
const GL_CLAMP_TO_EDGE = 0x812f;

/**
* @constant {number}
*/
const GL_FRAMEBUFFER = 0x8d40;
/**
* @constant {number}
*/
const GL_COLOR_ATTACHMENT0 = 0x8ce0;
/**
* @constant {number}
*/
const GL_DEPTH_ATTACHMENT = 0x8d00;
/**
* @constant {number}
*/
const GL_FRAMEBUFFER_COMPLETE = 0x8cd5;
/**
* @constant {number}
*/
const GL_RGBA8 = 0x8058;
/**
* @constant {number}
*/
const GL_TEXTURE_COMPARE_MODE = 0x884c;
/**
* @constant {number}
*/
const GL_COMPARE_REF_TO_TEXTURE = 0x884e;
/**
* @constant {number}
*/
const GL_DEPTH_COMPONENT24 = 0x81a6;


const GL_UNSIGNED_SHORT = 0x1403;
const GL_FLOAT = 0x1406;

const update_span = document.getElementById("update");
const delta_span = document.getElementById("delta");
const fps_span = document.getElementById("fps");
const step = 1 / 60;
class Game3D {
constructor() {
this.Running = 0;
this.Now = 0;



this.Quality = 2048 /* High */;
this.ViewportWidth = window.innerWidth;
this.ViewportHeight = window.innerHeight;
this.ViewportResized = true;


this.InputState = {};


this.InputDelta = {};


this.InputTouches = {};
this.Ui = document.querySelector("main");
this.Canvas3D = document.querySelector("canvas");
this.Gl = this.Canvas3D.getContext("webgl2");
this.Audio = new AudioContext();
document.addEventListener("visibilitychange", () => document.hidden ? this.Stop() : this.Start());
this.Ui.addEventListener("touchstart", (evt) => {
if (evt.target === this.Ui) {

evt.preventDefault();
}
if (evt.touches.length === 1) {

this.InputTouches = {};
}
for (let i = 0; i < evt.touches.length; i++) {
let touch = evt.touches[i];
this.InputTouches[touch.identifier] = i;
}
for (let i = 0; i < evt.changedTouches.length; i++) {
let touch = evt.changedTouches[i];
let index = this.InputTouches[touch.identifier];
this.InputState[`Touch${index}`] = 1;
this.InputState[`Touch${index}X`] = touch.clientX;
this.InputState[`Touch${index}Y`] = touch.clientY;
this.InputDelta[`Touch${index}`] = 1;
}
});
this.Ui.addEventListener("touchmove", (evt) => {
if (evt.target === this.Ui) {

evt.preventDefault();
}
for (let i = 0; i < evt.changedTouches.length; i++) {
let touch = evt.changedTouches[i];
let index = this.InputTouches[touch.identifier];
this.InputState[`Touch${index}X`] = touch.clientX;
this.InputState[`Touch${index}Y`] = touch.clientY;
}
});
this.Ui.addEventListener("touchend", (evt) => {
if (evt.target === this.Ui) {

evt.preventDefault();
}
for (let i = 0; i < evt.changedTouches.length; i++) {
let touch = evt.changedTouches[i];
let index = this.InputTouches[touch.identifier];
this.InputState[`Touch${index}`] = 0;
this.InputDelta[`Touch${index}`] = -1;
}
});
this.Ui.addEventListener("touchcancel", (evt) => {
for (let i = 0; i < evt.changedTouches.length; i++) {
let touch = evt.changedTouches[i];
let index = this.InputTouches[touch.identifier];
this.InputState[`Touch${index}`] = 0;
this.InputDelta[`Touch${index}`] = -1;
}
});
window.addEventListener("keydown", (evt) => {
if (!evt.repeat) {
this.InputState[evt.code] = 1;
this.InputDelta[evt.code] = 1;
}
});
window.addEventListener("keyup", (evt) => {
this.InputState[evt.code] = 0;
this.InputDelta[evt.code] = -1;
});
this.Gl.enable(GL_DEPTH_TEST);
this.Gl.enable(GL_CULL_FACE);
this.Gl.frontFace(GL_CW);
}
Start() {
let accumulator = 0;
let last = performance.now();
let delta_cma = 0;
let frame_count = 0;
let tick = (now) => {
let delta = (now - last) / 1000;
this.FrameSetup(delta);
accumulator += delta;
while (accumulator >= step) {
accumulator -= step;
this.FixedUpdate(step);
this.InputReset();
}
this.FrameUpdate(delta);
this.FrameReset(delta);
last = now;
this.Running = requestAnimationFrame(tick);
if (frame_count++ > 100) {

delta_cma += (delta - delta_cma) / frame_count;
if (delta_cma > 0.018) {
delta_cma = 0;
frame_count = 0;
this.Quality = Math.max(512 /* Low */, this.Quality / 2);
}
}
};
this.Stop();
tick(last);
}
Stop() {
cancelAnimationFrame(this.Running);
this.Running = 0;
}
FrameSetup(delta) {
this.Now = performance.now();
}
FixedUpdate(step) { }
FrameUpdate(delta) { }
InputReset() {
for (let name in this.InputDelta) {
this.InputDelta[name] = 0;
}
}
FrameReset(delta) {
this.ViewportResized = false;
let update = performance.now() - this.Now;
if (update_span) {
update_span.textContent = update.toFixed(1);
}
if (delta_span) {
delta_span.textContent = (delta * 1000).toFixed(1);
}
if (fps_span) {
fps_span.textContent = (1 / delta).toFixed();
}
}
}
function instantiate(game, blueprint) {
let entity = game.World.CreateEntity();
for (let mixin of blueprint) {
mixin(game, entity);
}
return entity;
}

function control_player(flags) {
return (game, entity) => {
game.World.Signature[entity] |= 128 /* ControlPlayer */;
game.World.ControlPlayer[entity] = {
Flags: flags,
IsFacingRight: true,
IsGrabbingEntity: null,
};
};
}

/**
* @module components/com_mimic
*/
function mimic(Target, Stiffness = 0.1) {
return (game, entity) => {
game.World.Signature[entity] |= 4096 /* Mimic */;
game.World.Mimic[entity] = {
Target,
Stiffness,
};
};
}

/**
* @module components/com_named
*/
function named(Name) {
return (game, entity) => {
game.World.Signature[entity] |= 16384 /* Named */;
game.World.Named[entity] = { Name };
};
}
function find_first(world, name, start_at = 0) {
for (let i = start_at; i < world.Signature.length; i++) {
if (world.Signature[i] & 16384 /* Named */ && world.Named[i].Name === name) {
return i;
}
}
throw `No entity named ${name}.`;
}

/**
* @module components/com_task
*/
/** A task that completes when the predicate returns true. */
function task_until(predicate, on_done) {
return (game, entity) => {
game.World.Signature[entity] |= 524288 /* Task */;
game.World.Task[entity] = {
Kind: 0 /* Until */,
Predicate: predicate,
OnDone: on_done,
};
};
}
/** A task that completes after the specified duration (in seconds). */
function task_timeout(duration, on_done) {
return (game, entity) => {
game.World.Signature[entity] |= 524288 /* Task */;
game.World.Task[entity] = {
Kind: 1 /* Timeout */,
Remaining: duration,
OnDone: on_done,
};
};
}

const EPSILON = 0.000001;
const DEG_TO_RAD = Math.PI / 180;

function clamp(min, max, num) {
return Math.max(min, Math.min(max, num));
}

function create() {
return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}
function copy$2(out, a) {
out[0] = a[0];
out[1] = a[1];
out[2] = a[2];
out[3] = a[3];
out[4] = a[4];
out[5] = a[5];
out[6] = a[6];
out[7] = a[7];
out[8] = a[8];
out[9] = a[9];
out[10] = a[10];
out[11] = a[11];
out[12] = a[12];
out[13] = a[13];
out[14] = a[14];
out[15] = a[15];
return out;
}
function invert(out, a) {
let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
let b00 = a00 * a11 - a01 * a10;
let b01 = a00 * a12 - a02 * a10;
let b02 = a00 * a13 - a03 * a10;
let b03 = a01 * a12 - a02 * a11;
let b04 = a01 * a13 - a03 * a11;
let b05 = a02 * a13 - a03 * a12;
let b06 = a20 * a31 - a21 * a30;
let b07 = a20 * a32 - a22 * a30;
let b08 = a20 * a33 - a23 * a30;
let b09 = a21 * a32 - a22 * a31;
let b10 = a21 * a33 - a23 * a31;
let b11 = a22 * a33 - a23 * a32;
let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
if (!det) {
return null;
}
det = 1.0 / det;
out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
return out;
}
function multiply$1(out, a, b) {
let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]; 
let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
b0 = b[4];
b1 = b[5];
b2 = b[6];
b3 = b[7];
out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
b0 = b[8];
b1 = b[9];
b2 = b[10];
b3 = b[11];
out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
b0 = b[12];
b1 = b[13];
b2 = b[14];
b3 = b[15];
out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
return out;
}
function from_rotation_translation_scale(out, q, v, s) {

let x = q[0], y = q[1], z = q[2], w = q[3];
let x2 = x + x;
let y2 = y + y;
let z2 = z + z;
let xx = x * x2;
let xy = x * y2;
let xz = x * z2;
let yy = y * y2;
let yz = y * z2;
let zz = z * z2;
let wx = w * x2;
let wy = w * y2;
let wz = w * z2;
let sx = s[0];
let sy = s[1];
let sz = s[2];
out[0] = (1 - (yy + zz)) * sx;
out[1] = (xy + wz) * sx;
out[2] = (xz - wy) * sx;
out[3] = 0;
out[4] = (xy - wz) * sy;
out[5] = (1 - (xx + zz)) * sy;
out[6] = (yz + wx) * sy;
out[7] = 0;
out[8] = (xz + wy) * sz;
out[9] = (yz - wx) * sz;
out[10] = (1 - (xx + yy)) * sz;
out[11] = 0;
out[12] = v[0];
out[13] = v[1];
out[14] = v[2];
out[15] = 1;
return out;
}
function perspective(out, fovy, aspect, near, far) {
let f = 1.0 / Math.tan(fovy / 2), nf;
out[0] = f / aspect;
out[1] = 0;
out[2] = 0;
out[3] = 0;
out[4] = 0;
out[5] = f;
out[6] = 0;
out[7] = 0;
out[8] = 0;
out[9] = 0;
out[11] = -1;
out[12] = 0;
out[13] = 0;
out[15] = 0;
if (far != null && far !== Infinity) {
nf = 1 / (near - far);
out[10] = (far + near) * nf;
out[14] = 2 * far * near * nf;
}
else {
out[10] = -1;
out[14] = -2 * near;
}
return out;
}
function ortho(out, top, right, bottom, left, near, far) {
let lr = 1 / (left - right);
let bt = 1 / (bottom - top);
let nf = 1 / (near - far);
out[0] = -2 * lr;
out[1] = 0;
out[2] = 0;
out[3] = 0;
out[4] = 0;
out[5] = -2 * bt;
out[6] = 0;
out[7] = 0;
out[8] = 0;
out[9] = 0;
out[10] = 2 * nf;
out[11] = 0;
out[12] = (left + right) * lr;
out[13] = (top + bottom) * bt;
out[14] = (far + near) * nf;
out[15] = 1;
return out;
}
function get_forward(out, mat) {
out[0] = mat[8];
out[1] = mat[9];
out[2] = mat[10];
return normalize(out, out);
}
function get_translation(out, mat) {
out[0] = mat[12];
out[1] = mat[13];
out[2] = mat[14];
return out;
}
function get_rotation(out, mat) {

let sm11 = mat[0];
let sm12 = mat[1];
let sm13 = mat[2];
let sm21 = mat[4];
let sm22 = mat[5];
let sm23 = mat[6];
let sm31 = mat[8];
let sm32 = mat[9];
let sm33 = mat[10];
let trace = sm11 + sm22 + sm33;
let S = 0;
if (trace > 0) {
S = Math.sqrt(trace + 1.0) * 2;
out[3] = 0.25 * S;
out[0] = (sm23 - sm32) / S;
out[1] = (sm31 - sm13) / S;
out[2] = (sm12 - sm21) / S;
}
else if (sm11 > sm22 && sm11 > sm33) {
S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
out[3] = (sm23 - sm32) / S;
out[0] = 0.25 * S;
out[1] = (sm12 + sm21) / S;
out[2] = (sm31 + sm13) / S;
}
else if (sm22 > sm33) {
S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
out[3] = (sm31 - sm13) / S;
out[0] = (sm12 + sm21) / S;
out[1] = 0.25 * S;
out[2] = (sm23 + sm32) / S;
}
else {
S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
out[3] = (sm12 - sm21) / S;
out[0] = (sm31 + sm13) / S;
out[1] = (sm23 + sm32) / S;
out[2] = 0.25 * S;
}
return out;
}

function set$1(out, x, y, z) {
out[0] = x;
out[1] = y;
out[2] = z;
return out;
}
function copy$1(out, a) {
out[0] = a[0];
out[1] = a[1];
out[2] = a[2];
return out;
}
function add(out, a, b) {
out[0] = a[0] + b[0];
out[1] = a[1] + b[1];
out[2] = a[2] + b[2];
return out;
}
function subtract(out, a, b) {
out[0] = a[0] - b[0];
out[1] = a[1] - b[1];
out[2] = a[2] - b[2];
return out;
}
function scale(out, a, b) {
out[0] = a[0] * b;
out[1] = a[1] * b;
out[2] = a[2] * b;
return out;
}
function negate(out, a) {
out[0] = -a[0];
out[1] = -a[1];
out[2] = -a[2];
return out;
}
function normalize(out, a) {
let x = a[0];
let y = a[1];
let z = a[2];
let len = x * x + y * y + z * z;
if (len > 0) {
//TODO: evaluate use of glm_invsqrt here?
len = 1 / Math.sqrt(len);
}
out[0] = a[0] * len;
out[1] = a[1] * len;
out[2] = a[2] * len;
return out;
}
function dot(a, b) {
return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function transform_point(out, a, m) {
let x = a[0], y = a[1], z = a[2];
let w = m[3] * x + m[7] * y + m[11] * z + m[15];
w = w || 1.0;
out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
return out;
}
function transform_direction(out, a, m) {
let tip = transform_point([0, 0, 0], a, m);
let base = get_translation([0, 0, 0], m);
return subtract(out, tip, base);
}
function length(a) {
let x = a[0];
let y = a[1];
let z = a[2];
return Math.hypot(x, y, z);
}
function lerp(out, a, b, t) {
let ax = a[0];
let ay = a[1];
let az = a[2];
out[0] = ax + t * (b[0] - ax);
out[1] = ay + t * (b[1] - ay);
out[2] = az + t * (b[2] - az);
return out;
}

function set(out, x, y, z, w) {
out[0] = x;
out[1] = y;
out[2] = z;
out[3] = w;
return out;
}
function copy(out, a) {
out[0] = a[0];
out[1] = a[1];
out[2] = a[2];
out[3] = a[3];
return out;
}
function multiply(out, a, b) {
let ax = a[0], ay = a[1], az = a[2], aw = a[3];
let bx = b[0], by = b[1], bz = b[2], bw = b[3];
out[0] = ax * bw + aw * bx + ay * bz - az * by;
out[1] = ay * bw + aw * by + az * bx - ax * bz;
out[2] = az * bw + aw * bz + ax * by - ay * bx;
out[3] = aw * bw - ax * bx - ay * by - az * bz;
return out;
}
/**
* Compute a quaternion out of three Euler angles given in degrees. The order of rotation is YXZ.
* @param out Quaternion to write to.
* @param x Rotation about the X axis, in degrees.
* @param y Rotation around the Y axis, in degress.
* @param z Rotation around the Z axis, in degress.
*/
function from_euler(out, x, y, z) {
let sx = Math.sin((x / 2) * DEG_TO_RAD);
let cx = Math.cos((x / 2) * DEG_TO_RAD);
let sy = Math.sin((y / 2) * DEG_TO_RAD);
let cy = Math.cos((y / 2) * DEG_TO_RAD);
let sz = Math.sin((z / 2) * DEG_TO_RAD);
let cz = Math.cos((z / 2) * DEG_TO_RAD);
out[0] = sx * cy * cz + cx * sy * sz;
out[1] = cx * sy * cz - sx * cy * sz;
out[2] = cx * cy * sz - sx * sy * cz;
out[3] = cx * cy * cz + sx * sy * sz;
return out;
}
/**
* Performs a spherical linear interpolation between two quat
*
* @param out - the receiving quaternion
* @param a - the first operand
* @param b - the second operand
* @param t - interpolation amount, in the range [0-1], between the two inputs
*/
function slerp(out, a, b, t) {


let ax = a[0], ay = a[1], az = a[2], aw = a[3];
let bx = b[0], by = b[1], bz = b[2], bw = b[3];
let omega, cosom, sinom, scale0, scale1;

cosom = ax * bx + ay * by + az * bz + aw * bw;

if (cosom < 0.0) {
cosom = -cosom;
bx = -bx;
by = -by;
bz = -bz;
bw = -bw;
}

if (1.0 - cosom > EPSILON) {

omega = Math.acos(cosom);
sinom = Math.sin(omega);
scale0 = Math.sin((1.0 - t) * omega) / sinom;
scale1 = Math.sin(t * omega) / sinom;
}
else {


scale0 = 1.0 - t;
scale1 = t;
}

out[0] = scale0 * ax + scale1 * bx;
out[1] = scale0 * ay + scale1 * by;
out[2] = scale0 * az + scale1 * bz;
out[3] = scale0 * aw + scale1 * bw;
return out;
}

/**
* @module components/com_camera
*/
function camera_forward_perspective(fovy, near, far, clear_color = [0.9, 0.9, 0.9, 1]) {
return (game, entity) => {
game.World.Signature[entity] |= 8 /* Camera */;
game.World.Camera[entity] = {
Kind: 0 /* Forward */,
Projection: {
Kind: 0 /* Perspective */,
FovY: fovy,
Near: near,
Far: far,
Projection: create(),
Inverse: create(),
},
View: create(),
Pv: create(),
Position: [0, 0, 0],
ClearColor: clear_color,
};
};
}
function camera_depth_ortho(target, radius, near, far, clear_color = [0, 0, 0, 1]) {
return (game, entity) => {
game.World.Signature[entity] |= 8 /* Camera */;
game.World.Camera[entity] = {
Kind: 3 /* Depth */,
Target: target,
Projection: {
Kind: 1 /* Ortho */,
Radius: radius,
Near: near,
Far: far,
Projection: create(),
Inverse: create(),
},
View: create(),
Pv: create(),
Position: [0, 0, 0],
ClearColor: clear_color,
};
};
}

/**
* @module components/com_children
*/
/**
* Add one or more child blueprints to the entity. Can only be called once.
*/
function children(...blueprints) {
return (game, entity) => {
let child_entities = [];
for (let blueprint of blueprints) {
let child = instantiate(game, blueprint);
child_entities.push(child);
}
game.World.Signature[entity] |= 16 /* Children */;
game.World.Children[entity] = {
Children: child_entities,
};
};
}
/**
* Yield entities matching a component mask. The query is tested against the
* parent and all its descendants.
*
* @param world World object which stores the component data.
* @param parent Parent entity to traverse.
* @param mask Component mask to look for.
*/
function* query_all(world, parent, mask) {
if ((world.Signature[parent] & mask) === mask) {
yield parent;
}
if (world.Signature[parent] & 16 /* Children */) {
for (let child of world.Children[parent].Children) {
yield* query_all(world, child, mask);
}
}
}
/**
* Delete the entity with all its descendants.
* @param world World object which stores the component data.
* @param entity The root entity to start removing at.
*/
function destroy_all(world, entity) {
if (world.Signature[entity] & 16 /* Children */) {
for (let child of world.Children[entity].Children) {
destroy_all(world, child);
}
}
world.DestroyEntity(entity);
}

/**
* @module components/com_transform
*/
function transform(translation = [0, 0, 0], rotation = [0, 0, 0, 1], scale = [1, 1, 1]) {
return (game, entity) => {
game.World.Signature[entity] |= 1048576 /* Transform */;
game.World.Transform[entity] = {
World: create(),
Self: create(),
Translation: translation,
Rotation: rotation,
Scale: scale,
Dirty: true,
};
};
}
/**
* Yield ascendants matching a component mask. Test the current entity first.
*
* @param world World object which stores the component data.
* @param entity The first entity to traverse.
* @param mask Component mask to look for.
*/
function* query_up(world, entity, mask) {
if ((world.Signature[entity] & mask) === mask) {
yield entity;
}
let parent = world.Transform[entity].Parent;
if (parent !== undefined) {
yield* query_up(world, parent, mask);
}
}

function blueprint_camera(game, clear_color) {
return [children([transform([0, 0, 5]), camera_forward_perspective(1, 0.1, 15, clear_color)])];
}

function ease_out_quart(t) {
return 1 - (1 - t) ** 4;
}
function ease_in_out_quart(t) {
return t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
}

/**
* @module components/com_animate
*/
function animate(clips) {
return (game, entity) => {
let States = {};
for (let name in clips) {
let { Keyframes, Flags = 7 /* Default */ } = clips[name];
let duration = Keyframes[Keyframes.length - 1].Timestamp;
States[name] = {





Keyframes: Keyframes.map((keyframe) => ({ ...keyframe })),
Flags,
Duration: duration,
Time: 0,
};
}
game.World.Signature[entity] |= 1 /* Animate */;
game.World.Animate[entity] = {
States,
Current: States["i"],
};
};
}

function bone(index, inverse_bind_pose) {
return (game, entity) => {
game.World.Signature[entity] |= 4 /* Bone */;
game.World.Bone[entity] = {
Index: index,
Dirty: inverse_bind_pose === undefined,
InverseBindPose: inverse_bind_pose || create(),
};
};
}

function cull(mask) {
return (game, entity) => {
game.World.Signature[entity] |= 256 /* Cull */;
game.World.Cull[entity] = {
Mask: mask,
};
};
}

/**
* @module components/com_render
*/
const colored_shadows_vaos = new WeakMap();
const colored_skinned_vaos = new WeakMap();
function render_colored_shadows(material, mesh, diffuse_color) {
return (game, entity) => {
if (!colored_shadows_vaos.has(mesh)) {

let vao = game.Gl.createVertexArray();
game.Gl.bindVertexArray(vao);
game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
game.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.NormalBuffer);
game.Gl.enableVertexAttribArray(material.Locations.VertexNormal);
game.Gl.vertexAttribPointer(material.Locations.VertexNormal, 3, GL_FLOAT, false, 0, 0);
game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);
game.Gl.bindVertexArray(null);
colored_shadows_vaos.set(mesh, vao);
}
game.World.Signature[entity] |= 32768 /* Render */;
game.World.Render[entity] = {
Kind: 1 /* ColoredShadows */,
Material: material,
Mesh: mesh,
Vao: colored_shadows_vaos.get(mesh),
DiffuseColor: diffuse_color,
};
};
}
function render_colored_skinned(material, mesh, diffuse_color) {
return (game, entity) => {
if (!colored_skinned_vaos.has(mesh)) {

let vao = game.Gl.createVertexArray();
game.Gl.bindVertexArray(vao);
game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
game.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.NormalBuffer);
game.Gl.enableVertexAttribArray(material.Locations.VertexNormal);
game.Gl.vertexAttribPointer(material.Locations.VertexNormal, 3, GL_FLOAT, false, 0, 0);
game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.WeightsBuffer);
game.Gl.enableVertexAttribArray(material.Locations.VertexWeights);
game.Gl.vertexAttribPointer(material.Locations.VertexWeights, 4, GL_FLOAT, false, 0, 0);
game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);
game.Gl.bindVertexArray(null);
colored_skinned_vaos.set(mesh, vao);
}
game.World.Signature[entity] |= 32768 /* Render */;
game.World.Render[entity] = {
Kind: 2 /* ColoredSkinned */,
Material: material,
Mesh: mesh,
Vao: colored_skinned_vaos.get(mesh),
DiffuseColor: diffuse_color,
};
};
}
const DATA_PER_PARTICLE = 8;
const MAX_PARTICLES = 200;
function render_particles_colored(start_color, start_size, end_color, end_size) {
return (game, entity) => {
let buffer = game.Gl.createBuffer();
game.Gl.bindBuffer(GL_ARRAY_BUFFER, buffer);
game.Gl.bufferData(GL_ARRAY_BUFFER, MAX_PARTICLES * DATA_PER_PARTICLE * 4, GL_DYNAMIC_DRAW);
game.World.Signature[entity] |= 32768 /* Render */;
game.World.Render[entity] = {
Kind: 3 /* ParticlesColored */,
Material: game.MaterialParticlesColored,
Buffer: buffer,
ColorStart: start_color,
ColorEnd: end_color,
Size: [start_size, end_size],
};
};
}
function render_instanced(mesh, offsets) {
return (game, entity) => {
let material = game.MaterialInstanced;






let vao = game.Gl.createVertexArray();
game.Gl.bindVertexArray(vao);
game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
game.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
let instance_buffer = game.Gl.createBuffer();
game.Gl.bindBuffer(GL_ARRAY_BUFFER, instance_buffer);
game.Gl.bufferData(GL_ARRAY_BUFFER, offsets, GL_STATIC_DRAW);
game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn1);
game.Gl.vertexAttribPointer(material.Locations.InstanceColumn1, 3, GL_FLOAT, false, 4 * 16, 0);
game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn1, 1);
game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn2);
game.Gl.vertexAttribPointer(material.Locations.InstanceColumn2, 3, GL_FLOAT, false, 4 * 16, 4 * 4);
game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn2, 1);
game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn3);
game.Gl.vertexAttribPointer(material.Locations.InstanceColumn3, 3, GL_FLOAT, false, 4 * 16, 4 * 8);
game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn3, 1);
game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn4);
game.Gl.vertexAttribPointer(material.Locations.InstanceColumn4, 3, GL_FLOAT, false, 4 * 16, 4 * 12);
game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn4, 1);
game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);
game.Gl.bindVertexArray(null);
game.World.Signature[entity] |= 32768 /* Render */;
game.World.Render[entity] = {
Kind: 4 /* Instanced */,
Material: material,
Mesh: mesh,
Vao: vao,
InstanceCount: offsets.length / 16,
InstanceBuffer: instance_buffer,
};
};
}

const jump_keytime_1 = 0.2;
const jump_keytime_2 = 0.6;
const jump_keytime_3 = 1;
const sit_keytime_1 = 9;
const sit_keytime_2 = sit_keytime_1 + 1;
const sit_keytime_3 = sit_keytime_2 + 5;
const sit_keytime_4 = sit_keytime_3 + 1;
function blueprint_lisek(game, color = [1, 0.5, 0, 1], timescale = 1) {
return [
render_colored_skinned(game.MaterialColoredSkinned, game.MeshLisek, color),
children([
transform([0, 0.35, -0.47], [0.672, 0, 0, 0.74]),
children([
transform(),

named(timescale === 1 ? "ta" : ""),
bone(0 /* Root */, [
1.0, 0.0, 0.0, 0.0, 0.0, 0.096, -0.995, 0.0, 0.0, 0.995, 0.096, 0.0, 0.0,
0.433, 0.395, 1.0,
]),
cull(1 /* Animate */),
animate({
i: {
Keyframes: [
{
Timestamp: 0,
Translation: [0, 0, 0],
Rotation: [0, 0, 0, 1],
},
{
Timestamp: sit_keytime_1 * timescale,
Translation: [0, 0, 0],
Rotation: [0, 0, 0, 1],
},
{
Timestamp: sit_keytime_2 * timescale,
Translation: [0, -0.044, 0.289],
Rotation: [-0.288, 0, 0, 0.958],
Ease: ease_in_out_quart,
},
{
Timestamp: sit_keytime_3 * timescale,
Translation: [0, -0.044, 0.289],
Rotation: [-0.288, 0, 0, 0.958],
},
{
Timestamp: sit_keytime_4 * timescale,
Translation: [0, 0, 0],
Rotation: [0, 0, 0, 1],
Ease: ease_in_out_quart,
},
],
Flags: 2 /* Loop */ | 1 /* EarlyExit */,
},
w: {
Keyframes: [
{
Timestamp: 0,
Translation: [0, 0, 0],
Rotation: [0, 0, 0, 1],
},
],
Flags: 1 /* EarlyExit */ | 4 /* Alternate */,
},
j: {
Keyframes: [
{
Timestamp: 0.0,
Translation: [0, 0, 0],
Rotation: [0, 0, 0, 1],
},
{
Timestamp: jump_keytime_1 * timescale,
Translation: [0, 0, 0],
Rotation: [-0.131, 0, 0, 0.991],
Ease: ease_out_quart,
},
{
Timestamp: jump_keytime_2 * timescale,
Translation: [0, 0, 0],
Rotation: [0.087, 0, 0, 0.996],
},
{
Timestamp: jump_keytime_3 * timescale,
Translation: [0, 0, 0],
Rotation: [0, 0, 0, 1],
Ease: ease_out_quart,
},
],
Flags: 1 /* EarlyExit */,
},
}),
children([
transform([0, 0.46, 0], [-0.4, 0, 0, 0.92]),
children([

transform(),
cull(1 /* Animate */),
animate({
i: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: sit_keytime_1 * timescale,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: sit_keytime_2 * timescale,
Rotation: [0.371, 0, 0, 0.929],
Ease: ease_in_out_quart,
},
{
Timestamp: sit_keytime_3 * timescale,
Rotation: [0.371, 0, 0, 0.929],
},
{
Timestamp: sit_keytime_4 * timescale,
Rotation: [0, 0, 0, 1],
Ease: ease_in_out_quart,
},
],
Flags: 2 /* Loop */ | 1 /* EarlyExit */,
},
w: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, 0, 1],
},
],
Flags: 1 /* EarlyExit */ | 4 /* Alternate */,
},
j: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, 0, 1],
},
],
Flags: 1 /* EarlyExit */,
},
}),
children([
transform(),
bone(1 /* Head */, [
1.0, 0.0, 0.0, 0.0, 0.0, 0.795, -0.606, 0.0, 0.0, 0.606,
0.795, 0.0, 0.0, -0.306, 0.251, 1.0,
]),
cull(1 /* Animate */),
animate({
i: {
Keyframes: [
{
Timestamp: 0.0,
Rotation: [0, 0.088, 0.116, 0.989],
Ease: ease_in_out_quart,
},
{
Timestamp: 1 * timescale,
Rotation: [0, -0.088, -0.116, 0.989],
Ease: ease_in_out_quart,
},
],
},
w: {
Keyframes: [
{
Timestamp: 0.0,
Rotation: [0.087, 0.0, 0.0, 0.996],
},
{
Timestamp: 0.2 * timescale,
Rotation: [0, 0.0, 0.0, 1],
},
],
Flags: 1 /* EarlyExit */ | 4 /* Alternate */,
},
j: {
Keyframes: [
{
Timestamp: 0.0,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: jump_keytime_1 * timescale,
Rotation: [0.216, 0, 0, 0.976],
Ease: ease_out_quart,
},
{
Timestamp: jump_keytime_2 * timescale,
Rotation: [0.216, 0, 0, 0.976],
},
{
Timestamp: jump_keytime_3 * timescale,
Rotation: [0, 0, 0, 1],
Ease: ease_out_quart,
},
],
Flags: 1 /* EarlyExit */,
},
}),
]),
]),
], [
transform([0.07, 0.46, 0], [0.74, 0, 0, 0.672]),
children([
transform(),
bone(2 /* ArmL */, [
1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0,
-0.073, 0.395, -0.015, 1.0,
]),
cull(1 /* Animate */),
animate({
i: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, 0, 1],
},
],
},
w: {
Keyframes: [
{
Timestamp: 0,
Rotation: [-0.174, 0.0, 0.0, 0.985],
},
{
Timestamp: 0.2 * timescale,
Rotation: [0.131, 0.0, 0.0, 0.991],
},
],
Flags: 1 /* EarlyExit */ | 4 /* Alternate */,
},
j: {
Keyframes: [
{
Timestamp: 0.0,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: jump_keytime_1 * timescale,
Rotation: [-0.259, 0, 0, 0.966],
Ease: ease_out_quart,
},
{
Timestamp: jump_keytime_2 * timescale,
Rotation: [-0.259, 0, 0, 0.966],
},
{
Timestamp: jump_keytime_3 * timescale,
Rotation: [0, 0, 0, 1],
Ease: ease_out_quart,
},
],
Flags: 1 /* EarlyExit */,
},
}),
]),
], [
transform([-0.07, 0.46, 0], [0.74, 0, 0, 0.672]),
children([
transform(),
bone(3 /* ArmR */, [
1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0,
0.073, 0.395, -0.015, 1.0,
]),
cull(1 /* Animate */),
animate({
i: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, 0, 1],
},
],
},
w: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0.131, 0.0, 0.0, 0.991],
},
{
Timestamp: 0.2 * timescale,
Rotation: [-0.174, 0.0, 0.0, 0.985],
},
],
Flags: 1 /* EarlyExit */ | 4 /* Alternate */,
},
j: {
Keyframes: [
{
Timestamp: 0.0,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: jump_keytime_1 * timescale,
Rotation: [-0.301, 0, 0, 0.954],
Ease: ease_out_quart,
},
{
Timestamp: jump_keytime_2 * timescale,
Rotation: [-0.301, 0, 0, 0.954],
},
{
Timestamp: jump_keytime_3 * timescale,
Rotation: [0, 0, 0, 1],
Ease: ease_out_quart,
},
],
Flags: 1 /* EarlyExit */,
},
}),
]),
], [
transform([0.07, 0, 0], [0.753, 0, 0, 0.658]),
children([
transform(),
bone(4 /* HipL */, [
1.0, 0.0, 0.0, 0.0, 0.0, -0.992, 0.124, 0.0, 0.0, -0.124,
-0.992, 0.0, -0.073, 0.291, -0.509, 1.0,
]),
cull(1 /* Animate */),
animate({
i: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: sit_keytime_1 * timescale,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: sit_keytime_2 * timescale,
Rotation: [-0.492, 0, 0, 0.87],
Ease: ease_in_out_quart,
},
{
Timestamp: sit_keytime_3 * timescale,
Rotation: [-0.492, 0, 0, 0.87],
},
{
Timestamp: sit_keytime_4 * timescale,
Rotation: [0, 0, 0, 1],
Ease: ease_in_out_quart,
},
],
Flags: 2 /* Loop */ | 1 /* EarlyExit */,
},
w: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0.131, 0.0, 0.0, 0.991],
},
{
Timestamp: 0.2 * timescale,
Rotation: [-0.131, 0.0, 0.0, 0.991],
},
],
Flags: 1 /* EarlyExit */ | 4 /* Alternate */,
},
j: {
Keyframes: [
{
Timestamp: 0.0,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: jump_keytime_1 * timescale,
Rotation: [0.383, 0, 0, 0.924],
Ease: ease_out_quart,
},
{
Timestamp: jump_keytime_2 * timescale,
Rotation: [0.383, 0, 0, 0.924],
},
{
Timestamp: jump_keytime_3 * timescale,
Rotation: [0, 0, 0, 1],
Ease: ease_out_quart,
},
],
Flags: 1 /* EarlyExit */,
},
}),
]),
], [
transform([-0.07, 0, 0], [0.753, 0, 0, 0.658]),
children([
transform(),
bone(5 /* HipR */, [
1.0, 0.0, 0.0, 0.0, 0.0, -0.992, 0.124, 0.0, 0.0, -0.124,
-0.992, 0.0, 0.073, 0.291, -0.509, 1.0,
]),
cull(1 /* Animate */),
animate({
i: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: sit_keytime_1 * timescale,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: sit_keytime_2 * timescale,
Rotation: [-0.468, 0, 0, 0.884],
Ease: ease_in_out_quart,
},
{
Timestamp: sit_keytime_3 * timescale,
Rotation: [-0.468, 0, 0, 0.884],
},
{
Timestamp: sit_keytime_4 * timescale,
Rotation: [0, 0, 0, 1],
Ease: ease_in_out_quart,
},
],
Flags: 2 /* Loop */ | 1 /* EarlyExit */,
},
w: {
Keyframes: [
{
Timestamp: 0,
Rotation: [-0.131, 0.0, 0.0, 0.991],
},
{
Timestamp: 0.2 * timescale,
Rotation: [0.131, 0.0, 0.0, 0.991],
},
],
Flags: 1 /* EarlyExit */ | 4 /* Alternate */,
},
j: {
Keyframes: [
{
Timestamp: 0.0,
Rotation: [0, 0, 0, 1],
},
{
Timestamp: jump_keytime_1 * timescale,
Rotation: [0.301, 0, 0, 0.954],
Ease: ease_out_quart,
},
{
Timestamp: jump_keytime_2 * timescale,
Rotation: [0.301, 0, 0, 0.954],
},
{
Timestamp: jump_keytime_3 * timescale,
Rotation: [0, 0, 0, 1],
Ease: ease_out_quart,
},
],
Flags: 1 /* EarlyExit */,
},
}),
]),
]),
]),
]),
];
}

/**
* Add EmitParticles.
*
* @param lifespan How long particles live for.
* @param frequency How often particles spawn.
* @param speed How fast particles move.
*/
function emit_particles(lifespan, frequency, speed) {
return (game, entity) => {
game.World.Signature[entity] |= 512 /* EmitParticles */;
game.World.EmitParticles[entity] = {
Lifespan: lifespan,
Frequency: frequency,
Speed: speed,
Instances: [],
SinceLast: 0,
};
};
}

/**
* @module components/com_light
*/
function light(range) {
return (game, entity) => {
game.World.Signature[entity] |= 2048 /* Light */;
game.World.Light[entity] = {

Intensity: range ** 2,
};
};
}

/**
* @module components/com_shake
*/
/**
* sys_shake modifies the transform of the entity. Add it to children only.
*/
function shake(magnitude) {
return (game, entity) => {
game.World.Signature[entity] |= 131072 /* Shake */;
game.World.Shake[entity] = {
Magnitude: magnitude,
};
};
}

function blueprint_pixie(game) {
return [

mimic(find_first(game.World, "wa"), 0.02),
light(1.5),
children([
transform(),
shake(0.1),
emit_particles(1, 0.1, 0.1),
render_particles_colored([1, 1, 1, 1], 8, [0.5, 0.5, 1, 1], 1),
]),
task_timeout(7, (entity) => {
let mimic = game.World.Mimic[entity];
mimic.Target = find_first(game.World, "exit");
}),
];
}

/**
* @module components/com_audio_source
*/
/**
* Add the AudioSource component.
*
* @param i The name of the clip to play by default, in a loop.
*/
function audio_source(i) {
return (game, entity) => {
game.World.Signature[entity] |= 2 /* AudioSource */;
game.World.AudioSource[entity] = {
Idle: i,
Time: 0,
};
};
}

/**
* @module components/com_callback
*/
function callback(fn) {
return (game, entity) => {
fn(game, entity);
};
}

/**
* @module components/com_collide
*/
/**
* Add the Collide component.
*
* @param dynamic Dynamic colliders collider with all colliders. Static
* colliders collide only with dynamic colliders.
* @param layers Bit field with layers this collider is on.
* @param mask Bit mask with layers visible to this collider.
* @param size Size of the collider relative to the entity's transform.
*/
function collide(dynamic, layers, mask, size = [1, 1, 1]) {
return (game, entity) => {
game.World.Signature[entity] |= 32 /* Collide */;
game.World.Collide[entity] = {
EntityId: entity,
New: true,
Dynamic: dynamic,
Layers: layers,
Signature: mask,
Size: size,
Min: [0, 0, 0],
Max: [0, 0, 0],
Center: [0, 0, 0],
Half: [0, 0, 0],
Collisions: [],
};
};
}

/**
* @module components/com_control_always
*/
function control_always(direction, rotation, animation) {
return (game, entity) => {
game.World.Signature[entity] |= 64 /* ControlAlways */;
game.World.ControlAlways[entity] = {
Direction: direction,
Rotation: rotation,
AnimationClip: animation,
};
};
}

/**
* @module components/com_move
*/
/**
* The Move mixin.
*
* @param move_speed - Movement speed in units per second.
* @param rotation_speed - Rotation speed, in radians per second.
*/
function move(move_speed, rotation_speed) {
return (game, entity) => {
game.World.Signature[entity] |= 8192 /* Move */;
game.World.Move[entity] = {
MoveSpeed: move_speed,
RotationSpeed: rotation_speed,
Directions: [],
LocalRotations: [],
};
};
}

/**
* @module components/com_rigid_body
*/
function rigid_body(kind, bounciness = 0.5) {
return (game, entity) => {
game.World.Signature[entity] |= 65536 /* RigidBody */;
game.World.RigidBody[entity] = {
Kind: kind,
Bounciness: bounciness,
Acceleration: [0, 0, 0],
VelocityIntegrated: [0, 0, 0],
VelocityResolved: [0, 0, 0],
IsAirborne: false,
};
};
}

function blueprint_player(game) {
return [
audio_source(),
control_player(1 /* Move */),
move(3, 0),
collide(true, 1 /* Player */, 2 /* Terrain */ | 4 /* Movable */, [0.6, 0.8, 0.8]),
rigid_body(1 /* Dynamic */, 0),
children(




[
named("ma"),
transform([0, -0.42, 0], [0, 0.71, 0, 0.71]),
control_player(2 /* Rotate */),
children([
transform([0, 0.5, 1], undefined, [0.1, 0.1, 0.1]),
collide(true, 0 /* None */, 4 /* Movable */),
control_player(8 /* Grab */),
//render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [1, 1, 1, 1]),
]),
], [
named("pa 0"),
transform([0, -0.42, 0.2], [0, 0.71, 0, 0.71]),
control_player(2 /* Rotate */),
], [
named("pa 1"),
transform([-0.2, -0.42, 0.2], [0, 0.71, 0, 0.71]),
control_player(2 /* Rotate */),
], [
named("pa 2"),
transform([-0.4, -0.42, 0.2], [0, 0.71, 0, 0.71]),
control_player(2 /* Rotate */),
], [named("ca"), transform([0.5, 0.5, 0], from_euler([0, 0, 0, 1], -10, 0, 0))], [named("sa"), transform()], [

named("wa"),
transform([4, 1, 0], [0, 0.71, 0, 0.71]),




]),
];
}
function instantiate_player(game, translation, pups_found = game.PupsFound) {
let player_entity = instantiate(game, [...blueprint_player(), transform(translation)]);
let tail_root = 0;
let tail_bone1 = 0;
let tail_bone2 = 0;
instantiate(game, [
transform([-10, 0, 0.5]),
mimic(find_first(game.World, "ma"), 0.2),
children(

[...blueprint_lisek(game), transform(), control_player(4 /* Animate */)], 

[
transform(),
render_colored_skinned(game.MaterialColoredSkinned, game.MeshOgon, [1, 0.5, 0, 1]),
]),
]);
instantiate(game, [
transform(),
mimic(find_first(game.World, "ta"), 1),
children([
transform([0, -0.2, -0.05], [1, 0, 0, 0]),
control_always(null, [0, -1, 0, 0]),
move(0, 1),
callback((game, entity) => (tail_root = entity)),
bone(0 /* Root */, [
1.0, -0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0, -0.701,
-0.428, 1.0,
]),




]),
]);
instantiate(game, [
transform(),
mimic(tail_root, 0.08),
bone(1 /* Bone1 */, [
1.0, -0.0, -0.0, 0.0, 0.0, 0.132, 0.991, 0.0, 0.0, -0.991, 0.132, 0.0, -0.0, -1.1,
-0.285, 1.0,
]),
children([
transform([0, 0.2, 0.1], undefined, [0.1, 0.1, 0.1]),
callback((game, entity) => (tail_bone1 = entity)),

]),
]);
instantiate(game, [
transform(),
mimic(tail_bone1, 0.06),
bone(2 /* Bone2 */, [
1.0, -0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0, -1.492, -0.487,
1.0,
]),
children([
transform([0, 0.2, 0.1], undefined, [0.1, 0.1, 0.1]),
callback((game, entity) => (tail_bone2 = entity)),

]),
]);
instantiate(game, [
transform(),
mimic(tail_bone2, 0.04),
bone(3 /* Bone3 */, [
-1.0, -0.0, -0.0, 0.0, 0.0, 0.137, -0.991, 0.0, 0.0, -0.991, -0.137, 0.0, -0.0,
-2.009, 0.214, 1.0,
]),
children([
transform([0, 0.2, 0.1], undefined, [0.1, 0.1, 0.1]),
callback((game, entity) => (entity)),

]),
]);
for (let i = 0; i < pups_found; i++) {
instantiate(game, [
transform(),
mimic(find_first(game.World, "pa " + i), 0.2 - 0.02 * i),
children([
...blueprint_lisek(game, [1, 0.5, 0, 1], 0.7 + 0.1 * i),
transform(undefined, undefined, [0.3, 0.3, 0.3]),
control_player(4 /* Animate */),
]),
]);
}
return player_entity;
}

let seed = 1;
function rand() {
seed = (seed * 16807) % 2147483647;
return (seed - 1) / 2147483646;
}
function integer(min = 0, max = 1) {
return ~~(rand() * (max - min + 1) + min);
}
function float(min = 0, max = 1) {
return rand() * (max - min) + min;
}
function element(arr) {
return arr[integer(0, arr.length - 1)];
}

/**
* @module components/com_lifespan
*/
function lifespan(remaining, action) {
return (game, entity) => {
game.World.Signature[entity] |= 1024 /* Lifespan */;
game.World.Lifespan[entity] = {
Remaining: remaining,
};
};
}

function prop_rocket(game) {
return [
children([
transform([0, 3.5, 0], [0, -0.71, 0, 0.71], [1, 7, 1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [1, 1, 1, 1]),
], [
transform([0, 7.8, 0], [0, -0.71, 0, 0.71], [0.8, 1.6, 0.8]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [1, 1, 1, 1]),
], [
transform([0, 9.4, 0], [0, -0.71, 0, 0.71], [0.56, 1.6, 0.56]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [1, 1, 1, 1]),
], [
transform([0, 10.2, 0], [-0.5, -0.5, 0.5, 0.5], [1.72, 0.51, 0.59]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [1, 1, 1, 1]),
], [
transform([0, 8.6, 0], [-0.5, -0.5, 0.5, 0.5], [1.12, 0.44, 0.8]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0, 0, 0, 1]),
], [
transform([0, 7, 0], [-0.5, -0.5, 0.5, 0.5], [2.61, 0.77, 0.9]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0, 0, 0, 1]),
]),
];
}

function blueprint_rocket(game) {
return [
control_always([0, 0, 1], null),
move(float(1, 3), 0),
lifespan(25),
children(

[
transform(undefined, from_euler([0, 0, 0, 1], 0, -90, -90), [0.1, 0.1, 0.1]),
...prop_rocket(game),
], 

[
transform(undefined, [0, 1, 0, 0]),
shake(0.02),
emit_particles(1, 0.01, 1),
render_particles_colored([1, 0.5, 0, 1], 10, [0.56, 0.33, 0.24, 1], 2),
]),
];
}

/**
* @module components/com_disable
*/
function disable(mask) {
return (game, entity) => {
game.World.Signature[entity] &= ~mask;
};
}

/**
* @module components/com_spawn
*/
/**
* Spawn blueprints with a given frequency.
*
* @param creator The function returning the blueprint to spawn.
* @param interval The frequency of spawning.
*/
function spawn(creator, interval) {
return (game, entity) => {
game.World.Signature[entity] |= 262144 /* Spawn */;
game.World.Spawn[entity] = {
Creator: creator,
Interval: interval,
SinceLast: interval,
};
};
}

let snd_chirp1 = {
Tracks: [
{
Instrument: [3, "highpass", 11, 0, true, "sine", 4, 7, [["sine", 8, 2, 8, 5, 8, true]]],
Notes: [79],
},
],
Exit: 19,
};

let snd_horn = {
Tracks: [
{
Instrument: [
5,
"lowpass",
8,
0,
true,
"triangle",
4,
4,
[
["sine", 8, 8, 12, 14, 8, false],
["triangle", 6, 7, 12, 15, 15, false],
],
],
Notes: [24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 0, 0, 0, 0],
},
],
Exit: 6,
};

let snd_wind = {
Tracks: [
{
Instrument: [7, "lowpass", 8, 6, true, "sine", 9, 2, [[false, 3, 6, 4, 13]]],
Notes: [57],
},
],
Exit: 13,
};

function App(game) {
return game.CurrentView(game);
}
function Title(game) {
return `
<div
style="
margin: 40vh -1vw 0;
font-size: 16vw;
font-weight: 600;
"
>
ESCAPE
</div>
<div>
Earth has become uninhabitable.<br>
Humans are leaving.<br><br>
<em onclick="$(${1 /* NewGame */})">Play Now</em>
</div>
`;
}
function Play(game) {
return "";
}
function End(game) {
return `
<div
style="
margin: 20vh -1vw 0;
font-size: 12vw;
font-weight: 600;
"
>
THE END
</div>
<div>
Not all of us will make it.<br>
Stop climate change now.<br>
</div>
`;
}

class WorldImpl {
constructor() {
this.Signature = [];
this.Graveyard = [];
}
CreateEntity() {
if (this.Graveyard.length > 0) {
return this.Graveyard.pop();
}
if (DEBUG && this.Signature.length > 10000) {
throw new Error("No more entities available.");
}

return this.Signature.push(0) - 1;
}
DestroyEntity(entity) {
this.Signature[entity] = 0;
if (DEBUG && this.Graveyard.includes(entity)) {
throw new Error("Entity already in graveyard.");
}
this.Graveyard.push(entity);
}
}

function first_entity(world, query, start_at = 0) {
for (let i = start_at; i < world.Signature.length; i++) {
if ((world.Signature[i] & query) === query) {
return i;
}
}
}

class World extends WorldImpl {
constructor() {
super(...arguments);
this.Animate = [];
this.AudioSource = [];
this.Bone = [];
this.Camera = [];
this.Children = [];
this.Collide = [];
this.ControlAlways = [];
this.ControlPlayer = [];
this.Cull = [];
this.EmitParticles = [];
this.Lifespan = [];
this.Light = [];
this.Mimic = [];
this.Move = [];
this.Named = [];
this.Render = [];
this.RigidBody = [];
this.Shake = [];
this.Spawn = [];
this.Task = [];
this.Transform = [];
this.Trigger = [];
}
}

function blueprint_sun_light(game) {
return [children([transform([10, 10, 10]), light(0.9)])];
}
function blueprint_sun_shadow(game) {
return [
mimic(find_first(game.World, "sa"), 0.01),
children([
transform([10, 10, -10], from_euler([0, 0, 0, 1], -35, 135, 0)),
camera_depth_ortho(game.Targets.Sun, 8, 1, 100),
light(0.6),
]),
];
}

function blueprint_ground(game, ground_color) {
return [
collide(false, 2 /* Terrain */ | 16 /* SurfaceGround */, 0 /* None */),
rigid_body(0 /* Static */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, ground_color),
];
}

function blueprint_bush(game) {
let radius = float(0.5, 0.9);
let leaf_count = 600;
let matrices = new Float32Array(leaf_count * 16);
for (let i = 0; i < leaf_count; i++) {
let offset = [float(-radius, radius), float(-radius, radius), float(-radius, radius)];
let rotation = from_euler([0, 0, 0, 1], float(-90, 90), float(-90, 90), float(-90, 90));
let view = new Float32Array(matrices.buffer, i * 4 * 16, 16);
from_rotation_translation_scale(view, rotation, offset, [1, 1, 1]);
}
return [cull(32768 /* Render */), render_instanced(game.MeshLeaf, matrices)];
}

function blueprint_tree(game, min = 2, max = 4) {
let height = float(min, max);
return [
children([
transform([0, height / 2, 0], undefined, [0.25, height, 0.25]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.8, 0.2, 0.2, 1]),
], [transform([0, height, 0]), cull(32768 /* Render */), ...blueprint_bush(game)]),
];
}

function prop_box(game) {
return [
children([
transform(),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.34, 0.17, 0.04, 1]),
], [
transform([0.17, 0.62, 0], [0, 0, 0.57, 0.82], [0.04, 0.7, 1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.34, 0.17, 0.04, 1]),
], [
transform([-0.29, 0.54, 0], [0, 0, -0.64, 0.77], [0.04, 0.42, 1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.34, 0.17, 0.04, 1]),
]),
];
}

function blueprint_box(game) {
return [
collide(true, 4 /* Movable */ | 32 /* SurfaceWood */, 2 /* Terrain */ | 4 /* Movable */),
rigid_body(1 /* Dynamic */),
mimic(0),
disable(4096 /* Mimic */),
...prop_box(game),
];
}

function blueprint_branch(game) {
return [
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.8, 0.2, 0.2, 1]),
];
}

function blueprint_obstacle_branch(game) {
return [
children([
transform(),
collide(false, 2 /* Terrain */ | 32 /* SurfaceWood */, 0 /* None */),
rigid_body(0 /* Static */),
...blueprint_branch(game),
]),
];
}

function blueprint_pup(game) {
return [
named("pup"),
children([transform(undefined, undefined, [0.3, 0.3, 0.3]), ...blueprint_lisek(game)]),
];
}

/**
* @module components/com_trigger
*/
function trigger(action) {
return (game, entity) => {
game.World.Signature[entity] |= 2097152 /* Trigger */;
game.World.Trigger[entity] = {
Action: action,
};
};
}

function blueprint_exit(game) {
return [
collide(false, 2 /* Terrain */, 1 /* Player */, [1, 100, 1]),
trigger(2 /* NextScene */),
children([transform([0, 1, 0]), named("exit")]),
];
}

const colors = [
[0.1, 0.1, 0.1, 1],
[0.2, 0.2, 0.2, 1],
];
function blueprint_animal(game) {
let r = float();
if (r < 0.1) {
return [
control_always([0, 0, 1], null, "w"),
move(float(1, 1.2), 0),
lifespan(200),
children([
transform(undefined, undefined, [2, 2, 2]),
cull(32768 /* Render */ | 16 /* Children */),
...blueprint_lisek(game, element(colors), 3),
]),
];
}
if (r < 0.5) {
return [
control_always([0, 0, 1], null, "w"),
move(float(2, 2.2), 0),
lifespan(100),
children([
transform(undefined, undefined, [1, 1.5, 1]),
cull(32768 /* Render */ | 16 /* Children */),
...blueprint_lisek(game, element(colors), 1.5),
]),
];
}
return [
control_always([0, 0, 1], null, "j"),
move(float(3, 3.2), 0),
lifespan(100),
children([
transform(undefined, undefined, [0.5, 0.5, 1]),
cull(32768 /* Render */ | 16 /* Children */),
...blueprint_lisek(game, element(colors), 0.8),
]),
];
}

const fly_keytime_1 = 0.6;
function blueprint_bird(game) {
return [
control_always([0, 0, 1], null, "w"),
move(1, 0),
lifespan(10),
render_colored_skinned(game.MaterialColoredSkinned, game.MeshLeaf, [0.1, 0.2, 0.3, 1]),
children([
transform(),
children([
transform(),
bone(0 /* Root */, [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]),
animate({
i: {
Keyframes: [
{
Timestamp: 0,
Translation: [0, 0, 0],
},
],
},
w: {
Keyframes: [
{
Timestamp: 0,
Translation: [0, -0.05, 0],
},
{
Timestamp: fly_keytime_1,
Translation: [0, 0.01, 0],
},
],
},
}),
children([
transform(undefined, [0, 0, -0.628, 0.778]),
children([
transform(),
bone(1 /* WingL */, [
0.124, 0.992, 0.0, 0.0, -0.992, 0.124, -0.0, 0.0, -0.0, -0.0,
1.0, 0.0, -0.0, -0.0, -0.0, 1.0,
]),
animate({
i: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, 0, 1],
},
],
},
w: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, 0.044, 0.999],
},
{
Timestamp: fly_keytime_1,
Rotation: [0, 0, -0.342, 0.94],
},
],
},
}),
]),
], [
transform(undefined, [0, 0, 0.628, 0.778]),
children([
transform(),
bone(2 /* WingR */, [
0.124, -0.992, -0.0, 0.0, 0.992, 0.124, -0.0, 0.0, 0.0, -0.0,
1.0, 0.0, 0.0, -0.0, -0.0, 1.0,
]),
animate({
i: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, 0, 1],
},
],
},
w: {
Keyframes: [
{
Timestamp: 0,
Rotation: [0, 0, -0.044, 0.999],
},
{
Timestamp: fly_keytime_1,
Rotation: [0, 0, 0.342, 0.94],
},
],
},
}),
]),
]),
]),
]),
];
}

function blueprint_fire(game) {
return [
collide(false, 2 /* Terrain */, 0 /* None */, [1, 4, 1]),
rigid_body(0 /* Static */),
children([
transform(undefined, from_euler([0, 0, 0, 1], -90, 0, 0)),
emit_particles(2, 0.05, 1),
render_particles_colored([1, 1, 0, 1], 50, [1, 0, 0, 1], 10),
shake(0.5),
cull(32768 /* Render */ | 131072 /* Shake */ | 512 /* EmitParticles */),
]),
];
}

function map_forest(game, ground_color = [82 / 255, 39 / 255, 5 / 255, 1]) {
instantiate(game, [
transform([46, -2, -5.6], [0, 0.71, 0, 0.71], [20, 4, 105]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([82.72, -0.34, -1.53], undefined, [10, 8, 10]),
...blueprint_tree(game),
]);
instantiate(game, [transform([-5, -1, 2], undefined, [20, 4, 20]), ...blueprint_tree(game)]);
instantiate(game, [transform([48.2, 0.75, 0]), ...blueprint_box(game)]);
instantiate(game, [
transform([78.71, -0.58, -1.75], undefined, [10, 4, 10]),
...blueprint_tree(game),
]);
instantiate(game, [
transform([78.04, 1.94, 0.62], [0.71, -0.05, 0.05, 0.71], [0.5, 4, 0.5]),
...blueprint_obstacle_branch(game),
]);
instantiate(game, [
transform([79.14, 2.67, 0.01], [0.71, 0.01, -0.01, 0.71], [0.5, 2, 0.5]),
...blueprint_obstacle_branch(game),
]);
instantiate(game, [
transform([81.71, 3.85, 0.04], [0.5, 0.5, -0.5, 0.5], [0.5, 4, 0.5]),
...blueprint_obstacle_branch(game),
]);
{
let width = 105;
let depth = 8;
let centerX = 47.0;
let centerZ = -6.0;
let Xmin = centerX - ~~(width / 2);
let Xmax = centerX + ~~(width / 2);
let Zmin = centerZ - ~~(depth / 2);
let Zmax = centerZ + ~~(depth / 2);
let number_of_trees = ~~(((width * depth) / 10) * 0.8);
for (let i = 0; i < number_of_trees; i++) {
instantiate(game, [
transform([float(Xmin, Xmax), -3.25, float(Zmin, Zmax)], undefined, [10, 5, 10]),
...element([blueprint_tree(game), blueprint_bush(game)]),
]);
}
}
instantiate(game, [
transform([25, 0.25, 0], [0.71, 0, 0, 0.71], [1, 4, 1]),
...blueprint_obstacle_branch(game),
]);
instantiate(game, [
transform([26, 0.25, 0], [0.71, 0, 0, 0.71], [1, 4, 1]),
...blueprint_obstacle_branch(game),
]);
instantiate(game, [
transform([27, 0.25, 0], [0.71, 0, 0, 0.71], [1, 4, 1]),
...blueprint_obstacle_branch(game),
]);
instantiate(game, [
transform([26.5, 0.95, 0], [0.71, 0, 0, 0.71], [1, 4, 1]),
...blueprint_obstacle_branch(game),
]);
instantiate(game, [transform([95, 3.75, 0]), ...blueprint_exit()]);
instantiate(game, [transform([95, 3.75, 0], [0, -0.71, 0, 0.71]), ...blueprint_pup(game)]);
instantiate(game, [transform([-4, 0.25, -6], [0, 0.71, 0, 0.71]), spawn(blueprint_animal, 1)]);
instantiate(game, [
transform([74, 2.25, -2], [0.01, 0.76, 0.12, 0.64]),
children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(131072 /* Shake */ | 262144 /* Spawn */)]),
]);
instantiate(game, [transform([-2.5, -0.25, 0], undefined, [2, 2, 2]), ...blueprint_fire()]);
instantiate(game, [transform([50, 0.75, -1]), ...blueprint_box(game)]);
instantiate(game, [transform([45, 0.75, 3]), ...blueprint_box(game)]);
instantiate(game, [transform([51, 0.75, 3]), ...blueprint_box(game)]);
instantiate(game, [transform([47, 0.75, 2]), ...blueprint_box(game)]);
instantiate(game, [transform([48, 1.75, -0.1]), ...blueprint_box(game)]);
instantiate(game, [transform([48.2, 2.75, 0]), ...blueprint_box(game)]);
instantiate(game, [
transform([91, 1.75, 0.6], undefined, [14, 4, 7.5]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([-4, 3.25, -2], [0.01, 0.76, 0.12, 0.64]),
children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(131072 /* Shake */ | 262144 /* Spawn */)]),
]);
instantiate(game, [transform([80, 0.75, 0]), ...blueprint_box(game)]);
instantiate(game, [...blueprint_sun_light(), transform()]);
instantiate(game, [...blueprint_sun_shadow(game), transform()]);
}

function scene_intro(game) {
game.World = new World();
game.ViewportResized = true;
instantiate(game, [
children([audio_source(snd_wind)], [audio_source(snd_chirp1)], [audio_source(snd_horn)]),
]);
let camera_anchor_intro = instantiate(game, [transform([0, 0.5, -3]), named("ca")]);
let player_entity = instantiate_player(game, [0, 1, 0]);
game.World.Signature[player_entity] &= ~128 /* ControlPlayer */;
map_forest(game);
let starfield_entity = instantiate(game, [
transform([0, 26, -2], from_euler([0, 0, 0, 1], 10, 0, 0), [17, 10, 1]),
children([
transform(),
shake(0.5),
emit_particles(20, 0.1, 0),
render_particles_colored([1, 1, 1, 1], 5, [0.5, 0.5, 1, 1], 2),
]),
]);
let rocket_spawner_entity = instantiate(game, [
transform([-5, 20, -1], from_euler([0, 0, 0, 1], -45, 110, 0)),
children([transform(), shake(3), spawn(blueprint_rocket, 3)]),
]);
let camera_entity = instantiate(game, [
...blueprint_camera(game, [0.4, 0.6, 0.4, 1]),
transform([0, 25, 0], from_euler([0, 0, 0, 1], 10, 0, 0)),
mimic(find_first(game.World, "ca"), 0.02),
disable(4096 /* Mimic */),
]);
let pups = [
instantiate(game, [
...blueprint_lisek(game, [1, 0.5, 0, 1], 0.7),
transform([1, 0, 0], [0, 0.71, 0, 0.71], [0.3, 0.3, 0.3]),
move(2.5, 0),
]),
instantiate(game, [
...blueprint_lisek(game, [1, 0.5, 0, 1], 0.8),
transform([0.3, 0, -0.5], [0, 0.71, 0, 0.71], [0.3, 0.3, 0.3]),
move(2.6, 0),
]),
instantiate(game, [
...blueprint_lisek(game, [1, 0.5, 0, 1], 0.9),
transform([-0.2, 0, 0.3], [0, 0.71, 0, 0.71], [0.3, 0.3, 0.3]),
move(2.7, 0),
]),
];

instantiate(game, [
task_until(() => game.CurrentView === Play, () => {

destroy_all(game.World, rocket_spawner_entity);
instantiate(game, [
children([
task_timeout(1, () => {

game.World.Signature[camera_entity] |= 4096 /* Mimic */;
}),
], [
task_timeout(6, () => {

for (let pup of pups) {
control_always([0, 0, 1], null, "j")(game, pup);
lifespan(7)(game, pup);
}
}),
], [
task_timeout(8, () => {

destroy_all(game.World, starfield_entity);

let mimic = game.World.Mimic[camera_entity];
mimic.Target = find_first(game.World, "ca", camera_anchor_intro + 1);
mimic.Stiffness = 0.05;

instantiate(game, [
...blueprint_pixie(game),
transform([-20, 5, 0]),
]);
}),
], [
task_timeout(9, () => {
game.World.Signature[player_entity] |= 128 /* ControlPlayer */;
}),
]),
]);
}),
]);
}

let snd_gust = {
Tracks: [
{
Instrument: [7, "lowpass", 10, 6, true, "sine", 8, 2, [[false, 3, 4, 2, 9]]],
Notes: [57],
},
],
Exit: 23,
};

let snd_neigh = {
Tracks: [
{
Instrument: [4, "lowpass", 9, 5, true, "sawtooth", 7, 9, [[false, 7, 3, 3, 7]]],
Notes: [57],
},
],
Exit: 9,
};

function prop_barn(game) {
return [
children([
transform([0, 1, 0], undefined, [3, 2, 3]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.41, 0, 0, 1]),
], [
transform([0, 2, 0.9], [0.71, 0, 0, 0.71], [3, 1.2, 2.99]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.41, 0, 0, 1]),
], [
transform([-1.5, 1, -1.5], undefined, [0.1, 2, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([-1.5, 1, 1.5], undefined, [0.1, 2, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([1.5, 1, 1.5], undefined, [0.1, 2, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0, 2, 1.49], undefined, [3.1, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0, 2, -1.5], undefined, [3.1, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([1.5, 2, 0], [0, 0.71, 0, 0.71], [3.1, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([-1.5, 2, 0], [0, 0.71, 0, 0.71], [3.1, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([-1.28, 2.52, 1.49], [0, 0, 0.55, 0.84], [1.16, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([1.27, 2.52, 1.49], [0, 0, -0.55, 0.84], [1.16, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0.51, 3.27, 1.53], [0, 0, -0.19, 0.98], [1.16, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0, 1.5, 1.6], undefined, [1.8, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0.85, 0.7, 1.6], [0, 0, -0.71, 0.71], [1.5, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([-0.85, 0.7, 1.6], [0, 0, -0.71, 0.71], [1.5, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0, 0.7, 1.59], [0, 0, -0.38, 0.92], [2.2, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0, 0.7, 1.58], [0, 0, 0.38, 0.92], [2.2, 0.1, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([-1.25, 2.52, -0.01], [0, 0, 0.55, 0.84], [1.16, 0.1, 2.99]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.07, 0.07, 0.07, 1]),
], [
transform([1.24, 2.52, -0.01], [0, 0, -0.55, 0.84], [1.16, 0.1, 2.99]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.07, 0.07, 0.07, 1]),
], [
transform([-0.51, 3.24, -0.01], [0, 0, 0.19, 0.98], [1.16, 0.1, 2.99]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.07, 0.07, 0.07, 1]),
]),
];
}

function prop_fence(game) {
return [
children([
transform([0, 0.6, 0], undefined, [0.1, 1.2, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0, 1.21, 0.5], [0.71, 0, 0, 0.71], [0.1, 2, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0, 0.6, 1], undefined, [0.1, 1.2, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0, 0.8, 0.5], [0.71, 0, 0, 0.71], [0.1, 2, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
], [
transform([0, 0.4, 0.5], [0.71, 0, 0, 0.71], [0.1, 2, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.8, 0.8, 1]),
]),
];
}

function prop_silo(game) {
return [
children([
transform([0, 3, 0], undefined, [2.5, 6, 2.5]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.41, 0, 0, 1]),
], [
transform([0, 6, 0], undefined, [2.6, 0.2, 2.6]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.8, 0.8, 0.8, 1]),
], [
transform([0, 3, 0], undefined, [2.6, 0.2, 2.6]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.8, 0.8, 0.8, 1]),
], [
transform([0.53, 3, 1.6], undefined, [0.4, 6, 0.4]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.8, 0.8, 0.8, 1]),
]),
];
}

function prop_slup(game) {
return [
children([
transform([0, 4, 0], undefined, [0.5, 8, 0.5]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.12, 0.03, 0.01, 1]),
], [
transform([0, 7.41, -0.25], undefined, [3, 0.45, 0.2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.12, 0.03, 0.01, 1]),
], [
transform([0, 7.41, 0.25], undefined, [3, 0.45, 0.2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.12, 0.03, 0.01, 1]),
], [
transform([0, 6.33, -0.25], undefined, [3, 0.45, 0.2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.12, 0.03, 0.01, 1]),
], [
transform([1.3, 6.7, -0.25], undefined, [0.2, 0.3, 0.2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.37, 0.37, 0.37, 1]),
], [
transform([-0.34, 5.76, -0.24], [0, 0, -0.38, 0.92], [1.2, 0.2, 0.05]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.37, 0.37, 0.37, 1]),
], [
transform([-1, 7.75, 0.25], undefined, [0.2, 0.3, 0.2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.37, 0.37, 0.37, 1]),
], [
transform([-1.3, 7.75, 0.25], undefined, [0.2, 0.3, 0.2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.37, 0.37, 0.37, 1]),
]),
];
}

function prop_car2(game) {
return [
children([
transform([0, 0.8, 0], undefined, [4, 1, 2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.02, 0.02, 1]),
], [
transform([1.28, 0.5, 0], [0.71, 0, 0, 0.71], [1, 2.2, 1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0, 0, 0, 1]),
], [
transform([-1.1, 0.5, 0], [0.71, 0, 0, 0.71], [1, 2.2, 1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0, 0, 0, 1]),
], [
transform([-0.5, 2, 0.9], undefined, [0.2, 1.4, 0.2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.02, 0.02, 1]),
], [
transform([-0.5, 2, -0.9], undefined, [0.2, 1.4, 0.2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.02, 0.02, 1]),
], [
transform([1.9, 2, 0.9], undefined, [0.2, 1.4, 0.2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.02, 0.02, 1]),
], [
transform([1.9, 2, -0.9], undefined, [0.2, 1.4, 0.2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.02, 0.02, 1]),
], [
transform([0.7, 2.8, 0], undefined, [2.6, 0.2, 2]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.8, 0.02, 0.02, 1]),
], [
transform([-2, 1, 0.6], [0.5, 0.5, -0.5, 0.5], [0.4, 0.2, 0.4]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCylinder, [0.8, 0.78, 0.02, 1]),
]),
];
}

function blueprint_obstacle_slup(game) {
return [
children([transform(), ...prop_slup(game)], [
transform([0, 4, 0], undefined, [0.5, 8, 0.5]),
collide(false, 2 /* Terrain */ | 32 /* SurfaceWood */, 0 /* None */),
rigid_body(0 /* Static */),
]),
];
}

function blueprint_obstacle_barn(game) {
return [
children([transform(), ...prop_barn(game)], [
transform([0, 1, 0], undefined, [3, 2, 3]),
collide(false, 2 /* Terrain */ | 32 /* SurfaceWood */, 0 /* None */),
rigid_body(0 /* Static */),
]),
];
}

function blueprint_obstacle_fence(game) {
return [
children([transform(), ...prop_fence(game)], [
transform([0, 0.7, 0.5], undefined, [0.1, 1.2, 2]),
collide(false, 2 /* Terrain */ | 32 /* SurfaceWood */, 0 /* None */),
rigid_body(0 /* Static */),
]),
];
}

function map_farm(game, ground_color = [82 / 255, 39 / 255, 5 / 255, 1]) {
instantiate(game, [
transform([5.4, -0.5, 0.96], [0, 0.71, 0, 0.71], [4, 2, 15]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([19.35, -2.5, 0.96], [0, 0.71, 0, 0.71], [4, 2, 14]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([65, -0.5, 1], [0, 0.71, 0, 0.71], [4, 2, 81.11]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([56.93, -1.5, -6.04], [0, 0.71, 0, 0.71], [10, 4, 120]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [transform([32.71, 0.39, -4.35]), ...blueprint_bush(game)]);
instantiate(game, [
transform([1.39, 0.5, -5.42], [0, 0.56, 0, 0.83], [2, 2, 2]),
...prop_barn(game),
]);
instantiate(game, [transform([-0.95, 0.5, 2.69], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [transform([1.05, 0.5, 2.69], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [
transform([2.52, -0.05, 2.69], [0.19, 0.68, -0.19, 0.68]),
...prop_fence(game),
]);
instantiate(game, [transform([7.95, 0.5, -5.44], [0, 0.17, 0, 0.98]), ...prop_silo(game)]);
instantiate(game, [transform([12.46, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [transform([14.46, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [transform([16.46, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [
transform([19.23, 0.5, -6.94], undefined, [0.8, 0.8, 0.8]),
...prop_barn(game),
]);
instantiate(game, [transform([18.46, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [transform([18.12, 0.55, -5.59]), ...blueprint_bush(game)]);
instantiate(game, [
transform([13.63, -0.54, -1.59], undefined, [2, 2, 2]),
...blueprint_bush(game),
]);
instantiate(game, [transform([24.62, 0.36, -5.02], [0, 0.95, 0, 0.31]), ...prop_slup(game)]);
instantiate(game, [
transform([62.05, 0.5, -7.33], [0, 0.17, 0, 0.98], [0.6, 0.6, 0.6]),
...prop_silo(game),
]);
instantiate(game, [
transform([64.08, 0.5, -7.33], [0, 0.17, 0, 0.98], [0.6, 0.6, 0.6]),
...prop_silo(game),
]);
instantiate(game, [transform([62.6, 0.58, -7]), ...blueprint_bush(game)]);
instantiate(game, [
transform([70.27, 0.36, -8.29], [0, 0.95, 0, 0.31], [0.7, 0.7, 0.7]),
...prop_slup(game),
]);
instantiate(game, [
transform([71.83, 0.5, -7.63], [0, -0.44, 0, 0.9], [0.8, 0.8, 0.8]),
...prop_barn(game),
]);
instantiate(game, [
transform([11.78, 0.9, -6.81], [0.68, 0.19, -0.19, 0.68], [0.4, 0.4, 0.4]),
...prop_car2(game),
]);
instantiate(game, [transform([11.41, 0.61, -5.83]), ...blueprint_bush(game)]);
instantiate(game, [
transform([69.34, 0.5, -3.74], [0, 0.41, 0, 0.91], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([67.36, 0.5, -5.59], [0, 0.41, 0, 0.91], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([66.55, 0.5, -5.93], [0, 0.68, 0, 0.74], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([65.62, 0.5, -6.02], [0, 0.68, 0, 0.74], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([64.69, 0.5, -6.02], [0, 0.74, 0, 0.67], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([63.79, 0.5, -5.93], [0, 0.74, 0, 0.67], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([68.03, 0.5, -4.98], [0, 0.41, 0, 0.91], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([62.88, 0.5, -5.92], [0, 0.68, 0, 0.74], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([61.96, 0.5, -5.92], [0, 0.74, 0, 0.67], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([61.12, 0.5, -6.12], [0, 0.48, 0, 0.88], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([60.44, 0.5, -6.74], [0, 0.33, 0, 0.94], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([60.09, 0.5, -7.58], [0, 0.05, 0, 1], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([60.01, 0.5, -8.53], [0, 0.05, 0, 1], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [
transform([68.41, 0.29, -4.19], [0.15, 0.38, -0.33, 0.85], [0.5, 0.5, 0.5]),
...prop_fence(game),
]);
instantiate(game, [transform([29.08, 0.33, -4.94]), ...blueprint_bush(game)]);
instantiate(game, [transform([2.72, 0.61, 2.53]), ...blueprint_bush(game)]);
instantiate(game, [
transform([25.37, 0.23, 0], [-0.67, 0.67, 0.22, 0.22], [0.75, 0.75, 0.75]),
...blueprint_obstacle_slup(game),
]);
instantiate(game, [transform([23.23, -0.71, 0.06]), ...blueprint_box(game)]);
instantiate(game, [transform([25.09, 0.4, 2.79]), ...blueprint_tree(game)]);
instantiate(game, [transform([9.21, 0.61, 2.53]), ...blueprint_bush(game)]);
instantiate(game, [transform([15.13, -1.48, 1.53], [0.5, 0.5, 0.5, 0.5]), ...prop_fence(game)]);
instantiate(game, [transform([15.27, -1.92, 2.4]), ...blueprint_bush(game)]);
instantiate(game, [transform([24.97, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [transform([26.97, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [transform([28.97, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [
transform([31.74, 0.5, -6.94], undefined, [0.8, 0.8, 0.8]),
...prop_barn(game),
]);
instantiate(game, [transform([30.97, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [transform([38.09, 0.36, -7.73], [0, 0.95, 0, 0.31]), ...prop_slup(game)]);
instantiate(game, [transform([21, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [transform([23, 0.5, -7.56], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [
transform([15.64, -0.54, -1.63], undefined, [2, 2, 2]),
...blueprint_bush(game),
]);
instantiate(game, [
transform([17.73, -0.54, -1.47], undefined, [2, 2, 2]),
...blueprint_bush(game),
]);
instantiate(game, [
transform([19.82, -0.54, -1.78], undefined, [2, 2, 2]),
...blueprint_bush(game),
]);
instantiate(game, [
transform([21.79, -0.54, -1.67], undefined, [2, 2, 2]),
...blueprint_bush(game),
]);
instantiate(game, [
transform([23.69, -0.54, -2.02], undefined, [2, 2, 2]),
...blueprint_bush(game),
]);
instantiate(game, [
transform([44.79, 0.5, -0.19], [0, 0.71, 0, 0.71], [2, 2, 2]),
...blueprint_obstacle_barn(game),
]);
instantiate(game, [transform([41.23, 3.45, 0.06]), ...blueprint_box(game)]);
instantiate(game, [transform([41.23, 1.08, 0.06]), ...blueprint_box(game)]);
instantiate(game, [transform([41.23, 2.27, 0.06]), ...blueprint_box(game)]);
instantiate(game, [transform([41.23, 4.62, 0]), ...blueprint_box(game)]);
instantiate(game, [transform([53.83, 0.36, -3.7], [0, 0.19, 0, 0.98]), ...prop_slup(game)]);
instantiate(game, [transform([47.85, 0.33, 2.41]), ...blueprint_bush(game)]);
instantiate(game, [transform([56.83, 0.5, 2.69], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [
transform([58.3, -0.05, 2.69], [0.19, 0.68, -0.19, 0.68]),
...prop_fence(game),
]);
instantiate(game, [transform([58.51, 0.61, 2.53]), ...blueprint_bush(game)]);
instantiate(game, [transform([72.23, 0.5, -1.57], [0, 0.17, 0, 0.98]), ...prop_silo(game)]);
instantiate(game, [
transform([71.01, 3, 0.32], [0.71, 0.71, 0, 0], [2, 2, 2]),
...blueprint_obstacle_fence(game),
]);
instantiate(game, [
transform([78.08, 0.72, -3.38], [-0.32, 0.63, 0.63, -0.32], [0.75, 0.75, 0.75]),
...blueprint_obstacle_slup(game),
]);
instantiate(game, [transform([77, 1.98, 0]), ...blueprint_box(game)]);
instantiate(game, [transform([72.16, 4.57, 0.31]), ...blueprint_box(game)]);
instantiate(game, [transform([77.58, 0.78, 2.87]), ...blueprint_bush(game)]);
instantiate(game, [transform([-1.91, 0.5, -0.22]), ...blueprint_obstacle_fence(game)]);
instantiate(game, [transform([-1.91, 0.5, 1.82]), ...blueprint_obstacle_fence(game)]);
instantiate(game, [transform([84.66, 0.36, -2.18], [0, 0.95, 0, 0.31]), ...prop_slup(game)]);
instantiate(game, [transform([90.59, 0.5, -6.21], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [transform([92.59, 0.5, -6.21], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [
transform([95.37, 0.5, -5.59], undefined, [0.8, 0.8, 0.8]),
...prop_barn(game),
]);
instantiate(game, [transform([94.59, 0.5, -6.21], [0, 0.71, 0, 0.71]), ...prop_fence(game)]);
instantiate(game, [transform([89.69, 0.5, -5.27], [0, 1, 0, 0]), ...prop_fence(game)]);
instantiate(game, [transform([89.7, 0.5, -3.44], [0, 1, 0, 0]), ...prop_fence(game)]);
instantiate(game, [transform([89.71, 0.5, -1.64], [0, 1, 0, 0]), ...prop_fence(game)]);
instantiate(game, [
transform([89.73, 0.5, 0.15], [0, 1, 0, 0]),
...blueprint_obstacle_fence(game),
]);
instantiate(game, [transform([89.73, 0.5, 2.07], [0, 1, 0, 0]), ...prop_fence(game)]);
instantiate(game, [transform([89.71, 1.64, -1.64], [0, 1, 0, 0]), ...prop_fence(game)]);
instantiate(game, [
transform([89.73, 1.64, 0.15], [0, 1, 0, 0]),
...blueprint_obstacle_fence(game),
]);
instantiate(game, [transform([89.73, 1.64, 2.07], [0, 1, 0, 0]), ...prop_fence(game)]);
instantiate(game, [transform([95, 0.5, 0]), ...blueprint_exit()]);
instantiate(game, [transform([95, 0.5, 0], [0, -0.71, 0, 0.71]), ...blueprint_pup(game)]);
instantiate(game, [transform([0, 0.5, -8], [0, 0.71, 0, 0.71]), spawn(blueprint_animal, 1)]);
instantiate(game, [...blueprint_sun_light(), transform()]);
instantiate(game, [...blueprint_sun_shadow(game), transform()]);
}

function scene_level2(game) {
game.World = new World();
game.ViewportResized = true;
instantiate_player(game, [0, 0.774, 0]);
map_farm(game);
instantiate(game, [...blueprint_pixie(game), transform([-20, 5, 0])]);

instantiate(game, [
...blueprint_camera(game, [255 / 255, 208 / 255, 0 / 255, 1]),
transform([0, 10, 10]),
mimic(find_first(game.World, "ca"), 0.05),
]);
instantiate(game, [
children([audio_source(snd_gust)], [audio_source(snd_neigh)], [audio_source(snd_horn)]),
]);
}

function prop_panelki(game) {
return [
children([
transform([0, 2.1, 0], undefined, [4, 0.2, 4]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.2, 0.2, 0.2, 1]),
], [
transform([1.75, 1, 0], undefined, [0.5, 2, 4]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.2, 0.2, 0.2, 1]),
], [
transform([-0.55, 0.55, -1.75], undefined, [1.9, 1.1, 0.5]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.2, 0.2, 0.2, 1]),
], [
transform([0, 1.55, -1.75], undefined, [0.8, 0.9, 0.5]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.2, 0.2, 0.2, 1]),
], [
transform([-1.75, 1, 0], undefined, [0.5, 2, 4]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.2, 0.2, 0.2, 1]),
], [
transform([0, 0.55, 1.75], undefined, [3, 1.1, 0.5]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.2, 0.2, 0.2, 1]),
], [
transform([0, 1.55, 1.75], undefined, [0.8, 0.9, 0.5]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.2, 0.2, 0.2, 1]),
]),
];
}

function blueprint_obstacle_house(game) {
return [
children([transform(), ...prop_panelki(game)], [
transform([0, 0, 0], undefined, [4, 4.4, 4]),
collide(false, 2 /* Terrain */ | 32 /* SurfaceWood */, 0 /* None */),
rigid_body(0 /* Static */),
]),
];
}

function blueprint_obstacle_car(game) {
return [
children([transform(), ...prop_car2(game)], [
transform([0, 0.8, 0], undefined, [4, 1, 2]),
collide(false, 2 /* Terrain */ | 64 /* SurfaceMetal */, 0 /* None */),
rigid_body(0 /* Static */),
]),
];
}

function blueprint_end(game) {
return [
named("exit"),
collide(false, 2 /* Terrain */, 1 /* Player */, [1, 100, 1]),
trigger(3 /* EndGame */),
];
}

let snd_rocket = {
Tracks: [
{
Instrument: [8, "lowpass", 9, 8, false, false, 8, 1, [[false, 8, 15, 15, 15]]],
Notes: [77],
},
],
Exit: 99,
};

function blueprint_launchpad(game) {
return [
named("launchpad"),
control_always([0, 1, 0], null),
audio_source(snd_rocket),
lifespan(25),
disable(64 /* ControlAlways */ | 2 /* AudioSource */ | 1024 /* Lifespan */),
move(5, 0),
children([
transform(),
shake(0.01),
children([transform([0, -30, 0], undefined, [3, 3, 3]), ...prop_rocket(game)], [
transform([0, -30, 0], [0.71, 0, 0, 0.71]),
children([
transform(),
shake(0.1),
emit_particles(2, 0.01, 5),
render_particles_colored([1, 1, 1, 1], 200, [1, 0.5, 0, 1], 500),
]),
]),
]),
];
}

function blueprint_blok(game) {
return [
children([transform(), ...prop_panelki(game)], [transform([0, 2.2, 0], [0, 1, 0, 0]), ...prop_panelki(game)], [transform([0, 2.2 * 2, 0]), ...prop_panelki(game)]),
];
}

function map_city(game, ground_color = [82 / 255, 39 / 255, 5 / 255, 1]) {
instantiate(game, [
transform([87.04, 1.52, 0.45], [0, 0.71, 0, 0.71], [5, 2, 15]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([49.73, -1.5, -5.55], [0, 0.71, 0, 0.71], [20, 4, 120]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [transform([8.58, 0.72, 0.59]), ...blueprint_bush(game)]);
instantiate(game, [
transform([-1.27, 0.19, -3.2], undefined, [0.5, 0.5, 0.5]),
...blueprint_bush(game),
]);
instantiate(game, [transform([27.85, 0.11, -5.15]), ...prop_slup(game)]);
instantiate(game, [transform([11.69, 0.5, -0.17]), ...blueprint_obstacle_house(game)]);
instantiate(game, [transform([15.39, 0.11, -2.79]), ...prop_slup(game)]);
instantiate(game, [
transform([-3.95, 0.5, 1.41], [0, 0.62, 0, 0.78]),
...blueprint_obstacle_car(game),
]);
instantiate(game, [
transform([7.69, 1, -0.1], [-0.15, 0.68, 0.7, 0.14], [0.4, 0.4, 0.4]),
...blueprint_obstacle_car(game),
]);
instantiate(game, [transform([14.31, 0.11, 3.18]), ...prop_slup(game)]);
instantiate(game, [
transform([21.96, 1, -2.35], [-0.44, 0.55, 0.56, 0.43], [0.4, 0.4, 0.4]),
...prop_car2(game),
]);
instantiate(game, [transform([76.12, 0.24, 3.71]), ...prop_slup(game)]);
instantiate(game, [transform([28, 2, 0.5]), ...blueprint_box(game)]);
instantiate(game, [transform([44, 0, -0.2]), ...prop_slup(game)]);
instantiate(game, [
transform([43.31, 1, -3.57], [-0.71, 0.06, 0.06, 0.7], [0.4, 0.4, 0.4]),
...prop_car2(game),
]);
instantiate(game, [
transform([60.15, 0.56, -3.88], [0, -0.73, 0, 0.69]),
...blueprint_bush(game),
]);
instantiate(game, [transform([78.02, 0.24, -3.54]), ...prop_slup(game)]);
instantiate(game, [transform([87, 2.5, 0]), ...blueprint_exit()]);
instantiate(game, [transform([87, 2.5, 0], [0, -0.71, 0, 0.71]), ...blueprint_pup(game)]);
instantiate(game, [
transform([-3, 2, -2], [0.01, 0.76, 0.12, 0.64]),
children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(131072 /* Shake */ | 262144 /* Spawn */)]),
]);
instantiate(game, [
transform([14, 2, -2], [0.01, 0.76, 0.12, 0.64]),
children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(131072 /* Shake */ | 262144 /* Spawn */)]),
]);
instantiate(game, [
transform([53, 2, -2], [0.01, 0.76, 0.12, 0.64]),
children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(131072 /* Shake */ | 262144 /* Spawn */)]),
]);
instantiate(game, [
transform([39, 7, -2], [0.01, 0.76, 0.12, 0.64]),
children([transform(), shake(1), spawn(blueprint_bird, 0.5), cull(131072 /* Shake */ | 262144 /* Spawn */)]),
]);
instantiate(game, [transform([-7, 0.5, -5], [0, 0.71, 0, 0.71]), spawn(blueprint_animal, 1)]);
{
let width = 120;
let depth = 6;
let centerX = 50.0;
let centerZ = -5.0;
let Xmin = centerX - ~~(width / 2);
let Xmax = centerX + ~~(width / 2);
let Zmin = centerZ - ~~(depth / 2);
let Zmax = centerZ + ~~(depth / 2);
let number_of_trees = ~~(((width * depth) / 1) * 0.3);
for (let i = 0; i < number_of_trees; i++) {
instantiate(game, [
transform([float(Xmin, Xmax), 0, float(Zmin, Zmax)]),
...element([blueprint_tree(game), blueprint_bush(game)]),
]);
}
}
instantiate(game, [transform([-2.6, 0.9, 0.6]), ...blueprint_fire()]);
instantiate(game, [transform([93, 2.5, 0]), ...blueprint_end()]);
instantiate(game, [transform([95.97, 1.5, 0.44]), ...blueprint_launchpad(game)]);
instantiate(game, [transform([9.24, 0.5, -9.03], [0, 0.17, 0, 0.98]), ...blueprint_blok(game)]);
instantiate(game, [transform([4.54, 0.5, -7.32], [0, 0.17, 0, 0.98]), ...blueprint_blok(game)]);
instantiate(game, [transform([53.2, 0.5, -2.6]), ...blueprint_blok(game)]);
instantiate(game, [transform([82.26, -0.31, -6.49]), ...blueprint_blok(game)]);
instantiate(game, [transform([77.26, -0.31, -6.49]), ...blueprint_blok(game)]);
instantiate(game, [transform([57.6, 0.5, 0.7]), ...blueprint_obstacle_house(game)]);
instantiate(game, [transform([48.2, 0.5, -2.6]), ...blueprint_blok(game)]);
instantiate(game, [transform([38.2, 0.5, -2.6]), ...blueprint_blok(game)]);
instantiate(game, [transform([33.2, 0.5, -2.6]), ...blueprint_blok(game)]);
instantiate(game, [
transform([41.2, 0.5, 2.9], undefined, [1, 1, 0.8]),
...blueprint_blok(game),
]);
instantiate(game, [transform([23.2, 0.5, -9.1]), ...blueprint_blok(game)]);
instantiate(game, [
transform([48.2, 2.7, 0], undefined, [4, 0.2, 1.2]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([42.2, 2.9, 0], undefined, [5, 0.2, 0.2]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([33.2, 5.1, 0], undefined, [4, 0.2, 1.2]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([38.2, 2.7, 0], undefined, [4, 0.2, 1.2]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([36.3, 3.4, 0], undefined, [0.2, 1.2, 1.2]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([31.3, 5.5, 0.05], undefined, [0.2, 1, 1.2]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([38.2, 7, 0], undefined, [4, 0.2, 1.2]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([43.2, 6.9, 0], undefined, [5, 0.2, 0.2]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([48.2, 7, 0], undefined, [4, 0.2, 1.2]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [
transform([54.2, 7, 0], undefined, [6, 0.2, 1.2]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [transform([32.61, 6.41, 0]), ...blueprint_box(game)]);
instantiate(game, [transform([57.6, 6.9, 0.7], [0, 0.71, 0, 0.71]), ...blueprint_blok(game)]);
instantiate(game, [transform([40.4, 0.9, 3.6]), ...blueprint_fire()]);
instantiate(game, [transform([66, 2, 0.5]), ...blueprint_box(game)]);
instantiate(game, [
transform([57.6, 4.8, 0.7], undefined, [4, 4.2, 4]),
...blueprint_ground(game, ground_color),
]);
instantiate(game, [transform([52.4, 6.9, -2.4]), ...blueprint_fire()]);
instantiate(game, [...blueprint_sun_light(), transform()]);
instantiate(game, [...blueprint_sun_shadow(game), transform()]);
}

function scene_level3(game) {
game.World = new World();
game.ViewportResized = true;
instantiate_player(game, [0, 2, 0]);
map_city(game, [0.2, 0.2, 0.2, 1]);
instantiate(game, [...blueprint_pixie(game), transform([-20, 5, 0])]);

instantiate(game, [
...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
transform([0, 10, 10]),
mimic(find_first(game.World, "ca"), 0.05),
]);
instantiate(game, [children([audio_source(snd_wind)], [audio_source(snd_horn)])]);
}

function dispatch(game, action, payload) {
switch (action) {





case 1 /* NewGame */: {
game.CurrentView = Play;
break;
}
case 2 /* NextScene */: {
let [trigger_entity] = payload;
game.World.Signature[trigger_entity] &= ~2097152 /* Trigger */;
switch (game.CurrentScene) {
case scene_intro:
case scene_level2:
instantiate(game, [
task_timeout(2, () => {
requestAnimationFrame(() => {
game.CurrentScene(game);
game.CurrentView = Play;
});
}),
]);
break;
}
switch (game.CurrentScene) {
case scene_intro:
game.CurrentScene = scene_level2;
break;
case scene_level2:
game.CurrentScene = scene_level3;
break;
}
let pup_entity = find_first(game.World, "pup");
let pup_anchor = find_first(game.World, "pa " + game.PupsFound);
mimic(pup_anchor, 0.2)(game, pup_entity);
let pup_lisek = game.World.Children[pup_entity].Children[0];
control_player(4 /* Animate */)(game, pup_lisek);
game.PupsFound++;
break;
}
case 3 /* EndGame */: {
let [trigger_entity] = payload;
game.World.Signature[trigger_entity] &= ~2097152 /* Trigger */;
for (let i = 0; i < game.World.Signature.length; i++) {
game.World.Signature[i] &= ~128 /* ControlPlayer */;
}
let launchpad_entity = find_first(game.World, "launchpad");
game.World.Signature[launchpad_entity] |=
64 /* ControlAlways */ | 2 /* AudioSource */ | 1024 /* Lifespan */;
instantiate(game, [
task_timeout(2, () => {
game.CurrentView = End;
}),
]);
break;
}
}
}

function resize_texture_rgba8(gl, texture, width, height) {
gl.bindTexture(GL_TEXTURE_2D, texture);
gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA8, width, height, 0, GL_RGBA, GL_DATA_UNSIGNED_BYTE, null);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
return texture;
}
function resize_texture_depth24(gl, texture, width, height) {
gl.bindTexture(GL_TEXTURE_2D, texture);
gl.texImage2D(GL_TEXTURE_2D, 0, GL_DEPTH_COMPONENT24, width, height, 0, GL_DEPTH_COMPONENT, GL_DATA_UNSIGNED_INT, null);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_COMPARE_MODE, GL_COMPARE_REF_TO_TEXTURE);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
return texture;
}

function create_depth_target(gl, width, height) {
let target = {
Framebuffer: gl.createFramebuffer(),
Width: width,
Height: height,
ColorTexture: resize_texture_rgba8(gl, gl.createTexture(), width, height),
DepthTexture: resize_texture_depth24(gl, gl.createTexture(), width, height),
};
gl.bindFramebuffer(GL_FRAMEBUFFER, target.Framebuffer);
gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_TEXTURE_2D, target.DepthTexture, 0);
gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, target.ColorTexture, 0);
let status = gl.checkFramebufferStatus(GL_FRAMEBUFFER);
if (status != GL_FRAMEBUFFER_COMPLETE) {
throw new Error(`Failed to set up the framebuffer (${status}).`);
}
return target;
}
function resize_depth_target(gl, target, width, height) {
target.Width = width;
target.Height = height;
resize_texture_rgba8(gl, target.ColorTexture, target.Width, target.Height);
resize_texture_depth24(gl, target.DepthTexture, target.Width, target.Height);
}

function link(gl, vertex, fragment) {
let program = gl.createProgram();
gl.attachShader(program, compile(gl, GL_VERTEX_SHADER, vertex));
gl.attachShader(program, compile(gl, GL_FRAGMENT_SHADER, fragment));
gl.linkProgram(program);
if (!gl.getProgramParameter(program, GL_LINK_STATUS)) {
throw new Error(gl.getProgramInfoLog(program));
}
return program;
}
function compile(gl, type, source) {
let shader = gl.createShader(type);
gl.shaderSource(shader, source);
gl.compileShader(shader);
if (!gl.getShaderParameter(shader, GL_COMPILE_STATUS)) {
throw new Error(gl.getShaderInfoLog(shader));
}
return shader;
}

let vertex$4 = `#version 300 es\n
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
let fragment$4 = `#version 300 es\n
precision mediump float;


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


vec3 light_acc = diffuse_color.rgb * 0.5;

for (int i = 0; i < MAX_LIGHTS; i++) {
float light_intensity = light_positions[i].w;
if (light_intensity == 0.0) {
break;
}

vec3 light_normal;
if (light_intensity < 1.0) {

light_normal = light_positions[i].xyz;
} else {
vec3 light_dir = light_positions[i].xyz - vert_position.xyz;
float light_dist = length(light_dir);
light_normal = light_dir / light_dist;

light_intensity /= (light_dist * light_dist);
}

float diffuse_factor = dot(world_normal, light_normal);
if (diffuse_factor > 0.0) {

light_acc += diffuse_color.rgb * posterize(diffuse_factor * light_intensity);
}
}

frag_color = vec4(light_acc, 1.0);

float eye_distance = length(eye - vert_position.xyz);
float fog_amount = clamp(0.0, 1.0, eye_distance / 15.0);
frag_color = mix(frag_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
}
`;
function mat_forward_colored_phong_skinned(gl) {
let program = link(gl, vertex$4, fragment$4);
return {
Mode: GL_TRIANGLES,
Program: program,
Locations: {
Pv: gl.getUniformLocation(program, "pv"),
DiffuseColor: gl.getUniformLocation(program, "diffuse_color"),
Eye: gl.getUniformLocation(program, "eye"),
LightPositions: gl.getUniformLocation(program, "light_positions"),
VertexPosition: gl.getAttribLocation(program, "attr_position"),
VertexNormal: gl.getAttribLocation(program, "attr_normal"),
FogColor: gl.getUniformLocation(program, "fog_color"),
Bones: gl.getUniformLocation(program, "bones"),
VertexWeights: gl.getAttribLocation(program, "attr_weights"),
},
};
}

let vertex$3 = `#version 300 es\n

uniform mat4 pv;
uniform mat4 world;
uniform mat4 self;

in vec3 attr_position;
in vec3 attr_normal;

out vec4 vert_position;
out vec3 vert_normal;

void main() {
vert_position = world * vec4(attr_position, 1.0);
vert_normal = (vec4(attr_normal, 1.0) * self).xyz;
gl_Position = pv * vert_position;
}
`;
let fragment$3 = `#version 300 es\n
precision mediump float;
precision lowp sampler2DShadow;


const int MAX_LIGHTS = 8;

uniform vec3 eye;
uniform vec4 diffuse_color;
uniform vec4 light_positions[MAX_LIGHTS];
uniform mat4 shadow_space;
uniform sampler2DShadow shadow_map;
uniform vec4 fog_color;

in vec4 vert_position;
in vec3 vert_normal;

out vec4 frag_color;



float shadow_factor(vec4 world_pos, float min) {
vec4 shadow_space_pos = shadow_space * world_pos;
vec3 shadow_space_ndc = shadow_space_pos.xyz / shadow_space_pos.w;

shadow_space_ndc = shadow_space_ndc * 0.5 + 0.5;


shadow_space_ndc.z -= 0.001;

return texture(shadow_map, shadow_space_ndc) * (1.0 - min) + min;
}

void main() {
vec3 world_normal = normalize(vert_normal);


vec3 light_acc = diffuse_color.rgb * 0.1;

for (int i = 0; i < MAX_LIGHTS; i++) {
float light_intensity = light_positions[i].w;
if (light_intensity == 0.0) {
break;
}

vec3 light_normal;
if (light_intensity < 1.0) {

light_normal = light_positions[i].xyz;
} else {
vec3 light_dir = light_positions[i].xyz - vert_position.xyz;
float light_dist = length(light_dir);
light_normal = light_dir / light_dist;

light_intensity /= (light_dist * light_dist);
}

float diffuse_factor = dot(world_normal, light_normal);
if (diffuse_factor > 0.0) {

light_acc += diffuse_color.rgb * diffuse_factor * light_intensity;
}
}

vec3 shaded_rgb = light_acc * shadow_factor(vert_position, 0.5);
frag_color= vec4(shaded_rgb, 1.0);

float eye_distance = length(eye - vert_position.xyz);
float fog_amount = clamp(0.0, 1.0, eye_distance / 15.0);
frag_color = mix(frag_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
}
`;
function mat_forward_colored_shadows(gl) {
let program = link(gl, vertex$3, fragment$3);
return {
Mode: GL_TRIANGLES,
Program: program,
Locations: {
Pv: gl.getUniformLocation(program, "pv"),
World: gl.getUniformLocation(program, "world"),
Self: gl.getUniformLocation(program, "self"),
DiffuseColor: gl.getUniformLocation(program, "diffuse_color"),
Eye: gl.getUniformLocation(program, "eye"),
LightPositions: gl.getUniformLocation(program, "light_positions"),
ShadowSpace: gl.getUniformLocation(program, "shadow_space"),
ShadowMap: gl.getUniformLocation(program, "shadow_map"),
FogColor: gl.getUniformLocation(program, "fog_color"),
VertexPosition: gl.getAttribLocation(program, "attr_position"),
VertexNormal: gl.getAttribLocation(program, "attr_normal"),
},
};
}

let vertex$2 = `#version 300 es\n
uniform mat4 pv;
uniform mat4 world;

in vec3 attr_position;

void main() {
gl_Position = pv * world * vec4(attr_position, 1.0);
}
`;
let fragment$2 = `#version 300 es\n
precision mediump float;

uniform vec4 color;

out vec4 frag_color;

void main() {
frag_color = color;
}
`;
function mat_forward_colored_unlit(gl, mode = GL_TRIANGLES) {
let program = link(gl, vertex$2, fragment$2);
return {
Mode: mode,
Program: program,
Locations: {
Pv: gl.getUniformLocation(program, "pv"),
World: gl.getUniformLocation(program, "world"),
Color: gl.getUniformLocation(program, "color"),
VertexPosition: gl.getAttribLocation(program, "attr_position"),
},
};
}
function mat_forward_colored_wireframe(gl) {
return mat_forward_colored_unlit(gl, GL_LINE_LOOP);
}

let vertex$1 = `#version 300 es\n

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


vert_color = vec4(0.02, 0.06, 0.04, 1.0);

float eye_distance = length(eye - world_position.xyz);
float fog_amount = clamp(0.0, 1.0, eye_distance / 15.0);
vert_color = mix(vert_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
}

`;
let fragment$1 = `#version 300 es\n
precision mediump float;

in vec4 vert_color;
out vec4 frag_color;

void main() {
frag_color = vert_color;
}

`;
function mat_forward_instanced(gl) {
let program = link(gl, vertex$1, fragment$1);
return {
Mode: GL_TRIANGLES,
Program: program,
Locations: {
Pv: gl.getUniformLocation(program, "pv"),
World: gl.getUniformLocation(program, "world"),
Eye: gl.getUniformLocation(program, "eye"),
FogColor: gl.getUniformLocation(program, "fog_color"),
VertexPosition: gl.getAttribLocation(program, "attr_position"),
InstanceColumn1: gl.getAttribLocation(program, "attr_column1"),
InstanceColumn2: gl.getAttribLocation(program, "attr_column2"),
InstanceColumn3: gl.getAttribLocation(program, "attr_column3"),
InstanceColumn4: gl.getAttribLocation(program, "attr_column4"),
},
};
}

let vertex = `#version 300 es\n
uniform mat4 pv;
uniform vec3 eye;
uniform vec4 fog_color;
uniform vec4 color_start;
uniform vec4 color_end;

uniform vec4 details;


in vec4 attr_origin_age;
in vec3 attr_direction;

out vec4 vert_color;

void main() {

vec3 velocity = attr_direction * details.y;
vec4 world_position = vec4(attr_origin_age.xyz + velocity * attr_origin_age.w, 1.0);
gl_Position = pv * world_position;


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
function mat_forward_particles_colored(gl) {
let program = link(gl, vertex, fragment);
return {
Mode: GL_POINTS,
Program: program,
Locations: {
Pv: gl.getUniformLocation(program, "pv"),
Eye: gl.getUniformLocation(program, "eye"),
FogColor: gl.getUniformLocation(program, "fog_color"),
ColorStart: gl.getUniformLocation(program, "color_start"),
ColorEnd: gl.getUniformLocation(program, "color_end"),
Details: gl.getUniformLocation(program, "details"),
OriginAge: gl.getAttribLocation(program, "attr_origin_age"),
Direction: gl.getAttribLocation(program, "attr_direction"),
},
};
}

function mesh_cube(gl) {
let vertex_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$4, GL_STATIC_DRAW);
let normal_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
gl.bufferData(GL_ARRAY_BUFFER, normal_arr$4, GL_STATIC_DRAW);
let weights_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
gl.bufferData(GL_ARRAY_BUFFER, weights_arr$4, GL_STATIC_DRAW);
let index_buf = gl.createBuffer();
gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$4, GL_STATIC_DRAW);
return {
VertexBuffer: vertex_buf,
NormalBuffer: normal_buf,
WeightsBuffer: weights_buf,
IndexBuffer: index_buf,
IndexCount: index_arr$4.length,
};
}

let vertex_arr$4 = Float32Array.from([
-0.5, -0.5, 0.5,
-0.5, -0.5, 0.5,
-0.5, -0.5, 0.5,
-0.5, 0.5, 0.5,
-0.5, 0.5, 0.5,
-0.5, 0.5, 0.5,
-0.5, -0.5, -0.5,
-0.5, -0.5, -0.5,
-0.5, -0.5, -0.5,
-0.5, 0.5, -0.5,
-0.5, 0.5, -0.5,
-0.5, 0.5, -0.5,
0.5, -0.5, 0.5,
0.5, -0.5, 0.5,
0.5, -0.5, 0.5,
0.5, 0.5, 0.5,
0.5, 0.5, 0.5,
0.5, 0.5, 0.5,
0.5, -0.5, -0.5,
0.5, -0.5, -0.5,
0.5, -0.5, -0.5,
0.5, 0.5, -0.5,
0.5, 0.5, -0.5,
0.5, 0.5, -0.5
]);

let normal_arr$4 = Float32Array.from([
-1.0, 0.0, 0.0,
0.0, -1.0, 0.0,
0.0, 0.0, 1.0,
-1.0, 0.0, 0.0,
0.0, 0.0, 1.0,
0.0, 1.0, 0.0,
-1.0, 0.0, 0.0,
0.0, -1.0, 0.0,
0.0, 0.0, -1.0,
-1.0, 0.0, 0.0,
0.0, 0.0, -1.0,
0.0, 1.0, 0.0,
0.0, -1.0, 0.0,
0.0, 0.0, 1.0,
1.0, 0.0, 0.0,
0.0, 0.0, 1.0,
0.0, 1.0, 0.0,
1.0, 0.0, 0.0,
0.0, -1.0, 0.0,
0.0, 0.0, -1.0,
1.0, 0.0, 0.0,
0.0, 0.0, -1.0,
0.0, 1.0, 0.0,
1.0, 0.0, 0.0
]);

let weights_arr$4 = Float32Array.from([]);

let index_arr$4 = Uint16Array.from([
16, 5, 22,
5, 11, 22,
1, 12, 7,
12, 18, 7,
2, 4, 13,
4, 15, 13,
14, 17, 20,
17, 23, 20,
19, 21, 8,
21, 10, 8,
6, 9, 0,
9, 3, 0
]);

function mesh_cylinder(gl) {
let vertex_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$3, GL_STATIC_DRAW);
let normal_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
gl.bufferData(GL_ARRAY_BUFFER, normal_arr$3, GL_STATIC_DRAW);
let weights_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
gl.bufferData(GL_ARRAY_BUFFER, weights_arr$3, GL_STATIC_DRAW);
let index_buf = gl.createBuffer();
gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$3, GL_STATIC_DRAW);
return {
VertexBuffer: vertex_buf,
NormalBuffer: normal_buf,
WeightsBuffer: weights_buf,
IndexBuffer: index_buf,
IndexCount: index_arr$3.length,
};
}

let vertex_arr$3 = Float32Array.from([
0.00, -0.50, -0.50,
0.00, 0.50, -0.50,
0.35, -0.50, -0.35,
0.35, 0.50, -0.35,
0.50, -0.50, 0.00,
0.50, 0.50, 0.00,
0.35, -0.50, 0.35,
0.35, 0.50, 0.35,
-0.00, -0.50, 0.50,
-0.00, 0.50, 0.50,
-0.35, -0.50, 0.35,
-0.35, 0.50, 0.35,
-0.50, -0.50, -0.00,
-0.50, 0.50, -0.00,
-0.35, -0.50, -0.35,
-0.35, 0.50, -0.35
]);

let normal_arr$3 = Float32Array.from([
0.00, -0.63, -0.78,
0.00, 0.63, -0.78,
0.55, -0.63, -0.55,
0.55, 0.63, -0.55,
0.78, -0.63, 0.00,
0.78, 0.63, 0.00,
0.55, -0.63, 0.55,
0.55, 0.63, 0.55,
0.00, -0.63, 0.78,
0.00, 0.63, 0.78,
-0.55, -0.63, 0.55,
-0.55, 0.63, 0.55,
-0.78, -0.63, 0.00,
-0.78, 0.63, 0.00,
-0.55, -0.63, -0.55,
-0.55, 0.63, -0.55
]);

let weights_arr$3 = Float32Array.from([]);

let index_arr$3 = Uint16Array.from([
14, 10, 6,
6, 2, 14,
14, 12, 10,
10, 8, 6,
6, 4, 2,
2, 0, 14,
0, 1, 14,
1, 15, 14,
14, 15, 12,
15, 13, 12,
5, 9, 13,
13, 1, 5,
5, 7, 9,
9, 11, 13,
13, 15, 1,
1, 3, 5,
12, 13, 10,
13, 11, 10,
10, 11, 8,
11, 9, 8,
8, 9, 6,
9, 7, 6,
6, 7, 4,
7, 5, 4,
4, 5, 2,
5, 3, 2,
2, 3, 0,
3, 1, 0
]);

function mesh_leaf(gl) {
let vertex_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$2, GL_STATIC_DRAW);
let normal_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
gl.bufferData(GL_ARRAY_BUFFER, normal_arr$2, GL_STATIC_DRAW);
let weights_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
gl.bufferData(GL_ARRAY_BUFFER, weights_arr$2, GL_STATIC_DRAW);
let index_buf = gl.createBuffer();
gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$2, GL_STATIC_DRAW);
return {
VertexBuffer: vertex_buf,
NormalBuffer: normal_buf,
WeightsBuffer: weights_buf,
IndexBuffer: index_buf,
IndexCount: index_arr$2.length,
};
}

let vertex_arr$2 = Float32Array.from([
-0.2, 0.0, 0.0,
0.0, 0.0, 0.1,
-0.0, 0.0, -0.1,
0.2, 0.0, -0.0
]);

let normal_arr$2 = Float32Array.from([
0.1, 1.0, 0.0,
-0.0, 1.0, 0.0,
-0.0, 1.0, 0.0,
-0.1, 1.0, 0.0
]);

let weights_arr$2 = Float32Array.from([
2.0, 1.0, 0.0, 0.0,
0.0, 1.0, 0.0, 0.0,
0.0, 1.0, 0.0, 0.0,
1.0, 1.0, 0.0, 0.0
]);

let index_arr$2 = Uint16Array.from([
2, 3, 1,
0, 2, 1
]);
/*
1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0
0.1, 1.0, 0.0, 0.0, -1.0, 0.1, -0.0, 0.0, -0.0, -0.0, 1.0, 0.0, -0.0, -0.0, -0.0, 1.0
0.1, -1.0, -0.0, 0.0, 1.0, 0.1, -0.0, 0.0, 0.0, -0.0, 1.0, 0.0, 0.0, -0.0, -0.0, 1.0
*/

function mesh_lisek(gl) {
let vertex_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$1, GL_STATIC_DRAW);
let normal_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
gl.bufferData(GL_ARRAY_BUFFER, normal_arr$1, GL_STATIC_DRAW);
let weights_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
gl.bufferData(GL_ARRAY_BUFFER, weights_arr$1, GL_STATIC_DRAW);
let index_buf = gl.createBuffer();
gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$1, GL_STATIC_DRAW);
return {
VertexBuffer: vertex_buf,
NormalBuffer: normal_buf,
WeightsBuffer: weights_buf,
IndexBuffer: index_buf,
IndexCount: index_arr$1.length,
};
}

let vertex_arr$1 = Float32Array.from([
0.1, 0.4, 0.0,
0.1, -0.0, -0.0,
0.1, 0.2, -0.3,
0.1, 0.4, -0.6,
0.1, -0.0, -0.5,
0.1, 0.7, 0.2,
0.2, 0.9, 0.1,
-0.1, 0.4, 0.0,
0.0, 0.5, -0.0,
0.0, 0.2, -0.0,
-0.1, -0.0, -0.0,
-0.1, 0.2, -0.3,
0.0, 0.2, -0.5,
-0.1, 0.4, -0.6,
0.0, 0.4, -0.6,
-0.1, -0.0, -0.5,
-0.1, 0.7, 0.2,
0.0, 0.6, 0.4,
-0.2, 0.9, 0.1,
0.0, 0.7, 0.2
]);

let normal_arr$1 = Float32Array.from([
1.0, 0.0, 0.1,
-0.0, -1.0, 0.3,
0.8, -0.6, -0.1,
0.7, 0.4, -0.6,
0.0, -1.0, -0.2,
0.7, 0.2, 0.7,
0.4, 0.9, -0.1,
-1.0, 0.0, 0.1,
0.0, 0.8, -0.6,
0.0, -0.6, 0.8,
0.0, -1.0, 0.3,
-0.8, -0.6, -0.1,
0.0, -0.5, -0.9,
-0.7, 0.4, -0.6,
0.0, 0.6, -0.8,
-0.0, -1.0, -0.2,
-0.7, 0.2, 0.7,
0.0, -0.0, 1.0,
-0.4, 0.9, -0.1,
0.0, 0.9, 0.4
]);

let weights_arr$1 = Float32Array.from([
2.0, 0.9, 1.0, 0.1,
2.0, 1.0, 0.0, 0.0,
4.0, 0.5, 2.0, 0.5,
4.0, 0.9, 0.0, 0.1,
4.0, 1.0, 0.0, 0.0,
1.0, 0.9, 2.0, 0.1,
1.0, 1.0, 0.0, 0.0,
3.0, 0.9, 1.0, 0.1,
1.0, 1.0, 0.0, 0.0,
2.0, 0.5, 3.0, 0.5,
3.0, 1.0, 0.0, 0.0,
5.0, 0.5, 3.0, 0.5,
0.0, 1.0, 0.0, 0.0,
5.0, 0.9, 0.0, 0.1,
0.0, 1.0, 0.0, 0.0,
5.0, 1.0, 0.0, 0.0,
1.0, 0.9, 3.0, 0.1,
1.0, 1.0, 0.0, 0.0,
1.0, 1.0, 0.0, 0.0,
1.0, 1.0, 0.0, 0.0
]);

let index_arr$1 = Uint16Array.from([
18, 19, 16,
19, 17, 16,
7, 13, 8,
16, 17, 7,
19, 18, 8,
8, 18, 7,
7, 17, 9,
7, 18, 16,
12, 11, 9,
11, 15, 13,
12, 15, 11,
12, 14, 13,
13, 15, 12,
11, 13, 7,
13, 14, 8,
9, 10, 7,
11, 10, 9,
7, 10, 11,
19, 6, 5,
17, 19, 5,
3, 0, 8,
17, 5, 0,
6, 19, 8,
6, 8, 0,
17, 0, 9,
6, 0, 5,
2, 12, 9,
4, 2, 3,
4, 12, 2,
14, 12, 3,
4, 3, 12,
3, 2, 0,
14, 3, 8,
1, 9, 0,
1, 2, 9,
1, 0, 2
]);
/*
1.0, 0.0, 0.0, 0.0, 0.0, 0.1, -1.0, 0.0, 0.0, 1.0, 0.1, 0.0, 0.0, 0.4, 0.4, 1.0
1.0, 0.0, 0.0, 0.0, 0.0, 0.8, -0.6, 0.0, 0.0, 0.6, 0.8, 0.0, 0.0, -0.3, 0.3, 1.0
1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0, -0.1, 0.4, -0.0, 1.0
1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0, 0.1, 0.4, -0.0, 1.0
1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.1, 0.0, 0.0, -0.1, -1.0, 0.0, -0.1, 0.3, -0.5, 1.0
1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.1, 0.0, 0.0, -0.1, -1.0, 0.0, 0.1, 0.3, -0.5, 1.0
*/

function mesh_ogon(gl) {
let vertex_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);
let normal_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
gl.bufferData(GL_ARRAY_BUFFER, normal_arr, GL_STATIC_DRAW);
let weights_buf = gl.createBuffer();
gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
gl.bufferData(GL_ARRAY_BUFFER, weights_arr, GL_STATIC_DRAW);
let index_buf = gl.createBuffer();
gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr, GL_STATIC_DRAW);
return {
VertexBuffer: vertex_buf,
NormalBuffer: normal_buf,
WeightsBuffer: weights_buf,
IndexBuffer: index_buf,
IndexCount: index_arr.length,
};
}

let vertex_arr = Float32Array.from([
-0.1, 0.6, -0.9,
-0.0, 0.4, -0.5,
-0.0, 0.3, -0.9,
0.1, 0.5, -0.8,
-0.2, 0.6, -1.2,
-0.0, 0.2, -1.3,
0.2, 0.5, -1.2,
-0.2, 0.8, -1.8,
-0.0, 0.1, -1.6,
0.2, 0.5, -1.8,
-0.2, 0.7, -2.2,
-0.0, 0.2, -2.1,
0.2, 0.5, -2.2,
0.0, 0.5, -2.5
]);

let normal_arr = Float32Array.from([
-0.7, 0.7, 0.3,
-0.0, -0.2, 1.0,
-0.1, -1.0, 0.2,
0.8, 0.4, 0.3,
-0.7, 0.7, 0.2,
-0.1, -1.0, 0.1,
0.9, 0.3, 0.2,
-0.7, 0.7, -0.0,
-0.1, -1.0, 0.0,
1.0, 0.3, -0.0,
-0.6, 0.7, -0.4,
-0.1, -1.0, -0.3,
0.9, 0.2, -0.3,
0.1, 0.0, -1.0
]);

let weights_arr = Float32Array.from([
0.0, 0.9, 1.0, 0.1,
0.0, 1.0, 0.0, 0.0,
0.0, 0.9, 1.0, 0.1,
0.0, 1.0, 1.0, 0.0,
1.0, 0.9, 2.0, 0.1,
1.0, 0.9, 2.0, 0.1,
1.0, 1.0, 2.0, 0.0,
2.0, 0.9, 3.0, 0.1,
2.0, 0.9, 3.0, 0.1,
2.0, 0.9, 3.0, 0.1,
3.0, 1.0, 0.0, 0.0,
3.0, 1.0, 0.0, 0.0,
3.0, 1.0, 0.0, 0.0,
3.0, 1.0, 0.0, 0.0
]);

let index_arr = Uint16Array.from([
13, 12, 10,
13, 11, 12,
13, 10, 11,
12, 11, 9,
11, 8, 9,
11, 10, 8,
10, 7, 8,
8, 7, 5,
7, 4, 5,
7, 9, 4,
9, 6, 4,
10, 12, 7,
12, 9, 7,
6, 5, 3,
5, 2, 3,
5, 4, 2,
4, 0, 2,
4, 6, 0,
6, 3, 0,
9, 8, 6,
8, 5, 6,
1, 0, 3,
1, 3, 2,
2, 0, 1
]);
/*
1.0, -0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0, -0.7, -0.4, 1.0
1.0, -0.0, -0.0, 0.0, 0.0, 0.1, 1.0, 0.0, 0.0, -1.0, 0.1, 0.0, -0.0, -1.1, -0.3, 1.0
1.0, 0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0, -1.5, -0.5, 1.0
-1.0, -0.0, -0.0, 0.0, 0.0, 0.1, -1.0, 0.0, 0.0, -1.0, -0.1, 0.0, -0.0, -2.0, 0.2, 1.0
*/

/**
* @module systems/sys_animate
*/
const QUERY$k = 1048576 /* Transform */ | 1 /* Animate */;
function sys_animate(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$k) === QUERY$k) {
update$e(game, i, delta);
}
}
}
function update$e(game, entity, delta) {
let transform = game.World.Transform[entity];
let animate = game.World.Animate[entity];

if (animate.Trigger) {
let next = animate.States[animate.Trigger];
if (next && next !== animate.Current) {
if (animate.Current.Time === 0) {

animate.Current = next;
}
else if (animate.Current.Flags & 1 /* EarlyExit */) {



animate.Current.Time = 0;
animate.Current = next;
}
}
animate.Trigger = undefined;
}

let current_keyframe = null;
let next_keyframe = null;
for (let keyframe of animate.Current.Keyframes) {
if (animate.Current.Time < keyframe.Timestamp) {
next_keyframe = keyframe;
break;
}
else {
current_keyframe = keyframe;
}
}

if (current_keyframe && next_keyframe) {
let keyframe_duration = next_keyframe.Timestamp - current_keyframe.Timestamp;
let current_keyframe_time = animate.Current.Time - current_keyframe.Timestamp;
let interpolant = current_keyframe_time / keyframe_duration;
if (next_keyframe.Ease) {
interpolant = next_keyframe.Ease(interpolant);
}
if (current_keyframe.Translation && next_keyframe.Translation) {
lerp(transform.Translation, current_keyframe.Translation, next_keyframe.Translation, interpolant);
transform.Dirty = true;
}
if (current_keyframe.Rotation && next_keyframe.Rotation) {
slerp(transform.Rotation, current_keyframe.Rotation, next_keyframe.Rotation, interpolant);
transform.Dirty = true;
}
}
else if (current_keyframe) {
if (current_keyframe.Translation) {
copy$1(transform.Translation, current_keyframe.Translation);
transform.Dirty = true;
}
if (current_keyframe.Rotation) {
copy(transform.Rotation, current_keyframe.Rotation);
transform.Dirty = true;
}
}

let new_time = animate.Current.Time + delta;
if (new_time < animate.Current.Duration) {

animate.Current.Time = new_time;
return;
}
else {

animate.Current.Time = 0;
}

if (animate.Current.Flags & 4 /* Alternate */) {

for (let keyframe of animate.Current.Keyframes.reverse()) {
keyframe.Timestamp = animate.Current.Duration - keyframe.Timestamp;
}
}
if (!(animate.Current.Flags & 2 /* Loop */)) {
animate.Current = animate.States["i"];
}
}

function play_note(audio, instr, note, offset) {
let time = audio.currentTime + offset;
let total_duration = 0;
let master = audio.createGain();
master.gain.value = (instr[0 /* MasterGainAmount */] / 9) ** 3;
let lfa, lfo;
if (instr[5 /* LFOType */]) {

lfo = audio.createOscillator();
lfo.type = instr[5 /* LFOType */];
lfo.frequency.value = (instr[7 /* LFOFreq */] / 3) ** 3;

lfa = audio.createGain();
lfa.gain.value = (instr[6 /* LFOAmount */] + 3) ** 3;
lfo.connect(lfa);
}
if (instr[1 /* FilterType */]) {
let filter = audio.createBiquadFilter();
filter.type = instr[1 /* FilterType */];
filter.frequency.value = 2 ** instr[2 /* FilterFreq */];
filter.Q.value = instr[3 /* FilterQ */] ** 1.5;
if (lfa && instr[4 /* FilterDetuneLFO */]) {
lfa.connect(filter.detune);
}
master.connect(filter);
filter.connect(audio.destination);
}
else {
master.connect(audio.destination);
}
for (let source of instr[8 /* Sources */]) {
let amp = audio.createGain();
amp.connect(master);

let gain_amount = (source[1 /* GainAmount */] / 9) ** 3;
let gain_attack = (source[2 /* GainAttack */] / 9) ** 3;
let gain_sustain = (source[3 /* GainSustain */] / 9) ** 3;
let gain_release = (source[4 /* GainRelease */] / 6) ** 3;
let gain_duration = gain_attack + gain_sustain + gain_release;
amp.gain.setValueAtTime(0, time);
amp.gain.linearRampToValueAtTime(gain_amount, time + gain_attack);
amp.gain.setValueAtTime(gain_amount, time + gain_attack + gain_sustain);
amp.gain.exponentialRampToValueAtTime(0.00001, time + gain_duration);

if (source[0]) {
let hfo = audio.createOscillator();
hfo.type = source[0 /* SourceType */];
hfo.connect(amp);


hfo.detune.value = 3 * (source[5 /* DetuneAmount */] - 7.5) ** 3;
if (lfa && source[6 /* DetuneLFO */]) {
lfa.connect(hfo.detune);
}


let freq = 440 * 2 ** ((note - 69) / 12);
hfo.frequency.setValueAtTime(freq, time);
hfo.start(time);
hfo.stop(time + gain_duration);
}
else {
let noise = audio.createBufferSource();
noise.buffer = lazy_noise_buffer(audio);
noise.loop = true;
noise.connect(amp);
noise.start(time);
noise.stop(time + gain_duration);
}
if (gain_duration > total_duration) {
total_duration = gain_duration;
}
}
if (lfo) {
lfo.start(time);
lfo.stop(time + total_duration);
}
}
let noise_buffer;
function lazy_noise_buffer(audio) {
if (!noise_buffer) {
noise_buffer = audio.createBuffer(1, audio.sampleRate * 2, audio.sampleRate);
let channel = noise_buffer.getChannelData(0);
for (let i = 0; i < channel.length; i++) {
channel[i] = Math.random() * 2 - 1;
}
}
return noise_buffer;
}
function play_synth_random(audio, clip) {
for (let track of clip.Tracks) {
let note = element(track.Notes);
if (note) {
play_note(audio, track.Instrument, note, 0);
}
}
}

/**
* @module systems/sys_audio_source
*/
const QUERY$j = 2 /* AudioSource */;
function sys_audio_source(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$j) === QUERY$j) {
update$d(game, i, delta);
}
}
}
function update$d(game, entity, delta) {
let audio_source = game.World.AudioSource[entity];
if (audio_source.Current) {
audio_source.Time += delta;
if (audio_source.Time > audio_source.Current.Exit) {




audio_source.Current = undefined;
}
}
if (audio_source.Trigger && !audio_source.Current) {
play_synth_random(game.Audio, audio_source.Trigger);
audio_source.Current = audio_source.Trigger;
audio_source.Time = 0;
}




audio_source.Trigger = audio_source.Idle;
}

function resize_perspective(projection, aspect) {
if (aspect > 1) {

perspective(projection.Projection, projection.FovY, aspect, projection.Near, projection.Far);
invert(projection.Inverse, projection.Projection);
}
else {

perspective(projection.Projection, projection.FovY / aspect, aspect, projection.Near, projection.Far);
invert(projection.Inverse, projection.Projection);
}
}
function resize_ortho(projection) {
ortho(projection.Projection, projection.Radius, projection.Radius, -projection.Radius, -projection.Radius, projection.Near, projection.Far);
invert(projection.Inverse, projection.Projection);
}

/**
* @module systems/sys_camera
*/
const QUERY$i = 1048576 /* Transform */ | 8 /* Camera */;
function sys_camera(game, delta) {
game.Cameras = [];
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$i) === QUERY$i) {
let camera = game.World.Camera[i];
let transform = game.World.Transform[i];
let projection = camera.Projection;
if (game.ViewportResized) {
switch (projection.Kind) {
case 0 /* Perspective */: {
let aspect = camera.Kind === 0 /* Forward */
? game.ViewportWidth / game.ViewportHeight
: camera.Target.Width / camera.Target.Height;
resize_perspective(projection, aspect);
break;
}
case 1 /* Ortho */:
resize_ortho(projection);
break;
}
}
copy$2(camera.View, transform.Self);
multiply$1(camera.Pv, projection.Projection, camera.View);
get_translation(camera.Position, transform.World);
game.Cameras.push(i);
}
}
}

const BOX = [
[0.5, 0.5, 0.5],
[0.5, 0.5, -0.5],
[-0.5, 0.5, -0.5],
[-0.5, 0.5, 0.5],
[0.5, -0.5, 0.5],
[0.5, -0.5, -0.5],
[-0.5, -0.5, -0.5],
[-0.5, -0.5, 0.5],
];
function compute_aabb(world, aabb) {
get_translation(aabb.Center, world);

let min_x, min_y, min_z, max_x, max_y, max_z;
min_x = max_x = aabb.Center[0];
min_y = max_y = aabb.Center[1];
min_z = max_z = aabb.Center[2];


let world_vertex = [0, 0, 0];
for (let i = 0; i < 8; i++) {
let bb_vertex = BOX[i];

world_vertex[0] = bb_vertex[0] * aabb.Size[0];
world_vertex[1] = bb_vertex[1] * aabb.Size[1];
world_vertex[2] = bb_vertex[2] * aabb.Size[2];
transform_point(world_vertex, world_vertex, world);
if (world_vertex[0] < min_x) {
min_x = world_vertex[0];
}
if (world_vertex[0] > max_x) {
max_x = world_vertex[0];
}
if (world_vertex[1] < min_y) {
min_y = world_vertex[1];
}
if (world_vertex[1] > max_y) {
max_y = world_vertex[1];
}
if (world_vertex[2] < min_z) {
min_z = world_vertex[2];
}
if (world_vertex[2] > max_z) {
max_z = world_vertex[2];
}
}

aabb.Min = [min_x, min_y, min_z];
aabb.Max = [max_x, max_y, max_z];

aabb.Half[0] = (max_x - min_x) / 2;
aabb.Half[1] = (max_y - min_y) / 2;
aabb.Half[2] = (max_z - min_z) / 2;
}
function penetrate_aabb(a, b) {
let distance_x = a.Center[0] - b.Center[0];
let penetration_x = a.Half[0] + b.Half[0] - Math.abs(distance_x);
let distance_y = a.Center[1] - b.Center[1];
let penetration_y = a.Half[1] + b.Half[1] - Math.abs(distance_y);
let distance_z = a.Center[2] - b.Center[2];
let penetration_z = a.Half[2] + b.Half[2] - Math.abs(distance_z);
if (penetration_x < penetration_y && penetration_x < penetration_z) {
return [penetration_x * Math.sign(distance_x), 0, 0];
}
else if (penetration_y < penetration_z) {
return [0, penetration_y * Math.sign(distance_y), 0];
}
else {
return [0, 0, penetration_z * Math.sign(distance_z)];
}
}
function intersect_aabb(a, b) {
return (a.Min[0] < b.Max[0] &&
a.Max[0] > b.Min[0] &&
a.Min[1] < b.Max[1] &&
a.Max[1] > b.Min[1] &&
a.Min[2] < b.Max[2] &&
a.Max[2] > b.Min[2]);
}

/**
* @module systems/sys_collide
*/
const QUERY$h = 1048576 /* Transform */ | 32 /* Collide */;
function sys_collide(game, delta) {

let static_colliders = [];
let dynamic_colliders = [];
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$h) === QUERY$h) {
let transform = game.World.Transform[i];
let collider = game.World.Collide[i];

collider.Collisions = [];
if (collider.New) {
collider.New = false;
compute_aabb(transform.World, collider);
}
else if (collider.Dynamic) {
compute_aabb(transform.World, collider);
dynamic_colliders.push(collider);
}
else {
static_colliders.push(collider);
}
}
}
for (let i = 0; i < dynamic_colliders.length; i++) {
check_collisions(dynamic_colliders[i], static_colliders, static_colliders.length);
check_collisions(dynamic_colliders[i], dynamic_colliders, i);
}
}
/**
* Check for collisions between a dynamic collider and other colliders. Length
* is used to control how many colliders to check against. For collisions
* with static colliders, length should be equal to colliders.length, since
* we want to consider all static colliders in the scene. For collisions with
* other dynamic colliders, we only need to check a pair of colliders once.
* Varying length allows to skip half of the NxN checks matrix.
*
* @param game The game instance.
* @param collider The current collider.
* @param colliders Other colliders to test against.
* @param length How many colliders to check.
*/
function check_collisions(collider, colliders, length) {
for (let i = 0; i < length; i++) {
let other = colliders[i];
let collider_can_intersect = collider.Signature & other.Layers;
let other_can_intersect = other.Signature & collider.Layers;
if (collider_can_intersect || other_can_intersect) {
if (intersect_aabb(collider, other)) {
let hit = penetrate_aabb(collider, other);
if (collider_can_intersect) {
collider.Collisions.push({
Other: other.EntityId,
Hit: hit,
});
}
if (other_can_intersect) {
other.Collisions.push({
Other: collider.EntityId,
Hit: negate([0, 0, 0], hit),
});
}
}
}
}
}

/**
* @module systems/sys_control_always
*/
const QUERY$g = 64 /* ControlAlways */ | 1048576 /* Transform */;
function sys_control_always(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$g) === QUERY$g) {
update$c(game, i);
}
}
}
function update$c(game, entity) {
let control = game.World.ControlAlways[entity];
let move = game.World.Move[entity];
if (control.Direction) {
move.Directions.push(control.Direction.slice());
}
if (control.Rotation) {
move.LocalRotations.push(control.Rotation.slice());
}
if (control.AnimationClip) {
for (let ent of query_all(game.World, entity, 1 /* Animate */)) {
let animate = game.World.Animate[ent];
animate.Trigger = control.AnimationClip;
}
}
}

let snd_walk1 = {
Tracks: [
{
Instrument: [
3,
"lowpass",
9,
0,
false,
false,
8,
8,
[
["sine", 8, 1, 1, 3, 8, false],
[false, 8, 2, 2, 2],
],
],
Notes: [48],
},
],
Exit: 0.25,
};

let snd_walk2 = {
Tracks: [
{
Instrument: [
3,
"lowpass",
8,
0,
false,
false,
8,
8,
[
["sine", 8, 1, 1, 3, 8, false],
[false, 8, 1, 2, 3],
],
],
Notes: [48],
},
],
Exit: 0.25,
};

let snd_walk3 = {
Tracks: [
{
Instrument: [
8,
"bandpass",
8,
2,
false,
false,
8,
8,
[
["square", 3, 1, 1, 2, 8, false],
[false, 3, 2, 2, 3],
],
],
Notes: [48],
},
],
Exit: 0.25,
};

const QUERY$f = 128 /* ControlPlayer */;
function sys_control_keyboard(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$f) === QUERY$f) {
update$b(game, i);
}
}
}
function update$b(game, entity) {
let control = game.World.ControlPlayer[entity];
if (control.Flags & 1 /* Move */) {
let move = game.World.Move[entity];
let collide = game.World.Collide[entity];
let audio_source = game.World.AudioSource[entity];
let rigid_body = game.World.RigidBody[entity];
let is_walking = false;
if (game.InputState["ArrowLeft"]) {
move.Directions.push([-1, 0, 0]);
is_walking = true;
}
if (game.InputState["ArrowRight"]) {
move.Directions.push([1, 0, 0]);
is_walking = true;
}
if (is_walking && collide.Collisions.length > 0) {
let other_entity = collide.Collisions[0].Other;
let other_layers = game.World.Collide[other_entity].Layers;
if (other_layers & 16 /* SurfaceGround */) {
audio_source.Trigger = snd_walk1;
}
else if (other_layers & 32 /* SurfaceWood */) {
audio_source.Trigger = snd_walk2;
}
else if (other_layers & 64 /* SurfaceMetal */) {
audio_source.Trigger = snd_walk3;
}
}
if (!rigid_body.IsAirborne) {

if (game.InputState["ArrowUp"]) {
rigid_body.Acceleration[1] += 500;
}
}
}
if (control.Flags & 2 /* Rotate */) {

let transform = game.World.Transform[entity];
if (!control.IsGrabbingEntity) {
if (game.InputState["ArrowLeft"] && control.IsFacingRight) {
control.IsFacingRight = false;
set(transform.Rotation, 0, -0.71, 0.0, 0.71);
transform.Dirty = true;
}
if (game.InputState["ArrowRight"] && !control.IsFacingRight) {
control.IsFacingRight = true;
set(transform.Rotation, 0, 0.71, 0.0, 0.71);
transform.Dirty = true;
}
}
}
if (control.Flags & 8 /* Grab */) {

let collide = game.World.Collide[entity];
if (game.InputState["Space"] &&
!control.IsGrabbingEntity &&
collide.Collisions.length > 0) {
let obstacle_entity = collide.Collisions[0].Other;
let obstacle_mimic = game.World.Mimic[obstacle_entity];
for (let ent of query_up(game.World, entity, 128 /* ControlPlayer */)) {
let control = game.World.ControlPlayer[ent];
control.IsGrabbingEntity = obstacle_entity;
}
game.World.Signature[obstacle_entity] |= 4096 /* Mimic */;
obstacle_mimic.Target = entity;
}
if (game.InputDelta["Space"] === -1 && control.IsGrabbingEntity) {
game.World.Signature[control.IsGrabbingEntity] &= ~4096 /* Mimic */;
for (let ent of query_up(game.World, entity, 128 /* ControlPlayer */)) {
let control = game.World.ControlPlayer[ent];
control.IsGrabbingEntity = null;
}
}
}
if (control.Flags & 4 /* Animate */) {
let anim_name;
if (game.InputState["ArrowLeft"] || game.InputState["ArrowRight"]) {
anim_name = "w";
}
let parent_entity = game.World.Transform[entity].Parent;
if (parent_entity !== undefined) {
let parent_mimic = game.World.Mimic[parent_entity];
let anchor_entity = parent_mimic.Target;
let anchor_parent = game.World.Transform[anchor_entity].Parent;
if (anchor_parent !== undefined) {
let rigid_body = game.World.RigidBody[anchor_parent];
if (rigid_body.IsAirborne) {
anim_name = "j";
}
}
}
if (anim_name) {
for (let ent of query_all(game.World, entity, 1 /* Animate */)) {
let animate = game.World.Animate[ent];
animate.Trigger = anim_name;
}
}
}
}

const QUERY$e = 128 /* ControlPlayer */;
const DOUBLE_TAP_INTERVAL = 0.2;
const MOVEMENT_DEAD_ZONE = 0.01;
const JUMPING_DEAD_ZONE = 0.5;

const touch_start = [0, 0];
let time_between_taps = 0;
function sys_control_touch_move(game, delta) {
if (game.InputDelta["Touch0"] === -1) {
time_between_taps = 0;
}
if (game.InputState["Touch0"] === 0) {
time_between_taps += delta;
}
if (game.InputDelta["Touch0"] === 1) {


touch_start[0] = game.InputState["Touch0X"];
touch_start[1] = game.InputState["Touch0Y"];
}
let dx = 0;
let dy = 0;
if (game.InputState["Touch0"] === 1) {
let divisor = Math.min(game.ViewportWidth, game.ViewportHeight) / 4;
dx = (game.InputState["Touch0X"] - touch_start[0]) / divisor;
dy = (game.InputState["Touch0Y"] - touch_start[1]) / divisor;
}
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$e) === QUERY$e) {
update$a(game, i, dx, dy);
}
}
}
function update$a(game, entity, dx, dy) {
let control = game.World.ControlPlayer[entity];
if (control.Flags & 1 /* Move */) {
let move = game.World.Move[entity];
if (Math.abs(dx) > MOVEMENT_DEAD_ZONE) {
move.Directions.push([clamp(-1, 1, dx), 0, 0]);
}
let rigid_body = game.World.RigidBody[entity];
if (!rigid_body.IsAirborne) {

if (Math.abs(dy) > JUMPING_DEAD_ZONE) {
rigid_body.Acceleration[1] += 500;
}
}
}
if (control.Flags & 2 /* Rotate */) {
let transform = game.World.Transform[entity];
if (!control.IsGrabbingEntity) {
if (dx < 0 && control.IsFacingRight) {
control.IsFacingRight = false;
set(transform.Rotation, 0, -0.71, 0.0, 0.71);
transform.Dirty = true;
}
if (dx > 0 && !control.IsFacingRight) {
control.IsFacingRight = true;
set(transform.Rotation, 0, 0.71, 0.0, 0.71);
transform.Dirty = true;
}
}
}
if (control.Flags & 8 /* Grab */) {

let collide = game.World.Collide[entity];
if (game.InputDelta["Touch0"] === 1 &&
time_between_taps < DOUBLE_TAP_INTERVAL &&
!control.IsGrabbingEntity &&
collide.Collisions.length > 0) {
let obstacle_entity = collide.Collisions[0].Other;
for (let ent of query_up(game.World, entity, 128 /* ControlPlayer */)) {
let control = game.World.ControlPlayer[ent];
control.IsGrabbingEntity = obstacle_entity;
}
game.World.Signature[obstacle_entity] |= 4096 /* Mimic */;
let obstacle_mimic = game.World.Mimic[obstacle_entity];
obstacle_mimic.Target = entity;
}
if (game.InputDelta["Touch0"] === -1 && control.IsGrabbingEntity) {
game.World.Signature[control.IsGrabbingEntity] &= ~4096 /* Mimic */;
for (let ent of query_up(game.World, entity, 128 /* ControlPlayer */)) {
let control = game.World.ControlPlayer[ent];
control.IsGrabbingEntity = null;
}
}
}
if (control.Flags & 4 /* Animate */) {
if (dx !== 0) {
for (let ent of query_all(game.World, entity, 1 /* Animate */)) {
let animate = game.World.Animate[ent];
animate.Trigger = "w";
}
}
}
}

const QUERY$d = 1048576 /* Transform */ | 256 /* Cull */;
function sys_cull(game, delta) {

let camera_entity = game.Cameras[1];
let transform = game.World.Transform[camera_entity];
let x = transform.World[12];
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$d) == QUERY$d) {
update$9(game, i, x);
}
}
}
function update$9(game, entity, camera_x) {
let cull = game.World.Cull[entity];
let transform = game.World.Transform[entity];
let x = transform.World[12];
if (Math.abs(x - camera_x) > 15) {
game.World.Signature[entity] &= ~cull.Mask;
}
else {
game.World.Signature[entity] |= cull.Mask;
}
}

/**
* @module systems/sys_lifespan
*/
const QUERY$c = 1024 /* Lifespan */;
function sys_lifespan(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$c) == QUERY$c) {
update$8(game, i, delta);
}
}
}
function update$8(game, entity, delta) {
let lifespan = game.World.Lifespan[entity];
lifespan.Remaining -= delta;
if (lifespan.Remaining < 0) {
destroy_all(game.World, entity);
}
}

/**
* @module systems/sys_light
*/
const QUERY$b = 1048576 /* Transform */ | 2048 /* Light */;
function sys_light(game, delta) {
game.LightPositions.fill(0);
let counter = 0;
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$b) === QUERY$b) {
update$7(game, i, counter++);
}
}
}
let world_pos = [0, 0, 0];
function update$7(game, entity, idx) {
let light = game.World.Light[entity];
let transform = game.World.Transform[entity];
get_translation(world_pos, transform.World);
if (light.Intensity < 1) {


normalize(world_pos, world_pos);
}
game.LightPositions[4 * idx + 0] = world_pos[0];
game.LightPositions[4 * idx + 1] = world_pos[1];
game.LightPositions[4 * idx + 2] = world_pos[2];
game.LightPositions[4 * idx + 3] = light.Intensity;
}

/**
* @module systems/sys_mimic
*/
const QUERY$a = 1048576 /* Transform */ | 4096 /* Mimic */;
function sys_mimic(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$a) === QUERY$a) {
let follower_transform = game.World.Transform[i];
let follower_mimic = game.World.Mimic[i];
let target_transform = game.World.Transform[follower_mimic.Target];
let target_world_position = get_translation([0, 0, 0], target_transform.World);
let target_world_rotation = get_rotation([0, 0, 0, 0], target_transform.World);

lerp(follower_transform.Translation, follower_transform.Translation, target_world_position, follower_mimic.Stiffness);
slerp(follower_transform.Rotation, follower_transform.Rotation, target_world_rotation, follower_mimic.Stiffness);
follower_transform.Dirty = true;
}
}
}

/**
* @module systems/sys_move
*/
const QUERY$9 = 1048576 /* Transform */ | 8192 /* Move */;
const NO_ROTATION = [0, 0, 0, 1];
function sys_move(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$9) === QUERY$9) {
update$6(game, i, delta);
}
}
}
function update$6(game, entity, delta) {
let transform = game.World.Transform[entity];
let move = game.World.Move[entity];
if (move.Directions.length) {
let direction = move.Directions.reduce(add_directions);



let amount = Math.min(1, length(direction));


transform_direction(direction, direction, transform.World);


normalize(direction, direction);

scale(direction, direction, amount * move.MoveSpeed * delta);
add(transform.Translation, transform.Translation, direction);
transform.Dirty = true;
move.Directions = [];
}

if (move.LocalRotations.length) {
let rotation = move.LocalRotations.reduce(multiply_rotations);
let t = Math.min(1, (move.RotationSpeed / Math.PI) * delta);
slerp(rotation, NO_ROTATION, rotation, t);

multiply(transform.Rotation, rotation, transform.Rotation);
transform.Dirty = true;
move.LocalRotations = [];
}
}
function add_directions(acc, cur) {
return add(acc, acc, cur);
}
function multiply_rotations(acc, cur) {
return multiply(acc, acc, cur);
}

const QUERY$8 = 1048576 /* Transform */ | 512 /* EmitParticles */;
function sys_particles(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$8) == QUERY$8) {
update$5(game, i, delta);
}
}
}
let origin = [0, 0, 0];
let forward = [0, 0, 0];
function update$5(game, entity, delta) {
let emitter = game.World.EmitParticles[entity];
let transform = game.World.Transform[entity];
emitter.SinceLast += delta;
if (emitter.SinceLast > emitter.Frequency) {
emitter.SinceLast = 0;
get_translation(origin, transform.World);
get_forward(forward, transform.World);

emitter.Instances.push(...origin, 0);

emitter.Instances.push(...forward, Math.random());
}


for (let i = 0; i < emitter.Instances.length;) {
emitter.Instances[i + 3] += delta;
if (emitter.Instances[i + 3] > emitter.Lifespan) {
emitter.Instances.splice(i, DATA_PER_PARTICLE);
}
else {
i += DATA_PER_PARTICLE;
}
}
}

/**
* @module systems/sys_physics_integrate
*/
const QUERY$7 = 1048576 /* Transform */ | 65536 /* RigidBody */;
const GRAVITY = -20;
function sys_physics_integrate(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$7) === QUERY$7) {
update$4(game, i, delta);
}
}
}
function update$4(game, entity, delta) {
let transform = game.World.Transform[entity];
let rigid_body = game.World.RigidBody[entity];
if (rigid_body.Kind === 1 /* Dynamic */) {
copy$1(rigid_body.VelocityIntegrated, rigid_body.VelocityResolved);

scale(rigid_body.Acceleration, rigid_body.Acceleration, delta);
add(rigid_body.VelocityIntegrated, rigid_body.VelocityIntegrated, rigid_body.Acceleration);
rigid_body.VelocityIntegrated[1] += GRAVITY * delta;

let vel_delta = [0, 0, 0];
scale(vel_delta, rigid_body.VelocityIntegrated, delta);
add(transform.Translation, transform.Translation, vel_delta);
transform.Dirty = true;

set$1(rigid_body.Acceleration, 0, 0, 0);
}
}

/**
* @module systems/sys_physics_resolve
*/
const QUERY$6 = 1048576 /* Transform */ | 32 /* Collide */ | 65536 /* RigidBody */;
function sys_physics_resolve(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$6) === QUERY$6) {
update$3(game, i);
}
}
}

let a = [0, 0, 0];
function update$3(game, entity) {
let transform = game.World.Transform[entity];
let collide = game.World.Collide[entity];
let rigid_body = game.World.RigidBody[entity];
if (rigid_body.Kind === 1 /* Dynamic */) {
rigid_body.IsAirborne = true;
let has_collision = false;
for (let i = 0; i < collide.Collisions.length; i++) {
let collision = collide.Collisions[i];
if (game.World.Signature[collision.Other] & 65536 /* RigidBody */) {
has_collision = true;



add(transform.Translation, transform.Translation, collision.Hit);
transform.Dirty = true;



let other_body = game.World.RigidBody[collision.Other];
switch (other_body.Kind) {
case 0 /* Static */:






normalize(a, collision.Hit);

scale(a, a, -2 * dot(rigid_body.VelocityIntegrated, a));
add(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated, a);
break;
case 1 /* Dynamic */:
copy$1(rigid_body.VelocityResolved, other_body.VelocityIntegrated);
break;
}

scale(rigid_body.VelocityResolved, rigid_body.VelocityResolved, rigid_body.Bounciness);
if (collision.Hit[1] > 0 && rigid_body.VelocityResolved[1] < 1) {

rigid_body.VelocityResolved[1] = 0;
rigid_body.IsAirborne = false;
}
}
}
if (!has_collision) {
copy$1(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated);
}
}
}

/**
* @module systems/sys_poll
*/
const QUERY$5 = 524288 /* Task */;
function sys_poll(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$5) === QUERY$5) {
let task = game.World.Task[i];
switch (task.Kind) {
case 0 /* Until */: {
if (task.Predicate(i)) {
complete(game, i);
}
break;
}
case 1 /* Timeout */: {
task.Remaining -= delta;
if (task.Remaining < 0) {
complete(game, i);
}
break;
}
}
}
}
}
function complete(game, entity) {
let task = game.World.Task[entity];
if (task.OnDone) {
task.OnDone(entity);
}
game.World.Signature[entity] &= ~524288 /* Task */;
if (game.World.Signature[entity] === 0 /* None */) {
game.World.DestroyEntity(entity);
}


delete game.World.Task[entity];
}

/**
* @module systems/sys_render_forward
*/
const QUERY$4 = 1048576 /* Transform */ | 32768 /* Render */;
function sys_render_forward(game, delta) {
if (game.Quality !== game.Targets.Sun.Width) {
resize_depth_target(game.Gl, game.Targets.Sun, game.Quality, game.Quality);
}
for (let camera_entity of game.Cameras) {
let camera = game.World.Camera[camera_entity];
switch (camera.Kind) {
case 0 /* Forward */:
render_forward(game, camera);
break;
case 3 /* Depth */:
render_depth(game, camera);
break;
}
}
}
function render_forward(game, camera) {
game.Gl.bindFramebuffer(GL_FRAMEBUFFER, null);
game.Gl.viewport(0, 0, game.ViewportWidth, game.ViewportHeight);
game.Gl.clearColor(...camera.ClearColor);
game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
render(game, camera);
}
function render_depth(game, camera) {
game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target.Framebuffer);
game.Gl.viewport(0, 0, camera.Target.Width, camera.Target.Height);
game.Gl.clearColor(...camera.ClearColor);
game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
render(game, camera);
}
function render(game, eye) {

let current_material = null;
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$4) === QUERY$4) {
let transform = game.World.Transform[i];
let render = game.World.Render[i];
if (render.Material !== current_material) {
current_material = render.Material;
switch (render.Kind) {
case 0 /* ColoredUnlit */:
use_colored_unlit(game, render.Material, eye);
break;
case 1 /* ColoredShadows */:
use_colored_shadows(game, render.Material, eye);
break;
case 2 /* ColoredSkinned */:
use_colored_skinned(game, render.Material, eye);
break;
case 3 /* ParticlesColored */:
use_particles_colored(game, render.Material, eye);
break;
case 4 /* Instanced */:
use_instanced(game, render.Material, eye);
break;
}
}
switch (render.Kind) {
case 0 /* ColoredUnlit */:
draw_colored_unlit(game, transform, render);
break;
case 1 /* ColoredShadows */:
draw_colored_shadows(game, transform, render);
break;
case 2 /* ColoredSkinned */:
draw_colored_skinned(game, i, transform, render);
break;
case 3 /* ParticlesColored */: {
let emitter = game.World.EmitParticles[i];
if (emitter.Instances.length) {
draw_particles_colored(game, render, emitter);
}
break;
}
case 4 /* Instanced */:
draw_instanced(game, transform, render);
break;
}
}
}
}
function use_colored_unlit(game, material, eye) {
game.Gl.enable(GL_CULL_FACE);
game.Gl.useProgram(material.Program);
game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
}
function draw_colored_unlit(game, transform, render) {
game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);
game.Gl.bindVertexArray(render.Vao);
game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
game.Gl.bindVertexArray(null);
}
function use_colored_shadows(game, material, eye) {
game.Gl.enable(GL_CULL_FACE);
game.Gl.useProgram(material.Program);
game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
if (eye.Kind === 3 /* Depth */) {
game.Gl.activeTexture(GL_TEXTURE0);
game.Gl.bindTexture(GL_TEXTURE_2D, game.Targets.Noop.DepthTexture);
game.Gl.uniform1i(material.Locations.ShadowMap, 0);
}
else {
game.Gl.activeTexture(GL_TEXTURE0);
game.Gl.bindTexture(GL_TEXTURE_2D, game.Targets.Sun.DepthTexture);
game.Gl.uniform1i(material.Locations.ShadowMap, 0);

let light_entity = first_entity(game.World, 8 /* Camera */ | 2048 /* Light */);
if (light_entity) {
let light_camera = game.World.Camera[light_entity];
game.Gl.uniformMatrix4fv(material.Locations.ShadowSpace, false, light_camera.Pv);
}
}
}
function draw_colored_shadows(game, transform, render) {
game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
game.Gl.bindVertexArray(render.Vao);
game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
game.Gl.bindVertexArray(null);
}
function use_colored_skinned(game, material, eye) {
game.Gl.enable(GL_CULL_FACE);
game.Gl.useProgram(material.Program);
game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
}
const bones = new Float32Array(16 * 6);
function draw_colored_skinned(game, entity, transform, render) {
game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
let bone_entities = [];
if (game.World.Signature[entity] & 16 /* Children */) {
for (let bone_entity of query_all(game.World, entity, 4 /* Bone */ | 1048576 /* Transform */)) {
bone_entities.push(bone_entity);
}
}
else {


let start_here = entity;
for (let i = 0; i < 4; i++) {
let bone_entity = first_entity(game.World, 4 /* Bone */ | 1048576 /* Transform */, start_here);
if (bone_entity) {
bone_entities.push(bone_entity);
start_here = bone_entity + 1;
}
}
}
for (let bone_entity of bone_entities) {
let bone_transform = game.World.Transform[bone_entity];
let bone = game.World.Bone[bone_entity];
let bone_view = bones.subarray(bone.Index * 16);
multiply$1(bone_view, bone_transform.World, bone.InverseBindPose);
}
game.Gl.uniformMatrix4fv(render.Material.Locations.Bones, false, bones);
game.Gl.bindVertexArray(render.Vao);
game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
game.Gl.bindVertexArray(null);
}
function use_particles_colored(game, material, eye) {
game.Gl.enable(GL_CULL_FACE);
game.Gl.useProgram(material.Program);
game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
}
function draw_particles_colored(game, render, emitter) {
game.Gl.uniform4fv(render.Material.Locations.ColorStart, render.ColorStart);
game.Gl.uniform4fv(render.Material.Locations.ColorEnd, render.ColorEnd);
game.Gl.uniform4f(render.Material.Locations.Details, emitter.Lifespan, emitter.Speed, ...render.Size);
let instances = Float32Array.from(emitter.Instances);
game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.Buffer);
game.Gl.bufferSubData(GL_ARRAY_BUFFER, 0, instances);
game.Gl.enableVertexAttribArray(render.Material.Locations.OriginAge);
game.Gl.vertexAttribPointer(render.Material.Locations.OriginAge, 4, GL_FLOAT, false, DATA_PER_PARTICLE * 4, 0);
game.Gl.enableVertexAttribArray(render.Material.Locations.Direction);
game.Gl.vertexAttribPointer(render.Material.Locations.Direction, 3, GL_FLOAT, false, DATA_PER_PARTICLE * 4, 4 * 4);
game.Gl.drawArrays(render.Material.Mode, 0, emitter.Instances.length / DATA_PER_PARTICLE);
}
function use_instanced(game, material, eye) {
game.Gl.disable(GL_CULL_FACE);
game.Gl.useProgram(material.Program);
game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
}
function draw_instanced(game, transform, render) {
game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
game.Gl.bindVertexArray(render.Vao);
let quality_factor = game.Quality / 4096 /* Ultra */;
let instance_count = Math.floor(render.InstanceCount * quality_factor);
game.Gl.drawElementsInstanced(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0, instance_count);
game.Gl.bindVertexArray(null);
}

/**
* @module systems/sys_resize
*/
function sys_resize(game, delta) {
if (game.ViewportWidth != window.innerWidth || game.ViewportHeight != window.innerHeight) {
game.ViewportResized = true;
}
if (game.ViewportResized) {
game.ViewportWidth = game.Canvas3D.width = window.innerWidth;
game.ViewportHeight = game.Canvas3D.height = window.innerHeight;
}
}

/**
* @module systems/sys_shake
*/
const QUERY$3 = 1048576 /* Transform */ | 131072 /* Shake */;
function sys_shake(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$3) == QUERY$3) {
update$2(game, i);
}
}
}
function update$2(game, entity) {
let shake = game.World.Shake[entity];
let transform = game.World.Transform[entity];
transform.Translation = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5];
scale(transform.Translation, transform.Translation, shake.Magnitude * 2);
transform.Dirty = true;
}

/**
* @module systems/sys_spawn
*/
const QUERY$2 = 1048576 /* Transform */ | 262144 /* Spawn */;
function sys_spawn(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$2) == QUERY$2) {
update$1(game, i, delta);
}
}
}
function update$1(game, entity, delta) {
let spawn = game.World.Spawn[entity];

let quality_factor = 2048 /* High */ / game.Quality;
spawn.SinceLast += delta;
if (spawn.SinceLast > spawn.Interval * quality_factor) {
spawn.SinceLast = 0;
let entity_transform = game.World.Transform[entity];
let world_position = [0, 0, 0];
get_translation(world_position, entity_transform.World);
let world_rotation = [0, 0, 0, 0];
get_rotation(world_rotation, entity_transform.World);
instantiate(game, [...spawn.Creator(game), transform(world_position, world_rotation)]);
}
}

/**
* @module systems/sys_transform
*/
const QUERY$1 = 1048576 /* Transform */;
function sys_transform(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY$1) === QUERY$1) {
let transform = game.World.Transform[i];
if (transform.Dirty) {
update_transform(game.World, i, transform);
}
}
}
}
function update_transform(world, entity, transform) {
transform.Dirty = false;
from_rotation_translation_scale(transform.World, transform.Rotation, transform.Translation, transform.Scale);
if (transform.Parent !== undefined) {
let parent_transform = world.Transform[transform.Parent];
multiply$1(transform.World, parent_transform.World, transform.World);
}
invert(transform.Self, transform.World);
if (world.Signature[entity] & 16 /* Children */) {
let children = world.Children[entity];
for (let i = 0; i < children.Children.length; i++) {
let child = children.Children[i];
if (world.Signature[child] & 1048576 /* Transform */) {
let child_transform = world.Transform[child];
child_transform.Parent = entity;
update_transform(world, child, child_transform);
}
}
}
}

/**
* @module systems/sys_trigger
*/
const QUERY = 1048576 /* Transform */ | 32 /* Collide */ | 2097152 /* Trigger */;
function sys_trigger(game, delta) {
for (let i = 0; i < game.World.Signature.length; i++) {
if ((game.World.Signature[i] & QUERY) === QUERY) {
update(game, i);
}
}
}
function update(game, entity) {
let collide = game.World.Collide[entity];
let trigger = game.World.Trigger[entity];
for (let collision of collide.Collisions) {
dispatch(game, trigger.Action, [entity, collision.Other]);
}
}

/**
* @module systems/sys_ui
*/
let prev;
function sys_ui(game, delta) {
let next = App(game);
if (next !== prev) {
game.Ui.innerHTML = prev = next;
}
}

class Game extends Game3D {
constructor() {
super(...arguments);
this.World = new World();
this.MaterialColoredWireframe = mat_forward_colored_wireframe(this.Gl);
this.MaterialColoredShadows = mat_forward_colored_shadows(this.Gl);
this.MaterialColoredSkinned = mat_forward_colored_phong_skinned(this.Gl);
this.MaterialParticlesColored = mat_forward_particles_colored(this.Gl);
this.MaterialInstanced = mat_forward_instanced(this.Gl);
this.MeshLeaf = mesh_leaf(this.Gl);
this.MeshCube = mesh_cube(this.Gl);
this.MeshLisek = mesh_lisek(this.Gl);
this.MeshOgon = mesh_ogon(this.Gl);
this.MeshCylinder = mesh_cylinder(this.Gl);

this.LightPositions = new Float32Array(4 * 8);
this.Cameras = [];
this.Targets = {
Noop: create_depth_target(this.Gl, 2, 2),
Sun: create_depth_target(this.Gl, this.Quality, this.Quality),
};
this.CurrentScene = scene_intro;
this.CurrentView = Title;
this.PupsFound = 0;
}
FixedUpdate(delta) {

sys_control_touch_move(this, delta);
sys_control_keyboard(this);

sys_physics_integrate(this, delta);
sys_transform(this);
sys_collide(this);
sys_physics_resolve(this);
sys_transform(this);
sys_trigger(this);
}
FrameUpdate(delta) {

sys_poll(this, delta);

sys_control_always(this);

sys_animate(this, delta);
sys_move(this, delta);
sys_mimic(this);
sys_lifespan(this, delta);
sys_shake(this);
sys_spawn(this, delta);
sys_particles(this, delta);
sys_transform(this);

sys_audio_source(this, delta);
sys_resize(this);
sys_camera(this);
sys_cull(this);
sys_light(this);
sys_render_forward(this);
sys_ui(this);
}
}

function scene_level1(game) {
game.World = new World();
game.ViewportResized = true;
instantiate_player(game, [0, 0.774, 0]);
map_forest(game);
instantiate(game, [
...blueprint_camera(game, [0.4, 0.6, 0.4, 1]),
transform([0, 10, 10]),
mimic(find_first(game.World, "ca"), 0.05),
]);
}

function prop_house(game) {
return [
children([
transform([0, 1.5, 0], undefined, [3, 3, 3]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.1, 0.1, 0.1, 1]),
], [
transform([-2.25, 2, 0], undefined, [1.5, 0.1, 3]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.07, 0.15, 0.8, 1]),
], [
transform([-0.8, 0.1, 0], undefined, [4.9, 0.2, 3.4]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.1, 0.1, 0.1, 1]),
], [
transform([-2.8, 1, 0], undefined, [0.1, 2, 0.1]),
cull(32768 /* Render */),
render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.1, 0.1, 0.1, 1]),
]),
];
}

function scene_stage(game) {
game.World = new World();
game.ViewportResized = true;

let ground_size = 16;
let ground_height = 5;
instantiate(game, [
transform([0, -ground_height / 2, 0], undefined, [ground_size, ground_height, ground_size]),
...blueprint_ground(game, [0, 0, 0, 1]),
]);
let slups = 2;
for (let i = 0; i < slups; i++) {
instantiate(game, [
transform([float(-ground_size / 2, ground_size / 2), 0, float(-3, 0)], from_euler([0, 0, 0, 1], 0, float(-180, 180), 0)),
...prop_slup(game),
]);
}
let trees = 8;
for (let i = 0; i < trees; i++) {
let z = float(-8, -0.5);
instantiate(game, [
transform([float(-ground_size / 2, ground_size / 2), 0, z]),
...blueprint_tree(game),
]);
}
instantiate_player(game, [-1, 1, 1], 3);
instantiate(game, [...blueprint_box(game), transform([2.5, 6, 1])]);
instantiate(game, [...blueprint_box(game), transform([2.4, 8, 1])]);
instantiate(game, [
transform([-4, 2, -1], from_euler([0, 0, 0, 1], -10, 100, 10)),
children([transform(), shake(1), spawn(blueprint_bird, 0.5)]),
]);
instantiate(game, [
transform([-4, 0, -1], from_euler([0, 0, 0, 1], 0, -35 + 180, 0), [0.6, 0.6, 0.6]),
...prop_car2(game),
]);
instantiate(game, [
transform([20, -12, -5], from_euler([0, 0, 0, 1], 0, 90, 0), [30, 30, 30]),
render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
]);
instantiate(game, [
transform([55, -10, -5.5], from_euler([0, 0, 0, 1], 0, 90, 0), [20, 20, 20]),
render_colored_shadows(game.MaterialColoredShadows, game.MeshOgon, [0.5, 0.5, 0.5, 1]),
]);
instantiate(game, [
transform([4.4, 0, -2], from_euler([0, 0, 0, 1], 0, 12, 0), [1, 1, 1]),
children([transform(), ...prop_house(game)], [transform([0.5, 0, 1.5]), ...blueprint_bush(game)]),
]);
instantiate(game, [transform([-4, -0.3, 0.5]), ...blueprint_bush(game)]);
instantiate(game, [transform([2.5, 0.2, 3.5]), ...blueprint_bush(game)]);

instantiate(game, [...blueprint_sun_light(), transform()]);
instantiate(game, [...blueprint_sun_shadow(game), transform()]);

instantiate(game, [
...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
transform([0, 0, 0], from_euler([0, 0, 0, 1], -30, 0, 0)),
mimic(find_first(game.World, "ca"), 0.05),
]);
}

let game = new Game();


window.scenes = [scene_intro, scene_level1, scene_level2, scene_level3, scene_stage];

window.scenes[0](game);
game.Start();

window.$ = dispatch.bind(null, game);

window.game = game;

}());
