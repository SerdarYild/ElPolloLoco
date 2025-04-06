class Statusbar extends DrawableObject {
    width = 250;
    percentage = 100;

    /**
     * Updates the status of the status bar and sets the corresponding image based on the specified percentage.
     * @param {number} percentage - The current percentage (0-100) that represents the status of the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR[this.showImageIndex(percentage)];
        this.img = this.imgCache[path];
    }

    /**
     * Calculates the index of the image to be displayed for the status bar based on the given percentage.
     * @param {number} percentage - The current percentage (0-100).
     * @returns {number} The index of the image to be displayed for the given percentage.
     */
    showImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}