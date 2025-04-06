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

    /**
     * Creates a throwable bottle object and initializes its properties.
     * 
     * @param {number} x - The initial x-coordinate of the bottle.
     * @param {number} y - The initial y-coordinate of the bottle.
     * @param {boolean} otherDirection - Determines the direction of the throw (true = left, false = right).
     */
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
        this.speedX = otherDirection ? -15 : 15;
    }

    /**
     * Animates and moves the bottle by applying gravity and updating its position.
     */
    throw() {
        this.speedY = -10;

        this.applyGravityBottle();
        this.move();
    }

    /**
     * Moves the bottle horizontally by updating its x position at regular intervals.
     */
    move() {
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }

    /**
     * Applies gravity to the bottle, updating its y position and speed until it reaches the bottom of the canvas.
     * If the bottle hits the bottom, it is deleted.
     */
    applyGravityBottle() {
        this.intervalId = setInterval(() => {
            if (this.y < canvas.height) {
                this.y += this.speedY;
                this.speedY += this.acceleration;
            } else {
                clearInterval(this.intervalId);
                this.deleteBottle();
            }
        }, 1000 / 25);
    }    

    /**
     * Animates the bottle by rotating or splashing based on the endboss's status.
     */
    animate() {
        performInterval(() => {
            if (this.isColliding(world.level.endboss[0])) {
                this.playAnimationMo(this.IMAGE_BOTTLE_SPLASH);
            } else {
                this.playAnimationMo(this.IMAGE_BOTTLE_ROTATION);
            }
        }, 1000 / 25);
    }

    /**
     * Marks the bottle as invisible, effectively deleting it.
     */
    deleteBottle() {
        this.visible = false;
        this.intervalIds.forEach(id => clearInterval(id));
        this.intervalIds = [];
    }
}