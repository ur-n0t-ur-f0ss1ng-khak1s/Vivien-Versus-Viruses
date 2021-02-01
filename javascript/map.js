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
//startgame button
let startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", startGame);

var map = document.getElementById("gameBoard");
var context = map.getContext("2d");

var backGround = context.createLinearGradient(0,600,0,0);
backGround.addColorStop(0, "#B91372"); //bottom color
backGround.addColorStop(1, "#42378F"); //top color
context.fillStyle = backGround; 
//color background
context.fillRect(0,0,1200,600);

const standing = new Image();
const dirtBlock = new Image();
standing.addEventListener("load", function() {
    context.drawImage(standing, 0, 400);
    context.drawImage(dirtBlock, 300, 400);
}, false);
standing.src = "images/standGun.png";
dirtBlock.src = "images/dirtBlock.png";

let dirt = new feature(300, 400, 200, 200);

function gameLoop() {
    input();

    move();
    console.log(vivY, startHeight, rising, jump);
    window.requestAnimationFrame(gameLoop);
}
var vivX = 0;
let vivY = 400;
var onTop = false;

var leftArrow = false;
var rightArrow = false;

var jump = false;
var rising = true;
let falling = false;
let startHeight;

function move() {

    context.clearRect(0,0,1200,600);
    context.fillRect(0,0,1200,600);
    context.drawImage(standing, vivX, vivY);
    context.drawImage(dirtBlock, 300, 400);
}

function input() {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    if (jump) {
        standing.src = "images/jumpV1.png";
        jumpLogic();
    } else if (!onGround()) {
        rising = false;
        standing.src = "images/jumpV1.png";
        fallingJump();
    } else {
        standing.src = "images/standGun.png";
    }

    if (leftArrow) {
        standing.src = "images/running1flipped.png";
        vivX = vivX - 4;
        if (!onGround) {
            standing.src = "images/jumpLeftV1.1.png";
        }
    } else if (rightArrow) {
        standing.src = "images/running1.png";
        vivX = vivX + 4;
        if (!onGround) {
            standing.src = "images/jumpV1.png";
        }
    }

    checkEdges();


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
    console.log("falling");        
    checkEdges();
    if (onGround()) {
        rising = true;
        jump = false;
    }
    setTimeout(function() {
        
        if (!onGround() && !rising) {
            console.log("fell a bit");
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
gameLoop();