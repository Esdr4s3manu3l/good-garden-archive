export class HUD {
    constructor(scene) {
        this.scene = scene;
        this.hudText = scene.add.text(8, 8, '', {
            fontFamily: 'monospace',
            fontSize: '8px',
            color: '#3fb950'
        });
        this.hudText.setScrollFactor(0);
        this.hudText.setDepth(100);
    }

    updateHUD(level, char, score, loopName) {
        const charLabel = char === 'owl' ? 'OWL [FOCUS]' : 'RACCOON [INSTINCT]';
        this.hudText.setText(`NÍVEL: 0${level} | LOOP: ${loopName}\nCHAR: ${charLabel} | SCORE: ${score}`);
    }
}