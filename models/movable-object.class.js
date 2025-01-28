class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;
    progessCoinBar = 0;
    progessBottleBar = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

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

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 230;
        }
    }

    isNotAboveGround() {
        return this.speedY > 0 || this.y < 0;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    isCollected(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hitCharacter() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hitEndboss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    raiseProgressbarCoin() {
        this.progessCoinBar += 5;
    }

    /**
    * This Function raise the Bottle Progress Bar.
    * 
    */
    raiseProgressbarBottle() {
        this.progessBottleBar += 10;
    }

    /**
     * This Function reduce the Bottle Progress Bar Bottle.
     * 
     */
    reduceProgressbarBottleThroughThrow() {
        this.progessBottleBar -= 10;
    }

    isHurtCharacter() {
        let timepassed = new Date().getTime() - this.lastHit;  // Difference in milliseconds.
        timepassed = timepassed / 1000;   // Difference in seconds.
        return timepassed < 1;
    }

    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHit;  // Difference in milliseconds.
        timepassed = timepassed / 1000;  // Difference in seconds.
        return timepassed < 0.5;
    }

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

    playAnimationMo(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }
}