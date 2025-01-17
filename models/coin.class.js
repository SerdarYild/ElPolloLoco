class Coin extends MovableObject {
    width = 90;
    height = 90;
    
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
    intervalIds = [];

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 300 + Math.random() * 3500;
        this.y = 100 + Math.random() * 100;
        this.loadImages(this.IMAGES_COIN);
        this.animate();
    }

    /**
     * This Function Animate the Coins.
     */
    animate() {
        setInterval(() => {
            this.playAnimationMo(this.IMAGES_COIN)
        }, 350);
    }
}