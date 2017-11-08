import {Fabric} from "./Fabric";
import {Access} from "./Access";
import {Area} from "./Area";

export class World {
    constructor() {
        this.areas = new Set();
        this.access = new Set();
    }

    /**
     *
     * @param {Fabric} fabric
     */
    loadArea(fabric) {
        const a1 = fabric.newArea('A0', 0, 0);
        const a2 = fabric.newArea('A1', 0, 1);

        this.addZone(a1);
        this.addZone(a2);
        const ac1 = fabric.newAccess(a1, a2);
        this.addAccess(fabric, ac1);
    }

    /**
     *
     * @param {Fabric} fabric
     * @param {Access} ac1
     */
    addAccess(fabric, ac1) {
        this.access.add(ac1);
        const ac2 = fabric.newAccess(ac1.z1, ac1.z2);
        this.access.add(ac2);
    }

    simulate() {

    }

    /**
     *
     * @param {Area} area
     */
    addZone(area) {
        this.areas.add(area);
    }
}
