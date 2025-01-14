class Keyboard {
    left = false;
    right = false;
    space = false;
    d = false;

    constructor() {
        this.eventKeyboardBtns();
    }

    /**
    * This Function triggered a key event listener, by triggered keystroke and release the Button.
    * 
    */
    eventKeyboardBtns() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode == 37) {
                this.left = true;
            }

            if (event.keyCode == 39) {
                this.right = true;
            }

            if (event.keyCode == 38) {
                this.up = true;
            }

            if (event.keyCode == 40) {
                this.down = true;
            }

            if (event.keyCode == 32) {
                this.space = true;
            }

            if (event.keyCode == 68) {
                this.d = true;
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 37) {
                this.left = false;
            }

            if (event.keyCode == 39) {
                this.right = false;
            }

            if (event.keyCode == 38) {
                this.up = false;
            }

            if (event.keyCode == 40) {
                this.down = false;
            }

            if (event.keyCode == 32) {
                this.space = false;
            }

            if (event.keyCode == 68) {
                this.d = false;
            }
        });
    }
}