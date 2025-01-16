class Statusbar extends DrawableObject {
    width = 250;
    percentage = 100;

    /**
     * This Function is used to show the Current Image from the Status bar.
     * 
     * @param {number} percentage - The Current percentage to show the Current Image. 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR[this.showImageIndex(percentage)];
        this.img = this.imgCache[path];
    }

    /**
     * This Function show the Current Image Index.
     * 
     * @param {number} percentage - The Current percentage to show the Current Image. 
     * @returns {number} Return the Current Image Index.
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