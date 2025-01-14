class Character extends MovableObject {
    x = 30;
    y = 230;
    width = 100;
    height = 200;
    speed = 15;
    canThrowBottle = true;
    offset = {
        top: 70,
        bottom: 10,
        left: 35,
        right: 35,
    }
    intervalIds = [];
    characterTimeToSleep = 0;
    imagesWalkingCharacter = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    imagesJumpingCharacter = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    imagesIdleCharacter = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    imagesLongIdleCharacter = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    imagesHurtCharacter = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    imagesDeadCharacter = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.imagesWalkingCharacter);
        this.loadImages(this.imagesJumpingCharacter);
        this.loadImages(this.imagesHurtCharacter);
        this.loadImages(this.imagesDeadCharacter);
        this.loadImages(this.imagesIdleCharacter);
        this.loadImages(this.imagesLongIdleCharacter);
        this.animateCharacter();
        this.addGravity();
    }

    animateCharacter() {
        setStopableInterval(() => this.characterMove(), 1000 / 25);
        setStopableInterval(() => this.playCharacter(), 150);
    }

    characterMove() { 
        if (this.characterCanMoveRight()) 
            this.characterMoveRight(); 
        if (this.characterCanMoveLeft()) 
            this.characterMoveLeft(); 
        if (this.characterCanJump()) 
            this.characterJump(); 
        this.scrollTheMap(); 
    }
    
    characterCanMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.levelEndX;
    }

    characterMoveRight() {
        this.otherDirection = false;
        this.moveRight();
        audioWalkCharacter.play();
    }

    characterCanMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }

    characterMoveLeft() {
        this.otherDirection = true;
        this.moveLeft();
        audioWalkCharacter.play();
    }

    characterCanJump() {
        return this.world.keyboard.space && !this.isAboveGround();
    }

    characterJump() {
        this.jump();
        audioJumpCharacter.play();
        audioJumpCharacter.volume = 0.3;
    }

    jump() {
        this.speedY = 30;
    }
    
    /**
     * This Function scroll the Map, with the Character Class, if he is moving.
     */
    scrollTheMap() {
        this.world.cameraX = -this.x + 30;
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
            this.characterJumpingAnimation();
        } else if (this.characterCanMoveRight() || this.characterCanMoveLeft()) {
            this.characterMoveAnimation();
        } else {
            this.characterSleepAnimation();
        }
    }  

    characterHurt() {
        this.playAnimationMo(this.imagesHurtCharacter);
        audioHurtCharacter.play();
    }

    gameIsLost() {
        this.playAnimationMo(this.imagesDeadCharacter);
        audioGameLost.play();
        clearAllIntervals();
        resetBackgroundMusic();
        showGameOverScreen();
    }

    characterJumpingAnimation() {
        this.playAnimationMo(this.imagesJumpingCharacter);
    }

    characterMoveAnimation() {
        this.playAnimationMo(this.imagesWalkingCharacter);
    }

    characterSleepAnimation() {
        this.playAnimationMo(this.imagesIdleCharacter);
    }

    throwBottle() { 
        let bottle = new ThrowableObject(this.x, this.y, this.otherDirection); 
        this.world.throwableObject.push(bottle); 
        audioThrowBottle.play(); 
        this.canThrowBottle = false;
        setTimeout(() => { 
            this.canThrowBottle = true;
        }, 1000); 
    }
}