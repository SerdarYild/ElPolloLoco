class StatusbarBottle extends Statusbar {
    y = 0;
    x = 300;
    IMAGES_STATUSBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    /**
     * Creates a status bar instance and initializes it.
     * Loads the status bar images and sets the initial percentage to 100%.
     */
    constructor() {
        super().loadImages(this.IMAGES_STATUSBAR);
        this.setPercentage(0);
    }
}