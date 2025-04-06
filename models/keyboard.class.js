class Keyboard {
    left = false;
    right = false;
    space = false;
    d = false;

    constructor() {
        this.eventKeyboardBtns();
        this.eventMobileBtns();
    }

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

    eventMobileBtns() {
        setTimeout(() => {
            document.getElementById('mobileMoveLeft').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.left = true;
            });
    
            document.getElementById('mobileMoveLeft').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.left = false;
            });
    
            document.getElementById('mobileMoveRight').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.right = true;
            });
    
            document.getElementById('mobileMoveRight').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.right = false;
            });
    
            document.getElementById('mobileJump').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.space = true;
            });
    
            document.getElementById('mobileJump').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.space = false;
            });
    
            document.getElementById('mobileThrow').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.d = true;
            });
    
            document.getElementById('mobileThrow').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.d = false;
            });
    
        }, 150);
    }    
}