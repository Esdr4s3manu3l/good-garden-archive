import Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
        this.selectedIndex = 0;
        this.options = ['JOGAR', 'SELECIONAR PERSONAGEM', 'ARQUIVOS', 'CONFIGURAÇÕES'];
    }

    create() {
        this.cameras.main.setBackgroundColor('#050805');

        this.add.text(160, 35, 'OWL & RACCOON', {
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#3fb950'
        }).setOrigin(0.5);

        this.add.text(160, 48, 'THE LOOP', {
            fontFamily: 'monospace',
            fontSize: '7px',
            color: '#58a6ff'
        }).setOrigin(0.5);

        this.renderMenu();

        if (this.input.keyboard) {
            this.input.keyboard.on('keydown', (event) => {
                if (event.key === 'ArrowUp') {
                    this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length;
                    this.renderMenu();
                } else if (event.key === 'ArrowDown') {
                    this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
                    this.renderMenu();
                } else if (event.key === 'Enter') {
                    this.selectOption();
                }
            });
        }
    }

    renderMenu() {
        // Limpa os textos anteriores do menu
        this.children.list
            .filter((child) => child.getData && child.getData('menuItem'))
            .forEach((child) => child.destroy());

        let startY = 85;
        this.options.forEach((opt, index) => {
            const color = index === this.selectedIndex ? '#58a6ff' : '#3fb950';
            const prefix = index === this.selectedIndex ? '> ' : '  ';
            const txt = this.add.text(160, startY, `${prefix}${opt}`, {
                fontFamily: 'monospace',
                fontSize: '7px',
                color: color
            }).setOrigin(0.5);
            txt.setData('menuItem', true);
            startY += 16;
        });
    }

    selectOption() {
        if (this.selectedIndex === 0) {
            this.scene.start('GameScene');
        } else if (this.selectedIndex === 1) {
            this.scene.start('CharacterSelectScene');
        }
    }
}