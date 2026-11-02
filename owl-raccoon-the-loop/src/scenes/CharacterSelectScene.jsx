import Phaser from 'phaser';

export class CharacterSelectScene extends Phaser.Scene {
    constructor() {
        super('CharacterSelectScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#050805');

        this.add.text(160, 25, 'SELECIONE O PERSONAGEM', {
            fontFamily: 'monospace',
            fontSize: '8px',
            color: '#3fb950'
        }).setOrigin(0.5);

        this.add.text(80, 85, '[ OWL ]\n- Alta Velocidade\n- Salto Alto\n- Habilidade: FOCUS', {
            fontFamily: 'monospace',
            fontSize: '6px',
            color: '#58a6ff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(240, 85, '[ RACCOON ]\n- Maior Resistência\n- Salto Equilibrado\n- Habilidade: INSTINCT', {
            fontFamily: 'monospace',
            fontSize: '6px',
            color: '#8b949e',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(160, 155, 'Pressione [ESC] para retornar ao Menu', {
            fontFamily: 'monospace',
            fontSize: '5px',
            color: '#8b949e'
        }).setOrigin(0.5);

        if (this.input.keyboard) {
            this.input.keyboard.on('keydown-ESC', () => {
                this.scene.start('MainMenuScene');
            });
        }
    }
}