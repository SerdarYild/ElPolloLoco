class BackgroundObject extends MovableObject {
    width = 820;
    height = 480;

    /**
     * Loads an image and sets the object's position.
     * The y-position is calculated based on the height of the object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}