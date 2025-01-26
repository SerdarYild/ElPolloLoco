class ThrowableObject extends MovableObject {
    speedY = 0;
    speedX = 0;
    acceleration = 1.5;
    intervalIds = [];

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

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_BOTTLE_ROTATION);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.throw();
        this.animate();
        this.width = 100;
        this.height = 80;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
    }

    /**
     * function the bottle is animated and moved
     * 
     */
    throw() {
        this.speedY = -10;
        this.speedX = 15;
        this.applyGravityBottle();
        this.move();
    }

    move() {
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }

    applyGravityBottle() {
        setInterval(() => {
            if (this.y < canvas.height) {
                this.y += this.speedY;
                this.speedY += this.acceleration;
            } else {
                this.deleteBottle();
            }
        }, 1000 / 25);
    }

    animate() {
        performInterval(() => {
            if (!world.level.endboss[0].isHurtEndboss()) {
                this.playAnimationMo(this.IMAGE_BOTTLE_ROTATION);
            } else {
                this.playAnimationMo(this.IMAGE_BOTTLE_SPLASH);
            }
        }, 1000 / 25);
    }

    deleteBottle() {
        this.visible = false;
    }
}