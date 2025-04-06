class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;
    progressCoinBar = 0;
    progressBottleBar = 0;
    collectedBottles = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Applies gravity to the object, causing it to fall if above the ground.
     */
    applyGravity() {
        performInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                if (this.y > 230) {
                    this.y = 230;
                    this.speedY = 0;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 230;
        }
    }

    /**
     * Checks if the object is not above the ground.
     */
    isNotAboveGround() {
        return this.speedY > 0 || this.y < 0;
    }

    /**
     * Checks if the object is colliding with another movable object.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the character's energy when hit and updates the last hit time.
     */
    hitCharacter() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the endboss's energy when hit and updates the last hit time.
     */
    hitEndboss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Increases the progress bar for coins.
     */
    raiseProgressbarCoin() {
        if (this.progressCoinBar < 100) {
            let totalCoins = 5;
            let progressStep = 100 / totalCoins;
            
            this.progressCoinBar += progressStep;
            if (this.progressCoinBar > 100) {
                this.progressCoinBar = 100;
            }
            this.updateCoinBar();
        }
    }      

    /**
     * Updates the coin status bar.
     * Sets the percentage of the coin status bar based on the progress.
     */
    updateCoinBar() {
        if (this.world && this.world.statusbarCoin) {
            this.world.statusbarCoin.setPercentage(this.progressCoinBar);
        }
    }

    /**
    * This Function raise the Bottle Progress Bar.
    * 
    */
    raiseProgressbarBottle() {
        if (this.progressBottleBar < 100 && this.collectedBottles < 10) {
            this.collectedBottles++;
            this.progressBottleBar = (this.collectedBottles / 10) * 100;
            this.maxBottlesToThrow++;
            this.updateBottleBar();
        }
    }

    /**
     * This Function reduce the Bottle Progress Bar Bottle.
     * 
     */
    reduceProgressbarBottleThroughThrow() {
        if (this.progressBottleBar > 0 && this.collectedBottles > 0) {
            this.collectedBottles--;
            this.progressBottleBar = (this.collectedBottles / 10) * 100;
            this.updateBottleBar();
        }
    }

    /**
     * Updates the bottle status bar based on collected bottles.
     */
    updateBottleBar() {
        if (this.world && this.world.statusbarBottle) {
            this.world.statusbarBottle.setPercentage(this.progressBottleBar);
        }
    }

    /**
     * Checks if the character is hurt based on the last hit time.
     */
    isHurtCharacter() {
        let timepassed = new Date().getTime() - this.lastHit;  // Difference in milliseconds.
        timepassed = timepassed / 1000;   // Difference in seconds.
        return timepassed < 1;
    }

    /**
     * Checks if the endboss is hurt based on the last hit time.
     */
    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHit;  // Difference in milliseconds.
        timepassed = timepassed / 1000;  // Difference in seconds.
        return timepassed < 0.5;
    }

    /**
     * Checks if the object is dead based on its energy level.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
    * This Function put the energy to 0, for kill the Chicken enemies.
    * 
    * @returns {number} The energystatus from the Movable Object.
    */
    chickenKilled() {
        return this.energy = 0;
    }

    /**
     * Sets the energy of the chicken to 0 when hit by a bottle.
     */
    chickenKilledByBottle() {
        this.energy = 0;
    }

    /**
     * Plays the animation for the movable object.
     * 
     * @param {array} images - The images for the animation.
     */
    playAnimationMo(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }
}