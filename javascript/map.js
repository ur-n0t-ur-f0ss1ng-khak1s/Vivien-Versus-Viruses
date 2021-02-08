class feature {
    xCoord;
    yCoord;
    width;
    height;
    constructor(x, y, w, h) {
        this.xCoord = x;
        this.yCoord = y;
        this.width = w;
        this.height = h;
    }
}

class Virus extends feature {
    xCoord;
    yCoord;
    width;
    height;
    westBound;
    eastBound;
    direction = "east";

    constructor(x, y, w, h, wB, eB) {
        super(x, y, w, h);
        this.xCoord = x;
        this.yCoord = y;
        this.width = w;
        this.height = h;
        this.westBound = wB;
        this.eastBound = eB;
    }

    crawl() {
        if (this.direction === "west") {
            this.xCoord = this.xCoord + 4;
            if (this.xCoord > this.eastBound) {
                this.direction = "east"
            }
        // if (this.direction = "east")
        } else {
            this.xCoord = this.xCoord - 4;
            if (this.xCoord < this.westBound) {
                this.direction = "west"
            }
        }
    }

}
//startgame button
let startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", startGame);

var map = document.getElementById("gameBoard");
var context = map.getContext("2d");

var backGround = context.createLinearGradient(0,600,0,0);
backGround.addColorStop(0, "#000000"); //bottom color
backGround.addColorStop(1, "#6f0000"); //top color
context.fillStyle = backGround; 
//color background
context.fillRect(0,0,1200,600);

const standing = new Image();
const dirtBlock = new Image();
const virus = new Image();

standing.addEventListener("load", function() {
    context.drawImage(standing, 0, 400);
    context.drawImage(dirtBlock, 300, 400);
    context.drawImage(virus, firstVirus.xCoord, firstVirus.yCoord);
}, false);

standing.src = "images/standGun.png";
dirtBlock.src = "images/dirtBlock.png";
virus.src = "images/virus.png"

let dirt = new feature(300, 400, 200, 200);
let firstVirus = new Virus(500, 450, 150, 150, 500, 1050);

function gameLoop() {
    input();

    move();
    //console.log(vivY, startHeight, rising, jump);
    window.requestAnimationFrame(gameLoop);
}
var vivX = 0;
let vivY = 400;
var onTop = false;

var leftArrow = false;
var rightArrow = false;
let direction;

var jump = false;
var rising = true;
let falling = false;
let startHeight;

let shooting = false;
let shootTime = 0;

function move() {

    context.clearRect(0,0,1200,600);
    context.fillRect(0,0,1200,600);
    context.drawImage(standing, vivX, vivY);
    context.drawImage(dirtBlock, 300, 400);
    context.drawImage(virus, firstVirus.xCoord, firstVirus.yCoord);
}

function input() {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    let stance;
    if (jump) {
        stance = "images/jumpV1.png";
        jumpLogic();
    } else if (!onGround()) {
        rising = false;
        stance = "images/jumpV1.png";
        fallingJump();
    } else {
        stance = "images/standGun.png";
    }

    if (leftArrow) {
        stance = "images/running1flipped.png";
        direction = "left";
        vivX = vivX - 4;
        if (!onGround()) {
            stance = "images/jumpLeftV1.png";
        }
    } else if (rightArrow) {
        stance = "images/running1.png";
        direction = "right";
        vivX = vivX + 4;
        if (!onGround()) {
            stance = "images/jumpV1.png";
        }
    }

    if (shooting) {
        if (direction === "right") {
            stance = "images/firingGun.png";
        } else {
            stance = "images/firingGunLeft.png"
        }

        shootTime++;
        if (shootTime > 20) {
            shootTime = 0;

            shooting = false;
        }
    }

    //console.log(stance);
    standing.src = stance;

    checkEdges();

    firstVirus.crawl();
}

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightArrow = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftArrow = true;
    } 
    else if (e.keyCode == '38') {
        if (!jump) {
            startHeight = vivY;
        }
        jump = true;
    } else if (e.keyCode = '62') {
        shooting = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightArrow = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftArrow = false;
    }
}

function checkEdges() {
    if (vivX < 0) {
        vivX = 0;
    } else if (vivX > 1100) {
        vivX = 1100;
    } else if(vivX > dirt.xCoord - 100 &&
        vivX < dirt.xCoord + dirt.width &&
        vivY >= dirt.yCoord - dirt.height) {
            if (onTop) {
                vivY = dirt.yCoord - dirt.height;

            } else if (vivX > dirt.xCoord + dirt.width/2 &&
                vivY > dirt.yCoord - dirt.height) {

                vivX = dirt.xCoord + dirt.width;
            } else if (vivX < dirt.xCoord + dirt.width/2 &&
                vivY > dirt.yCoord - dirt.height) {

                vivX = dirt.xCoord - 100;
            } else {
                onTop = true;
                vivY = dirt.yCoord - dirt.height;
            }
    }
    if (vivX < dirt.xCoord - 100 ||
        vivX > dirt.xCoord + dirt.width ||
        vivY < dirt.yCoord - dirt.height) {
        
        onTop = false;
    }
}

function jumpLogic() {
    if (rising) {
        risingJump();
    } else {
        fallingJump();
    }
}

function onGround() {
    let returnBool;
    if (vivY >= 400 || onTop) {
        returnBool = true;
    } else {
        returnBool = false;
    }
    return returnBool;
}

function risingJump() {
    vivY = vivY - 4;
    if (vivY <= startHeight - 200) {
        rising = false;
    }
}

function fallingJump() {
    //console.log("falling");        
    checkEdges();
    if (onGround()) {
        rising = true;
        jump = false;
    }
    setTimeout(function() {
        
        if (!onGround() && !rising) {
            //console.log("fell a bit");
            vivY = vivY + 4;

            if (onGround()) {
                rising = true;
                jump = false;
            }
        }
    }, 250);
}

function startGame() {
    start.classList.add("playing");
}

// function shotShoot() {
//     if (bullet3 === undefined) {
//         let bullet1 = new feature(vivX  + 100, vivY - 100, 10, 10);
//         let bullet2 = new feature(vivX  + 100, vivY - 100, 10, 10);
//         let bullet3 = new feature(vivX  + 100, vivY - 100, 10, 10);
//     }
// }

gameLoop();