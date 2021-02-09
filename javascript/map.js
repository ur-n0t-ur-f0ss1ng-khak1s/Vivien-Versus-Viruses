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
    virusExists;

    constructor(x, y, w, h, wB, eB) {
        super(x, y, w, h);
        this.xCoord = x;
        this.yCoord = y;
        this.width = w;
        this.height = h;
        this.westBound = wB;
        this.eastBound = eB;
        this.virusExists = true;
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
//character variables
var vivX = 0;
let vivY = 400;
var onTop = false;

//running variables
var leftArrow = false;
var rightArrow = false;
let direction;

//jump variables
var jump = false;
var rising = true;
let falling = false;
let startHeight;

//gun variable
let aimGun = false;
let shooting = false;
let shootTime = 0;
let shootDirection;
let shootStartX;
let shootStartY;
let bullet1;
let bullet2;
let bullet3;
let bullet4;
let bullet5;
let bullets = [];

//let virusExists = true;

function move() {

    context.clearRect(0,0,1200,600);
    context.fillRect(0,0,1200,600);
    context.drawImage(standing, vivX, vivY);
    context.drawImage(dirtBlock, 300, 400);
    if (firstVirus.virusExists) {
        context.drawImage(virus, firstVirus.xCoord, firstVirus.yCoord);
    }
    if (shooting) {
        context.beginPath();
        context.fillStyle = "#b87333";
        context.arc(bullet3.xCoord, bullet1.yCoord,5,0,2*Math.PI);
        context.fill();
        context.arc(bullet3.xCoord, bullet2.yCoord,5,0,2*Math.PI);
        context.fill();
        context.arc(bullet3.xCoord, bullet3.yCoord,5,0,2*Math.PI);
        context.fill();
        context.arc(bullet3.xCoord, bullet4.yCoord,5,0,2*Math.PI);
        context.fill();
        context.arc(bullet3.xCoord, bullet5.yCoord,5,0,2*Math.PI);
        context.fill();
    }
    context.fillStyle = backGround; 
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

    if (aimGun) {
        if (direction === "right") {
            stance = "images/firingGun.png";
        } else {
            stance = "images/firingGunLeft.png"
        }
        
        shootTime++;
        if (shootTime > 20) {
            shootTime = 0;

            aimGun = false;
        }
    }

    if (shooting) {
        shotShoot(firstVirus);
    }

    standing.src = stance;

    checkEdges();
    if (firstVirus.virusExists) {
        firstVirus.crawl();

        checkCollision(firstVirus);
    }

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
        aimGun = true;
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

function checkCollision(susVirus) {
    if (vivX >= susVirus.xCoord - 100 &&
        vivX <= susVirus.xCoord + susVirus.width &&
        vivY >= susVirus.yCoord - susVirus.height) {
        vivDies();
    }
}

function vivDies() {
    standing.src = "images/standGun.png";
    vivX = 0;
    vivY = 400;
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
    checkEdges();
    if (onGround()) {
        rising = true;
        jump = false;
    }
    setTimeout(function() {
        
        if (!onGround() && !rising) {
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


function shotShoot(susVirus) {
    if (bullet3 === undefined) {
        if (direction === "right") {
            bullet1 = new feature(vivX + 100, vivY + 100, 10, 10);
            bullet2 = new feature(vivX + 100, vivY + 100, 10, 10);
            bullet3 = new feature(vivX + 100, vivY + 100, 10, 10);
            bullet4 = new feature(vivX + 100, vivY + 100, 10, 10);
            bullet5 = new feature(vivX + 100, vivY + 100, 10, 10);
            bullets = [bullet1, bullet2, bullet3, bullet4, bullet5];
            shootStartX = vivX + 100;
        } else {
            bullet1 = new feature(vivX, vivY + 100, 10, 10);
            bullet2 = new feature(vivX, vivY + 100, 10, 10);
            bullet3 = new feature(vivX, vivY + 100, 10, 10);
            bullet4 = new feature(vivX, vivY + 100, 10, 10);
            bullet5 = new feature(vivX, vivY + 100, 10, 10);
            bullets = [bullet1, bullet2, bullet3, bullet4, bullet5];
            shootStartX = vivX;
        }

        shootDirection = direction;
        shootStartY = vivY + 100;
    } else {

        for(let i = 0; i < 5; i ++) {
            if (bullets[i].xCoord >= susVirus.xCoord - 100 &&
                bullets[i].xCoord <= susVirus.xCoord + susVirus.width &&
                bullets[i].yCoord >= susVirus.yCoord &&
                bullets[i].yCoord <= susVirus.yCoord + susVirus.height) {
                    susVirus.virusExists = false;
                }
        }
        if (shootDirection === "right") {
            if (bullet3.xCoord <= shootStartX + 290) {
                bullet3.xCoord = bullet3.xCoord + 10;
                bullet1.yCoord = (bullet3.xCoord - shootStartX)/12 + shootStartY;
                bullet2.yCoord = (bullet3.xCoord - shootStartX)/6 + shootStartY;
                bullet4.yCoord = shootStartY - (bullet3.xCoord - shootStartX)/6;
                bullet5.yCoord = shootStartY - (bullet3.xCoord - shootStartX)/12;
            } else {
                shooting = false;
                bullet1 = undefined;
                bullet2 = undefined;
                bullet3 = undefined;
                bullet4 = undefined;
                bullet5 = undefined;
            }
        } else {
            if (bullet3.xCoord >= shootStartX - 290) {
                bullet3.xCoord = bullet3.xCoord - 10;
                bullet1.yCoord = (bullet3.xCoord - shootStartX)/12 + shootStartY;
                bullet2.yCoord = (bullet3.xCoord - shootStartX)/6 + shootStartY;
                bullet4.yCoord = shootStartY - (bullet3.xCoord - shootStartX)/6;
                bullet5.yCoord = shootStartY - (bullet3.xCoord - shootStartX)/12;
            } else {
                shooting = false;
                bullet1 = undefined;
                bullet2 = undefined;
                bullet3 = undefined;
                bullet4 = undefined;
                bullet5 = undefined;
            }
        }
    }
}

gameLoop();