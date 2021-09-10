import {GL_CULL_FACE, GL_CW, GL_DEPTH_TEST} from "./webgl.js";
import {Entity, WorldImpl} from "./world.js";

const update_span = document.getElementById("update");
const delta_span = document.getElementById("delta");
const fps_span = document.getElementById("fps");
const step = 1 / 60;

export abstract class GameImpl {
    Running = 0;
    Now = 0;

    abstract World: WorldImpl;

    ViewportWidth = window.innerWidth;
    ViewportHeight = window.innerHeight;
    ViewportResized = true;

    // State of input during this frame.
    // 1 = down, 0 = up, or any number for analog inputs.
    InputState: Record<string, number> = {
        MouseX: 0,
        MouseY: 0,
    };
    // Changes of InputState that happened right before this frame.
    // 1 = pressed, -1 = released, 0 = no change.
    InputDelta: Record<string, number> = {
        MouseX: 0,
        MouseY: 0,
    };
    // Map of touch ids to touch indices. In particular, Firefox assigns high
    // ints as ids. Chrome usually starts at 0, so id === index.
    InputTouches: Record<string, number> = {};

    Ui = document.querySelector("main")!;

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? this.Stop() : this.Start()
        );

        this.Ui.addEventListener("contextmenu", (evt) => evt.preventDefault());

        this.Ui.addEventListener("touchstart", (evt) => {
            if (evt.target === this.Ui) {
                // Prevent browsers from interpreting touch gestures as navigation input.
                evt.preventDefault();
            }

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
            if (evt.target === this.Ui) {
                // Prevent browsers from interpreting touch gestures as navigation input.
                evt.preventDefault();
            }

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
            if (evt.target === this.Ui) {
                // Prevent browsers from interpreting touch gestures as navigation input.
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
    }

    Start() {
        let accumulator = 0;
        let last = performance.now();

        let tick = (now: number) => {
            let delta = (now - last) / 1000;
            this.Now = performance.now(); // FrameSetup().

            accumulator += delta;
            while (accumulator >= step) {
                accumulator -= step;
                this.FixedUpdate(step);

                // InputReset().
                for (let name in this.InputDelta) {
                    this.InputDelta[name] = 0;
                }
            }

            this.FrameUpdate(delta);
            this.ViewportResized = false; // FrameReset().

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

    FixedUpdate(step: number) {}
    FrameUpdate(delta: number) {}
}

export abstract class Game2D extends GameImpl {
    Canvas2D = document.querySelector("canvas")!;
    Context2D = this.Canvas2D.getContext("2d")!;
    Audio = new AudioContext();

    constructor() {
        super();

        this.Canvas2D.width = this.ViewportWidth;
        this.Canvas2D.height = this.ViewportHeight;
        this.Context2D = this.Canvas2D.getContext("2d")!;
    }
}

export abstract class Game3D extends GameImpl {
    Canvas2D = document.querySelector("#billboard")! as HTMLCanvasElement;
    Context2D = this.Canvas2D.getContext("2d")!;

    Canvas3D = document.querySelector("#scene")! as HTMLCanvasElement;
    Gl = this.Canvas3D.getContext("webgl2")!;

    Audio = new AudioContext();

    constructor() {
        super();

        this.Gl.enable(GL_DEPTH_TEST);
        this.Gl.enable(GL_CULL_FACE);
        this.Gl.frontFace(GL_CW);
    }
}

type Mixin<G extends GameImpl> = (game: G, entity: Entity) => void;
export type Blueprint<G extends GameImpl> = Array<Mixin<G>>;

export function instantiate<G extends GameImpl>(game: G, blueprint: Blueprint<G>) {
    let entity = game.World.CreateEntity();
    for (let mixin of blueprint) {
        mixin(game, entity);
    }
    return entity;
}
