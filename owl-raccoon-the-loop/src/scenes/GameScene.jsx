import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { LevelManager } from '../systems/LevelManager';
import { GlitchSystem } from '../systems/GlitchSystem';
import { SaveSystem } from '../systems/SaveSystem';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.currentLevel = 1;
    }

    init(data) {
        const savedData = SaveSystem.loadGame();
        this.currentLevel = data && data.level ? data.level : savedData.currentLevel;
    }

    create() {
        this.cameras.main.setBackgroundColor('#050805');
        this.levelManager = new LevelManager(this, this.currentLevel);
        this.glitchSystem = new GlitchSystem(this);

        this.platforms = this.physics.add.staticGroup();
        
        // Chão principal
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x1a2e1a, 1);
        groundGraphics.fillRect(0, 160, 320, 20);
        this.platforms.create(160, 170, '').setDisplaySize(320, 20).refreshBody();

        // Plataformas flutuantes
        const pGraphics = this.add.graphics();
        pGraphics.fillStyle(0x2d5a27, 1);
        pGraphics.fillRect(100, 114, 80, 12);
        this.platforms.create(140, 120, '').setDisplaySize(80, 12).refreshBody();

        // Instanciação do Jogador
        this.player = new Player(this, 30, 140);
        this.physics.add.collider(this.player.sprite, this.platforms);

        // HUD de Jogo
        this.hudText = this.add.text(8, 6, '', {
            fontFamily: 'monospace',
            fontSize: '7px',
            color: '#3fb950'
        });
        this.hudText.setScrollFactor(0);

        this.updateHUD();
    }

    update(time, delta) {
        this.player.update();
        this.glitchSystem.update(time, delta);

        // Conclusão de nível ao atingir a extremidade direita
        if (this.player.sprite.x >= 310) {
            const nextLevel = this.currentLevel + 1;
            SaveSystem.saveGame({
                currentLevel: nextLevel,
                maxLevelUnlocked: Math.max(nextLevel, SaveSystem.loadGame().maxLevelUnlocked),
                score: this.levelManager.getCurrentScore()
            });

            if (nextLevel <= 5) {
                this.scene.restart({ level: nextLevel });
            } else {
                this.scene.start('ResultsScene', { score: this.levelManager.getCurrentScore(), rank: 'S' });
            }
        }
    }

    updateHUD() {
        const char = this.player.getActiveChar().toUpperCase();
        this.hudText.setText(`NÍVEL: 0${this.currentLevel}/05 | CHAR: ${char}\nSCORE: ${this.levelManager.getCurrentScore()} | [Q/TAB] Trocar`);
    }
}