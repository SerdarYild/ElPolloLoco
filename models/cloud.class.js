class Cloud extends MovableObject {
    y = 0;
    width = 400;
    height = 350;
    speed = 0.20;

    /**
     * Creates an object with an image and sets its position.
     * 
     * This constructor loads the specified image for the object
     * and sets its x-coordinate. It also starts the animation.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath, x);
        this.x = x;
        this.animate();
    }

    /**
     * This Function Animate the Cloud Class.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 15);
    }
}