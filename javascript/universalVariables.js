/** Here all the universal variables and class instances
 *  are initialized.
 */
//initializing image instances
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

//images that will be displayed on the canvas
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

//define present and future features and viruses
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