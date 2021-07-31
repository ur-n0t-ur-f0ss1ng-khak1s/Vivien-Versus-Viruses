/** The Feature and Virus classes are defined here
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

class Virus extends Feature {
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
        super(x, y, w, h);
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
            if (this.xCoord > this.eastBound) {
                this.direction = "east"
            }
        } else {
            this.xCoord = this.xCoord - 2;
            if (this.xCoord < this.westBound) {
                this.direction = "west"
            }
        }
    }
}