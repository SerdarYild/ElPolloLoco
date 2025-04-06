class DrawableObject {
    x = 30;
    y = 230;
    width = 40;
    height = 70;
    img;
    imgCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path and assigns it to the object's img property.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.x = this.x || 0; 
    }

    /**
     * Loads multiple images from the specified array of paths and caches them.
     */
    loadImages(arrayImages) {
        arrayImages.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    /**
     * Draws the image of the object on the canvas.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Image could not be loaded', error);
            console.log(this.img.src);
        }
    }
}