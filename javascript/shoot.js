/** shotShoot handles the action of a player shooting,
 *  the logic behind the resulting five bullets, and
 *  any resulting collisions.
 * @param {*} susVirus 
 */
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

/** Display the bullets as colored filled circles
 * with their new x and y coordinates.
 */
function moveBullets() {
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