import {Fabric} from "./Fabric";
import {Area} from "./Area";
import {Position} from "./Position";

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
