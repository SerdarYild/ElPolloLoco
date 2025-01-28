class Chicken extends MovableObject {
    x = 120;
    y = 340;
    width = 80;
    height = 90;
    
    IMAGES_CHICKEN_WALK = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKEN_WALK);
        this.x = 500 + Math.random() * 4000;
        this.speed = 0.20 + Math.random() * 1;
        this.animate();
    }

    /**
     * This Function Animate the Normal Chicken Class.
     */
    animate() {
        let moveInterval = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            } else {
                clearInterval(moveInterval);
            }
        }, 1000 / 25);

        let animationInterval = setInterval(() => {
            if (!this.isDead()) {
                this.playAnimationMo(this.IMAGES_CHICKEN_WALK);
            } else {
                this.loadImage(this.IMAGES_CHICKEN_DEAD);
                clearInterval(animationInterval);
            }
        }, 100);
    }
}