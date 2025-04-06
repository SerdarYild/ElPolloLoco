class Bottle extends MovableObject {
    width = 90;
    height = 70;

    /**
     * Loads an image and sets a random x-position and the given y-position.
     */
    constructor(imagePath, y) {
        super().loadImage(imagePath, y);
        this.x = 600 + Math.random() * 3200;
        this.y = y;
    }
}