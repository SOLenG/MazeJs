import {Area} from "./Area";

export class Access {
    /**
     *
     * @param {Area} z1
     * @param {Area} z2
     */
    constructor(z1, z2) {
        this.z1 = z1;
        this.z1.addAccess(z2);
        this.z2 = z2;
    }
}
