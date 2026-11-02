import Phaser from 'phaser';

export class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.activeChar = 'owl'; // 'owl' ou 'raccoon'
        
        // Variáveis de mecânica avançada (Coyote Time & Jump Buffer)
        this.coyoteTimeCounter = 0;
        this.coyoteTimeLimit = 8; // frames
        this.jumpBufferCounter = 0;
        this.jumpBufferLimit = 8; // frames
        this.wasOnGround = false;

        // Callbacks
        this.onCharSwitch = null;
        this.onInteract = null;

        // Criação do sprite físico do jogador
        this.sprite = scene.physics.add.sprite(x, y, '');
        this.sprite.setDisplaySize(16, 24);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setBounce(0.05);

        // Configuração de Teclado
        const keyboard = scene.input.keyboard;
        if (keyboard) {
            this.cursors = keyboard.createCursorKeys();
            this.keyA = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.keyD = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.keySpace = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.keyQ = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
            this.keyTab = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
            this.keyE = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

            keyboard.addCapture(['SPACE', 'TAB', 'UP', 'DOWN', 'LEFT', 'RIGHT']);
        }
    }

    setSwitchCallback(cb) {
        this.onCharSwitch = cb;
    }

    setInteractCallback(cb) {
        this.onInteract = cb;
    }

    getActiveChar() {
        return this.activeChar;
    }

    update() {
        const body = this.sprite.body;
        if (!body) return;

        const isOnGround = body.touching.down;

        // Velocidade e força de salto por personagem
        const moveSpeed = this.activeChar === 'owl' ? 120 : 90;
        const jumpForce = this.activeChar === 'owl' ? -220 : -190;

        // Movimento Horizontal
        if (this.cursors && (this.cursors.left.isDown || this.keyA.isDown)) {
            body.setVelocityX(-moveSpeed);
        } else if (this.cursors && (this.cursors.right.isDown || this.keyD.isDown)) {
            body.setVelocityX(moveSpeed);
        } else {
            body.setVelocityX(0);
        }

        // Coyote Time
        if (isOnGround) {
            this.coyoteTimeCounter = this.coyoteTimeLimit;
            this.wasOnGround = true;
        } else {
            if (this.coyoteTimeCounter > 0) {
                this.coyoteTimeCounter--;
            }
        }

        // Jump Buffer
        const jumpPressed = this.keySpace && (Phaser.Input.Keyboard.JustDown(this.keySpace) || (this.cursors && Phaser.Input.Keyboard.JustDown(this.cursors.up)));
        if (jumpPressed) {
            this.jumpBufferCounter = this.jumpBufferLimit;
        } else if (this.jumpBufferCounter > 0) {
            this.jumpBufferCounter--;
        }

        // Execução do Salto
        if (this.jumpBufferCounter > 0 && (this.coyoteTimeCounter > 0 || isOnGround)) {
            body.setVelocityY(jumpForce);
            this.jumpBufferCounter = 0;
            this.coyoteTimeCounter = 0;
        }

        // Troca de Personagens (Q ou TAB)
        if (this.keyQ && this.keyTab && (Phaser.Input.Keyboard.JustDown(this.keyQ) || Phaser.Input.Keyboard.JustDown(this.keyTab))) {
            this.activeChar = this.activeChar === 'owl' ? 'raccoon' : 'owl';
            if (this.onCharSwitch) {
                this.onCharSwitch(this.activeChar);
            }
        }

        // Habilidade Especial (E)
        if (this.keyE && Phaser.Input.Keyboard.JustDown(this.keyE)) {
            if (this.onInteract) {
                this.onInteract(this.activeChar);
            }
        }
    }
}