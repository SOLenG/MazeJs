import {Position} from './Position'

export class Area {
    /**
     *
     * @param {string} name
     * @param {Position} position
     */
    constructor(name, position) {
        this.name = name;
        this.position = position;
        this.access = [];
    }

    /**
     *
     * @param {Access} access
     */
    addAccess(access) {
        this.access.push(access);
    }
}
