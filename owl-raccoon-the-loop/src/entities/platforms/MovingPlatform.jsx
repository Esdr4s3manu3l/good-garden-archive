import Phaser from 'phaser';

export class MovingPlatform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, targetX) {
        super(scene, x, y, '');
        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.setDisplaySize(50, 10);
        
        scene.tweens.add({
            targets: this,
            x: targetX,
            duration: 2500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            onUpdate: () => {
                if (this.body) {
                    this.body.updateFromGameObject();
                }
            }
        });
    }
}