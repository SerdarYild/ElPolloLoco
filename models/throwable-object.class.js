class ThrowableObject extends MovableObject {
    IMAGE_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGE_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    intervalIds = [];

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGE_BOTTLE_ROTATION);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.throwBottle();
        this.width = 120;
        this.height = 100;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
    }

    /**
     * In this function the bottle is animated and moved
     * 
     */
    throwBottle() {
        this.addGravityToBottle();
        this.animateBottle();
    }

    addGravityToBottle() {
        this.speedY = 20;
        this.addGravity();
        performInterval(() => {
            if (this.otherDirection) {
                this.x -= 12;
            } else {
                this.otherDirection;
                this.x += 12;
            }
        }, 25);
    }

    animateBottle() {
        performInterval(() => {
            if (!world.level.endboss[0].isHurtEndboss()) {
                this.playAnimationMo(this.IMAGE_BOTTLE_ROTATION);
            } else {
                this.playAnimationMo(this.IMAGE_BOTTLE_SPLASH);
            }
        }, 1000 / 25);
    }
}