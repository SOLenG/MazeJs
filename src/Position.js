export class Position {
    /**
     *
     * @param {int} x
     * @param {int} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return 'x:' + this.x + ',y:' + this.y;
    }
}
