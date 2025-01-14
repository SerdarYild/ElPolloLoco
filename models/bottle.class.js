class Bottle extends MovableObject {
    width = 90;
    height = 70;


    constructor(imagePath, y) {
        super().loadImage(imagePath, y);
        this.x = 600 + Math.random() * 3200;
        this.y = y;
    }
}