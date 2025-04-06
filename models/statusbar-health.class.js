class StatusbarHealth extends Statusbar {
    y = 0;
    IMAGES_STATUSBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * Creates an instance of the status bar and initializes it with default values.
     * Loads the status bar images and sets the initial percentage to 100%.
     */
    constructor() {
        super().loadImages(this.IMAGES_STATUSBAR);
        this.setPercentage(100);
    }
}