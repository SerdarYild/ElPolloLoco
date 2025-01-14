class DrawableObject {
    x = 30;
    y = 230;
    width = 40;
    height = 70;
    img;
    imgCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arrayImages) {
        arrayImages.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.warn('Image could not be loaded', error);
            console.log(this.img.src);
        }
    }
}