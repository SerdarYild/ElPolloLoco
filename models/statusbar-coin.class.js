class StatusbarCoin extends Statusbar {
    y = 60;
    x = 300;
    IMAGES_STATUSBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
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