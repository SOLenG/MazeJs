import {Fabric} from "./Fabric";
import {Area} from "./Area";
import {Position} from "./Position";
import * as BABYLON from 'babylonjs';

export class World {
    constructor(size = 10) {
        this.size = size;
        this.areas = new Set();
        this.access = new Set();
        this.pMap = new Map();
        this.aMap = new Map();
    }

    /**
     *
     * @param {Fabric} fabric
     */
    loadArea(fabric) {
        let i = this.size;

        do {
            let y = this.size;
            do {
                const a1 = fabric.newArea('A' + i + y, i, y);
                this.addZone(a1);
                this.loadAccess(fabric, a1);
            } while (--y >= 0)
        } while (--i >= 0)
    }

    /**
     *
     * @param {Fabric} fabric
     * @param {Area} ar1
     * @param {Area} ar2
     */
    addAccess(fabric, ar1, ar2) {
        const access = [fabric.newAccess(ar1, ar2), fabric.newAccess(ar2, ar1)];
        access.forEach(v => this.access.add(v));
        this.aMap.set((ar1.position.x + ar2.position.x).toString(16) + (ar1.position.y + ar2.position.y).toString(16), access);
    }

    simulate() {
        if(!BABYLON.Engine.isSupported()) {
            return;
        }
        const canvas = document.getElementById('maze');
        const engine = new BABYLON.Engine(canvas, false);
        const scene = createScene(canvas, engine);

        engine.runRenderLoop(function() {
            scene.render();
        });
        // the canvas/window resize event handler
        window.addEventListener('resize', function(){
            engine.resize();
        });
        console.log(this);
    }

    /**
     *
     * @param {Area} area
     */
    addZone(area) {
        this.pMap.set(area.position.toString(), area);
        this.areas.add(area);
    }

    /**
     *
     * @param {Fabric} fabric
     * @param {Area} area
     */
    loadAccess(fabric, area) {

        let ar;

        if ((ar = this.pMap.get(new Position(area.position.x - 1, area.position.y).toString())) !== undefined &&
            !this.aMap.get((area.position.x * 2 - 1).toString(16) + (area.position.y).toString(16))) {
            this.addAccess(fabric, area, ar);
        }
        if ((ar = this.pMap.get(new Position(area.position.x, area.position.y + 1).toString())) !== undefined &&
            !this.aMap.get((area.position.x).toString(16) + (area.position.y * 2 + 1).toString(16))) {
            this.addAccess(fabric, area, ar);
        }
        if ((ar = this.pMap.get(new Position(area.position.x, area.position.y - 1).toString())) !== undefined &&
            !this.aMap.get((area.position.x).toString(16) + (area.position.y * 2 - 1).toString(16))) {
            this.addAccess(fabric, area, ar);
        }
        if ((ar = this.pMap.get(new Position(area.position.x + 1, area.position.y).toString())) !== undefined &&
            !this.aMap.get((area.position.x - 1).toString(16) + (area.position.y).toString(16))) {
            this.addAccess(fabric, area, ar);
        }
    }
}

var createScene = function (canvas, engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3, 12, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    // Add a light
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Tiled Ground Tutorial

    // Part 1 : Creation of Tiled Ground
    // Parameters
    var xmin = -3;
    var zmin = -3;
    var xmax =  3;
    var zmax =  3;
    var precision = {
        "w" : 2,
        "h" : 2
    };
    var subdivisions = {
        'h' : 8,
        'w' : 8
    };
    // Create the Tiled Ground
    var tiledGround = new BABYLON.Mesh.CreateTiledGround("Tiled Ground", xmin, zmin, xmax, zmax, subdivisions, precision, scene);


    // Part 2 : Create the multi material
    // Create differents materials
    var whiteMaterial = new BABYLON.StandardMaterial("White", scene);
    whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var blackMaterial = new BABYLON.StandardMaterial("Black", scene);
    blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    // Create Multi Material
    var multimat = new BABYLON.MultiMaterial("multi", scene);
    multimat.subMaterials.push(whiteMaterial);
    multimat.subMaterials.push(blackMaterial);


    // Part 3 : Apply the multi material
    // Define multimat as material of the tiled ground
    tiledGround.material = multimat;

    // Needed variables to set subMeshes
    var verticesCount = tiledGround.getTotalVertices();
    var tileIndicesLength = tiledGround.getIndices().length / (subdivisions.w * subdivisions.h);

    // Set subMeshes of the tiled ground
    tiledGround.subMeshes = [];
    var base = 0;
    for (var row = 0; row < subdivisions.h; row++) {
        for (var col = 0; col < subdivisions.w; col++) {
            tiledGround.subMeshes.push(new BABYLON.SubMesh(row%2 ^ col%2, 0, verticesCount, base , tileIndicesLength, tiledGround));
            base += tileIndicesLength;
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return scene;
}