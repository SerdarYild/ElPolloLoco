class Keyboard {
    left = false;
    right = false;
    space = false;
    d = false;

    /**
     * Initializes the keyboard and mobile button event listeners.
     */
    constructor() {
        this.eventKeyboardBtns();
        this.eventMobileBtns();
    }

    /**
     * Adds event listeners for physical keyboard keydown and keyup events.
     * Handles arrow keys, spacebar, and the "D" key.
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
                this.space = true;
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
                this.space = false;
            }
            if (event.keyCode == 32) {
                this.space = false;
            }
            if (event.keyCode == 68) {
                this.d = false;
            }
        });
    }

    /**
     * Adds touch event listeners for mobile control buttons.
     * Waits 150ms before binding events to ensure the DOM is ready.
     */
    eventMobileBtns() {
        setTimeout(() => {
            this.addTouchEvents('mobileMoveLeft', 'left');
            this.addTouchEvents('mobileMoveRight', 'right');
            this.addTouchEvents('mobileJump', 'space');
            this.addTouchEvents('mobileThrow', 'd');
        }, 150);
    }

    /**
     * Adds touchstart and touchend event listeners to a mobile control button.
     * When pressed or released, updates the corresponding control property.
     */
    addTouchEvents(elementId, property) {
        const el = document.getElementById(elementId);
        if (!el) return;

        el.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this[property] = true;
        });

        el.addEventListener('touchend', (event) => {
            event.preventDefault();
            this[property] = false;
        });
    }  
}