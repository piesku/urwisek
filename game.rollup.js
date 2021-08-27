(function () {
    'use strict';

    // The following defined constants and descriptions are directly ported from
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants.
    // Any copyright is dedicated to the Public Domain.
    // http://creativecommons.org/publicdomain/zero/1.0/.
    // Contributors
    // https://developer.mozilla.org/en-US/profiles/Sheppy
    // https://developer.mozilla.org/en-US/profiles/fscholz
    // https://developer.mozilla.org/en-US/profiles/AtiX
    // https://developer.mozilla.org/en-US/profiles/Sebastianz
    // WebGLRenderingContext
    // ==============
    // Clearing buffers
    // Constants passed to WebGLRenderingContext.clear() to clear buffer masks.
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
    // Rendering primitives
    // Constants passed to WebGLRenderingContext.drawElements() or WebGLRenderingContext.drawArrays() to specify what kind of primitive to render.
    /**
     * Passed to drawElements or drawArrays to draw single points.
     * @constant {number}
     */
    const GL_POINTS = 0x0000;
    /**
     * Passed to drawElements or drawArrays to draw triangles. Each set of three vertices creates a separate triangle.
     * @constant {number}
     */
    const GL_TRIANGLES = 0x0004;
    // Buffers
    // Constants passed to WebGLRenderingContext.bufferData(), WebGLRenderingContext.bufferSubData(), WebGLRenderingContext.bindBuffer(), or WebGLRenderingContext.getBufferParameter().
    /**
     * Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and not change often.
     * @constant {number}
     */
    const GL_STATIC_DRAW = 0x88e4;
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
    // Culling
    // Constants passed to WebGLRenderingContext.cullFace().
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
    // Front face directions
    // Constants passed to WebGLRenderingContext.frontFace().
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
    // Pixel formats
    /**
     * @constant {number}
     */
    const GL_DEPTH_COMPONENT = 0x1902;
    /**
     * @constant {number}
     */
    const GL_RGBA = 0x1908;
    // Shaders
    // Constants passed to WebGLRenderingContext.getShaderParameter().
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
     * A texture unit.
     * @constant {number}
     */
    const GL_TEXTURE1 = 0x84c1;
    /**
     * A texture unit.
     * @constant {number}
     */
    const GL_TEXTURE2 = 0x84c2;
    /**
     * A texture unit.
     * @constant {number}
     */
    const GL_TEXTURE3 = 0x84c3;
    /**
     * @constant {number}
     */
    const GL_CLAMP_TO_EDGE = 0x812f;
    // Framebuffers and renderbuffers
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
    // WebGL2RenderingContext
    // ==============
    const GL_UNSIGNED_SHORT = 0x1403;
    const GL_FLOAT = 0x1406;

    const update_span = document.getElementById("update");
    const delta_span = document.getElementById("delta");
    const fps_span = document.getElementById("fps");
    const step = 1 / 60;
    class GameImpl {
        constructor() {
            this.Running = 0;
            this.Now = 0;
            this.ViewportWidth = window.innerWidth;
            this.ViewportHeight = window.innerHeight;
            this.ViewportResized = true;
            // State of input during this frame.
            // 1 = down, 0 = up, or any number for analog inputs.
            this.InputState = {
                MouseX: 0,
                MouseY: 0,
            };
            // Changes of InputState that happened right before this frame.
            // 1 = pressed, -1 = released, 0 = no change.
            this.InputDelta = {
                MouseX: 0,
                MouseY: 0,
            };
            // Pixels traveled while mouse/touch was down.
            this.InputDistance = {
                Mouse: 0,
                Mouse0: 0,
                Mouse1: 0,
                Mouse2: 0,
                Touch0: 0,
                Touch1: 0,
            };
            // Map of touch ids to touch indices. In particular, Firefox assigns high
            // ints as ids. Chrome usually starts at 0, so id === index.
            this.InputTouches = {};
            this.Ui = document.querySelector("main");
            document.addEventListener("visibilitychange", () => document.hidden ? this.Stop() : this.Start());
            this.Ui.addEventListener("contextmenu", (evt) => evt.preventDefault());
            this.Ui.addEventListener("mousedown", (evt) => {
                this.InputState[`Mouse${evt.button}`] = 1;
                this.InputDelta[`Mouse${evt.button}`] = 1;
            });
            this.Ui.addEventListener("mouseup", (evt) => {
                this.InputState[`Mouse${evt.button}`] = 0;
                this.InputDelta[`Mouse${evt.button}`] = -1;
            });
            this.Ui.addEventListener("mousemove", (evt) => {
                this.InputState["MouseX"] = evt.clientX;
                this.InputState["MouseY"] = evt.clientY;
                this.InputDelta["MouseX"] = evt.movementX;
                this.InputDelta["MouseY"] = evt.movementY;
            });
            this.Ui.addEventListener("wheel", (evt) => {
                evt.preventDefault();
                this.InputDelta["WheelY"] = evt.deltaY;
            });
            this.Ui.addEventListener("touchstart", (evt) => {
                evt.preventDefault();
                if (evt.touches.length === 1) {
                    // It's a new gesture.
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
                    this.InputDelta[`Touch${index}X`] = 0;
                    this.InputDelta[`Touch${index}Y`] = 0;
                }
            });
            this.Ui.addEventListener("touchmove", (evt) => {
                evt.preventDefault();
                for (let i = 0; i < evt.changedTouches.length; i++) {
                    let touch = evt.changedTouches[i];
                    let index = this.InputTouches[touch.identifier];
                    this.InputDelta[`Touch${index}X`] =
                        touch.clientX - this.InputState[`Touch${index}X`];
                    this.InputDelta[`Touch${index}Y`] =
                        touch.clientY - this.InputState[`Touch${index}Y`];
                    this.InputState[`Touch${index}X`] = touch.clientX;
                    this.InputState[`Touch${index}Y`] = touch.clientY;
                }
            });
            this.Ui.addEventListener("touchend", (evt) => {
                evt.preventDefault();
                for (let i = 0; i < evt.changedTouches.length; i++) {
                    let touch = evt.changedTouches[i];
                    let index = this.InputTouches[touch.identifier];
                    this.InputState[`Touch${index}`] = 0;
                    this.InputDelta[`Touch${index}`] = -1;
                }
            });
            this.Ui.addEventListener("touchcancel", (evt) => {
                evt.preventDefault();
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
        }
        Start() {
            let accumulator = 0;
            let last = performance.now();
            let tick = (now) => {
                let delta = (now - last) / 1000;
                this.FrameSetup(delta);
                accumulator += delta;
                while (accumulator >= step) {
                    accumulator -= step;
                    // TODO Adjust InputDelta and InputDistance.
                    this.FixedUpdate(step);
                }
                this.FrameUpdate(delta);
                this.FrameReset(delta);
                last = now;
                this.Running = requestAnimationFrame(tick);
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
            let mouse_distance = Math.abs(this.InputDelta["MouseX"]) + Math.abs(this.InputDelta["MouseY"]);
            this.InputDistance["Mouse"] += mouse_distance;
            if (this.InputState["Mouse0"] === 1) {
                this.InputDistance["Mouse0"] += mouse_distance;
            }
            if (this.InputState["Mouse1"] === 1) {
                this.InputDistance["Mouse1"] += mouse_distance;
            }
            if (this.InputState["Mouse2"] === 1) {
                this.InputDistance["Mouse2"] += mouse_distance;
            }
            if (this.InputState["Touch0"] === 1) {
                this.InputDistance["Touch0"] +=
                    Math.abs(this.InputDelta["Touch0X"]) + Math.abs(this.InputDelta["Touch0Y"]);
            }
            if (this.InputState["Touch1"] === 1) {
                this.InputDistance["Touch1"] +=
                    Math.abs(this.InputDelta["Touch1X"]) + Math.abs(this.InputDelta["Touch1Y"]);
            }
        }
        FixedUpdate(step) { }
        FrameUpdate(delta) { }
        FrameReset(delta) {
            this.ViewportResized = false;
            if (this.InputDelta["Mouse0"] === -1) {
                this.InputDistance["Mouse0"] = 0;
            }
            if (this.InputDelta["Mouse1"] === -1) {
                this.InputDistance["Mouse1"] = 0;
            }
            if (this.InputDelta["Mouse2"] === -1) {
                this.InputDistance["Mouse2"] = 0;
            }
            if (this.InputDelta["Touch0"] === -1) {
                this.InputDistance["Touch0"] = 0;
            }
            if (this.InputDelta["Touch1"] === -1) {
                this.InputDistance["Touch1"] = 0;
            }
            for (let name in this.InputDelta) {
                this.InputDelta[name] = 0;
            }
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
    class Game3D extends GameImpl {
        constructor() {
            super();
            this.Canvas2D = document.querySelector("#billboard");
            this.Context2D = this.Canvas2D.getContext("2d");
            this.Canvas3D = document.querySelector("#scene");
            this.Gl = this.Canvas3D.getContext("webgl2");
            this.Audio = new AudioContext();
            this.Gl.enable(GL_DEPTH_TEST);
            this.Gl.enable(GL_CULL_FACE);
        }
    }
    function instantiate(game, blueprint) {
        let entity = game.World.CreateEntity();
        for (let mixin of blueprint) {
            mixin(game, entity);
        }
        return entity;
    }

    /**
     * @module components/com_children
     */
    function children(...blueprints) {
        return (game, entity) => {
            let child_entities = [];
            for (let blueprint of blueprints) {
                let child = instantiate(game, blueprint);
                child_entities.push(child);
            }
            game.World.Signature[entity] |= 32 /* Children */;
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
        if (world.Signature[parent] & 32 /* Children */) {
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
        if (world.Signature[entity] & 32 /* Children */) {
            for (let child of world.Children[entity].Children) {
                destroy_all(world, child);
            }
        }
        world.DestroyEntity(entity);
    }

    function dispatch(game, action, payload) {
        switch (action) {
            case 0 /* ToggleFullscreen */: {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                else {
                    document.body.requestFullscreen();
                }
                break;
            }
            case 1 /* CollectItem */: {
                let [item_entity] = payload;
                destroy_all(game.World, item_entity);
                game.ItemsCollected++;
                break;
            }
            case 2 /* ExpireItem */: {
                game.ItemsMissed++;
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

    let vertex$7 = `#version 300 es\n

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
    let fragment$7 = `#version 300 es\n
    precision mediump float;

    // See Game.LightPositions and Game.LightDetails.
    const int MAX_LIGHTS = 8;

    uniform vec3 eye;
    uniform vec4 diffuse_color;
    uniform vec4 specular_color;
    uniform float shininess;
    uniform vec4 light_positions[MAX_LIGHTS];
    uniform vec4 light_details[MAX_LIGHTS];
    uniform vec4 fog_color;
    uniform float fog_distance;

    in vec4 vert_position;
    in vec3 vert_normal;

    out vec4 frag_color;

    const float bands = 2.0;
    float posterize(float factor) {
        return floor(factor * bands) / bands;
    }

    void main() {
        vec3 world_normal = normalize(vert_normal);

        vec3 view_dir = eye - vert_position.xyz;
        vec3 view_normal = normalize(view_dir);

        // Ambient light.
        vec3 light_acc = diffuse_color.rgb * 0.3;

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
                vec3 light_dir = light_positions[i].xyz - vert_position.xyz;
                float light_dist = length(light_dir);
                light_normal = light_dir / light_dist;
                // Distance attenuation.
                light_intensity /= (light_dist * light_dist);
            }

            float diffuse_factor = dot(world_normal, light_normal);
            if (diffuse_factor > 0.0) {
                // Diffuse color.
                light_acc += diffuse_color.rgb * light_color * posterize(diffuse_factor * light_intensity);

                if (shininess > 0.0) {
                    // Phong reflection model.
                    // vec3 r = reflect(-light_normal, world_normal);
                    // float specular_angle = max(dot(r, view_normal), 0.0);
                    // float specular_factor = pow(specular_angle, shininess);

                    // Blinn-Phong reflection model.
                    vec3 h = normalize(light_normal + view_normal);
                    float specular_angle = max(dot(h, world_normal), 0.0);
                    float specular_factor = pow(specular_angle, shininess);

                    // Specular color.
                    light_acc += specular_color.rgb * light_color * posterize(specular_factor * light_intensity);
                }
            }
        }

        frag_color = vec4(light_acc, 1.0);

        float eye_distance = length(view_dir);
        float fog_amount = clamp(0.0, 1.0, eye_distance / fog_distance);
        frag_color = mix(frag_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
    }
`;
    function mat_forward_colored_phong(gl) {
        let program = link(gl, vertex$7, fragment$7);
        return {
            Mode: GL_TRIANGLES,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                World: gl.getUniformLocation(program, "world"),
                Self: gl.getUniformLocation(program, "self"),
                DiffuseColor: gl.getUniformLocation(program, "diffuse_color"),
                SpecularColor: gl.getUniformLocation(program, "specular_color"),
                Shininess: gl.getUniformLocation(program, "shininess"),
                Eye: gl.getUniformLocation(program, "eye"),
                LightPositions: gl.getUniformLocation(program, "light_positions"),
                LightDetails: gl.getUniformLocation(program, "light_details"),
                FogColor: gl.getUniformLocation(program, "fog_color"),
                FogDistance: gl.getUniformLocation(program, "fog_distance"),
                VertexPosition: gl.getAttribLocation(program, "attr_position"),
                VertexNormal: gl.getAttribLocation(program, "attr_normal"),
            },
        };
    }

    let vertex$6 = `#version 300 es\n
    uniform mat4 pv;
    uniform mat4 world;
    uniform mat4 self;
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
    let fragment$6 = `#version 300 es\n
    precision mediump float;

    // See Game.LightPositions and Game.LightDetails.
    const int MAX_LIGHTS = 8;

    uniform vec3 eye;
    uniform vec4 diffuse_color;
    uniform vec4 specular_color;
    uniform float shininess;
    uniform vec4 light_positions[MAX_LIGHTS];
    uniform vec4 light_details[MAX_LIGHTS];
    uniform vec4 fog_color;
    uniform float fog_distance;

    in vec4 vert_position;
    in vec3 vert_normal;

    out vec4 frag_color;

    const float bands = 2.0;
    float posterize(float factor) {
        return floor(factor * bands) / bands;
    }

    void main() {
        vec3 world_normal = normalize(vert_normal);

        vec3 view_dir = eye - vert_position.xyz;
        vec3 view_normal = normalize(view_dir);

        // Ambient light.
        vec3 light_acc = diffuse_color.rgb * 0.3;

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
                vec3 light_dir = light_positions[i].xyz - vert_position.xyz;
                float light_dist = length(light_dir);
                light_normal = light_dir / light_dist;
                // Distance attenuation.
                light_intensity /= (light_dist * light_dist);
            }

            float diffuse_factor = dot(world_normal, light_normal);
            if (diffuse_factor > 0.0) {
                // Diffuse color.
                light_acc += diffuse_color.rgb * light_color * posterize(diffuse_factor * light_intensity);

                if (shininess > 0.0) {
                    // Phong reflection model.
                    // vec3 r = reflect(-light_normal, world_normal);
                    // float specular_angle = max(dot(r, view_normal), 0.0);
                    // float specular_factor = pow(specular_angle, shininess);

                    // Blinn-Phong reflection model.
                    vec3 h = normalize(light_normal + view_normal);
                    float specular_angle = max(dot(h, world_normal), 0.0);
                    float specular_factor = pow(specular_angle, shininess);

                    // Specular color.
                    light_acc += specular_color.rgb * light_color * posterize(specular_factor * light_intensity);
                }
            }
        }

        frag_color = vec4(light_acc, 1.0);

        float eye_distance = length(view_dir);
        float fog_amount = clamp(0.0, 1.0, eye_distance / fog_distance);
        frag_color = mix(frag_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
    }
`;
    function mat_forward_colored_phong_skinned(gl) {
        let program = link(gl, vertex$6, fragment$6);
        return {
            Mode: GL_TRIANGLES,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                World: gl.getUniformLocation(program, "world"),
                Self: gl.getUniformLocation(program, "self"),
                DiffuseColor: gl.getUniformLocation(program, "diffuse_color"),
                SpecularColor: gl.getUniformLocation(program, "specular_color"),
                Shininess: gl.getUniformLocation(program, "shininess"),
                Eye: gl.getUniformLocation(program, "eye"),
                LightPositions: gl.getUniformLocation(program, "light_positions"),
                LightDetails: gl.getUniformLocation(program, "light_details"),
                VertexPosition: gl.getAttribLocation(program, "attr_position"),
                VertexNormal: gl.getAttribLocation(program, "attr_normal"),
                FogColor: gl.getUniformLocation(program, "fog_color"),
                FogDistance: gl.getUniformLocation(program, "fog_distance"),
                Bones: gl.getUniformLocation(program, "bones"),
                VertexWeights: gl.getAttribLocation(program, "attr_weights"),
            },
        };
    }

    let vertex$5 = `#version 300 es\n

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
    let fragment$5 = `#version 300 es\n
    precision mediump float;
    precision lowp sampler2DShadow;

    // See Game.LightPositions and Game.LightDetails.
    const int MAX_LIGHTS = 8;

    uniform vec3 eye;
    uniform vec4 diffuse_color;
    uniform vec4 specular_color;
    uniform float shininess;
    uniform vec4 light_positions[MAX_LIGHTS];
    uniform vec4 light_details[MAX_LIGHTS];
    uniform mat4 shadow_space;
    uniform sampler2DShadow shadow_map;
    uniform vec4 fog_color;
    uniform float fog_distance;

    in vec4 vert_position;
    in vec3 vert_normal;

    out vec4 frag_color;

    // How much shadow to apply at world_pos, expressed as [min, 1]:
    // min = completely in shadow, 1 = completely not in shadow
    float shadow_factor(vec4 world_pos, float min) {
        vec4 shadow_space_pos = shadow_space * world_pos;
        vec3 shadow_space_ndc = shadow_space_pos.xyz / shadow_space_pos.w;
        // Transform the [-1, 1] NDC to [0, 1] to match the shadow texture data.
        shadow_space_ndc = shadow_space_ndc * 0.5 + 0.5;

        // Add shadow bias to avoid shadow acne.
        shadow_space_ndc.z -= 0.001;

        return texture(shadow_map, shadow_space_ndc) * (1.0 - min) + min;
    }

    void main() {
        vec3 world_normal = normalize(vert_normal);

        vec3 view_dir = eye - vert_position.xyz;
        vec3 view_normal = normalize(view_dir);

        // Ambient light.
        vec3 light_acc = diffuse_color.rgb * 0.1;

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
                vec3 light_dir = light_positions[i].xyz - vert_position.xyz;
                float light_dist = length(light_dir);
                light_normal = light_dir / light_dist;
                // Distance attenuation.
                light_intensity /= (light_dist * light_dist);
            }

            float diffuse_factor = dot(world_normal, light_normal);
            if (diffuse_factor > 0.0) {
                // Diffuse color.
                light_acc += diffuse_color.rgb * diffuse_factor * light_color * light_intensity;

                if (shininess > 0.0) {
                    // Phong reflection model.
                    // vec3 r = reflect(-light_normal, world_normal);
                    // float specular_angle = max(dot(r, view_normal), 0.0);
                    // float specular_factor = pow(specular_angle, shininess);

                    // Blinn-Phong reflection model.
                    vec3 h = normalize(light_normal + view_normal);
                    float specular_angle = max(dot(h, world_normal), 0.0);
                    float specular_factor = pow(specular_angle, shininess);

                    // Specular color.
                    light_acc += specular_color.rgb * specular_factor * light_color * light_intensity;
                }
            }
        }

        vec3 shaded_rgb = light_acc * shadow_factor(vert_position, 0.5);
        frag_color= vec4(shaded_rgb, 1.0);

        float eye_distance = length(view_dir);
        float fog_amount = clamp(0.0, 1.0, eye_distance / fog_distance);
        frag_color = mix(frag_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
    }
`;
    function mat_forward_colored_shadows(gl) {
        let program = link(gl, vertex$5, fragment$5);
        return {
            Mode: GL_TRIANGLES,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                World: gl.getUniformLocation(program, "world"),
                Self: gl.getUniformLocation(program, "self"),
                DiffuseColor: gl.getUniformLocation(program, "diffuse_color"),
                SpecularColor: gl.getUniformLocation(program, "specular_color"),
                Shininess: gl.getUniformLocation(program, "shininess"),
                Eye: gl.getUniformLocation(program, "eye"),
                LightPositions: gl.getUniformLocation(program, "light_positions"),
                LightDetails: gl.getUniformLocation(program, "light_details"),
                ShadowSpace: gl.getUniformLocation(program, "shadow_space"),
                ShadowMap: gl.getUniformLocation(program, "shadow_map"),
                FogColor: gl.getUniformLocation(program, "fog_color"),
                FogDistance: gl.getUniformLocation(program, "fog_distance"),
                VertexPosition: gl.getAttribLocation(program, "attr_position"),
                VertexNormal: gl.getAttribLocation(program, "attr_normal"),
            },
        };
    }

    let vertex$4 = `#version 300 es\n

    uniform mat4 pv;
    uniform mat4 world;

    in vec3 attr_position;

    void main() {
        gl_Position = pv * world * vec4(attr_position, 1.0);
    }
`;
    let fragment$4 = `#version 300 es\n
    precision mediump float;

    out vec4 frag_color;

    void main() {
        // Visualization only. Actual z is saved in the depth buffer.
        float z = gl_FragCoord.z * 10.0;
        frag_color = vec4(z, z, z, 1.0);
    }
`;
    function mat_forward_depth(gl) {
        let program = link(gl, vertex$4, fragment$4);
        return {
            Mode: GL_TRIANGLES,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                World: gl.getUniformLocation(program, "world"),
                VertexPosition: gl.getAttribLocation(program, "attr_position"),
            },
        };
    }

    let vertex$3 = `#version 300 es\n

    uniform mat4 pv;
    uniform mat4 world;

    in vec3 attr_position;
    in vec4 attr_offset;
    in vec4 attr_rotation;

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
        gl_Position = pv * world_position;
    }
`;
    let fragment$3 = `#version 300 es\n
    precision mediump float;

    out vec4 frag_color;

    void main() {
        // Visualization only. Actual z is saved in the depth buffer.
        float z = gl_FragCoord.z * 10.0;
        frag_color = vec4(z, z, z, 1.0);
    }
`;
    function mat_forward_depth_instanced(gl) {
        let program = link(gl, vertex$3, fragment$3);
        return {
            Mode: GL_TRIANGLES,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                World: gl.getUniformLocation(program, "world"),
                VertexPosition: gl.getAttribLocation(program, "attr_position"),
                InstanceOffset: gl.getAttribLocation(program, "attr_offset"),
                InstanceRotation: gl.getAttribLocation(program, "attr_rotation"),
            },
        };
    }

    let vertex$2 = `#version 300 es\n
    // See Game.LightPositions and Game.LightDetails.
    const int MAX_LIGHTS = 8;

    uniform mat4 pv;
    uniform mat4 world;
    uniform mat4 self;
    uniform vec3 palette[16];

    uniform int light_count;
    uniform vec4 light_positions[MAX_LIGHTS];
    uniform vec4 light_details[MAX_LIGHTS];

    uniform vec3 eye;
    uniform vec4 fog_color;
    uniform float fog_distance;

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

        float eye_distance = length(eye - world_position.xyz);
        float fog_amount = clamp(0.0, 1.0, eye_distance / fog_distance);
        vert_color = mix(vert_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
    }

`;
    let fragment$2 = `#version 300 es\n
    precision mediump float;
    in vec4 vert_color;
    out vec4 frag_color;

    void main() {
        frag_color = vert_color;
    }

`;
    function mat_forward_instanced(gl) {
        let program = link(gl, vertex$2, fragment$2);
        return {
            Mode: GL_TRIANGLES,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                World: gl.getUniformLocation(program, "world"),
                Self: gl.getUniformLocation(program, "self"),
                Palette: gl.getUniformLocation(program, "palette"),
                Eye: gl.getUniformLocation(program, "eye"),
                LightPositions: gl.getUniformLocation(program, "light_positions"),
                LightDetails: gl.getUniformLocation(program, "light_details"),
                FogColor: gl.getUniformLocation(program, "fog_color"),
                FogDistance: gl.getUniformLocation(program, "fog_distance"),
                VertexPosition: gl.getAttribLocation(program, "attr_position"),
                VertexNormal: gl.getAttribLocation(program, "attr_normal"),
                InstanceOffset: gl.getAttribLocation(program, "attr_offset"),
                InstanceRotation: gl.getAttribLocation(program, "attr_rotation"),
            },
        };
    }

    let vertex$1 = `#version 300 es\n
    uniform mat4 pv;
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
        gl_Position = pv * vec4(attr_origin_age.xyz + velocity * attr_origin_age.w, 1.0);

        // Interpolate color and size.
        float t = attr_origin_age.w / details.x;
        gl_PointSize = mix(details.z, details.w, t);
        vert_color = mix(color_start, color_end, t);
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
    function mat_forward_particles_colored(gl) {
        let program = link(gl, vertex$1, fragment$1);
        return {
            Mode: GL_POINTS,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                ColorStart: gl.getUniformLocation(program, "color_start"),
                ColorEnd: gl.getUniformLocation(program, "color_end"),
                Details: gl.getUniformLocation(program, "details"),
                OriginAge: gl.getAttribLocation(program, "attr_origin_age"),
                Direction: gl.getAttribLocation(program, "attr_direction"),
            },
        };
    }

    let vertex = `#version 300 es\n
    uniform mat4 pv;
    uniform vec4 color_start;
    uniform vec4 color_end;
    // [x: lifespan, y: speed, z: size_start, w: size_end];
    uniform vec4 details;

    // [x, y, z, w: age]
    in vec4 attr_origin_age;
    // [x, y, z, w: seed]
    in vec4 attr_direction_seed;

    out vec4 vert_color;
    out float vert_rand;

    void main() {
        // Move the particle along the direction axis.
        vec3 velocity = attr_direction_seed.xyz * details.y;
        gl_Position = pv * vec4(attr_origin_age.xyz + velocity * attr_origin_age.w, 1.0);

        // Interpolate color and size.
        float t = attr_origin_age.w / details.x;
        gl_PointSize = mix(details.z, details.w, t);
        vert_color = mix(color_start, color_end, t);

        // Random seed to pick the sprite.
        vert_rand = 3.14 * t + attr_direction_seed.w;
    }
`;
    let fragment = `#version 300 es\n
    precision mediump float;

    uniform sampler2D texture_map;

    in vec4 vert_color;
    in float vert_rand;

    out vec4 frag_color;

    void main() {
        // Add -1, 0, or 1 to each component of the point coord vector.
        vec2 uv = gl_PointCoord + floor(vec2(cos(vert_rand) + 0.5, sin(vert_rand) + 0.5));
        frag_color = vert_color * texture(texture_map, uv / 2.0);
    }
`;
    function mat_forward_particles_textured(gl) {
        let program = link(gl, vertex, fragment);
        return {
            Mode: GL_POINTS,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                TextureMap: gl.getUniformLocation(program, "texture_map"),
                ColorStart: gl.getUniformLocation(program, "color_start"),
                ColorEnd: gl.getUniformLocation(program, "color_end"),
                Details: gl.getUniformLocation(program, "details"),
                OriginAge: gl.getAttribLocation(program, "attr_origin_age"),
                DirectionSeed: gl.getAttribLocation(program, "attr_direction_seed"),
            },
        };
    }

    function mesh_cube(gl) {
        let vertex_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
        gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$6, GL_STATIC_DRAW);
        let normal_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
        gl.bufferData(GL_ARRAY_BUFFER, normal_arr$6, GL_STATIC_DRAW);
        let texcoord_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
        gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr$6, GL_STATIC_DRAW);
        let weights_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
        gl.bufferData(GL_ARRAY_BUFFER, weights_arr$6, GL_STATIC_DRAW);
        let index_buf = gl.createBuffer();
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$6, GL_STATIC_DRAW);
        return {
            VertexBuffer: vertex_buf,
            VertexArray: vertex_arr$6,
            NormalBuffer: normal_buf,
            NormalArray: normal_arr$6,
            TexCoordBuffer: texcoord_buf,
            TexCoordArray: texcoord_arr$6,
            WeightsBuffer: weights_buf,
            WeightsArray: weights_arr$6,
            IndexBuffer: index_buf,
            IndexArray: index_arr$6,
            IndexCount: index_arr$6.length,
        };
    }
    // prettier-ignore
    let vertex_arr$6 = Float32Array.from([
        -0.500, -0.500, 0.500,
        -0.500, -0.500, 0.500,
        -0.500, -0.500, 0.500,
        -0.500, 0.500, 0.500,
        -0.500, 0.500, 0.500,
        -0.500, 0.500, 0.500,
        -0.500, -0.500, -0.500,
        -0.500, -0.500, -0.500,
        -0.500, -0.500, -0.500,
        -0.500, 0.500, -0.500,
        -0.500, 0.500, -0.500,
        -0.500, 0.500, -0.500,
        0.500, -0.500, 0.500,
        0.500, -0.500, 0.500,
        0.500, -0.500, 0.500,
        0.500, 0.500, 0.500,
        0.500, 0.500, 0.500,
        0.500, 0.500, 0.500,
        0.500, -0.500, -0.500,
        0.500, -0.500, -0.500,
        0.500, -0.500, -0.500,
        0.500, 0.500, -0.500,
        0.500, 0.500, -0.500,
        0.500, 0.500, -0.500
    ]);
    // prettier-ignore
    let normal_arr$6 = Float32Array.from([
        -1.000, 0.000, 0.000,
        0.000, -1.000, 0.000,
        0.000, 0.000, 1.000,
        -1.000, 0.000, 0.000,
        0.000, 0.000, 1.000,
        0.000, 1.000, 0.000,
        -1.000, 0.000, 0.000,
        0.000, -1.000, 0.000,
        0.000, 0.000, -1.000,
        -1.000, 0.000, 0.000,
        0.000, 0.000, -1.000,
        0.000, 1.000, 0.000,
        0.000, -1.000, 0.000,
        0.000, 0.000, 1.000,
        1.000, 0.000, 0.000,
        0.000, 0.000, 1.000,
        0.000, 1.000, 0.000,
        1.000, 0.000, 0.000,
        0.000, -1.000, 0.000,
        0.000, 0.000, -1.000,
        1.000, 0.000, 0.000,
        0.000, 0.000, -1.000,
        0.000, 1.000, 0.000,
        1.000, 0.000, 0.000
    ]);
    // prettier-ignore
    let texcoord_arr$6 = Float32Array.from([]);
    // prettier-ignore
    let weights_arr$6 = Float32Array.from([]);
    // prettier-ignore
    let index_arr$6 = Uint16Array.from([
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
        gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$5, GL_STATIC_DRAW);
        let normal_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
        gl.bufferData(GL_ARRAY_BUFFER, normal_arr$5, GL_STATIC_DRAW);
        let texcoord_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
        gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr$5, GL_STATIC_DRAW);
        let weights_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
        gl.bufferData(GL_ARRAY_BUFFER, weights_arr$5, GL_STATIC_DRAW);
        let index_buf = gl.createBuffer();
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$5, GL_STATIC_DRAW);
        return {
            VertexBuffer: vertex_buf,
            VertexArray: vertex_arr$5,
            NormalBuffer: normal_buf,
            NormalArray: normal_arr$5,
            TexCoordBuffer: texcoord_buf,
            TexCoordArray: texcoord_arr$5,
            WeightsBuffer: weights_buf,
            WeightsArray: weights_arr$5,
            IndexBuffer: index_buf,
            IndexArray: index_arr$5,
            IndexCount: index_arr$5.length,
        };
    }
    // prettier-ignore
    let vertex_arr$5 = Float32Array.from([
        0.000, -0.250, -0.250,
        0.000, 0.250, -0.250,
        0.177, -0.250, -0.177,
        0.177, 0.250, -0.177,
        0.250, -0.250, 0.000,
        0.250, 0.250, 0.000,
        0.177, -0.250, 0.177,
        0.177, 0.250, 0.177,
        -0.000, -0.250, 0.250,
        -0.000, 0.250, 0.250,
        -0.177, -0.250, 0.177,
        -0.177, 0.250, 0.177,
        -0.250, -0.250, -0.000,
        -0.250, 0.250, -0.000,
        -0.177, -0.250, -0.177,
        -0.177, 0.250, -0.177
    ]);
    // prettier-ignore
    let normal_arr$5 = Float32Array.from([
        0.000, -0.630, -0.776,
        0.000, 0.630, -0.776,
        0.549, -0.630, -0.549,
        0.549, 0.630, -0.549,
        0.776, -0.630, 0.000,
        0.776, 0.630, 0.000,
        0.549, -0.630, 0.549,
        0.549, 0.630, 0.549,
        0.000, -0.630, 0.776,
        0.000, 0.630, 0.776,
        -0.549, -0.630, 0.549,
        -0.549, 0.630, 0.549,
        -0.776, -0.630, 0.000,
        -0.776, 0.630, 0.000,
        -0.549, -0.630, -0.549,
        -0.549, 0.630, -0.549
    ]);
    // prettier-ignore
    let texcoord_arr$5 = Float32Array.from([]);
    // prettier-ignore
    let weights_arr$5 = Float32Array.from([]);
    // prettier-ignore
    let index_arr$5 = Uint16Array.from([
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

    function mesh_grass(gl) {
        let vertex_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
        gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$4, GL_STATIC_DRAW);
        let normal_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
        gl.bufferData(GL_ARRAY_BUFFER, normal_arr$4, GL_STATIC_DRAW);
        let texcoord_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
        gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr$4, GL_STATIC_DRAW);
        let weights_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
        gl.bufferData(GL_ARRAY_BUFFER, weights_arr$4, GL_STATIC_DRAW);
        let index_buf = gl.createBuffer();
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$4, GL_STATIC_DRAW);
        return {
            VertexBuffer: vertex_buf,
            VertexArray: vertex_arr$4,
            NormalBuffer: normal_buf,
            NormalArray: normal_arr$4,
            TexCoordBuffer: texcoord_buf,
            TexCoordArray: texcoord_arr$4,
            WeightsBuffer: weights_buf,
            WeightsArray: weights_arr$4,
            IndexBuffer: index_buf,
            IndexArray: index_arr$4,
            IndexCount: index_arr$4.length,
        };
    }
    // prettier-ignore
    let vertex_arr$4 = Float32Array.from([
        -0.009, 0.009, 0.001,
        0.000, -0.422, 0.012,
        0.000, 0.405, 0.119,
        0.008, 0.008, 0.001
    ]);
    // prettier-ignore
    let normal_arr$4 = Float32Array.from([
        -0.001, -0.138, 0.990,
        0.010, 0.025, 1.000,
        -0.010, -0.285, 0.959,
        0.000, -0.125, 0.992
    ]);
    // prettier-ignore
    let texcoord_arr$4 = Float32Array.from([]);
    // prettier-ignore
    let weights_arr$4 = Float32Array.from([]);
    // prettier-ignore
    let index_arr$4 = Uint16Array.from([
        3, 1, 0,
        2, 3, 0
    ]);

    function mesh_leaf(gl) {
        let vertex_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
        gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$3, GL_STATIC_DRAW);
        let normal_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
        gl.bufferData(GL_ARRAY_BUFFER, normal_arr$3, GL_STATIC_DRAW);
        let texcoord_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
        gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr$3, GL_STATIC_DRAW);
        let weights_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
        gl.bufferData(GL_ARRAY_BUFFER, weights_arr$3, GL_STATIC_DRAW);
        let index_buf = gl.createBuffer();
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$3, GL_STATIC_DRAW);
        return {
            VertexBuffer: vertex_buf,
            VertexArray: vertex_arr$3,
            NormalBuffer: normal_buf,
            NormalArray: normal_arr$3,
            TexCoordBuffer: texcoord_buf,
            TexCoordArray: texcoord_arr$3,
            WeightsBuffer: weights_buf,
            WeightsArray: weights_arr$3,
            IndexBuffer: index_buf,
            IndexArray: index_arr$3,
            IndexCount: index_arr$3.length,
        };
    }
    // prettier-ignore
    let vertex_arr$3 = Float32Array.from([
        0.040103, 0, 0.044704,
        -0.054562, 0, -0.050619,
        -0.124883, 0.01643, 0.126198,
        0.040103, 0, 0.044704,
        0.12554, 0.021688, -0.126198,
        -0.054562, 0, -0.050619
    ]);
    // prettier-ignore
    let normal_arr$3 = Float32Array.from([
        0.0665, 0.9956, -0.0661,
        0.0665, 0.9956, -0.0661,
        0.0665, 0.9956, -0.0661,
        -0.0844, 0.9929, 0.0838,
        -0.0844, 0.9929, 0.0838,
        -0.0844, 0.9929, 0.0838
    ]);
    // prettier-ignore
    let texcoord_arr$3 = Float32Array.from([
        1, 0,
        0, 1,
        0, 0,
        1, 0,
        1, 1,
        0, 1
    ]);
    // prettier-ignore
    let weights_arr$3 = Float32Array.from([
    // Weights must be assigned manually for now b/c OBJ doesn't support them.
    // WARNING: Remaking the mesh file will overwrite your weights here.
    ]);
    // prettier-ignore
    let index_arr$3 = Uint16Array.from([
        5, 4, 3,
        2, 1, 0
    ]);

    function mesh_lisek(gl) {
        let vertex_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
        gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$2, GL_STATIC_DRAW);
        let normal_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
        gl.bufferData(GL_ARRAY_BUFFER, normal_arr$2, GL_STATIC_DRAW);
        let texcoord_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
        gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr$2, GL_STATIC_DRAW);
        let weights_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
        gl.bufferData(GL_ARRAY_BUFFER, weights_arr$2, GL_STATIC_DRAW);
        let index_buf = gl.createBuffer();
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$2, GL_STATIC_DRAW);
        return {
            VertexBuffer: vertex_buf,
            VertexArray: vertex_arr$2,
            NormalBuffer: normal_buf,
            NormalArray: normal_arr$2,
            TexCoordBuffer: texcoord_buf,
            TexCoordArray: texcoord_arr$2,
            WeightsBuffer: weights_buf,
            WeightsArray: weights_arr$2,
            IndexBuffer: index_buf,
            IndexArray: index_arr$2,
            IndexCount: index_arr$2.length,
        };
    }
    // prettier-ignore
    let vertex_arr$2 = Float32Array.from([
        0.147, 0.440, 0.021,
        0.073, -0.000, -0.008,
        0.132, 0.234, -0.280,
        0.088, 0.409, -0.550,
        0.073, -0.001, -0.521,
        0.103, 0.688, 0.168,
        0.176, 0.893, 0.080,
        -0.147, 0.440, 0.021,
        0.000, 0.482, -0.037,
        0.000, 0.219, -0.012,
        -0.073, -0.000, -0.008,
        -0.132, 0.234, -0.280,
        0.000, 0.219, -0.530,
        -0.088, 0.409, -0.550,
        0.000, 0.432, -0.585,
        -0.073, -0.001, -0.521,
        -0.103, 0.688, 0.168,
        0.000, 0.571, 0.373,
        -0.176, 0.893, 0.080,
        0.000, 0.746, 0.168
    ]);
    // prettier-ignore
    let normal_arr$2 = Float32Array.from([
        0.997, 0.009, 0.083,
        -0.007, -0.962, 0.275,
        0.797, -0.599, -0.074,
        0.688, 0.428, -0.586,
        0.035, -0.971, -0.235,
        0.726, 0.191, 0.661,
        0.417, 0.903, -0.104,
        -0.997, 0.009, 0.083,
        0.000, 0.785, -0.620,
        0.000, -0.590, 0.807,
        0.007, -0.962, 0.275,
        -0.797, -0.599, -0.074,
        0.000, -0.472, -0.882,
        -0.688, 0.428, -0.586,
        0.000, 0.571, -0.821,
        -0.035, -0.971, -0.235,
        -0.726, 0.191, 0.661,
        0.000, -0.039, 0.999,
        -0.417, 0.903, -0.104,
        0.000, 0.932, 0.363
    ]);
    // prettier-ignore
    let texcoord_arr$2 = Float32Array.from([]);
    // prettier-ignore
    let weights_arr$2 = Float32Array.from([
        2.000, 0.918, 1.000, 0.082,
        2.000, 1.000, 0.000, 0.000,
        4.000, 0.500, 2.000, 0.500,
        4.000, 0.907, 0.000, 0.093,
        4.000, 1.000, 0.000, 0.000,
        1.000, 0.893, 2.000, 0.107,
        1.000, 1.000, 0.000, 0.000,
        3.000, 0.918, 1.000, 0.082,
        1.000, 1.000, 0.000, 0.000,
        2.000, 0.500, 3.000, 0.500,
        3.000, 1.000, 0.000, 0.000,
        5.000, 0.500, 3.000, 0.500,
        0.000, 1.000, 0.000, 0.000,
        5.000, 0.907, 0.000, 0.093,
        0.000, 1.000, 0.000, 0.000,
        5.000, 1.000, 0.000, 0.000,
        1.000, 0.893, 3.000, 0.107,
        1.000, 1.000, 0.000, 0.000,
        1.000, 1.000, 0.000, 0.000,
        1.000, 1.000, 0.000, 0.000
    ]);
    // prettier-ignore
    let index_arr$2 = Uint16Array.from([
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
    1.000, 0.000, 0.000, 0.000, 0.000, 0.096, -0.995, 0.000, 0.000, 0.995, 0.096, 0.000, 0.000, 0.433, 0.395, 1.000
    1.000, 0.000, 0.000, 0.000, 0.000, 0.795, -0.606, 0.000, 0.000, 0.606, 0.795, 0.000, 0.000, -0.306, 0.251, 1.000
    1.000, 0.000, 0.000, 0.000, 0.000, -1.000, 0.000, 0.000, 0.000, -0.000, -1.000, 0.000, -0.073, 0.395, -0.015, 1.000
    1.000, 0.000, 0.000, 0.000, 0.000, -1.000, 0.000, 0.000, 0.000, -0.000, -1.000, 0.000, 0.073, 0.395, -0.015, 1.000
    1.000, 0.000, 0.000, 0.000, 0.000, -0.992, 0.124, 0.000, 0.000, -0.124, -0.992, 0.000, -0.073, 0.291, -0.509, 1.000
    1.000, 0.000, 0.000, 0.000, 0.000, -0.992, 0.124, 0.000, 0.000, -0.124, -0.992, 0.000, 0.073, 0.291, -0.509, 1.000
    */

    function mesh_ogon(gl) {
        let vertex_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
        gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$1, GL_STATIC_DRAW);
        let normal_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
        gl.bufferData(GL_ARRAY_BUFFER, normal_arr$1, GL_STATIC_DRAW);
        let texcoord_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
        gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr$1, GL_STATIC_DRAW);
        let weights_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
        gl.bufferData(GL_ARRAY_BUFFER, weights_arr$1, GL_STATIC_DRAW);
        let index_buf = gl.createBuffer();
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$1, GL_STATIC_DRAW);
        return {
            VertexBuffer: vertex_buf,
            VertexArray: vertex_arr$1,
            NormalBuffer: normal_buf,
            NormalArray: normal_arr$1,
            TexCoordBuffer: texcoord_buf,
            TexCoordArray: texcoord_arr$1,
            WeightsBuffer: weights_buf,
            WeightsArray: weights_arr$1,
            IndexBuffer: index_buf,
            IndexArray: index_arr$1,
            IndexCount: index_arr$1.length,
        };
    }
    // prettier-ignore
    let vertex_arr$1 = Float32Array.from([
        -0.111, 0.575, -0.859,
        -0.000, 0.384, -0.481,
        -0.000, 0.251, -0.862,
        0.131, 0.518, -0.819,
        -0.152, 0.634, -1.248,
        -0.008, 0.196, -1.300,
        0.216, 0.518, -1.191,
        -0.247, 0.793, -1.762,
        -0.000, 0.141, -1.608,
        0.242, 0.549, -1.756,
        -0.208, 0.738, -2.194,
        -0.000, 0.234, -2.101,
        0.167, 0.495, -2.202,
        -0.076, 0.650, -2.622,
        -0.000, 0.376, -2.482,
        0.137, 0.502, -2.539,
        -0.038, 0.426, -2.917
    ]);
    // prettier-ignore
    let normal_arr$1 = Float32Array.from([
        -0.701, 0.652, 0.289,
        -0.030, -0.161, 0.986,
        -0.097, -0.964, 0.248,
        0.848, 0.425, 0.317,
        -0.708, 0.678, 0.198,
        -0.131, -0.980, 0.148,
        0.940, 0.301, 0.159,
        -0.662, 0.749, -0.020,
        -0.089, -0.996, 0.005,
        0.956, 0.294, -0.017,
        -0.643, 0.705, -0.298,
        -0.110, -0.970, -0.215,
        0.976, 0.155, -0.154,
        -0.456, 0.779, -0.431,
        -0.203, -0.949, -0.242,
        0.966, 0.102, -0.237,
        -0.139, -0.245, -0.960
    ]);
    // prettier-ignore
    let texcoord_arr$1 = Float32Array.from([]);
    // prettier-ignore
    let weights_arr$1 = Float32Array.from([
        0.000, 0.933, 1.000, 0.067,
        0.000, 1.000, 0.000, 0.000,
        0.000, 0.946, 1.000, 0.054,
        0.000, 0.953, 1.000, 0.047,
        1.000, 0.942, 2.000, 0.058,
        1.000, 0.877, 2.000, 0.123,
        1.000, 0.970, 2.000, 0.030,
        2.000, 0.858, 3.000, 0.142,
        2.000, 0.911, 3.000, 0.089,
        2.000, 0.932, 3.000, 0.068,
        3.000, 0.917, 4.000, 0.083,
        3.000, 0.937, 4.000, 0.063,
        3.000, 0.945, 4.000, 0.055,
        4.000, 0.983, 3.000, 0.017,
        4.000, 0.917, 3.000, 0.083,
        4.000, 0.956, 3.000, 0.044,
        4.000, 1.000, 0.000, 0.000
    ]);
    // prettier-ignore
    let index_arr$1 = Uint16Array.from([
        16, 15, 13,
        16, 14, 15,
        16, 13, 14,
        13, 15, 10,
        15, 12, 10,
        15, 14, 12,
        14, 11, 12,
        14, 13, 11,
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
    1.000, -0.000, -0.000, 0.000, 0.000, 0.000, 1.000, 0.000, 0.000, -1.000, 0.000, 0.000, -0.000, -0.701, -0.428, 1.000
    1.000, -0.000, -0.000, 0.000, 0.000, 0.132, 0.991, 0.000, 0.000, -0.991, 0.132, 0.000, -0.000, -1.100, -0.285, 1.000
    1.000, -0.000, -0.000, 0.000, 0.000, 0.000, 1.000, 0.000, 0.000, -1.000, 0.000, 0.000, -0.000, -1.492, -0.487, 1.000
    -1.000, -0.000, -0.000, 0.000, 0.000, 0.137, -0.991, 0.000, 0.000, -0.991, -0.137, 0.000, -0.000, -2.009, 0.214, 1.000
    -1.000, 0.000, -0.000, 0.000, 0.000, -0.204, -0.979, 0.000, -0.000, -0.979, 0.204, 0.000, -0.000, -2.224, 1.021, 1.000
    */

    function mesh_plane(gl) {
        let vertex_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
        gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);
        let normal_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
        gl.bufferData(GL_ARRAY_BUFFER, normal_arr, GL_STATIC_DRAW);
        let texcoord_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
        gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr, GL_STATIC_DRAW);
        let weights_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
        gl.bufferData(GL_ARRAY_BUFFER, weights_arr, GL_STATIC_DRAW);
        let index_buf = gl.createBuffer();
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr, GL_STATIC_DRAW);
        return {
            VertexBuffer: vertex_buf,
            VertexArray: vertex_arr,
            NormalBuffer: normal_buf,
            NormalArray: normal_arr,
            TexCoordBuffer: texcoord_buf,
            TexCoordArray: texcoord_arr,
            WeightsBuffer: weights_buf,
            WeightsArray: weights_arr,
            IndexBuffer: index_buf,
            IndexArray: index_arr,
            IndexCount: index_arr.length,
        };
    }
    // prettier-ignore
    let vertex_arr = Float32Array.from([
        -0.500, 0.000, 0.500,
        0.500, 0.000, 0.500,
        -0.500, 0.000, -0.500,
        0.500, 0.000, -0.500
    ]);
    // prettier-ignore
    let normal_arr = Float32Array.from([
        0.000, 1.000, 0.000,
        0.000, 1.000, 0.000,
        0.000, 1.000, 0.000,
        0.000, 1.000, 0.000
    ]);
    // prettier-ignore
    let texcoord_arr = Float32Array.from([]);
    // prettier-ignore
    let weights_arr = Float32Array.from([]);
    // prettier-ignore
    let index_arr = Uint16Array.from([
        2, 3, 0,
        3, 1, 0
    ]);

    const EPSILON = 0.000001;
    const DEG_TO_RAD = Math.PI / 180;

    function clamp(min, max, num) {
        return Math.max(min, Math.min(max, num));
    }

    function create() {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
    function copy$1(out, a) {
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
        let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]; // Cache only the current line of the second matrix
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
        // Quaternion math
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
    function get_up(out, mat) {
        out[0] = mat[4];
        out[1] = mat[5];
        out[2] = mat[6];
        return normalize(out, out);
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
    function get_scaling(out, mat) {
        let m11 = mat[0];
        let m12 = mat[1];
        let m13 = mat[2];
        let m21 = mat[4];
        let m22 = mat[5];
        let m23 = mat[6];
        let m31 = mat[8];
        let m32 = mat[9];
        let m33 = mat[10];
        out[0] = Math.hypot(m11, m12, m13);
        out[1] = Math.hypot(m21, m22, m23);
        out[2] = Math.hypot(m31, m32, m33);
        return out;
    }
    function get_rotation(out, mat) {
        let scaling = get_scaling([0, 0, 0], mat);
        let is1 = 1 / scaling[0];
        let is2 = 1 / scaling[1];
        let is3 = 1 / scaling[2];
        let sm11 = mat[0] * is1;
        let sm12 = mat[1] * is2;
        let sm13 = mat[2] * is3;
        let sm21 = mat[4] * is1;
        let sm22 = mat[5] * is2;
        let sm23 = mat[6] * is3;
        let sm31 = mat[8] * is1;
        let sm32 = mat[9] * is2;
        let sm33 = mat[10] * is3;
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
    function copy(out, a) {
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
        // benchmarks:
        //    http://jsperf.com/quaternion-slerp-implementations
        let ax = a[0], ay = a[1], az = a[2], aw = a[3];
        let bx = b[0], by = b[1], bz = b[2], bw = b[3];
        let omega, cosom, sinom, scale0, scale1;
        // calc cosine
        cosom = ax * bx + ay * by + az * bz + aw * bw;
        // adjust signs (if necessary)
        if (cosom < 0.0) {
            cosom = -cosom;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }
        // calculate coefficients
        if (1.0 - cosom > EPSILON) {
            // standard case (slerp)
            omega = Math.acos(cosom);
            sinom = Math.sin(omega);
            scale0 = Math.sin((1.0 - t) * omega) / sinom;
            scale1 = Math.sin(t * omega) / sinom;
        }
        else {
            // "from" and "to" quaternions are very close
            //  ... so we can do a linear interpolation
            scale0 = 1.0 - t;
            scale1 = t;
        }
        // calculate final values
        out[0] = scale0 * ax + scale1 * bx;
        out[1] = scale0 * ay + scale1 * by;
        out[2] = scale0 * az + scale1 * bz;
        out[3] = scale0 * aw + scale1 * bw;
        return out;
    }

    /**
     * @module systems/sys_animate
     */
    const QUERY$q = 8388608 /* Transform */ | 1 /* Animate */;
    function sys_animate(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$q) === QUERY$q) {
                update$i(game, i, delta);
            }
        }
    }
    function update$i(game, entity, delta) {
        let transform = game.World.Transform[entity];
        let animate = game.World.Animate[entity];
        // 1. Switch to the trigger if the clip has completed or early exits are allowed.
        if (animate.Trigger) {
            let next = animate.States[animate.Trigger];
            if (next && next !== animate.Current) {
                if (animate.Current.Time === 0) {
                    // If the current clip has completed last frame, switch to the trigger.
                    animate.Current = next;
                }
                else if (animate.Current.Flags & 1 /* EarlyExit */) {
                    // If the current clip allows early exits, reset its timer so
                    // that the next time it plays it starts from the beginning,
                    // and then switch to the trigger.
                    animate.Current.Time = 0;
                    animate.Current = next;
                }
            }
            animate.Trigger = undefined;
        }
        // 2. Find the current and the next keyframe.
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
        // 3. Interpolate transform properties between keyframes.
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
            if (current_keyframe.Scale && next_keyframe.Scale) {
                lerp(transform.Scale, current_keyframe.Scale, next_keyframe.Scale, interpolant);
                transform.Dirty = true;
            }
        }
        // 4. Check if the animation is still running.
        let new_time = animate.Current.Time + delta;
        if (new_time < animate.Current.Duration) {
            // The animation isn't done yet; continue.
            animate.Current.Time = new_time;
            return;
        }
        else {
            // The animation has completed; reset its timer.
            animate.Current.Time = 0;
        }
        // 5. The animation has completed. Loop it or switch to idle.
        if (animate.Current.Flags & 4 /* Alternate */) {
            // Reverse the keyframes of the clip and recalculate their timestamps.
            for (let keyframe of animate.Current.Keyframes.reverse()) {
                keyframe.Timestamp = animate.Current.Duration - keyframe.Timestamp;
            }
        }
        if (!(animate.Current.Flags & 2 /* Loop */)) {
            animate.Current = animate.States["idle"];
        }
    }

    /**
     * @module systems/sys_audio_listener
     */
    const QUERY$p = 2 /* AudioListener */ | 8388608 /* Transform */;
    function sys_audio_listener(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$p) === QUERY$p) {
                update$h(game, i);
            }
        }
    }
    let position$1 = [0, 0, 0];
    let forward$2 = [0, 0, 0];
    let up = [0, 0, 0];
    function update$h(game, entity) {
        let transform = game.World.Transform[entity];
        get_translation(position$1, transform.World);
        get_forward(forward$2, transform.World);
        get_up(up, transform.World);
        let listener = game.Audio.listener;
        if (listener.positionX) {
            // The new AudioListener API.
            listener.positionX.value = position$1[0];
            listener.positionY.value = position$1[1];
            listener.positionZ.value = position$1[2];
            listener.forwardX.value = forward$2[0];
            listener.forwardY.value = forward$2[1];
            listener.forwardZ.value = forward$2[2];
            listener.upX.value = up[0];
            listener.upY.value = up[1];
            listener.upZ.value = up[2];
        }
        else {
            // Firefox & Safari.
            listener.setPosition(...position$1);
            listener.setOrientation(...forward$2, ...up);
        }
    }

    function play_note(audio, panner, instr, note, offset) {
        let time = audio.currentTime + offset;
        let total_duration = 0;
        if (panner) {
            panner.connect(audio.destination);
        }
        let master = audio.createGain();
        master.gain.value = (instr[0 /* MasterGainAmount */] / 9) ** 3;
        let lfa, lfo;
        if (instr[5 /* LFOType */]) {
            // Frequency is mapped to [0, 125].
            lfo = audio.createOscillator();
            lfo.type = instr[5 /* LFOType */];
            lfo.frequency.value = (instr[7 /* LFOFreq */] / 3) ** 3;
            // Amount is mapped to [27, 5832].
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
            if (panner) {
                filter.connect(panner);
            }
            else {
                filter.connect(audio.destination);
            }
        }
        else if (panner) {
            master.connect(panner);
        }
        else {
            master.connect(audio.destination);
        }
        for (let source of instr[8 /* Sources */]) {
            let amp = audio.createGain();
            amp.connect(master);
            // Gain Envelope
            let gain_amount = (source[1 /* GainAmount */] / 9) ** 3;
            let gain_attack = (source[2 /* GainAttack */] / 9) ** 3;
            let gain_sustain = (source[3 /* GainSustain */] / 9) ** 3;
            let gain_release = (source[4 /* GainRelease */] / 6) ** 3;
            let gain_duration = gain_attack + gain_sustain + gain_release;
            amp.gain.setValueAtTime(0, time);
            amp.gain.linearRampToValueAtTime(gain_amount, time + gain_attack);
            amp.gain.setValueAtTime(gain_amount, time + gain_attack + gain_sustain);
            amp.gain.exponentialRampToValueAtTime(0.00001, time + gain_duration);
            // XXX TypeScript doesn't recognize source[SourceParam.SourceType] as the discriminant.
            if (source[0]) {
                let hfo = audio.createOscillator();
                hfo.type = source[0 /* SourceType */];
                hfo.connect(amp);
                // Detune
                // [-1265,1265] i.e. one octave down and one octave up.
                hfo.detune.value = 3 * (source[5 /* DetuneAmount */] - 7.5) ** 3;
                if (lfa && source[6 /* DetuneLFO */]) {
                    lfa.connect(hfo.detune);
                }
                // Frequency Envelope
                // Frequency from note number
                let freq = 440 * 2 ** ((note - 69) / 12);
                if (source[7 /* FreqEnabled */]) {
                    let freq_attack = (source[8 /* FreqAttack */] / 9) ** 3;
                    let freq_sustain = (source[9 /* FreqSustain */] / 9) ** 3;
                    let freq_release = (source[10 /* FreqRelease */] / 6) ** 3;
                    hfo.frequency.linearRampToValueAtTime(0, time);
                    hfo.frequency.linearRampToValueAtTime(freq, time + freq_attack);
                    hfo.frequency.setValueAtTime(freq, time + freq_attack + freq_sustain);
                    hfo.frequency.exponentialRampToValueAtTime(0.00001, time + freq_attack + freq_sustain + freq_release);
                }
                else {
                    hfo.frequency.setValueAtTime(freq, time);
                }
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
    function play_synth_clip(audio, panner, clip) {
        // Seconds per beat, corresponding to a quarter note.
        let spb = 60 / (clip.BPM || 120);
        // Track timing is based on sixteenth notes.
        let interval = spb / 4;
        for (let track of clip.Tracks) {
            for (let i = 0; i < track.Notes.length; i++) {
                if (track.Notes[i]) {
                    play_note(audio, panner, track.Instrument, track.Notes[i], i * interval);
                }
            }
        }
    }
    function play_buffer_clip(audio, panner, clip) {
        let source = audio.createBufferSource();
        source.buffer = clip.Buffer;
        if (panner) {
            source.connect(panner);
            panner.connect(audio.destination);
        }
        else {
            source.connect(audio.destination);
        }
        source.start();
    }

    /**
     * @module systems/sys_audio_source
     */
    const QUERY$o = 4 /* AudioSource */ | 8388608 /* Transform */;
    function sys_audio_source(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$o) === QUERY$o) {
                update$g(game, i, delta);
            }
        }
    }
    function update$g(game, entity, delta) {
        let audio_source = game.World.AudioSource[entity];
        let transform = game.World.Transform[entity];
        if (audio_source.Current) {
            audio_source.Time += delta;
            if (audio_source.Time > audio_source.Current.Exit) {
                // This clip can now be exited from. Note: We might clear Current
                // before the clip actually ends, if Exit < duration. That's OK, as
                // we don't attempt to stop the current audio anyways.
                // TODO Schedule notes from Current progressively rather than all at once.
                audio_source.Current = undefined;
            }
            else if (audio_source.Panner) {
                update_panner(audio_source.Panner, transform);
            }
        }
        if (audio_source.Trigger && !audio_source.Current) {
            switch (audio_source.Trigger.Kind) {
                case 0 /* Buffer */:
                    play_buffer_clip(game.Audio, audio_source.Panner, audio_source.Trigger);
                    break;
                case 1 /* Synth */:
                    play_synth_clip(game.Audio, audio_source.Panner, audio_source.Trigger);
                    break;
            }
            audio_source.Current = audio_source.Trigger;
            audio_source.Time = 0;
            if (audio_source.Panner) {
                update_panner(audio_source.Panner, transform);
            }
        }
        // Audio triggers are only valid in the frame they're set; they don't stack
        // up. Otherwise sound effects would go out of sync with the game logic.
        // Reset the trigger to the default or undefined, regardless of whether it
        // triggered a new clip to play.
        audio_source.Trigger = audio_source.Idle;
    }
    const position = [0, 0, 0];
    const forward$1 = [0, 0, 0];
    function update_panner(panner, transform) {
        get_translation(position, transform.World);
        get_forward(forward$1, transform.World);
        if (panner.positionX) {
            panner.positionX.value = position[0];
            panner.positionY.value = position[1];
            panner.positionZ.value = position[2];
            panner.orientationX.value = forward$1[0];
            panner.orientationY.value = forward$1[1];
            panner.orientationZ.value = forward$1[2];
        }
        else {
            // Firefox & Safari.
            panner.setPosition(...position);
            panner.setOrientation(...forward$1);
        }
    }

    function resize_perspective(projection, aspect) {
        if (aspect > 1) {
            // Landscape orientation.
            perspective(projection.Projection, projection.FovY, aspect, projection.Near, projection.Far);
            invert(projection.Inverse, projection.Projection);
        }
        else {
            // Portrait orientation.
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
    const QUERY$n = 8388608 /* Transform */ | 16 /* Camera */;
    function sys_camera(game, delta) {
        game.Cameras = [];
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$n) === QUERY$n) {
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
                copy$1(camera.View, transform.Self);
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
        // Start with the extents on each axis set to the position of the center.
        let min_x, min_y, min_z, max_x, max_y, max_z;
        min_x = max_x = aabb.Center[0];
        min_y = max_y = aabb.Center[1];
        min_z = max_z = aabb.Center[2];
        // Expand the extents outwards from the center by finding the farthest
        // vertex on each axis in both the negative and the positive direction.
        let world_vertex = [0, 0, 0];
        for (let i = 0; i < 8; i++) {
            let bb_vertex = BOX[i];
            // Scale the bounding box according to the size of the collider.
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
        // Save the min and max bounds.
        aabb.Min = [min_x, min_y, min_z];
        aabb.Max = [max_x, max_y, max_z];
        // Calculate the half-extents.
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
    const QUERY$m = 8388608 /* Transform */ | 64 /* Collide */;
    function sys_collide(game, delta) {
        // Collect all colliders.
        let static_colliders = [];
        let dynamic_colliders = [];
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$m) === QUERY$m) {
                let transform = game.World.Transform[i];
                let collider = game.World.Collide[i];
                // Prepare the collider for this tick's detection.
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
                            Other: other.Entity,
                            Hit: hit,
                        });
                    }
                    if (other_can_intersect) {
                        other.Collisions.push({
                            Other: collider.Entity,
                            Hit: negate([0, 0, 0], hit),
                        });
                    }
                }
            }
        }
    }

    /**
     * @module systems/sys_control_ai
     */
    const QUERY$l = 256 /* ControlAi */ | 8388608 /* Transform */;
    function sys_control_ai(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$l) === QUERY$l) {
                update$f(game, i);
            }
        }
    }
    function update$f(game, entity) {
        let control = game.World.ControlAi[entity];
        for (let ent of query_all(game.World, entity, 1 /* Animate */)) {
            let animate = game.World.Animate[ent];
            animate.Trigger = control.Animation;
        }
    }

    /**
     * @module systems/sys_control_always
     */
    const QUERY$k = 128 /* ControlAlways */ | 8388608 /* Transform */ | 32768 /* Move */;
    function sys_control_always(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$k) === QUERY$k) {
                update$e(game, i);
            }
        }
    }
    function update$e(game, entity) {
        let control = game.World.ControlAlways[entity];
        let move = game.World.Move[entity];
        if (control.Direction) {
            move.Directions.push(control.Direction.slice());
        }
        if (control.Rotation) {
            move.LocalRotations.push(control.Rotation.slice());
        }
    }

    const QUERY$j = 512 /* ControlPlayer */;
    function sys_control_keyboard(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$j) === QUERY$j) {
                update$d(game, i);
            }
        }
    }
    function update$d(game, entity) {
        let control = game.World.ControlPlayer[entity];
        if (control.Flags & 1 /* Move */) {
            // Requires Has.Move.
            let move = game.World.Move[entity];
            if (game.InputState["ArrowLeft"]) {
                move.Directions.push([-1, 0, 0]);
            }
            if (game.InputState["ArrowRight"]) {
                move.Directions.push([1, 0, 0]);
            }
            if (game.InputDelta["ArrowUp"] === 1) {
                move.Directions.push([1, 0, 0]);
                let rigid_body = game.World.RigidBody[entity];
                rigid_body.Acceleration[1] += 300;
            }
        }
        if (control.Flags & 2 /* Rotate */) {
            // Requires Has.Transform | Has.Children.
            let children = game.World.Children[entity];
            let transform = game.World.Transform[entity];
            let grabber_entity = children.Children[0];
            let grabber_control = game.World.ControlPlayer[grabber_entity];
            if (!grabber_control.IsGrabbingEntity) {
                if (game.InputState["ArrowLeft"] && control.IsFacingRight) {
                    control.IsFacingRight = false;
                    set(transform.Rotation, 0, -0.7, 0.0, 0.7);
                    transform.Dirty = true;
                }
                if (game.InputState["ArrowRight"] && !control.IsFacingRight) {
                    control.IsFacingRight = true;
                    set(transform.Rotation, 0, 0.7, 0.0, 0.7);
                    transform.Dirty = true;
                }
            }
        }
        if (control.Flags & 4 /* Animate */) {
            let anim_name = "idle";
            if (game.InputState["ArrowLeft"]) {
                anim_name = "walk";
            }
            if (game.InputState["ArrowRight"]) {
                anim_name = "walk";
            }
            for (let ent of query_all(game.World, entity, 1 /* Animate */)) {
                let animate = game.World.Animate[ent];
                animate.Trigger = anim_name;
            }
        }
        if (control.Flags & 8 /* Grab */) {
            // Requires Has.Collide.
            let collide = game.World.Collide[entity];
            if (game.InputState["Space"] &&
                !control.IsGrabbingEntity &&
                collide.Collisions.length > 0) {
                let obstacle_entity = collide.Collisions[0].Other;
                control.IsGrabbingEntity = obstacle_entity;
                game.World.Signature[obstacle_entity] |= 16384 /* Mimic */;
                let obstacle_mimic = game.World.Mimic[obstacle_entity];
                obstacle_mimic.Target = entity;
            }
            if (game.InputDelta["Space"] === -1 && control.IsGrabbingEntity) {
                game.World.Signature[control.IsGrabbingEntity] &= ~16384 /* Mimic */;
                control.IsGrabbingEntity = null;
            }
        }
    }

    const QUERY$i = 32768 /* Move */ | 512 /* ControlPlayer */;
    const DEAD_ZONE$1 = 0.01;
    // The position of the joystick center, given by the initial Touch0's x and y.
    const joystick = [0, 0];
    function sys_control_touch_move(game, delta) {
        if (game.InputDelta["Touch0"] === 1) {
            // The center of the invisible joystick is given by the position of the
            // first touch of the first finger on the screen's surface.
            joystick[0] = game.InputState["Touch0X"];
            joystick[1] = game.InputState["Touch0Y"];
        }
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$i) === QUERY$i) {
                update$c(game, i);
            }
        }
    }
    function update$c(game, entity) {
        game.World.Transform[entity];
        let control = game.World.ControlPlayer[entity];
        let move = game.World.Move[entity];
        if (control.Flags & 1 /* Move */ && game.InputState["Touch0"] === 1) {
            let divisor = Math.min(game.ViewportWidth, game.ViewportHeight) / 4;
            let amount_x = (game.InputState["Touch0X"] - joystick[0]) / divisor;
            let amount_y = (game.InputState["Touch0Y"] - joystick[1]) / divisor;
            if (Math.abs(amount_x) > DEAD_ZONE$1) {
                // Strafe movement.
                move.Directions.push([clamp(-1, 1, -amount_x), 0, 0]);
            }
            if (Math.abs(amount_y) > DEAD_ZONE$1) {
                // Forward movement.
                move.Directions.push([0, 0, clamp(-1, 1, -amount_y)]);
            }
        }
    }

    const QUERY$h = 32768 /* Move */ | 512 /* ControlPlayer */;
    const DEAD_ZONE = 0.1;
    function sys_control_xbox(game, delta) {
        for (let pad of navigator.getGamepads()) {
            if (pad) {
                game.InputDelta[`pad${pad.index}_axis_1`] = pad.axes[0];
                game.InputDelta[`pad${pad.index}_axis_2`] = pad.axes[1];
                game.InputDelta[`pad${pad.index}_axis_3`] = pad.axes[2];
                game.InputDelta[`pad${pad.index}_axis_4`] = pad.axes[3];
            }
        }
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$h) === QUERY$h) {
                update$b(game, i);
            }
        }
    }
    function update$b(game, entity) {
        let control = game.World.ControlPlayer[entity];
        if (control.Flags & 1 /* Move */) {
            let move = game.World.Move[entity];
            if (Math.abs(game.InputDelta["pad0_axis_1"]) > DEAD_ZONE) {
                // Strafe movement.
                move.Directions.push([-game.InputDelta["pad0_axis_1"], 0, 0]);
            }
            if (Math.abs(game.InputDelta["pad0_axis_2"]) > DEAD_ZONE) {
                // Forward movement.
                move.Directions.push([0, 0, -game.InputDelta["pad0_axis_2"]]);
            }
        }
    }

    /**
     * @module systems/sys_draw
     */
    const QUERY$g = 8388608 /* Transform */ | 1024 /* Draw */;
    function sys_draw(game, delta) {
        game.Context2D.resetTransform();
        game.Context2D.clearRect(0, 0, game.ViewportWidth, game.ViewportHeight);
        let position = [0, 0, 0];
        let camera_entity = game.Cameras[0];
        let main_camera = game.World.Camera[camera_entity];
        if (!main_camera) {
            return;
        }
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$g) == QUERY$g) {
                // World position.
                get_translation(position, game.World.Transform[i].World);
                // NDC position.
                transform_point(position, position, main_camera.Pv);
                if (position[2] < -1 || position[2] > 1) {
                    // The entity is outside the frustum. Only consider the Z axis
                    // which allows us to discard all positions in front of the near
                    // plane (behind the camera) and behind the far plane. We still
                    // draw the remaining XY positions outside NDC in case the
                    // drawing is wide or tall enough to be visible.
                    continue;
                }
                game.Context2D.setTransform(1, 0, 0, 1, 0.5 * (position[0] + 1) * game.ViewportWidth, 0.5 * (-position[1] + 1) * game.ViewportHeight);
                let draw = game.World.Draw[i];
                switch (draw.Kind) {
                    case 0 /* Text */:
                        draw_text(game, draw);
                        break;
                    case 2 /* Selection */:
                        draw_selection(game, draw);
                        break;
                }
            }
        }
    }
    function draw_text(game, draw) {
        game.Context2D.textAlign = "center";
        game.Context2D.font = draw.Font;
        game.Context2D.fillStyle = draw.FillStyle;
        game.Context2D.fillText(draw.Text, 0, 0);
    }
    function draw_selection(game, draw) {
        game.Context2D.strokeStyle = draw.Color;
        game.Context2D.strokeRect(-draw.Size / 2, -draw.Size / 2, draw.Size, draw.Size);
    }

    /**
     * @module systems/sys_lifespan
     */
    const QUERY$f = 4096 /* Lifespan */;
    function sys_lifespan(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$f) == QUERY$f) {
                update$a(game, i, delta);
            }
        }
    }
    function update$a(game, entity, delta) {
        let lifespan = game.World.Lifespan[entity];
        lifespan.Remaining -= delta;
        if (lifespan.Remaining < 0) {
            if (lifespan.Action) {
                dispatch(game, lifespan.Action, entity);
            }
            destroy_all(game.World, entity);
        }
    }

    /**
     * @module systems/sys_light
     */
    const QUERY$e = 8388608 /* Transform */ | 8192 /* Light */;
    function sys_light(game, delta) {
        game.LightPositions.fill(0);
        game.LightDetails.fill(0);
        let counter = 0;
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$e) === QUERY$e) {
                update$9(game, i, counter++);
            }
        }
    }
    let world_pos = [0, 0, 0];
    function update$9(game, entity, idx) {
        let light = game.World.Light[entity];
        let transform = game.World.Transform[entity];
        get_translation(world_pos, transform.World);
        if (light.Kind === 1 /* Directional */) {
            // For directional lights, their normalized position in the world
            // describes the light's normal.
            normalize(world_pos, world_pos);
        }
        game.LightPositions[4 * idx + 0] = world_pos[0];
        game.LightPositions[4 * idx + 1] = world_pos[1];
        game.LightPositions[4 * idx + 2] = world_pos[2];
        game.LightPositions[4 * idx + 3] = light.Kind;
        game.LightDetails[4 * idx + 0] = light.Color[0];
        game.LightDetails[4 * idx + 1] = light.Color[1];
        game.LightDetails[4 * idx + 2] = light.Color[2];
        game.LightDetails[4 * idx + 3] = light.Intensity;
    }

    /**
     * @module systems/sys_mimic
     */
    const QUERY$d = 8388608 /* Transform */ | 16384 /* Mimic */;
    function sys_mimic(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$d) === QUERY$d) {
                let follower_transform = game.World.Transform[i];
                let follower_mimic = game.World.Mimic[i];
                let target_transform = game.World.Transform[follower_mimic.Target];
                let target_world_position = get_translation([0, 0, 0], target_transform.World);
                let target_world_rotation = get_rotation([0, 0, 0, 0], target_transform.World);
                // XXX Follower must be a top-level transform for this to work.
                lerp(follower_transform.Translation, follower_transform.Translation, target_world_position, follower_mimic.Stiffness);
                slerp(follower_transform.Rotation, follower_transform.Rotation, target_world_rotation, follower_mimic.Stiffness);
                follower_transform.Dirty = true;
            }
        }
    }

    /**
     * @module systems/sys_move
     */
    const QUERY$c = 8388608 /* Transform */ | 32768 /* Move */;
    const NO_ROTATION = [0, 0, 0, 1];
    function sys_move(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$c) === QUERY$c) {
                update$8(game, i, delta);
            }
        }
    }
    function update$8(game, entity, delta) {
        let transform = game.World.Transform[entity];
        let move = game.World.Move[entity];
        if (move.Directions.length) {
            let direction = move.Directions.reduce(add_directions);
            // Directions are not normalized to allow them to express slower
            // movement from a gamepad input. They can also cancel each other out.
            // They may not, however, intensify one another; hence max amount is 1.
            let amount = Math.min(1, length(direction));
            // Transform the direction into the world or the parent space. This will
            // also scale the result by the scale encoded in the transform.
            transform_direction(direction, direction, transform.World);
            if (transform.Parent !== undefined) {
                let parent = game.World.Transform[transform.Parent];
                transform_direction(direction, direction, parent.Self);
            }
            // Normalize the direction to remove the transform's scale. The length
            // of the orignal direction is now lost.
            normalize(direction, direction);
            // Scale by the amount and distance traveled in this tick.
            scale(direction, direction, amount * move.MoveSpeed * delta);
            add(transform.Translation, transform.Translation, direction);
            transform.Dirty = true;
            move.Directions = [];
        }
        // Rotations applied relative to the local space (parent's or world).
        if (move.LocalRotations.length) {
            let rotation = move.LocalRotations.reduce(multiply_rotations);
            let t = Math.min(1, (move.RotationSpeed / Math.PI) * delta);
            slerp(rotation, NO_ROTATION, rotation, t);
            // Pre-multiply.
            multiply(transform.Rotation, rotation, transform.Rotation);
            transform.Dirty = true;
            move.LocalRotations = [];
        }
        // Rotations applied relative to the self space.
        if (move.SelfRotations.length) {
            let rotation = move.SelfRotations.reduce(multiply_rotations);
            let t = Math.min(1, (move.RotationSpeed / Math.PI) * delta);
            slerp(rotation, NO_ROTATION, rotation, t);
            // Post-multiply.
            multiply(transform.Rotation, transform.Rotation, rotation);
            transform.Dirty = true;
            move.SelfRotations = [];
        }
    }
    function add_directions(acc, cur) {
        return add(acc, acc, cur);
    }
    function multiply_rotations(acc, cur) {
        return multiply(acc, acc, cur);
    }

    /**
     * @module components/com_render
     */
    const colored_shaded_vaos = new WeakMap();
    const colored_shadows_vaos = new WeakMap();
    const colored_skinned_vaos = new WeakMap();
    function render_colored_shaded(material, mesh, diffuse_color, shininess = 0, specular_color = [1, 1, 1, 1], front_face = GL_CW) {
        return (game, entity) => {
            if (!colored_shaded_vaos.has(mesh)) {
                // We only need to create the VAO once.
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
                colored_shaded_vaos.set(mesh, vao);
            }
            game.World.Signature[entity] |= 131072 /* Render */;
            game.World.Render[entity] = {
                Kind: 1 /* ColoredShaded */,
                Material: material,
                Mesh: mesh,
                FrontFace: front_face,
                Vao: colored_shaded_vaos.get(mesh),
                DiffuseColor: diffuse_color,
                SpecularColor: specular_color,
                Shininess: shininess,
            };
        };
    }
    function render_colored_shadows(material, mesh, diffuse_color, shininess = 0, specular_color = [1, 1, 1, 1], front_face = GL_CW) {
        return (game, entity) => {
            if (!colored_shadows_vaos.has(mesh)) {
                // We only need to create the VAO once.
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
            game.World.Signature[entity] |= 131072 /* Render */;
            game.World.Render[entity] = {
                Kind: 2 /* ColoredShadows */,
                Material: material,
                Mesh: mesh,
                FrontFace: front_face,
                Vao: colored_shadows_vaos.get(mesh),
                DiffuseColor: diffuse_color,
                SpecularColor: specular_color,
                Shininess: shininess,
            };
        };
    }
    function render_colored_skinned(material, mesh, diffuse_color, shininess = 0, specular_color = [1, 1, 1, 1], front_face = GL_CW) {
        return (game, entity) => {
            if (!colored_skinned_vaos.has(mesh)) {
                // We only need to create the VAO once.
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
            game.World.Signature[entity] |= 131072 /* Render */;
            game.World.Render[entity] = {
                Kind: 3 /* ColoredSkinned */,
                Material: material,
                Mesh: mesh,
                FrontFace: front_face,
                Vao: colored_skinned_vaos.get(mesh),
                DiffuseColor: diffuse_color,
                SpecularColor: specular_color,
                Shininess: shininess,
            };
        };
    }
    const DATA_PER_PARTICLE = 8;
    function render_instanced(mesh, offsets, rotation_offsets, palette) {
        return (game, entity) => {
            let material = game.MaterialInstanced;
            // We can't cache the VAO per mesh, like we do in com_render in other
            // examples, because the offsets vary between the instances of the
            // component. Hint: If offset models are guaranteed to only ever be
            // rendered using the same mesh as atoms (e.g. a model of a horse is
            // always rendered using cube voxels), it might be beneficial to cache
            // VAOs per model.
            let vao = game.Gl.createVertexArray();
            game.Gl.bindVertexArray(vao);
            game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
            game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
            game.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
            game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.NormalBuffer);
            game.Gl.enableVertexAttribArray(material.Locations.VertexNormal);
            game.Gl.vertexAttribPointer(material.Locations.VertexNormal, 3, GL_FLOAT, false, 0, 0);
            let instance_offset_buffer = game.Gl.createBuffer();
            game.Gl.bindBuffer(GL_ARRAY_BUFFER, instance_offset_buffer);
            game.Gl.bufferData(GL_ARRAY_BUFFER, offsets, GL_STATIC_DRAW);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceOffset);
            game.Gl.vertexAttribPointer(material.Locations.InstanceOffset, 4, GL_FLOAT, false, 0, 0);
            game.Gl.vertexAttribDivisor(material.Locations.InstanceOffset, 1);
            let instance_rotation_buffer = game.Gl.createBuffer();
            game.Gl.bindBuffer(GL_ARRAY_BUFFER, instance_rotation_buffer);
            game.Gl.bufferData(GL_ARRAY_BUFFER, rotation_offsets, GL_STATIC_DRAW);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceRotation);
            game.Gl.vertexAttribPointer(material.Locations.InstanceRotation, 4, GL_FLOAT, false, 0, 0);
            game.Gl.vertexAttribDivisor(material.Locations.InstanceRotation, 1);
            game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);
            game.Gl.bindVertexArray(null);
            game.World.Signature[entity] |= 131072 /* Render */;
            game.World.Render[entity] = {
                Kind: 11 /* Instanced */,
                Material: material,
                Mesh: mesh,
                FrontFace: GL_CW,
                Vao: vao,
                InstanceCount: offsets.length / 4,
                Palette: palette,
                InstanceOffsetBuffer: instance_offset_buffer,
                InstanceRotationBuffer: instance_rotation_buffer,
            };
        };
    }

    const QUERY$b = 8388608 /* Transform */ | 2048 /* EmitParticles */;
    function sys_particles(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$b) == QUERY$b) {
                update$7(game, i, delta);
            }
        }
    }
    let origin = [0, 0, 0];
    let forward = [0, 0, 0];
    function update$7(game, entity, delta) {
        let emitter = game.World.EmitParticles[entity];
        let transform = game.World.Transform[entity];
        emitter.SinceLast += delta;
        if (emitter.SinceLast > emitter.Frequency) {
            emitter.SinceLast = 0;
            get_translation(origin, transform.World);
            get_forward(forward, transform.World);
            // Push [x, y, z, age].
            emitter.Instances.push(...origin, 0);
            // Push [x, y, z, seed].
            emitter.Instances.push(...forward, Math.random());
        }
        // A flat continuous array of particle data, from which a Float32Array
        // is created in sys_render and sent as a vertex attribute array.
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
    const QUERY$a = 8388608 /* Transform */ | 262144 /* RigidBody */;
    const GRAVITY = -9.81;
    function sys_physics_integrate(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$a) === QUERY$a) {
                update$6(game, i, delta);
            }
        }
    }
    function update$6(game, entity, delta) {
        let transform = game.World.Transform[entity];
        let rigid_body = game.World.RigidBody[entity];
        if (rigid_body.Kind === 1 /* Dynamic */) {
            copy(rigid_body.VelocityIntegrated, rigid_body.VelocityResolved);
            // Compute change to velocity, including the gravity.
            scale(rigid_body.Acceleration, rigid_body.Acceleration, delta);
            add(rigid_body.VelocityIntegrated, rigid_body.VelocityIntegrated, rigid_body.Acceleration);
            rigid_body.VelocityIntegrated[1] += GRAVITY * delta;
            // Apply velocity to position.
            let vel_delta = [0, 0, 0];
            scale(vel_delta, rigid_body.VelocityIntegrated, delta);
            add(transform.Translation, transform.Translation, vel_delta);
            transform.Dirty = true;
            // Reset force/acceleration.
            set$1(rigid_body.Acceleration, 0, 0, 0);
        }
    }

    /**
     * @module systems/sys_physics_kinematic
     */
    const QUERY$9 = 8388608 /* Transform */ | 262144 /* RigidBody */;
    function sys_physics_kinematic(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$9) === QUERY$9) {
                update$5(game, i, delta);
            }
        }
    }
    function update$5(game, entity, delta) {
        let transform = game.World.Transform[entity];
        let rigid_body = game.World.RigidBody[entity];
        if (rigid_body.Kind === 2 /* Kinematic */) {
            let current_position = [0, 0, 0];
            get_translation(current_position, transform.World);
            let movement = [0, 0, 0];
            subtract(movement, current_position, rigid_body.LastPosition);
            // Compute velocity from this frame's movement.
            scale(rigid_body.VelocityIntegrated, movement, 1 / delta);
            copy(rigid_body.LastPosition, current_position);
        }
    }

    /**
     * @module systems/sys_physics_resolve
     */
    const QUERY$8 = 8388608 /* Transform */ | 64 /* Collide */ | 262144 /* RigidBody */;
    function sys_physics_resolve(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$8) === QUERY$8) {
                update$4(game, i);
            }
        }
    }
    // Temp vector used to compute the reflection off of a static body.
    let a = [0, 0, 0];
    function update$4(game, entity) {
        let transform = game.World.Transform[entity];
        let collide = game.World.Collide[entity];
        let rigid_body = game.World.RigidBody[entity];
        if (rigid_body.Kind === 1 /* Dynamic */) {
            let has_collision = false;
            for (let i = 0; i < collide.Collisions.length; i++) {
                let collision = collide.Collisions[i];
                if (game.World.Signature[collision.Other] & 262144 /* RigidBody */) {
                    has_collision = true;
                    // Dynamic rigid bodies are only supported for top-level
                    // entities. Thus, no need to apply the world → self → local
                    // conversion to the collision response. Local space is world space.
                    add(transform.Translation, transform.Translation, collision.Hit);
                    transform.Dirty = true;
                    // Assume mass = 1 for all rigid bodies. On collision,
                    // velocities are swapped, unless the other body is a static
                    // one (and behaves as if it had infinite mass).
                    let other_body = game.World.RigidBody[collision.Other];
                    switch (other_body.Kind) {
                        case 0 /* Static */:
                            // Compute the reflection vector as
                            //   r = v - 2 * (v·n) * n
                            // where
                            //   v — the incident velocity vector
                            //   n — the normal of the surface of reflection
                            // Compute n.
                            normalize(a, collision.Hit);
                            // Compute - 2 * (v·n) * n.
                            scale(a, a, -2 * dot(rigid_body.VelocityIntegrated, a));
                            add(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated, a);
                            break;
                        case 1 /* Dynamic */:
                        case 2 /* Kinematic */:
                            copy(rigid_body.VelocityResolved, other_body.VelocityIntegrated);
                            break;
                    }
                    // When Bounciness = 1, collisions are 100% elastic.
                    scale(rigid_body.VelocityResolved, rigid_body.VelocityResolved, rigid_body.Bounciness);
                    if (collision.Hit[1] > 0 && rigid_body.VelocityResolved[1] < 1) {
                        // Collision from the bottom stops the downward movement.
                        rigid_body.VelocityResolved[1] = 0;
                    }
                }
            }
            if (!has_collision) {
                copy(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated);
            }
        }
    }

    /**
     * @module systems/sys_poll
     */
    const QUERY$7 = 2097152 /* Task */;
    function sys_poll(game, delta) {
        // Collect all ready tasks first to avoid completing them while we stil
        // literate over ohter tasks. This guarantees that tasks blocked by other
        // tasks will be completed during the next frame.
        let tasks_to_complete = [];
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$7) === QUERY$7) {
                if (has_blocking_dependencies(game.World, i)) {
                    continue;
                }
                let task = game.World.Task[i];
                switch (task.Kind) {
                    case 0 /* Until */: {
                        if (task.Predicate(i)) {
                            tasks_to_complete.push(i);
                        }
                        break;
                    }
                    case 1 /* Timeout */: {
                        task.Remaining -= delta;
                        if (task.Remaining < 0) {
                            tasks_to_complete.push(i);
                        }
                        break;
                    }
                }
            }
        }
        for (let entity of tasks_to_complete) {
            game.World.Signature[entity] &= ~2097152 /* Task */;
            if (game.World.Signature[entity] === 0 /* None */) {
                game.World.DestroyEntity(entity);
            }
            let task = game.World.Task[entity];
            if (task.OnDone) {
                task.OnDone(entity);
            }
            // Explicitly delete the component data for this task to avoid memory
            // leaks from closures.
            delete game.World.Task[entity];
        }
    }
    function has_blocking_dependencies(world, entity) {
        if (world.Signature[entity] & 32 /* Children */) {
            let children = world.Children[entity];
            for (let child of children.Children) {
                if (world.Signature[child] & 2097152 /* Task */) {
                    // A pending child blocks the parent task.
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @module systems/sys_render_depth
     */
    const QUERY$6 = 8388608 /* Transform */ | 131072 /* Render */;
    function sys_render_depth(game, delta) {
        for (let camera_entity of game.Cameras) {
            let camera = game.World.Camera[camera_entity];
            switch (camera.Kind) {
                case 3 /* Depth */:
                    render_depth(game, camera);
                    break;
            }
        }
    }
    function render_depth(game, camera) {
        let current_material = null;
        let current_front_face = null;
        game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target.Framebuffer);
        game.Gl.viewport(0, 0, camera.Target.Width, camera.Target.Height);
        game.Gl.clearColor(...camera.ClearColor);
        game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$6) === QUERY$6) {
                let transform = game.World.Transform[i];
                let render = game.World.Render[i];
                if (render.Material !== current_material) {
                    current_material = render.Material;
                    switch (render.Kind) {
                        case 8 /* Vertices */:
                        case 9 /* ParticlesColored */:
                        case 10 /* ParticlesTextured */:
                            break;
                        case 11 /* Instanced */:
                            use_instanced_shading(game, camera);
                            break;
                        default:
                            use_default_shading(game, camera);
                    }
                }
                if (render.FrontFace !== current_front_face) {
                    current_front_face = render.FrontFace;
                    game.Gl.frontFace(render.FrontFace);
                }
                switch (render.Kind) {
                    case 8 /* Vertices */:
                    case 9 /* ParticlesColored */:
                    case 10 /* ParticlesTextured */:
                        // Skip rendering, RenderVertices doesn't cast shadow for now.
                        break;
                    case 11 /* Instanced */:
                        draw_instanced_shading(game, transform, render);
                        break;
                    default:
                        draw_default_shading(game, transform, render);
                }
            }
        }
    }
    function use_default_shading(game, camera) {
        game.Gl.useProgram(game.MaterialDepth.Program);
        game.Gl.uniformMatrix4fv(game.MaterialDepth.Locations.Pv, false, camera.Pv);
    }
    function draw_default_shading(game, transform, render) {
        let material = game.MaterialDepth;
        game.Gl.uniformMatrix4fv(material.Locations.World, false, transform.World);
        game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.Mesh.VertexBuffer);
        game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
        game.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
        game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, render.Mesh.IndexBuffer);
        game.Gl.drawElements(material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
    }
    function use_instanced_shading(game, camera) {
        game.Gl.useProgram(game.MaterialDepthInstanced.Program);
        game.Gl.uniformMatrix4fv(game.MaterialDepthInstanced.Locations.Pv, false, camera.Pv);
    }
    function draw_instanced_shading(game, transform, render) {
        let material = game.MaterialDepthInstanced;
        game.Gl.uniformMatrix4fv(material.Locations.World, false, transform.World);
        game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.Mesh.VertexBuffer);
        game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
        game.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
        game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.InstanceOffsetBuffer);
        game.Gl.enableVertexAttribArray(material.Locations.InstanceOffset);
        game.Gl.vertexAttribPointer(material.Locations.InstanceOffset, 4, GL_FLOAT, false, 0, 0);
        game.Gl.vertexAttribDivisor(material.Locations.InstanceOffset, 1);
        game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.InstanceRotationBuffer);
        game.Gl.enableVertexAttribArray(material.Locations.InstanceRotation);
        game.Gl.vertexAttribPointer(material.Locations.InstanceRotation, 4, GL_FLOAT, false, 0, 0);
        game.Gl.vertexAttribDivisor(material.Locations.InstanceRotation, 1);
        game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, render.Mesh.IndexBuffer);
        game.Gl.drawElementsInstanced(game.MaterialDepthInstanced.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0, render.InstanceCount);
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
            // Push a new signature and return its index.
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
    // Other methods are free functions for the sake of tree-shakability.
    function first_entity(world, query, start_at = 0) {
        for (let i = start_at; i < world.Signature.length; i++) {
            if ((world.Signature[i] & query) === query) {
                return i;
            }
        }
    }

    /**
     * @module systems/sys_render_forward
     */
    const QUERY$5 = 8388608 /* Transform */ | 131072 /* Render */;
    function sys_render_forward(game, delta) {
        for (let camera_entity of game.Cameras) {
            let camera = game.World.Camera[camera_entity];
            switch (camera.Kind) {
                case 0 /* Forward */:
                    render_forward(game, camera);
                    break;
                case 2 /* Framebuffer */:
                    render_framebuffer(game, camera);
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
    function render_framebuffer(game, camera) {
        game.Gl.bindFramebuffer(GL_FRAMEBUFFER, camera.Target.Framebuffer);
        game.Gl.viewport(0, 0, camera.Target.Width, camera.Target.Height);
        game.Gl.clearColor(...camera.ClearColor);
        game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        render(game, camera, camera.Target.RenderTexture);
    }
    function render(game, eye, current_target) {
        // Keep track of the current material to minimize switching.
        let current_material = null;
        let current_front_face = null;
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$5) === QUERY$5) {
                let transform = game.World.Transform[i];
                let render = game.World.Render[i];
                if (render.Material !== current_material) {
                    current_material = render.Material;
                    switch (render.Kind) {
                        case 0 /* ColoredUnlit */:
                            use_colored_unlit(game, render.Material, eye);
                            break;
                        case 1 /* ColoredShaded */:
                            use_colored_shaded(game, render.Material, eye);
                            break;
                        case 5 /* TexturedUnlit */:
                            use_textured_unlit(game, render.Material, eye);
                            break;
                        case 6 /* TexturedShaded */:
                            use_textured_shaded(game, render.Material, eye);
                            break;
                        case 8 /* Vertices */:
                            use_vertices(game, render.Material, eye);
                            break;
                        case 7 /* MappedShaded */:
                            use_mapped(game, render.Material, eye);
                            break;
                        case 2 /* ColoredShadows */:
                            use_colored_shadows(game, render.Material, eye);
                            break;
                        case 3 /* ColoredSkinned */:
                            use_colored_skinned(game, render.Material, eye);
                            break;
                        case 9 /* ParticlesColored */:
                            use_particles_colored(game, render.Material, eye);
                            break;
                        case 10 /* ParticlesTextured */:
                            use_particles_textured(game, render.Material, eye);
                            break;
                        case 11 /* Instanced */:
                            use_instanced(game, render.Material, eye);
                            break;
                    }
                }
                if (render.FrontFace !== current_front_face) {
                    current_front_face = render.FrontFace;
                    game.Gl.frontFace(render.FrontFace);
                }
                switch (render.Kind) {
                    case 0 /* ColoredUnlit */:
                        draw_colored_unlit(game, transform, render);
                        break;
                    case 1 /* ColoredShaded */:
                        draw_colored_shaded(game, transform, render);
                        break;
                    case 5 /* TexturedUnlit */:
                        // Prevent feedback loop between the active render target
                        // and the texture being rendered.
                        if (render.Texture !== current_target) {
                            draw_textured_unlit(game, transform, render);
                        }
                        break;
                    case 6 /* TexturedShaded */:
                        // Prevent feedback loop between the active render target
                        // and the texture being rendered.
                        if (render.Texture !== current_target) {
                            draw_textured_shaded(game, transform, render);
                        }
                        break;
                    case 8 /* Vertices */:
                        draw_vertices(game, transform, render);
                        break;
                    case 7 /* MappedShaded */:
                        draw_mapped(game, transform, render);
                        break;
                    case 2 /* ColoredShadows */:
                        draw_colored_shadows(game, transform, render);
                        break;
                    case 3 /* ColoredSkinned */:
                        draw_colored_skinned(game, i, transform, render);
                        break;
                    case 9 /* ParticlesColored */: {
                        let emitter = game.World.EmitParticles[i];
                        if (emitter.Instances.length) {
                            draw_particles_colored(game, render, emitter);
                        }
                        break;
                    }
                    case 10 /* ParticlesTextured */: {
                        let emitter = game.World.EmitParticles[i];
                        if (emitter.Instances.length) {
                            draw_particles_textured(game, render, emitter);
                        }
                        break;
                    }
                    case 11 /* Instanced */:
                        draw_instanced(game, transform, render);
                        break;
                }
            }
        }
    }
    function use_colored_unlit(game, material, eye) {
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
    function use_colored_shaded(game, material, eye) {
        game.Gl.useProgram(material.Program);
        game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
        game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
        game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
        game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
        game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
        game.Gl.uniform1f(material.Locations.FogDistance, eye.Projection.Far);
    }
    function draw_colored_shaded(game, transform, render) {
        game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
        game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
        game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
        game.Gl.uniform4fv(render.Material.Locations.SpecularColor, render.SpecularColor);
        game.Gl.uniform1f(render.Material.Locations.Shininess, render.Shininess);
        game.Gl.bindVertexArray(render.Vao);
        game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
        game.Gl.bindVertexArray(null);
    }
    function use_textured_unlit(game, material, eye) {
        game.Gl.useProgram(material.Program);
        game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    }
    function draw_textured_unlit(game, transform, render) {
        game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
        game.Gl.activeTexture(GL_TEXTURE0);
        game.Gl.bindTexture(GL_TEXTURE_2D, render.Texture);
        game.Gl.uniform1i(render.Material.Locations.TextureMap, 0);
        game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);
        game.Gl.bindVertexArray(render.Vao);
        game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
        game.Gl.bindVertexArray(null);
    }
    function use_textured_shaded(game, material, eye) {
        game.Gl.useProgram(material.Program);
        game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
        game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
        game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
        game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
    }
    function draw_textured_shaded(game, transform, render) {
        game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
        game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
        game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
        game.Gl.uniform4fv(render.Material.Locations.SpecularColor, render.SpecularColor);
        game.Gl.uniform1f(render.Material.Locations.Shininess, render.Shininess);
        game.Gl.activeTexture(GL_TEXTURE0);
        game.Gl.bindTexture(GL_TEXTURE_2D, render.Texture);
        game.Gl.uniform1i(render.Material.Locations.DiffuseMap, 0);
        game.Gl.bindVertexArray(render.Vao);
        game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
        game.Gl.bindVertexArray(null);
    }
    function use_vertices(game, material, eye) {
        game.Gl.useProgram(material.Program);
        game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    }
    function draw_vertices(game, transform, render) {
        game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
        game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);
        game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.VertexBuffer);
        game.Gl.enableVertexAttribArray(render.Material.Locations.VertexPosition);
        game.Gl.vertexAttribPointer(render.Material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
        game.Gl.drawArrays(render.Material.Mode, 0, render.IndexCount);
    }
    function use_mapped(game, material, eye) {
        game.Gl.useProgram(material.Program);
        game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
        game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
        game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
        game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
    }
    function draw_mapped(game, transform, render) {
        game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
        game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
        game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
        game.Gl.activeTexture(GL_TEXTURE1);
        game.Gl.bindTexture(GL_TEXTURE_2D, render.DiffuseMap);
        game.Gl.uniform1i(render.Material.Locations.DiffuseMap, 1);
        game.Gl.activeTexture(GL_TEXTURE2);
        game.Gl.bindTexture(GL_TEXTURE_2D, render.NormalMap);
        game.Gl.uniform1i(render.Material.Locations.NormalMap, 2);
        game.Gl.activeTexture(GL_TEXTURE3);
        game.Gl.bindTexture(GL_TEXTURE_2D, render.RoughnessMap);
        game.Gl.uniform1i(render.Material.Locations.RoughnessMap, 3);
        game.Gl.bindVertexArray(render.Vao);
        game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
        game.Gl.bindVertexArray(null);
    }
    function use_colored_shadows(game, material, eye) {
        game.Gl.useProgram(material.Program);
        game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
        game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
        game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
        game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
        game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
        game.Gl.uniform1f(material.Locations.FogDistance, eye.Projection.Far);
        game.Gl.activeTexture(GL_TEXTURE0);
        game.Gl.bindTexture(GL_TEXTURE_2D, game.Targets.Sun.DepthTexture);
        game.Gl.uniform1i(material.Locations.ShadowMap, 0);
        // Only one shadow source is supported.
        let light_entity = first_entity(game.World, 16 /* Camera */ | 8192 /* Light */);
        if (light_entity) {
            let light_camera = game.World.Camera[light_entity];
            game.Gl.uniformMatrix4fv(material.Locations.ShadowSpace, false, light_camera.Pv);
        }
    }
    function draw_colored_shadows(game, transform, render) {
        game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
        game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
        game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
        game.Gl.uniform4fv(render.Material.Locations.SpecularColor, render.SpecularColor);
        game.Gl.uniform1f(render.Material.Locations.Shininess, render.Shininess);
        game.Gl.bindVertexArray(render.Vao);
        game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
        game.Gl.bindVertexArray(null);
    }
    function use_colored_skinned(game, material, eye) {
        game.Gl.useProgram(material.Program);
        game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
        game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
        game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
        game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
        game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
        game.Gl.uniform1f(material.Locations.FogDistance, eye.Projection.Far);
    }
    const bones = new Float32Array(16 * 6);
    function draw_colored_skinned(game, entity, transform, render) {
        game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
        game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
        game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
        game.Gl.uniform4fv(render.Material.Locations.SpecularColor, render.SpecularColor);
        game.Gl.uniform1f(render.Material.Locations.Shininess, render.Shininess);
        let bone_entities = [];
        if (game.World.Signature[entity] & 32 /* Children */) {
            for (let bone_entity of query_all(game.World, entity, 8 /* Bone */ | 8388608 /* Transform */)) {
                bone_entities.push(bone_entity);
            }
        }
        else {
            // Find the 5 tail bones. They're top-level for mimic() to work, so we
            // need to find them in the world rather than the tail's children.
            let start_here = entity;
            for (let i = 0; i < 5; i++) {
                let bone_entity = first_entity(game.World, 8 /* Bone */ | 8388608 /* Transform */, start_here);
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
        game.Gl.useProgram(material.Program);
        game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
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
    function use_particles_textured(game, material, eye) {
        game.Gl.useProgram(material.Program);
        game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    }
    function draw_particles_textured(game, render, emitter) {
        game.Gl.uniform4fv(render.Material.Locations.ColorStart, render.ColorStart);
        game.Gl.uniform4fv(render.Material.Locations.ColorEnd, render.ColorEnd);
        game.Gl.activeTexture(GL_TEXTURE0);
        game.Gl.bindTexture(GL_TEXTURE_2D, render.Texture);
        game.Gl.uniform1i(render.Material.Locations.TextureMap, 0);
        game.Gl.uniform4f(render.Material.Locations.Details, emitter.Lifespan, emitter.Speed, ...render.Size);
        let instances = Float32Array.from(emitter.Instances);
        game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.Buffer);
        game.Gl.bufferSubData(GL_ARRAY_BUFFER, 0, instances);
        game.Gl.enableVertexAttribArray(render.Material.Locations.OriginAge);
        game.Gl.vertexAttribPointer(render.Material.Locations.OriginAge, 4, GL_FLOAT, false, DATA_PER_PARTICLE * 4, 0);
        game.Gl.enableVertexAttribArray(render.Material.Locations.DirectionSeed);
        game.Gl.vertexAttribPointer(render.Material.Locations.DirectionSeed, 4, GL_FLOAT, false, DATA_PER_PARTICLE * 4, 4 * 4);
        game.Gl.drawArrays(render.Material.Mode, 0, emitter.Instances.length / DATA_PER_PARTICLE);
    }
    function use_instanced(game, material, eye) {
        game.Gl.useProgram(material.Program);
        game.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
        game.Gl.uniform3fv(material.Locations.Eye, eye.Position);
        game.Gl.uniform4fv(material.Locations.LightPositions, game.LightPositions);
        game.Gl.uniform4fv(material.Locations.LightDetails, game.LightDetails);
        game.Gl.uniform4fv(material.Locations.FogColor, eye.ClearColor);
        game.Gl.uniform1f(material.Locations.FogDistance, eye.Projection.Far);
    }
    function draw_instanced(game, transform, render) {
        game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
        game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
        game.Gl.uniform3fv(render.Material.Locations.Palette, render.Palette);
        game.Gl.bindVertexArray(render.Vao);
        game.Gl.drawElementsInstanced(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0, render.InstanceCount);
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
            game.ViewportWidth = game.Canvas3D.width = game.Canvas2D.width = window.innerWidth;
            game.ViewportHeight = game.Canvas3D.height = game.Canvas2D.height = window.innerHeight;
        }
    }

    /**
     * @module systems/sys_shake
     */
    const QUERY$4 = 8388608 /* Transform */ | 524288 /* Shake */;
    function sys_shake(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$4) == QUERY$4) {
                update$3(game, i);
            }
        }
    }
    function update$3(game, entity) {
        let shake = game.World.Shake[entity];
        let transform = game.World.Transform[entity];
        transform.Translation = [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5];
        scale(transform.Translation, transform.Translation, shake.Magnitude * 2);
        transform.Dirty = true;
    }

    /**
     * @module components/com_transform
     */
    function transform(translation = [0, 0, 0], rotation = [0, 0, 0, 1], scale = [1, 1, 1]) {
        return (game, entity) => {
            game.World.Signature[entity] |= 8388608 /* Transform */;
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
     * @module systems/sys_spawn
     */
    const QUERY$3 = 8388608 /* Transform */ | 1048576 /* Spawn */;
    function sys_spawn(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$3) == QUERY$3) {
                update$2(game, i, delta);
            }
        }
    }
    function update$2(game, entity, delta) {
        let spawn = game.World.Spawn[entity];
        spawn.SinceLast += delta;
        if (spawn.SinceLast > spawn.Interval) {
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
     * @module systems/sys_toggle
     */
    const QUERY$2 = 4194304 /* Toggle */;
    function sys_toggle(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$2) == QUERY$2) {
                update$1(game, i, delta);
            }
        }
    }
    function update$1(game, entity, delta) {
        let toggle = game.World.Toggle[entity];
        toggle.SinceLast += delta;
        if (toggle.SinceLast > toggle.Frequency) {
            toggle.SinceLast = 0;
            if (toggle.CurrentlyEnabled) {
                toggle.CurrentlyEnabled = false;
                game.World.Signature[entity] &= ~toggle.Mask;
            }
            else {
                toggle.CurrentlyEnabled = true;
                game.World.Signature[entity] |= toggle.Mask;
            }
        }
    }

    /**
     * @module systems/sys_transform
     */
    const QUERY$1 = 8388608 /* Transform */;
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
        if (world.Signature[entity] & 32 /* Children */) {
            let children = world.Children[entity];
            for (let child of children.Children) {
                if (world.Signature[child] & 8388608 /* Transform */) {
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
    const QUERY = 8388608 /* Transform */ | 64 /* Collide */ | 16777216 /* Trigger */;
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
            let other_collide = game.World.Collide[collision.Other];
            if (trigger.Mask & other_collide.Layers) {
                dispatch(game, trigger.Action, [entity, collision.Other]);
            }
        }
    }

    function shift(values) {
        let value = values.shift();
        if (typeof value === "boolean" || value == undefined) {
            return "";
        }
        else if (Array.isArray(value)) {
            return value.join("");
        }
        else {
            return value;
        }
    }
    function html(strings, ...values) {
        return strings.reduce((out, cur) => out + shift(values) + cur);
    }

    function App(game) {
        return html `
        <div
            style="
                animation: 8s ease-out 5s forwards intro;
            "
        >
            <div
                style="
                    font-family: Arial;
                    font-size: 40vmin;
                    font-weight: 600;
                    color: #fff;
                    line-height: .9;
                "
            >
                LEFT BEHIND
            </div>
            <div
                style="
                    position: relative;
                    left: 4vh;
                    font-family: Arial;
                    font-size: 3vh;
                    color: #fff;
                "
            >
                A game by Piesku.
            </div>
        </div>
    `;
    }

    /**
     * @module systems/sys_ui
     */
    let prev;
    function sys_ui(game, delta) {
        let next = App();
        if (next !== prev) {
            game.Ui.innerHTML = prev = next;
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
            this.ControlAi = [];
            this.ControlPlayer = [];
            this.Draw = [];
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
            this.Toggle = [];
            this.Transform = [];
            this.Trigger = [];
        }
    }

    class Game extends Game3D {
        constructor() {
            super(...arguments);
            this.World = new World();
            this.MaterialColoredShaded = mat_forward_colored_phong(this.Gl);
            this.MaterialColoredShadows = mat_forward_colored_shadows(this.Gl);
            this.MaterialColoredPhongSkinned = mat_forward_colored_phong_skinned(this.Gl);
            this.MaterialParticlesColored = mat_forward_particles_colored(this.Gl);
            this.MaterialParticlesTextured = mat_forward_particles_textured(this.Gl);
            this.MaterialDepth = mat_forward_depth(this.Gl);
            this.MaterialDepthInstanced = mat_forward_depth_instanced(this.Gl);
            this.MaterialInstanced = mat_forward_instanced(this.Gl);
            this.MeshLeaf = mesh_leaf(this.Gl);
            this.MeshGrass = mesh_grass(this.Gl);
            this.MeshPlane = mesh_plane(this.Gl);
            this.MeshCube = mesh_cube(this.Gl);
            this.MeshLisek = mesh_lisek(this.Gl);
            this.MeshOgon = mesh_ogon(this.Gl);
            this.MeshCylinder = mesh_cylinder(this.Gl);
            // The rendering pipeline supports 8 lights.
            this.LightPositions = new Float32Array(4 * 8);
            this.LightDetails = new Float32Array(4 * 8);
            this.Cameras = [];
            this.Targets = {
                Sun: create_depth_target(this.Gl, 2048, 2048),
            };
            this.ItemsCollected = 0;
            this.ItemsMissed = 0;
        }
        FixedUpdate(delta) {
            // Collisions and physics.
            sys_physics_integrate(this, delta);
            sys_transform(this);
            sys_physics_kinematic(this, delta);
            sys_collide(this);
            sys_physics_resolve(this);
            sys_transform(this);
            sys_trigger(this);
        }
        FrameUpdate(delta) {
            // Event loop.
            sys_poll(this, delta);
            // Player input.
            sys_control_keyboard(this);
            sys_control_touch_move(this);
            sys_control_xbox(this);
            // AI.
            sys_control_ai(this);
            sys_control_always(this);
            // Game logic.
            sys_animate(this, delta);
            sys_move(this, delta);
            sys_mimic(this);
            sys_lifespan(this, delta);
            sys_shake(this);
            sys_toggle(this, delta);
            sys_spawn(this, delta);
            sys_particles(this, delta);
            sys_transform(this);
            // Rendering.
            sys_audio_listener(this);
            sys_audio_source(this, delta);
            sys_resize(this);
            sys_camera(this);
            sys_light(this);
            sys_render_depth(this);
            sys_render_forward(this);
            sys_draw(this);
            sys_ui(this);
        }
    }

    /**
     * @module components/com_camera
     */
    function camera_forward_perspective(fovy, near, far, clear_color = [0.9, 0.9, 0.9, 1]) {
        return (game, entity) => {
            game.World.Signature[entity] |= 16 /* Camera */;
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
            game.World.Signature[entity] |= 16 /* Camera */;
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

    function blueprint_camera(game, clear_color) {
        return [
            children([
                transform([0, 1, 5], from_euler([0, 0, 0, 1], 10, 0, 0)),
                camera_forward_perspective(1, 0.1, 15, clear_color),
            ]),
        ];
    }

    /**
     * @module components/com_control_always
     */
    function control_always(direction, rotation) {
        return (game, entity) => {
            game.World.Signature[entity] |= 128 /* ControlAlways */;
            game.World.ControlAlways[entity] = {
                Direction: direction,
                Rotation: rotation,
            };
        };
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
            game.World.Signature[entity] |= 32768 /* Move */;
            game.World.Move[entity] = {
                MoveSpeed: move_speed,
                RotationSpeed: rotation_speed,
                Directions: [],
                LocalRotations: [],
                SelfRotations: [],
            };
        };
    }

    /**
     * @module components/com_mimic
     */
    function mimic(Target, Stiffness = 0.1) {
        return (game, entity) => {
            game.World.Signature[entity] |= 16384 /* Mimic */;
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
            game.World.Signature[entity] |= 65536 /* Named */;
            game.World.Named[entity] = { Name };
        };
    }
    function find_first(world, name) {
        for (let i = 0; i < world.Signature.length; i++) {
            if (world.Signature[i] & 65536 /* Named */ && world.Named[i].Name === name) {
                return i;
            }
        }
        throw `No entity named ${name}.`;
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
            game.World.Signature[entity] |= 64 /* Collide */;
            game.World.Collide[entity] = {
                Entity: entity,
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
     * @module components/com_rigid_body
     */
    function rigid_body(kind, bounciness = 0.5) {
        return (game, entity) => {
            game.World.Signature[entity] |= 262144 /* RigidBody */;
            game.World.RigidBody[entity] = {
                Kind: kind,
                Bounciness: bounciness,
                Acceleration: [0, 0, 0],
                VelocityIntegrated: [0, 0, 0],
                VelocityResolved: [0, 0, 0],
                LastPosition: [0, 0, 0],
            };
        };
    }

    /**
     * @module components/com_audio_listener
     */
    function audio_listener() {
        return (game, entity) => {
            game.World.Signature[entity] |= 2 /* AudioListener */;
        };
    }

    function bone(index, inverse_bind_pose) {
        return (game, entity) => {
            game.World.Signature[entity] |= 8 /* Bone */;
            game.World.Bone[entity] = {
                Index: index,
                Dirty: inverse_bind_pose === undefined,
                InverseBindPose: inverse_bind_pose || create(),
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

    function control_player(flags) {
        return (game, entity) => {
            game.World.Signature[entity] |= 512 /* ControlPlayer */;
            game.World.ControlPlayer[entity] = {
                Flags: flags,
                IsFacingRight: true,
                IsGrabbingEntity: null,
            };
        };
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
                    // One-level-deep copy of the clip's keyframes. When
                    // AnimationFlag.Alternate is set, sys_animate recalculates
                    // keyframes' timestamps after each alternation. We want to
                    // modify copies of the timestamps defined in the clip. It's OK
                    // to copy other keyframe properties by reference.
                    Keyframes: Keyframes.map((keyframe) => ({ ...keyframe })),
                    Flags,
                    Duration: duration,
                    Time: 0,
                };
            }
            game.World.Signature[entity] |= 1 /* Animate */;
            game.World.Animate[entity] = {
                States,
                Current: States["idle"],
            };
        };
    }

    function blueprint_lisek(game, animation_step_length = 0.2) {
        return [
            render_colored_skinned(game.MaterialColoredPhongSkinned, game.MeshLisek, [1, 0.5, 0, 1], 0),
            children([
                transform([0, 0.35, -0.47], [0.672, 0, 0, 0.74]),
                bone(0 /* Root */, [
                    1.0, 0.0, 0.0, 0.0, 0.0, 0.096, -0.995, 0.0, 0.0, 0.995, 0.096, 0.0, 0.0, 0.433,
                    0.395, 1.0,
                ]),
                animate({
                    idle: {
                        Keyframes: [
                            {
                                Timestamp: 0,
                            },
                        ],
                    },
                    jump: {
                        Keyframes: [
                            {
                                Timestamp: 0.0,
                                Translation: [0, 0.63, 0],
                            },
                            {
                                Timestamp: animation_step_length,
                                Translation: [0, 1.13, 0],
                                Ease: ease_in_out_quart,
                            },
                            {
                                Timestamp: animation_step_length * 2,
                                Translation: [0, 0.63, 0],
                                Ease: ease_out_quart,
                            },
                        ],
                        Flags: 0 /* None */,
                    },
                }),
                children([
                    transform([0, 0.46, 0], [-0.4, 0, 0, 0.92]),
                    bone(1 /* Head */, [
                        1.0, 0.0, 0.0, 0.0, 0.0, 0.795, -0.606, 0.0, 0.0, 0.606, 0.795, 0.0,
                        0.0, -0.306, 0.251, 1.0,
                    ]),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: from_euler([0, 0, 0, 1], -30, 15, 0),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: animation_step_length * 5,
                                    Rotation: from_euler([0, 0, 0, 1], -30, -15, 0),
                                    Ease: ease_in_out_quart,
                                },
                            ],
                        },
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: from_euler([0, 0, 0, 1], -30, 0, 5),
                                },
                                {
                                    Timestamp: animation_step_length,
                                    Rotation: from_euler([0, 0, 0, 1], -30, 0, -5),
                                },
                            ],
                        },
                        jump: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: [0, 0, 0, 1],
                                },
                                {
                                    Timestamp: animation_step_length,
                                    Rotation: from_euler([0, 0, 0, 1], -15, 0, 0),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: animation_step_length * 2,
                                    Rotation: from_euler([0, 0, 0, 1], 0, 0, 0),
                                    Ease: ease_out_quart,
                                },
                            ],
                            Flags: 0 /* None */,
                        },
                    }),
                ], [
                    transform([0.07, 0.46, 0], [0.74, 0, 0, 0.672]),
                    bone(2 /* ArmL */, [
                        1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0, -0.073,
                        0.395, -0.015, 1.0,
                    ]),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                },
                            ],
                        },
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Rotation: from_euler([0, 0, 0, 1], 80, 0, 0),
                                },
                                {
                                    Timestamp: animation_step_length,
                                    Rotation: from_euler([0, 0, 0, 1], 125, 0, 0),
                                },
                            ],
                        },
                        jump: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: [0, 0, 0, 1],
                                },
                                {
                                    Timestamp: animation_step_length,
                                    Rotation: from_euler([0, 0, 0, 1], 0, 0, 135),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: animation_step_length * 2,
                                    Rotation: [0, 0, 0, 1],
                                    Ease: ease_out_quart,
                                },
                            ],
                            Flags: 0 /* None */,
                        },
                    }),
                ], [
                    transform([-0.07, 0.46, 0], [0.74, 0, 0, 0.672]),
                    bone(3 /* ArmR */, [
                        1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, -0.0, -1.0, 0.0, 0.073,
                        0.395, -0.015, 1.0,
                    ]),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                },
                            ],
                        },
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Rotation: from_euler([0, 0, 0, 1], 125, 0, 0),
                                },
                                {
                                    Timestamp: animation_step_length,
                                    Rotation: from_euler([0, 0, 0, 1], 80, 0, 0),
                                },
                            ],
                        },
                        jump: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: [0, 0, 0, 1],
                                },
                                {
                                    Timestamp: animation_step_length,
                                    Rotation: from_euler([0, 0, 0, 1], 0, 0, -135),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: animation_step_length * 2,
                                    Rotation: [0, 0, 0, 1],
                                    Ease: ease_out_quart,
                                },
                            ],
                            Flags: 0 /* None */,
                        },
                    }),
                ], [
                    transform([0.07, 0, 0], [0.753, 0, 0, 0.658]),
                    bone(4 /* HipL */, [
                        1.0, 0.0, 0.0, 0.0, 0.0, -0.992, 0.124, 0.0, 0.0, -0.124, -0.992, 0.0,
                        -0.073, 0.291, -0.509, 1.0,
                    ]),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                },
                            ],
                        },
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Rotation: from_euler([0, 0, 0, 1], 125, 0, 0),
                                },
                                {
                                    Timestamp: animation_step_length,
                                    Rotation: from_euler([0, 0, 0, 1], 80, 0, 0),
                                },
                            ],
                        },
                        jump: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: [0, 0, 0, 1],
                                },
                                {
                                    Timestamp: animation_step_length,
                                    Rotation: from_euler([0, 0, 0, 1], 0, 0, 45),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: animation_step_length * 2,
                                    Rotation: [0, 0, 0, 1],
                                    Ease: ease_out_quart,
                                },
                            ],
                            Flags: 0 /* None */,
                        },
                    }),
                ], [
                    transform([-0.07, 0, 0], [0.753, 0, 0, 0.658]),
                    bone(5 /* HipR */, [
                        1.0, 0.0, 0.0, 0.0, 0.0, -0.992, 0.124, 0.0, 0.0, -0.124, -0.992, 0.0,
                        0.073, 0.291, -0.509, 1.0,
                    ]),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                },
                            ],
                        },
                        walk: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Rotation: from_euler([0, 0, 0, 1], 80, 0, 0),
                                },
                                {
                                    Timestamp: animation_step_length,
                                    Rotation: from_euler([0, 0, 0, 1], 125, 0, 0),
                                },
                            ],
                        },
                        jump: {
                            Keyframes: [
                                {
                                    Timestamp: 0.0,
                                    Rotation: [0, 0, 0, 1],
                                },
                                {
                                    Timestamp: animation_step_length,
                                    Rotation: from_euler([0, 0, 0, 1], 0, 0, -45),
                                    Ease: ease_in_out_quart,
                                },
                                {
                                    Timestamp: animation_step_length * 2,
                                    Rotation: [0, 0, 0, 1],
                                    Ease: ease_out_quart,
                                },
                            ],
                            Flags: 0 /* None */,
                        },
                    }),
                ]),
            ]),
        ];
    }

    function blueprint_player(game) {
        return [
            audio_listener(),
            control_player(1 /* Move */),
            move(1.5, 0),
            collide(true, 1 /* Player */, 2 /* Terrain */ | 4 /* Obstacle */, [0.6, 0.8, 0.8]),
            rigid_body(1 /* Dynamic */, 0),
            children(
            // [
            //     transform(undefined, undefined, [0.6, 0.8, 0.8]),
            //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [1, 1, 1, 1]),
            // ],
            [
                named("mesh anchor"),
                transform([0, -0.42, 0], [0, 0.7, 0, 0.7]),
                control_player(2 /* Rotate */),
                children([
                    transform([0, 0.5, 1], undefined, [0.1, 0.1, 0.1]),
                    collide(true, 0 /* None */, 4 /* Obstacle */),
                    control_player(8 /* Grab */),
                    //render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [1, 1, 1, 1]),
                ]),
            ], [named("camera anchor"), transform([0.5, -0.5, 0])], [
                named("guide anchor"),
                transform([4, 1, 0], [0, 0.7, 0, 0.7]),
                // children([
                //     transform(undefined, undefined, [0.1, 0.1, 0.1]),
                //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
                // ]),
            ]),
        ];
    }
    function instantiate_player(game, translation) {
        instantiate(game, [...blueprint_player(), transform(translation)]);
        let tail_attachment = 0;
        let tail_bone1 = 0;
        let tail_bone2 = 0;
        let tail_bone3 = 0;
        let lisek_entity = instantiate(game, [
            transform([-10, 0, 0.5]),
            mimic(find_first(game.World, "mesh anchor"), 0.2),
            children(
            // The mesh, animated by the player.
            [...blueprint_lisek(game), transform(), control_player(4 /* Animate */)], 
            // The tail, animated procedurally.
            [
                transform(),
                render_colored_skinned(game.MaterialColoredPhongSkinned, game.MeshOgon, [1, 0.5, 0, 1]),
            ], 
            // The tail attachment, animated procedurally.
            [
                transform([0, 0.4, -0.7], from_euler([0, 0, 0, 0], -90, 0, 0)),
                children([
                    transform(),
                    control_always(null, [0, 1, 0, 0]),
                    move(0, 1),
                    callback((game, entity) => (tail_attachment = entity)),
                    bone(0 /* Root */, [
                        1.0, -0.0, -0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -0.0,
                        -0.701, -0.428, 1.0,
                    ]),
                    // children([
                    //     transform(undefined, undefined, [0.1, 0.1, 0.1]),
                    //     render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
                    // ]),
                ]),
            ]),
        ]);
        instantiate(game, [
            transform(),
            mimic(tail_attachment, 0.08),
            bone(1 /* Bone1 */, [
                1.0, -0.0, -0.0, 0.0, 0.0, 0.132, 0.991, 0.0, 0.0, -0.991, 0.132, 0.0, -0.0, -1.1,
                -0.285, 1.0,
            ]),
            children([
                transform([0, 0.2, 0.1], undefined, [0.1, 0.1, 0.1]),
                callback((game, entity) => (tail_bone1 = entity)),
                // render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
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
                // render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
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
                callback((game, entity) => (tail_bone3 = entity)),
                // render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
            ]),
        ]);
        instantiate(game, [
            transform(),
            mimic(tail_bone3, 0.02),
            bone(4 /* Bone4 */, [
                -1.0, 0.0, -0.0, 0.0, 0.0, -0.204, -0.979, 0.0, -0.0, -0.979, 0.204, 0.0, -0.0,
                -2.224, 1.021, 1.0,
            ]),
            children([
                transform([0, 0.2, 0.1], undefined, [0.1, 0.1, 0.1]),
                callback((game, entity) => (entity)),
                // render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [2, 2, 2, 1]),
            ]),
        ]);
        return lisek_entity;
    }

    /**
     * @module components/com_light
     */
    function light_directional(color = [1, 1, 1], range = 1) {
        return (game, entity) => {
            game.World.Signature[entity] |= 8192 /* Light */;
            game.World.Light[entity] = {
                Kind: 1 /* Directional */,
                Color: color,
                Intensity: range ** 2,
            };
        };
    }

    function blueprint_sun(game) {
        return [
            control_always(null, [0, 1, 0, 0]),
            move(0, 0.03),
            children([
                transform([0, 10, 10], from_euler([0, 0, 0, 1], -45, 0, 0)),
                light_directional([1, 1, 1], 0.9),
                camera_depth_ortho(game.Targets.Sun, 10, 1, 100),
            ]),
        ];
    }

    // prettier-ignore
    const leaft_colors = [
        0, 1, 0,
        0, 0.36, 0,
        0, 0.5, 0,
        0.48, 0.98, 0,
        1, 0.84, 0,
        1, 0.54, 0,
        0.84, 0.21, 0.21,
    ];
    function blueprint_tree(game, min = 2, max = 4) {
        let radius = float(0.5, 0.9);
        let leaf_count = integer(400, 600);
        let height = float(min, max);
        let offsets = [];
        let rotations = [];
        for (let i = 0; i < leaf_count; i++) {
            offsets.push(float(-radius, radius), float(-radius, radius), float(-radius, radius), integer(0, 7));
            rotations.push(...from_euler([0, 0, 0, 0], float(-90, 90), float(-90, 90), float(-90, 90)));
        }
        return [
            children([
                transform([0, height / 2, 0], undefined, [0.25, height * 2, 0.25]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.8, 0.2, 0.2, 1]),
            ], [
                transform([0, height, 0]),
                render_instanced(game.MeshLeaf, Float32Array.from(offsets), Float32Array.from(rotations), leaft_colors),
            ]),
        ];
    }
    function blueprint_bush(game) {
        let radius = float(0.5, 0.9);
        let leaf_count = integer(400, 600);
        let offsets = [];
        let rotations = [];
        for (let i = 0; i < leaf_count; i++) {
            offsets.push(float(-radius, radius), float(-radius, radius), float(-radius, radius), integer(0, 7));
            rotations.push(...from_euler([0, 0, 0, 0], float(-90, 90), float(-90, 90), float(-90, 90)));
        }
        return [
            render_instanced(game.MeshLeaf, Float32Array.from(offsets), Float32Array.from(rotations), leaft_colors),
        ];
    }

    function prop_car2(game) {
        return [
            children([
                transform([0, 0.8, 0], undefined, [4, 1, 2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.8, 0.024, 0.016, 1]),
            ], [
                transform([1.276, 0.5, 0], [0.707, 0, 0, 0.707], [2, 4.4, 2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0, 0, 0, 1]),
            ], [
                transform([-1.1, 0.5, 0], [0.707, 0, 0, 0.707], [2, 4.4, 2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0, 0, 0, 1]),
            ], [
                transform([-0.5, 2, 0.9], undefined, [0.2, 1.4, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.8, 0.024, 0.016, 1]),
            ], [
                transform([-0.5, 2, -0.9], undefined, [0.2, 1.4, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.8, 0.024, 0.016, 1]),
            ], [
                transform([1.9, 2, 0.9], undefined, [0.2, 1.4, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.8, 0.024, 0.016, 1]),
            ], [
                transform([1.9, 2, -0.9], undefined, [0.2, 1.4, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.8, 0.024, 0.016, 1]),
            ], [
                transform([0.7, 2.8, 0], undefined, [2.6, 0.2, 2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.8, 0.024, 0.016, 1]),
            ], [
                transform([-2, 1, -0.6], [0.5, 0.5, -0.5, 0.5], [0.8, 0.4, 0.8]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.8, 0.784, 0.019, 1]),
            ], [
                transform([-2, 1, 0.6], [0.5, 0.5, -0.5, 0.5], [0.8, 0.4, 0.8]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.8, 0.784, 0.019, 1]),
            ], [
                transform([0.264, 1.55, 0.55], undefined, [0.2, 0.5, 0.8]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0, 0, 0, 1]),
            ], [
                transform([0.264, 1.55, -0.55], undefined, [0.2, 0.5, 0.8]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0, 0, 0, 1]),
            ]),
        ];
    }

    function prop_house(game) {
        return [
            children([
                transform([0, 1.7, 0], undefined, [3, 3, 3]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.095, 0.095, 0.095, 1]),
            ], [
                transform([-2.25, 1.7, 0], undefined, [1.5, 0.1, 3]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.069, 0.154, 0.8, 1]),
            ], [
                transform([-0.8, 0.1, 0], undefined, [4.9, 0.2, 3.4]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.095, 0.095, 0.095, 1]),
            ], [
                transform([-2.814, 0.95, 0], undefined, [0.1, 1.5, 0.1]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.095, 0.095, 0.095, 1]),
            ]),
        ];
    }

    function prop_slup(game) {
        return [
            children([
                transform([0, 2, 0], undefined, [0.5, 8, 0.5]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.119, 0.027, 0.012, 1]),
            ], [
                transform([0, 3.705, -0.125], undefined, [1.5, 0.225, 0.1]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.119, 0.027, 0.012, 1]),
            ], [
                transform([0, 3.705, 0.125], undefined, [1.5, 0.225, 0.1]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.119, 0.027, 0.012, 1]),
            ], [
                transform([0, 3.164, -0.125], undefined, [1.5, 0.225, 0.1]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.119, 0.027, 0.012, 1]),
            ], [
                transform([0.65, 3.875, -0.125], undefined, [0.2, 0.3, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.367, 0.367, 0.367, 1]),
            ], [
                transform([0.5, 3.875, -0.125], undefined, [0.2, 0.3, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.367, 0.367, 0.367, 1]),
            ], [
                transform([0.65, 3.35, -0.125], undefined, [0.2, 0.3, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.367, 0.367, 0.367, 1]),
            ], [
                transform([0.5, 3.35, -0.125], undefined, [0.2, 0.3, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.367, 0.367, 0.367, 1]),
            ], [
                transform([-0.17, 2.88, -0.12], [0, 0, -0.383, 0.924], [0.6, 0.1, 0.025]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.367, 0.367, 0.367, 1]),
            ], [
                transform([-0.5, 3.875, 0.125], undefined, [0.2, 0.3, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.367, 0.367, 0.367, 1]),
            ], [
                transform([-0.65, 3.875, 0.125], undefined, [0.2, 0.3, 0.2]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCylinder, [0.367, 0.367, 0.367, 1]),
            ]),
        ];
    }

    function prop_box(game) {
        return [
            children([
                transform(undefined, undefined, undefined),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.342, 0.17, 0.035, 1]),
            ], [
                transform([0.171, 0.62, 0], [0, 0, 0.574, 0.819], [0.039, 0.7, 1]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.342, 0.17, 0.035, 1]),
            ], [
                transform([-0.293, 0.536, 0], [0, 0, -0.643, 0.766], [0.039, 0.42, 1]),
                render_colored_shaded(game.MaterialColoredShaded, game.MeshCube, [0.342, 0.17, 0.035, 1]),
            ]),
        ];
    }

    function blueprint_box(game) {
        return [
            collide(true, 4 /* Obstacle */, 2 /* Terrain */ | 4 /* Obstacle */),
            rigid_body(1 /* Dynamic */),
            mimic(0, 0.05),
            disable(16384 /* Mimic */),
            ...prop_box(game),
        ];
    }

    function scene_stage(game) {
        game.World = new World();
        game.ViewportResized = true;
        // Sun.
        instantiate(game, [
            transform(undefined, from_euler([0, 0, 0, 1], 0, 90, 0)),
            ...blueprint_sun(game),
        ]);
        // Ground.
        let ground_size = 16;
        let ground_height = 50;
        instantiate(game, [
            transform([0, -ground_height / 2, 0], undefined, [ground_size, ground_height, ground_size]),
            collide(false, 2 /* Terrain */, 0 /* None */),
            rigid_body(0 /* Static */),
            render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [0.5, 0.5, 0.5, 1]),
        ]);
        let trees = 8;
        for (let i = 0; i < trees; i++) {
            let z = float(-8, -0.5);
            instantiate(game, [
                transform([float(-ground_size / 2, ground_size / 2), 0, z]),
                ...blueprint_tree(game),
            ]);
        }
        let zdzblos = 80;
        let zdz_scale = 0.5;
        let zdz_offsets = [];
        let zdz_rotations = [];
        for (let i = 0; i < zdzblos; i++) {
            zdz_offsets.push(float(-ground_size / 2 / zdz_scale, ground_size / 2 / zdz_scale), 0.2, float(-ground_size / 4 / zdz_scale, ground_size / 4 / zdz_scale), integer(0, 2));
            zdz_rotations.push(...from_euler([0, 0, 0, 1], 0, 0, 0));
        }
        instantiate(game, [
            transform([0, 0, 0], undefined, [zdz_scale, zdz_scale, zdz_scale]),
            render_instanced(game.MeshGrass, Float32Array.from(zdz_offsets), Float32Array.from(zdz_rotations), [1, 0.54, 0, 1, 0.84, 0]),
        ]);
        instantiate_player(game, [-1, 1, 1]);
        instantiate(game, [...blueprint_box(game), transform([2.5, 5, 1])]);
        instantiate(game, [...blueprint_box(game), transform([2.5, 8, 1])]);
        let slups = 2;
        for (let i = 0; i < slups; i++) {
            instantiate(game, [
                transform([float(-ground_size / 2, ground_size / 2), 0, float(-3, 0)], from_euler([0, 0, 0, 1], 0, float(-180, 180), 0)),
                ...prop_slup(game),
            ]);
        }
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
        // Camera.
        instantiate(game, [
            ...blueprint_camera(game, [145 / 255, 85 / 255, 61 / 255, 1]),
            transform([0, 0, 0], from_euler([0, 0, 0, 1], -30, 0, 0)),
            mimic(find_first(game.World, "camera anchor"), 0.01),
        ]);
    }

    let game = new Game();
    scene_stage(game);
    game.Start();
    // @ts-ignore
    window.$ = dispatch.bind(null, game);
    // @ts-ignore
    window.game = game;

}());