import Phaser from 'phaser';

export class ResultsScene extends Phaser.Scene {
    constructor() {
        super('ResultsScene');
    }

    create(data) {
        this.cameras.main.setBackgroundColor('#050805');

        this.add.text(160, 35, 'RELATÓRIO DO LOOP', {
            fontFamily: 'monospace',
            fontSize: '9px',
            color: '#3fb950'
        }).setOrigin(0.5);

        this.add.text(160, 75, `CLASSIFICAÇÃO: ${data && data.rank ? data.rank : 'S'}`, {
            fontFamily: 'monospace',
            fontSize: '8px',
            color: '#58a6ff'
        }).setOrigin(0.5);

        this.add.text(160, 95, `PONTUAÇÃO TOTAL: ${data && data.score ? data.score : 0}`, {
            fontFamily: 'monospace',
            fontSize: '7px',
            color: '#8b949e'
        }).setOrigin(0.5);

        this.add.text(160, 145, 'Pressione [ENTER] para Voltar ao Menu', {
            fontFamily: 'monospace',
            fontSize: '5px',
            color: '#3fb950'
        }).setOrigin(0.5);

        if (this.input.keyboard) {
            this.input.keyboard.on('keydown-ENTER', () => {
                this.scene.start('MainMenuScene');
            });
        }
    }
}