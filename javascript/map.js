/** This file is responsible for running the game loop and 
 * other essential game logic.
 */
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

standing.addEventListener("load", function() {
    context.drawImage(standing, 0, 400);
    context.drawImage(dirtBlock, 300, 400);
    if (level === 1) {
        context.drawImage(virus, firstVirus.xCoord, firstVirus.yCoord);
    }
}, false);

/** gameLoop() is the main function which is responsible for the live aspect of the game
 * it works by calling input() to position all the canvas elements and then calling move()
 * to display those elements.
 */
function gameLoop() {
    input();

    move();

    window.requestAnimationFrame(gameLoop);
}

/** move() is the parent function for the display/animation logic and generally
 * move() updates the images and elements of the canvas/map.
 */
function move() {
    context.clearRect(0,0,1200,600);
    context.fillRect(0,0,1200,600);

    levelDraw() //display the features on this particular level

    if (shooting) moveBullets(); //display bullets if viv is shooting

    context.drawImage(standing, vivX, vivY);
    context.fillStyle = backGround; 
}

/** input() deals with all the positional logic and supporting positional logic
 * functions to update the viv coordinates and status of viv's movements.
 */
function input() {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    let stance;
    levelInteract()
    if (jump) {
        stance = "images/jumpV1.png";
        jumpLogic();
    } else if (!onGround()) {
        stance = "images/jumpV1.png";
        fallingJump();
    } else if (shotOnce) {
        stance = "images/smoke.png";
    } else {
        stance = "images/standGun.png";
    }

    if (leftArrow) {
        if (stepTime < 12) {
            stance = "images/runningFrameLeft1.png";
            stepTime++;
        } else if (stepTime < 24) {
            stance = "images/runningFrameLeft2.png";
            stepTime++;
        } else if (stepTime < 36) {
            stance = "images/runningFrameLeft3.png";
            stepTime++;
        } else if (stepTime <= 48) {
            stance = "images/runningFrameLeft4.png";
            if (stepTime === 48) stepTime = 0;
            stepTime++;
        }
        direction = "left";
        vivX = vivX - 4;
        if (!onGround()) {
            stance = "images/jumpLeftV1.png";
        }
    } else if (rightArrow) {
        if (stepTime < 12) {
            stance = "images/runningFrame1.png";
            stepTime++;
        } else if (stepTime < 24) {
            stance = "images/runningFrame2.png";
            stepTime++;
        } else if (stepTime < 36) {
            stance = "images/runningFrame3.png";
            stepTime++;
        } else if (stepTime <= 48) {
            stance = "images/runningFrame4.png";
            if (stepTime === 48) stepTime = 0;
            stepTime++;
        }
        direction = "right";
        vivX = vivX + 4;
        if (!onGround()) stance = "images/jumpV1.png";
    }

    if (aimGun) {
        stance = (direction === "right") ? "images/firingGun.png" : "images/firingGunLeft.png";
        
        shootTime++;
        if (shootTime > 20) {

            shootTime = 0;
            aimGun = false;
        }
    }

    standing.src = stance;
}

/** Handles the key down event for any of the four valid key:
 * right arrow, left arrow, up arrow, and space bar. 
 * 
 * @param {*} e 
 */
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightArrow = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftArrow = true;
    } else if (e.keyCode == '38') {
        if (!jump) startHeight = vivY;
        jump = true;
    } else if (e.keyCode == '32') {
        aimGun = true;
        shooting = true;
    }
}

/** Handling a key up event
 * 
 * @param {*} e 
 */
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") rightArrow = false;
    else if (e.key == "Left" || e.key == "ArrowLeft") leftArrow = false;
}

/** Given a feature make sure viv's coordinates cannot enter the 
 * area of the feature.
 * 
 * @param {*} feature 
 */
function checkEdges(feature) {
    if (vivX < 0) vivX = 0;    
    else if (vivX > 1100) vivX = 1100;

    if (vivX > feature.xCoord - 100 &&
        vivX < feature.xCoord + feature.width &&
        vivY >= feature.yCoord - 200 &&
        vivY < feature.yCoord + feature.height
        ) {
            if (feature.onTop) {
                vivY = feature.yCoord - 200;
            } else if (vivY < feature.yCoord + feature.height &&
                vivY > feature.yCoord + feature.height/2) {
                rising = false;
                vivY = feature.yCoord + feature.height;
            } else if (vivX < feature.xCoord + feature.width/2 &&
                vivY > feature.yCoord - 200) {

                vivX = feature.xCoord - 100;
            } else if (vivX > feature.xCoord + feature.width/2 &&
                vivY > feature.yCoord - 200) {

                vivX = feature.xCoord + feature.width;
            } else {
                feature.onTop = true;

                vivY = feature.yCoord - 200;
            }
    }

    if (vivX < feature.xCoord - 100 ||
        vivX > feature.xCoord + feature.width ||
        vivY < feature.yCoord - 200) {

            feature.onTop = false;
    }
}

/** Checks if the virus in question and viv have collided 
 * 
 * @param {*} susVirus 
 */
function checkCollision(susVirus) {
    if (vivX >= susVirus.xCoord - 100 &&
        vivX <= susVirus.xCoord + susVirus.width &&
        vivY >= susVirus.yCoord - susVirus.height &&
        vivY < susVirus.yCoord + susVirus.height) {
        vivDies();
    }
}

/** Handle a scenario where viv dies (collision with a virus)
 * by throwing an alert and restarting the level
 */
function vivDies() {
    alert("you died :(");
    rightArrow = false;
    leftArrow = false;
    standing.src = "images/standGun.png";
    vivX = 0;
    vivY = (level === 3) ? 0 : 400;
}

/** Redirect to the appropriate jump function
 */
function jumpLogic() {
    if (rising) risingJump();
    else fallingJump();
}

/** Checks if viv is on a solid feature or the ground to 
 * support the jump logic.
 */
function onGround() {
    let returnBool;
    let onTop = false;
    existingFeatures.forEach(function(item) {
        if (item.onTop === true) onTop = true;
    })
    if (vivY >= 400 || onTop) returnBool = true;    
    else returnBool = false;
    return returnBool;
}

/** decrement the height of viv to make viv rise
 * until the jump reaches its peak then end the jump
 */
function risingJump() {
    vivY = vivY - 4;
    if (vivY <= startHeight - 200) rising = false;
}

/** fallingJump() checks to see if viv is on the ground
 * or lets viv keep falling.
 */
function fallingJump() {
    if (onGround()) {
        rising = true;
        jump = false;
    }
    setTimeout(function() {
        
        if (!onGround()) {
            vivY = vivY + 4;

            if (onGround()) {
                rising = true;
                jump = false;
            }
        }
    }, 250);
}

/** Adds the css class responsible for revealing the game map.
 */
function startGame() {
    start.classList.add("playing");
}
/** endGame() servers the sole purpose of 
 * assigning the correct animations and timing for the syringe image.
 */
function endGame() {
    if (squirtTime < 30) {
        vaccine.src = "images/vaccine2.png";
        squirtTime++;
    } else {
        vaccine.src = "images/vaccine3.png";
        squirted = true;
    }
}

//calls the game loop initially
gameLoop();