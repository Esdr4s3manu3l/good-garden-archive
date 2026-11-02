import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    create() {
        this.scene.start('GameScene');
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.activeChar = 'owl';
        this.score = 0;
    }

    create() {
        this.cameras.main.setBackgroundColor('#050805');

        // Plataformas estáticas
        const platforms = this.physics.add.staticGroup();
        
        // Chão principal
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x1a2e1a, 1);
        groundGraphics.fillRect(0, 160, 320, 20);
        platforms.create(160, 170, '').setDisplaySize(320, 20).refreshBody();

        // Plataformas flutuantes (Estética After Hours / Arcade)
        const p1Graphics = this.add.graphics();
        p1Graphics.fillStyle(0x2d5a27, 1);
        p1Graphics.fillRect(70, 114, 60, 12);
        platforms.create(100, 120, '').setDisplaySize(60, 12).refreshBody();

        const p2Graphics = this.add.graphics();
        p2Graphics.fillStyle(0x2d5a27, 1);
        p2Graphics.fillRect(185, 84, 70, 12);
        platforms.create(220, 90, '').setDisplaySize(70, 12).refreshBody();

        // Jogador
        this.player = this.physics.add.sprite(50, 140, '');
        this.player.setDisplaySize(16, 24);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.05);
        this.physics.add.collider(this.player, platforms);

        // Entradas de teclado
        const keyboard = this.input.keyboard;
        if (keyboard) {
            this.cursors = keyboard.createCursorKeys();
            this.keyA = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.keyD = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.keySpace = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.keyQ = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
            this.keyTab = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        }

        // HUD Retrô / Arcade
        this.hudText = this.add.text(8, 8, '', {
            fontFamily: 'monospace',
            fontSize: '8px',
            color: '#3fb950'
        });
        this.updateHUD();
    }

    update() {
        const body = this.player.body;
        if (!body) return;

        // Owl é mais rápido (120), Raccoon é mais pesado/ponderado (90)
        const speed = this.activeChar === 'owl' ? 120 : 90;

        if (this.cursors && (this.cursors.left.isDown || (this.keyA && this.keyA.isDown))) {
            body.setVelocityX(-speed);
        } else if (this.cursors && (this.cursors.right.isDown || (this.keyD && this.keyD.isDown))) {
            body.setVelocityX(speed);
        } else {
            body.setVelocityX(0);
        }

        // Salto variável (Owl pula mais alto: -210, Raccoon: -180)
        const jumpSpeed = this.activeChar === 'owl' ? -210 : -180;
        const jumpPressed = this.keySpace && (Phaser.Input.Keyboard.JustDown(this.keySpace) || (this.cursors && Phaser.Input.Keyboard.JustDown(this.cursors.up)));
        
        if (jumpPressed && body.touching.down) {
            body.setVelocityY(jumpSpeed);
        }

        // Alternância de Personagem (Q ou TAB)
        if (this.keyQ && this.keyTab && (Phaser.Input.Keyboard.JustDown(this.keyQ) || Phaser.Input.Keyboard.JustDown(this.keyTab))) {
            this.activeChar = this.activeChar === 'owl' ? 'raccoon' : 'owl';
            this.updateHUD();
        }
    }

    updateHUD() {
        const charName = this.activeChar === 'owl' ? 'OWL [FOCUS]' : 'RACCOON [INSTINCT]';
        this.hudText.setText(`CHAR: ${charName}\nSCORE: ${this.score} | LOOP: 01 (NORMAL)`);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 180,
    parent: 'game',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500, x: 0 },
            debug: false
        }
    },
    scene: [BootScene, GameScene]
};

new Phaser.Game(config);