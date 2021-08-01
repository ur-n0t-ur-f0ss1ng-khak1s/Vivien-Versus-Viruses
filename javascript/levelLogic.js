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

function levelDraw() {
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
    } else if (level === 3) {
        if (firstVirus.virusExists) {
            context.drawImage(virus, firstVirus.xCoord, firstVirus.yCoord);
        }
        context.drawImage(fatBrickTower, 0, 200)
        context.drawImage(tree, 350, 300);
        context.drawImage(levelThreeBricks, 650, 400);
        context.drawImage(stillVirus, 200, 450);
        context.drawImage(stillVirus, 500, 450);
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
        if (squirted) context.drawImage(endTitle, 400, 100);
        context.drawImage(shortPlatform, 300, 500);
        context.drawImage(shortFloatingPlatform, 700, 300);
        context.drawImage(oneByTwo, 550, 400);
        context.drawImage(vaccine, 1162, 300);
    }
}

function levelInteract() {
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
    
        if (vivX >= 1100) levelTwo();
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
    
        if (vivX >= 1100) levelThree();
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
    
        if (vivX >= 1100) levelFour();
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
    
        if (vivX >= 1100) levelFive();
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
}