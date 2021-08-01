/** The Feature and Virus classes are defined here
 */

/** Features are visible terrain on the canvas and they need coordinates
 * and dimensions so viv cannot move through them.
 */
class Feature {
    xCoord;
    yCoord;
    width;
    height;
    constructor(x, y, w, h) {
        this.xCoord = x;
        this.yCoord = y;
        this.width = w;
        this.height = h;
        this.onTop = false;
    }
}

/** Viruses have dimensions and coordinates like a feature but they 
 * also 'crawl' back and forth in a set pattern or can stay immobile.
 */
class Virus {
    xCoord;
    yCoord;
    width;
    height;
    westBound;
    eastBound;
    direction = "east";
    virusExists;
    image = "images/virus.png";

    constructor(x, y, w, h, wB, eB) {
        this.xCoord = x;
        this.yCoord = y;
        this.width = w;
        this.height = h;
        this.westBound = wB;
        this.eastBound = eB;
        this.virusExists = true;
        this.alive = true;
    }

    crawl() {
        if (this.direction === "west") {
            this.xCoord = this.xCoord + 2;
            if (this.xCoord > this.eastBound) this.direction = "east";
        } else {
            this.xCoord = this.xCoord - 2;
            if (this.xCoord < this.westBound) this.direction = "west";
        }
    }
}