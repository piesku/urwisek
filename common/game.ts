import {GL_CULL_FACE, GL_CW, GL_DEPTH_TEST} from "./webgl.js";
import {Entity, WorldImpl} from "./world.js";

const update_span = document.getElementById("update");
const delta_span = document.getElementById("delta");
const fps_span = document.getElementById("fps");
const step = 1 / 60;

export const enum QualitySettings {
    Low = 512,
    Medium = 1024,
    High = 2048,
    Ultra = 4096,
}

export abstract class Game3D {
    Running = 0;
    Now = 0;
    // Start at High to make sure the title screen runs smoothly; there's not
    // much to render at that point but we need the rocket spawner to spawn
    // frequently enough. tick() will scale it down dynamically if necessary.
    Quality = QualitySettings.High;

    abstract World: WorldImpl;

    ViewportWidth = window.innerWidth;
    ViewportHeight = window.innerHeight;
    ViewportResized = true;

    // State of input during this frame.
    // 1 = down, 0 = up, or any number for analog inputs.
    InputState: Record<string, number> = {};
    // Changes of InputState that happened right before this frame.
    // 1 = pressed, -1 = released, 0 = no change.
    InputDelta: Record<string, number> = {};
    // Map of touch ids to touch indices. In particular, Firefox assigns high
    // ints as ids. Chrome usually starts at 0, so id === index.
    InputTouches: Record<string, number> = {};

    Ui = document.querySelector("main")!;

    Canvas3D = document.querySelector("canvas")!;
    Gl = this.Canvas3D.getContext("webgl2")!;

    Audio = new AudioContext();

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? this.Stop() : this.Start()
        );

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

        this.Gl.enable(GL_DEPTH_TEST);
        this.Gl.enable(GL_CULL_FACE);
        this.Gl.frontFace(GL_CW);
    }

    Start() {
        let accumulator = 0;
        let last = performance.now();

        let delta_cma = 0;
        let frame_count = 0;

        let tick = (now: number) => {
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
                // Compute the cumulative moving average of deltas.
                delta_cma += (delta - delta_cma) / frame_count;
                if (delta_cma > 0.018) {
                    delta_cma = 0;
                    frame_count = 0;
                    this.Quality = Math.max(QualitySettings.Low, this.Quality / 2);
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

    FrameSetup(delta: number) {
        this.Now = performance.now();
    }

    FixedUpdate(step: number) {}
    FrameUpdate(delta: number) {}

    InputReset() {
        for (let name in this.InputDelta) {
            this.InputDelta[name] = 0;
        }
    }

    FrameReset(delta: number) {
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

type Mixin<G extends Game3D> = (game: G, entity: Entity) => void;
export type Blueprint<G extends Game3D> = Array<Mixin<G>>;

export function instantiate<G extends Game3D>(game: G, blueprint: Blueprint<G>) {
    let entity = game.World.CreateEntity();
    for (let mixin of blueprint) {
        mixin(game, entity);
    }
    return entity;
}
