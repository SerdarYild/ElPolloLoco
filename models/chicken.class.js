class Chicken extends MovableObject {
    x = 120;
    y = 340;
    width = 80;
    height = 90;
    imagesWalkingChicken = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    imagesDeadChicken = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];
    intervalIds = [];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.imagesWalkingChicken);
        this.x = 500 + Math.random() * 4000;
        this.speed = 0.20 + Math.random() * 1;
        this.animateChicken();
    }

    /**
     * This Function Animate the Normal Chicken Class.
     */
    animateChicken() {
        let intervalChicken = setInterval(() => {
            this.moveLeft();
        }, 1000 / 25);
        setStopableInterval(() => {
            if (!this.isDead()) {
                this.playAnimationMo(this.imagesWalkingChicken);
            } else {
                this.loadImage(this.imagesDeadChicken);
                clearInterval(intervalChicken);
            }
        }, 100);
    }
}