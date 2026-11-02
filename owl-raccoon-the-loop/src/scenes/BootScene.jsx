import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Carregamento de assets gráficos, áudio e fontes para o jogo
    }

    create() {
        this.scene.start('MainMenuScene');
    }
}