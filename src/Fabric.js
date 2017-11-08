import {Area} from "./Area";
import {Access} from "./Access";
import {Position} from "./Position";

export class Fabric {
    constructor() {

    }

    /**
     *
     * @param {string} name
     * @param {int} x
     * @param {int} y
     *
     * @returns {Area}
     */
    newArea(name, x, y) {
        return new Area(name, this.newPosition(x, y))
    }

    /**
     *
     * @param {Area} a1
     * @param {Area} a2
     * @returns {Access}
     */
    newAccess(a1, a2) {
        return new Access(a1, a2);
    }

    /**
     *
     * @param {int} x
     * @param {int} y
     *
     * @returns {Position}
     */
    newPosition(x, y) {
        return new Position(x, y);
    }
}
