import Phaser from 'phaser';

export class GlitchSystem {
    constructor(scene) {
        this.scene = scene;
        this.glitchTimer = 0;
        this.isGlitching = false;
        this.overlayGraphics = scene.add.graphics();
        this.overlayGraphics.setScrollFactor(0);
        this.overlayGraphics.setDepth(999);
    }

    update(time, delta) {
        this.glitchTimer += delta;

        if (this.glitchTimer > 5000) {
            this.triggerGlitchBurst();
            this.glitchTimer = 0;
        }

        if (this.isGlitching) {
            this.renderGlitchFrame();
        } else {
            this.overlayGraphics.clear();
        }
    }

    triggerGlitchBurst() {
        this.isGlitching = true;
        this.scene.time.delayedCall(150, () => {
            this.isGlitching = false;
            this.overlayGraphics.clear();
        });
    }

    renderGlitchFrame() {
        this.overlayGraphics.clear();
        this.overlayGraphics.fillStyle(0x3fb950, 0.15);

        for (let i = 0; i < 4; i++) {
            const y = Phaser.Math.Between(0, 180);
            const h = Phaser.Math.Between(2, 6);
            const w = Phaser.Math.Between(100, 320);
            const x = Phaser.Math.Between(0, 220);
            this.overlayGraphics.fillRect(x, y, w, h);
        }
    }
}