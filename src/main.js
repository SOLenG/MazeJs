import {Fabric} from './Fabric';
import {World} from "./World";

(() => {
    const world = new World(10);
    const fab = new Fabric();

    world.loadArea(fab);
    world.simulate();
})();
