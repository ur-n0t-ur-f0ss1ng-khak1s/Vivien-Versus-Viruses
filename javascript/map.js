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
const virus2 = new Image();
const virusPlatform = new Image();
const smallBrick = new Image();
const sixHundredLongBrick = new Image();
const brickTower = new Image();
const arrow = new Image();
const fatBrickTower = new Image();
const directions = new Image();
const tree = new Image();
const levelThreeBricks = new Image();
const stillVirus = new Image();
const shortPlatform = new Image();
const shortFloatingPlatform = new Image();
const oneByTwo = new Image();
const vaccine = new Image();
const taiwan = new Image();
const duck = new Image();
const angels = new Image();

standing.addEventListener("load", function() {
    context.drawImage(standing, 0, 400);
    context.drawImage(dirtBlock, 300, 400);
    if (level === 1) {
        context.drawImage(virus, firstVirus.xCoord, firstVirus.yCoord);
    }
}, false);

standing.src = "images/standGun.png";
dirtBlock.src = "images/dirtBlock.png";
virus.src = "images/virus.png";
virus2.src = "images/virus.png";
virusPlatform.src = "images/virus.png";
smallBrick.src = "images/brickSmallBlock.png";
sixHundredLongBrick.src = "images/sixHundredLongBrickPlatform.png";
brickTower.src = "images/brickTower.png";
arrow.src = "images/arrow.png";
fatBrickTower.src = "images/fourHundredByTwoHundredBrick.png";
directions.src = "images/directions.png";
tree.src = "images/tree2.png";
levelThreeBricks.src = "images/level3bricks.png";
stillVirus.src = "images/virus.png";
shortPlatform.src = "images/twentyFiveHundredLongBrickPlatform.png";
shortFloatingPlatform.src = "images/threeHundredLongBrickPlatform.png";
oneByTwo.src = "images/150x200.png";
vaccine.src = "images/vaccine1.png";
taiwan.src = "images/taiwanFlag.png";
duck.src = "images/duckymomo.png";
angels.src = "images/angels.png";

let dirt = new Feature(300, 400, 200, 200);
let firstVirus = new Virus(500, 450, 150, 150, 500, 1050);
let secondVirus;
let platformVirus;
let hundredByOneHundredBrick;
let sixHundredBrickPlatform;
let fourHundredBrickTower;
let twoHundredBrickTower;
let firstStillVirus;
let secondStillVirus;
let levelThreeVirus;
let treee;
let thirdFeature;
let featureOne;
let featureTwo;
let featureThree;
let featureFour;

function gameLoop() {
    input();

    move();

    window.requestAnimationFrame(gameLoop);
}
//character variables
var vivX = 0;
let vivY = 400;

//running variables
var leftArrow = false;
var rightArrow = false;
let direction;
let stepTime = 0;

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
let shotOnce = false;

//level variables
let level = 1;
let existingFeatures = [];

//vaccine variable
let squirtTime = 0;
let gameOver = false;
let doOnce = true;

function move() {

    context.clearRect(0,0,1200,600);
    context.fillRect(0,0,1200,600);
    if (level === 1) {
        if (firstVirus.virusExists) {
            context.drawImage(virus, firstVirus.xCoord, firstVirus.yCoord);
        }
        context.drawImage(dirtBlock, 300, 400);
        context.drawImage(arrow, 800, 300);
        context.drawImage(directions, 50, 50);
    } else if (level === 2) {
        if (secondVirus.virusExists) {
            context.drawImage(virus2, secondVirus.xCoord, secondVirus.yCoord);
        }
        if (platformVirus.virusExists) {
            context.drawImage(virusPlatform, platformVirus.xCoord, platformVirus.yCoord);
        }
        context.drawImage(smallBrick, 200, 500);
        context.drawImage(sixHundredLongBrick, 400, 300);
        context.drawImage(brickTower, 1100, 200);
        context.drawImage(taiwan, 50, 50);
    } else if (level === 3) {
        if (firstVirus.virusExists) {
            context.drawImage(virus, firstVirus.xCoord, firstVirus.yCoord);
        }
        context.drawImage(fatBrickTower, 0, 200)
        context.drawImage(tree, 350, 300);
        context.drawImage(levelThreeBricks, 650, 400);
        context.drawImage(stillVirus, 200, 450);
        context.drawImage(stillVirus, 500, 450);
        context.drawImage(angels, 50, 300);
        
    } else if (level === 4) {
        if (firstVirus.virusExists) {
            context.drawImage(virus, firstVirus.xCoord, firstVirus.yCoord);
        }
        context.drawImage(levelThreeBricks, 150, 400);
        context.drawImage(levelThreeBricks, 950, 400);
        context.drawImage(fatBrickTower, 250, 200);
        context.drawImage(fatBrickTower, 750, 200);
        context.drawImage(stillVirus, 450, 450);
        context.drawImage(stillVirus, 600, 450);
        context.drawImage(duck, 250, 350);
    } else if (level === 5) {
        if (firstStillVirus.virusExists) {
            context.drawImage(stillVirus, 550, 250);
        }
        if (secondVirus.virusExists) {
            context.drawImage(virus2, secondVirus.xCoord, secondVirus.yCoord);
        }
        if (platformVirus.virusExists) {
            context.drawImage(virusPlatform, platformVirus.xCoord, platformVirus.yCoord);
        }
        if (firstVirus.virusExists) {
            context.drawImage(virus, firstVirus.xCoord, firstVirus.yCoord);
        }
        context.drawImage(shortPlatform, 300, 500);
        context.drawImage(shortFloatingPlatform, 700, 300);
        context.drawImage(oneByTwo, 550, 400);
        context.drawImage(vaccine, 1162, 300);
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
    context.drawImage(standing, vivX, vivY);
    context.fillStyle = backGround; 
}

function levelTwo() {
    if (level === 1) {
        dirt = null;
        firstVirus = null;
    }
    vivX = 0;
    level = 2;

    hundredByOneHundredBrick = new Feature(200, 500, 100, 100);
    sixHundredBrickPlatform = new Feature(400, 300, 600, 100);
    fourHundredBrickTower = new Feature(1100, 200, 100, 400);
    secondVirus = new Virus(500, 450, 150, 150, 300, 950);
    platformVirus = new Virus(600, 150, 150, 150, 400, 850);

    existingFeatures.pop();
    existingFeatures.push(hundredByOneHundredBrick);
    existingFeatures.push(sixHundredBrickPlatform);
    existingFeatures.push(fourHundredBrickTower);
}

function levelThree() {
    if (level === 2) {
        hundredByOneHundredBrick = null;
        sixHundredBrickPlatform = null;
        fourHundredBrickTower = null;
        secondVirus = null;
    }
    vivX = 0;

    level = 3;
    twoHundredBrickTower = new Feature(0, 200, 200, 400);
    treee = new Feature(350, 300, 150, 300);
    thirdFeature = new Feature(650, 400, 100, 200);
    firstStillVirus = new Virus(200, 450, 150, 150, 0, 0);
    secondStillVirus = new Virus(500, 450, 150, 150, 0, 0);
    firstVirus = new Virus(750, 450, 150, 150, 750, 1050);

    existingFeatures = [];
    existingFeatures.push(twoHundredBrickTower);
    existingFeatures.push(treee);
    existingFeatures.push(thirdFeature);
}

function levelFour() {
    if (level === 3) {
        twoHundredBrickTower = null;
        treee = null;
        thirdFeature = null;
        firstStillVirus = null;
        secondStillVirus = null;
        firstVirus = null;
    }
    vivX = 0;

    level = 4;
    featureOne = new Feature(150, 400, 100, 200);
    featureTwo = new Feature(250, 200, 200, 400);
    featureThree = new Feature(750, 200, 200, 400);
    featureFour = new Feature(950, 400, 100, 400);
    firstStillVirus = new Virus(450, 450, 150, 150, 0, 0);
    secondStillVirus = new Virus(600, 450, 150, 150, 0, 0);
    firstVirus = new Virus(750, 50, 150, 150, 750, 800);

    existingFeatures = [];
    existingFeatures.push(featureOne);
    existingFeatures.push(featureTwo);
    existingFeatures.push(featureThree);
    existingFeatures.push(featureFour);
}

function levelFive() {
    if (level === 4) {
        featureOne = null;
        featureTwo = null;
        featureThree = null;
        featureFour = null;
        firstStillVirus = null;
        secondStillVirus = null;
        firstVirus = null;
    }
    vivX = 0;

    level = 5;
    featureOne = new Feature(300, 500, 300, 100);
    featureTwo = new Feature(550, 400, 150, 200);
    featureThree = new Feature(700, 300, 300, 100);
    firstStillVirus = new Virus(550, 250, 150, 150, 0, 0);
    firstVirus = new Virus(150, 450, 150, 150, 105, 150);
    secondVirus = new Virus(400, 350, 150, 150, 300, 400);
    platformVirus = new Virus(800, 150, 150, 150, 700, 850);

    existingFeatures = [];
    existingFeatures.push(featureOne);
    existingFeatures.push(featureTwo);
    existingFeatures.push(featureThree);
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
            if (stepTime === 48) {
                stepTime = 0;
            }
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
            if (stepTime === 48) {
                stepTime = 0;
            }
            stepTime++;
        }
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
    
    if (level === 1) {
        if (shooting) {
            shotShoot(firstVirus);
        }
    
        if (firstVirus.virusExists && firstVirus.alive) {
            firstVirus.crawl();
    
            checkCollision(firstVirus);
        }

        if (existingFeatures.indexOf(dirt) === -1) {
            existingFeatures.push(dirt);
        }

        checkEdges(dirt);
        virus.src = firstVirus.image;

        if (vivX >= 1100) {
            levelTwo();
        }
    } else if (level === 2) {
        if (shooting) {
            shotShoot(secondVirus);
            shotShoot(platformVirus);
        }
    
        if (secondVirus.virusExists && secondVirus.alive) {
            secondVirus.crawl();
    
            checkCollision(secondVirus);
        }

        if (platformVirus.virusExists && platformVirus.alive) {
            platformVirus.crawl();
    
            checkCollision(platformVirus);
        }

        checkEdges(hundredByOneHundredBrick);
        checkEdges(sixHundredBrickPlatform);
        checkEdges(fourHundredBrickTower);

        virus2.src = secondVirus.image;
        virusPlatform.src = platformVirus.image;

        if (vivX >= 1100) {
            levelThree();
        }
    } else if (level === 3) {
        if (shooting) {
            shotShoot(firstStillVirus);
            shotShoot(firstVirus);
        }

        if (firstVirus.virusExists && firstVirus.alive) {
            firstVirus.crawl();
    
            checkCollision(firstVirus);
        }

        checkCollision(firstStillVirus);
        checkCollision(secondStillVirus);

        checkEdges(twoHundredBrickTower);
        checkEdges(treee);
        checkEdges(thirdFeature);

        virus.src = firstVirus.image;

        if (vivX >= 1100) {
            levelFour();
        }
    } else if (level === 4) {
        if (shooting) {
            shotShoot(firstVirus);
        }

        if (firstVirus.virusExists && firstVirus.alive) {
            firstVirus.crawl();
    
            checkCollision(firstVirus);
        }

        checkCollision(firstStillVirus);
        checkCollision(secondStillVirus);

        existingFeatures.forEach(function(item) {
            checkEdges(item);
        });

        stillVirus.src = firstStillVirus.image;
        virus.src = firstVirus.image;

        if (vivX >= 1100) {
            levelFive();
        }
    } else if (level === 5) {
        if (shooting) {
            shotShoot(firstStillVirus);
            shotShoot(firstVirus);
            shotShoot(secondVirus);
            shotShoot(platformVirus);
        }
        if (firstStillVirus.virusExists && firstStillVirus.alive) {
            checkCollision(firstStillVirus);
        }
        if (secondVirus.virusExists && secondVirus.alive) {
            secondVirus.crawl();
    
            checkCollision(secondVirus);
        }
        if (platformVirus.virusExists && platformVirus.alive) {
            platformVirus.crawl();
    
            checkCollision(platformVirus);
        }
        if (firstVirus.virusExists && firstVirus.alive) {
            firstVirus.crawl();
    
            checkCollision(firstVirus);
        }

        existingFeatures.forEach(function(item) {
            checkEdges(item);
        });

        stillVirus.src = firstStillVirus.image;
        virus2.src = secondVirus.image;
        virusPlatform.src = platformVirus.image;
        virus.src = firstVirus.image;

        if (vivX > 1062 || gameOver) {
            endGame();
            gameOver = true;
        }
    }

    standing.src = stance;
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
    } else if (e.keyCode == '32') {
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

function checkEdges(feature) {
    if (vivX < 0) {
        vivX = 0;
    } else if (vivX > 1100) {
        vivX = 1100;
    } 
    if (vivX > feature.xCoord - 100 &&
        vivX < feature.xCoord + feature.width &&
        vivY >= feature.yCoord - 200 &&
        vivY < feature.yCoord + feature.height
        ) {
            if (feature.onTop) {
                vivY = feature.yCoord - 200;
            } else if (vivY < feature.yCoord + feature.height &&
                vivY > feature.yCoord + feature.height/2) {

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

function checkCollision(susVirus) {
    if (vivX >= susVirus.xCoord - 100 &&
        vivX <= susVirus.xCoord + susVirus.width &&
        vivY >= susVirus.yCoord - susVirus.height &&
        vivY < susVirus.yCoord + susVirus.height) {
        vivDies();
    }
}

function vivDies() {
    alert("you died :(");
    //level = 1;
    rightArrow = false;
    leftArrow = false;
    standing.src = "images/standGun.png";
    vivX = 0;
    if (level === 3) {
        vivY = 0;
    } else {
        vivY = 400;
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
    let onTop = false;
    existingFeatures.forEach(function(item) {
        if (item.onTop === true) {
            onTop = true;
        }
    })
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
    if (level === 1) {
        checkEdges(dirt);
    }
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

function endGame() {
    if (squirtTime < 30) {
        vaccine.src = "images/vaccine2.png";
        squirtTime++;
        if (squirtTime === 29) {
            vaccine.src = "images/vaccine3.png";
        }
    } else {
        standing.src = null;
        vaccine.src = "images/vaccine3.png";
        if (doOnce) {
            alert("Covid-19 is gone!!!");
            doOnce = false;
        }
    }
}

function shotShoot(susVirus) {
    shotOnce = true;
    if (bullet3 === undefined) {
        if (direction === "right") {
            bullet1 = new Feature(vivX + 100, vivY + 100, 10, 10);
            bullet2 = new Feature(vivX + 100, vivY + 100, 10, 10);
            bullet3 = new Feature(vivX + 100, vivY + 100, 10, 10);
            bullet4 = new Feature(vivX + 100, vivY + 100, 10, 10);
            bullet5 = new Feature(vivX + 100, vivY + 100, 10, 10);
            bullets = [bullet1, bullet2, bullet3, bullet4, bullet5];
            shootStartX = vivX + 100;
        } else {
            bullet1 = new Feature(vivX, vivY + 100, 10, 10);
            bullet2 = new Feature(vivX, vivY + 100, 10, 10);
            bullet3 = new Feature(vivX, vivY + 100, 10, 10);
            bullet4 = new Feature(vivX, vivY + 100, 10, 10);
            bullet5 = new Feature(vivX, vivY + 100, 10, 10);
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
                    susVirus.image = "images/deadVirus.png";
                    susVirus.alive = false;
                    setTimeout(function() {
                        susVirus.virusExists = false;
                    }, 1500);
                    
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