/**
 * @module components/com_render
 */

import {Material} from "../../common/material.js";
import {Vec2, Vec4} from "../../common/math.js";
import {Mesh} from "../../common/mesh.js";
import {
    GL_ARRAY_BUFFER,
    GL_DYNAMIC_DRAW,
    GL_ELEMENT_ARRAY_BUFFER,
    GL_FLOAT,
    GL_STATIC_DRAW,
} from "../../common/webgl.js";
import {Entity} from "../../common/world.js";
import {
    ColoredShadedLayout,
    ColoredUnlitLayout,
    FogLayout,
    ForwardShadingLayout,
    InstancedLayout,
    ParticlesColoredLayout,
    ShadowMappingLayout,
    SingleColorLayout,
    SkinningLayout,
} from "../../materials/layout.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export type Render =
    | RenderColoredUnlit
    | RenderColoredShadows
    | RenderColoredSkinned
    | RenderParticlesColored
    | RenderInstanced;

export const enum RenderKind {
    ColoredUnlit,
    ColoredShadows,
    ColoredSkinned,
    ParticlesColored,
    Instanced,
}

const colored_unlit_vaos: WeakMap<Mesh, WebGLVertexArrayObject> = new WeakMap();
const colored_shadows_vaos: WeakMap<Mesh, WebGLVertexArrayObject> = new WeakMap();
const colored_skinned_vaos: WeakMap<Mesh, WebGLVertexArrayObject> = new WeakMap();

export interface RenderColoredUnlit {
    readonly Kind: RenderKind.ColoredUnlit;
    readonly Material: Material<ColoredUnlitLayout>;
    readonly Mesh: Mesh;
    readonly Vao: WebGLVertexArrayObject;
    Color: Vec4;
}

export function render_colored_unlit(
    material: Material<ColoredUnlitLayout>,
    mesh: Mesh,
    color: Vec4
) {
    return (game: Game, entity: Entity) => {
        if (!colored_unlit_vaos.has(mesh)) {
            // We only need to create the VAO once.
            let vao = game.Gl.createVertexArray()!;
            game.Gl.bindVertexArray(vao);

            game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
            game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
            game.Gl.vertexAttribPointer(
                material.Locations.VertexPosition,
                3,
                GL_FLOAT,
                false,
                0,
                0
            );

            game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);

            game.Gl.bindVertexArray(null);
            colored_unlit_vaos.set(mesh, vao);
        }

        game.World.Signature[entity] |= Has.Render;
        game.World.Render[entity] = {
            Kind: RenderKind.ColoredUnlit,
            Material: material,
            Mesh: mesh,
            Vao: colored_unlit_vaos.get(mesh)!,
            Color: color,
        };
    };
}

export interface RenderColoredShadows {
    readonly Kind: RenderKind.ColoredShadows;
    readonly Material: Material<
        ColoredShadedLayout & ForwardShadingLayout & ShadowMappingLayout & FogLayout
    >;
    readonly Mesh: Mesh;
    readonly Vao: WebGLVertexArrayObject;
    DiffuseColor: Vec4;
}

export function render_colored_shadows(
    material: Material<
        ColoredShadedLayout & ForwardShadingLayout & ShadowMappingLayout & FogLayout
    >,
    mesh: Mesh,
    diffuse_color: Vec4
) {
    return (game: Game, entity: Entity) => {
        if (!colored_shadows_vaos.has(mesh)) {
            // We only need to create the VAO once.
            let vao = game.Gl.createVertexArray()!;
            game.Gl.bindVertexArray(vao);

            game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
            game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
            game.Gl.vertexAttribPointer(
                material.Locations.VertexPosition,
                3,
                GL_FLOAT,
                false,
                0,
                0
            );

            game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.NormalBuffer);
            game.Gl.enableVertexAttribArray(material.Locations.VertexNormal);
            game.Gl.vertexAttribPointer(material.Locations.VertexNormal, 3, GL_FLOAT, false, 0, 0);

            game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);

            game.Gl.bindVertexArray(null);
            colored_shadows_vaos.set(mesh, vao);
        }

        game.World.Signature[entity] |= Has.Render;
        game.World.Render[entity] = {
            Kind: RenderKind.ColoredShadows,
            Material: material,
            Mesh: mesh,
            Vao: colored_shadows_vaos.get(mesh)!,
            DiffuseColor: diffuse_color,
        };
    };
}

export interface RenderColoredSkinned {
    readonly Kind: RenderKind.ColoredSkinned;
    readonly Material: Material<ForwardShadingLayout & SkinningLayout & FogLayout>;
    readonly Mesh: Mesh;
    readonly Vao: WebGLVertexArrayObject;
    DiffuseColor: Vec4;
}

export function render_colored_skinned(
    material: Material<ForwardShadingLayout & SkinningLayout & FogLayout>,
    mesh: Mesh,
    diffuse_color: Vec4
) {
    return (game: Game, entity: Entity) => {
        if (!colored_skinned_vaos.has(mesh)) {
            // We only need to create the VAO once.
            let vao = game.Gl.createVertexArray()!;
            game.Gl.bindVertexArray(vao);

            game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
            game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
            game.Gl.vertexAttribPointer(
                material.Locations.VertexPosition,
                3,
                GL_FLOAT,
                false,
                0,
                0
            );

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

        game.World.Signature[entity] |= Has.Render;
        game.World.Render[entity] = {
            Kind: RenderKind.ColoredSkinned,
            Material: material,
            Mesh: mesh,
            Vao: colored_skinned_vaos.get(mesh)!,
            DiffuseColor: diffuse_color,
        };
    };
}

export const DATA_PER_PARTICLE = 8;
export const MAX_PARTICLES = 200;

export interface RenderParticlesColored {
    readonly Kind: RenderKind.ParticlesColored;
    readonly Material: Material<ParticlesColoredLayout & FogLayout>;
    readonly Buffer: WebGLBuffer;
    readonly ColorStart: Vec4;
    readonly ColorEnd: Vec4;
    readonly Size: Vec2;
}

export function render_particles_colored(
    start_color: Vec4,
    start_size: number,
    end_color: Vec4,
    end_size: number
) {
    return (game: Game, entity: Entity) => {
        let buffer = game.Gl.createBuffer()!;
        game.Gl.bindBuffer(GL_ARRAY_BUFFER, buffer);
        game.Gl.bufferData(GL_ARRAY_BUFFER, MAX_PARTICLES * DATA_PER_PARTICLE * 4, GL_DYNAMIC_DRAW);

        game.World.Signature[entity] |= Has.Render;
        game.World.Render[entity] = {
            Kind: RenderKind.ParticlesColored,
            Material: game.MaterialParticlesColored,
            Buffer: buffer,
            ColorStart: start_color,
            ColorEnd: end_color,
            Size: [start_size, end_size],
        };
    };
}

export interface RenderInstanced {
    readonly Kind: RenderKind.Instanced;
    readonly Material: Material<SingleColorLayout & InstancedLayout & FogLayout>;
    readonly Mesh: Mesh;
    readonly Vao: WebGLVertexArrayObject;
    readonly InstanceCount: number;
    readonly InstanceBuffer: WebGLBuffer;
}

export type InstancedData = Float32Array;

export function render_instanced(mesh: Mesh, offsets: InstancedData) {
    return (game: Game, entity: Entity) => {
        let material = game.MaterialInstanced;

        // We can't cache the VAO per mesh, like we do in com_render in other
        // examples, because the offsets vary between the instances of the
        // component. Hint: If offset models are guaranteed to only ever be
        // rendered using the same mesh as atoms (e.g. a model of a horse is
        // always rendered using cube voxels), it might be beneficial to cache
        // VAOs per model.
        let vao = game.Gl.createVertexArray()!;
        game.Gl.bindVertexArray(vao);

        game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
        game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
        game.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);

        let instance_buffer = game.Gl.createBuffer()!;
        game.Gl.bindBuffer(GL_ARRAY_BUFFER, instance_buffer);
        game.Gl.bufferData(GL_ARRAY_BUFFER, offsets, GL_STATIC_DRAW);

        game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn1);
        game.Gl.vertexAttribPointer(
            material.Locations.InstanceColumn1,
            3,
            GL_FLOAT,
            false,
            4 * 16,
            0
        );
        game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn1, 1);

        game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn2);
        game.Gl.vertexAttribPointer(
            material.Locations.InstanceColumn2,
            3,
            GL_FLOAT,
            false,
            4 * 16,
            4 * 4
        );
        game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn2, 1);

        game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn3);
        game.Gl.vertexAttribPointer(
            material.Locations.InstanceColumn3,
            3,
            GL_FLOAT,
            false,
            4 * 16,
            4 * 8
        );
        game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn3, 1);

        game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn4);
        game.Gl.vertexAttribPointer(
            material.Locations.InstanceColumn4,
            3,
            GL_FLOAT,
            false,
            4 * 16,
            4 * 12
        );
        game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn4, 1);

        game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);

        game.Gl.bindVertexArray(null);
        game.World.Signature[entity] |= Has.Render;
        game.World.Render[entity] = {
            Kind: RenderKind.Instanced,
            Material: material,
            Mesh: mesh,
            Vao: vao,
            InstanceCount: offsets.length / 16,
            InstanceBuffer: instance_buffer,
        };
    };
}
