class MovableObject extends DrawbleObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 150;
    }

    //character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }    
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; //diference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //let i = % 0 = 6;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;    
    }

    moveRight() {
        this.x += this.speed;      
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}