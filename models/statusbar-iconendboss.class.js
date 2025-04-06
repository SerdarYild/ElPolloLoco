class StatusbarIconEndboss extends DrawableObject {
    x = 547;
    y = 10;
    width = 70;
    height = 70;
    imageIconEndbossStatusbar = 'img/7_statusbars/3_icons/icon_health_endboss.png';

    /**
     * Creates an instance of the Endboss status bar and loads its image.
     */
    constructor() {
        super();
        this.loadImage(this.imageIconEndbossStatusbar);
    }
}