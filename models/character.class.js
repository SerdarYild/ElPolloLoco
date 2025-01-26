class Character extends MovableObject {
    x = 30;
    y = 230;
    width = 100;
    height = 200;
    speed = 15;
    characterLastMovement = 0;
	isWalking = false;
	isSnoring = false;
    offset = {
        top: 70,
        bottom: 10,
        left: 35,
        right: 35,
    };
    intervalIds = [];
    world;
    keyboard;
    endOfLevelX = 4500;
    
    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];
    IMAGES_LONG_IDLE = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ];
    IMAGES_JUMP = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];
    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];
    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];

    constructor() {
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.canThrowBottle = true;
        this.animateCharacter();
        this.applyGravity();
    }

    /**
     * This Function Animate the Character.
     */
    animateCharacter() {
        performInterval(() => this.characterMove(), 1000 / 25);
        performInterval(() => this.playCharacter(), 150);
    }

    /**
     * This Function is used to animate the move from the Character Class.
     */
    characterMove() {
        if (this.characterCanMoveRight()) {
            this.characterMoveRight();
        } else if (this.characterCanMoveLeft()) {
            this.characterMoveLeft();
        } else {
            runningAudio.pause();
            runningAudio.currentTime = 0;
        }
        if (this.characterCanJump()) {
            this.characterJump();
        }
        this.scrollTheMap();
    }

    characterCanMoveRight() {
        return this.world.keyboard.right && this.x < 4500;
    }

    /**
     * This Function is used to move the Character Class right and play Sound while the Character Class is moving right.
     */
    characterMoveRight() {
        this.otherDirection = false;
        this.moveRight();
        runningAudio.play();
    }

    characterCanMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }

    /**
     * This Function is used to move the Character Class left and play Sound while the Character Class is moving left.
     *
     */
    characterMoveLeft() {
        this.otherDirection = true;
        this.moveLeft();
        runningAudio.play();
    }

    characterCanJump() {
        return this.world.keyboard.space && !this.isAboveGround();
    }

    /**
     * This Function is used to jump the Character Class and play Sound while the Character Class is jumping.
     */
    characterJump() {
        this.jump();
        jumpAudio.play();
        jumpAudio.volume = 0.3;
    }

    /**
     * This Function is used to in order to the Character Class comes up while jumping.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * This Function Play the Animation from the Character Class for example, if he is Jumping.
     */
    playCharacter() {
        if (this.isHurtCharacter()) {
            this.characterHurt();
        } else if (this.isDead()) {
            this.gameIsLost();
        } else if (this.isNotAboveGround()) {
            this.jumpAnimation();
        } else if (this.characterCanMoveRight() || this.characterCanMoveLeft()) {
            this.characterMoveAnimation();
        } else if (this.characterMoveTimepassed() > 4) {
            this.sleepAnimation();
        } else {
            this.idleAnimation();
        }
    }

    /**
     * This Function play the Hurt Animation from the Character Class, as soon as he take damage.
     */
    characterHurt() {
        this.playAnimationMo(this.IMAGES_HURT);
        hurtAudio.play();
    }

    /**
     * This Function show the Game Over Screen.
     */
    gameIsLost() {
        this.playAnimationMo(this.IMAGES_DEAD);
        gameoverAudio.play();
        clearAllIntervals();
        pauseGameSound();
        showGameOverScreen();
    }

    jumpAnimation() {
        this.playAnimationMo(this.IMAGES_JUMP);
        this.setTimeStamp();
    }

    /**
     * This Function play the move left Animation from the Character
     */
    characterMoveAnimation() {
        this.playAnimationMo(this.IMAGES_WALKING);
        this.setTimeStamp();
    }

    sleepAnimation() {
		this.isSnoring = true;
		this.playAnimationMo(this.IMAGES_LONG_IDLE);
    }

    stopSnoring() {
		if (this.isSnoring) {
			this.isSnoring = false;
			this.setTimeStamp();
		}
	}

    idleAnimation() {
		this.playAnimationMo(this.IMAGES_IDLE);
	}

    characterMoveTimepassed() {
		let timepassed = new Date().getTime() - this.characterLastMovement;
		timepassed = timepassed / 1000;
		return timepassed;
	}

    /**
	* Sets a timestamp for the last movement of the character.
	*/
	setTimeStamp() {
		this.characterLastMovement = new Date().getTime();
	}

    /**
     * This Function scroll the Map, with the Character Class, if he is moving.
     */
    scrollTheMap() {
        if (this.x < this.world.level.levelEndX) {
            this.world.cameraX = -this.x + 30;
        } else {
            this.world.cameraX = -this.world.level.levelEndX + 30;
        }
    }

    characterCanThrowBottle() {
        return this.world.keyboard.d && this.canThrowBottle;
    }
}