class SmallChicken extends MovableObject {
    x = 120;
    y = 385;
    width = 50;
    height = 40;
    intervalIds = [];
    IMAGES_CHICKEN_SMALL_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',

    ];
    IMAGES_CHICKEN_SMALL_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    /**
     * Creates a small chicken enemy and initializes its properties.
     * Loads the necessary images and sets a random position and speed.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKEN_SMALL_WALK);
        this.x = 500 + Math.random() * 4000;
        this.speed = 0.20 + Math.random() * 1;
        this.animateChicken();
    }

    /**
     * Animates the small chicken class by moving it to the left and playing the appropriate animation.
     * If the small chicken is dead, it stops the movement and changes the image.
     */
    animateChicken() {
        let intervalSmallChicken = setInterval(() => {
            this.moveLeft();
        }, 1000 / 25);
        performInterval(() => {
            if (!this.isDead()) {
                this.playAnimationMo(this.IMAGES_CHICKEN_SMALL_WALK);
            } else {
                this.loadImage(this.IMAGES_CHICKEN_SMALL_DEAD);
                clearInterval(intervalSmallChicken);
            }
        }, 100);
    }
}