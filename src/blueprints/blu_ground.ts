import {from_euler} from "../../common/quat.js";
import {float, integer} from "../../common/random.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {render_colored_shadows, render_instanced} from "../components/com_render.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";

export function blueprint_ground(game: Game) {
    let zdzblos = 100;
    let zdz_scale = 0.5;
    let zdz_offsets = [];
    let zdz_rotations = [];
    for (let i = 0; i < zdzblos; i++) {
        zdz_offsets.push(
            float(-1 / 2 / zdz_scale, 1 / 2 / zdz_scale),
            0.8,
            float(-1 / 4 / zdz_scale, 1 / 4 / zdz_scale),
            integer(0, 1)
        );
        zdz_rotations.push(...from_euler([0, 0, 0, 1], 0, float(-180, 180), 0));
    }

    return [
        collide(false, Layer.Terrain | Layer.SurfaceGround, Layer.None),
        rigid_body(RigidKind.Static),
        children(
            [
                transform(),
                render_colored_shadows(game.MaterialColoredShadows, game.MeshCube, [
                    82 / 255,
                    39 / 255,
                    5 / 255,
                    1,
                ]),
            ],
            [
                transform([0, 0, 0], undefined, [zdz_scale, zdz_scale, zdz_scale]),
                render_instanced(
                    game.MeshGrass,
                    Float32Array.from(zdz_offsets),
                    Float32Array.from(zdz_rotations),
                    [1, 0.54, 0, 1, 0.84, 0]
                ),
            ]
        ),
    ];
}
