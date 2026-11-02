import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
    }

    create() {
        const bg = this.add.graphics();
        bg.fillStyle(0x050805, 0.9);
        bg.fillRect(0, 0, 320, 180);

        this.add.text(160, 60, '--- JOGO PAUSADO ---', {
            fontFamily: 'monospace',
            fontSize: '9px',
            color: '#3fb950'
        }).setOrigin(0.5);

        this.add.text(160, 95, 'Pressione [ESC] para Retornar\nPressione [M] para o Menu Principal', {
            fontFamily: 'monospace',
            fontSize: '6px',
            color: '#58a6ff',
            align: 'center'
        }).setOrigin(0.5);

        const keyboard = this.input.keyboard;
        if (keyboard) {
            keyboard.on('keydown-ESC', () => {
                this.scene.resume('GameScene');
                this.scene.stop();
            });
            keyboard.on('keydown-M', () => {
                this.scene.stop('GameScene');
                this.scene.start('MainMenuScene');
            });
        }
    }
}