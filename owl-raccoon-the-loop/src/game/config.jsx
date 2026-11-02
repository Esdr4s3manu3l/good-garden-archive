import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { MainMenuScene } from '../scenes/MainMenuScene';
import { CharacterSelectScene } from '../scenes/CharacterSelectScene';
import { GameScene } from '../scenes/GameScene';
import { PauseScene } from '../scenes/PauseScene';
import { ResultsScene } from '../scenes/ResultsScene';

export const createGameConfig = (parentRef) => {
    return {
        type: Phaser.AUTO,
        width: 320,
        height: 180,
        parent: parentRef,
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 500, x: 0 },
                debug: false
            }
        },
        scene: [
            BootScene,
            MainMenuScene,
            CharacterSelectScene,
            GameScene,
            PauseScene,
            ResultsScene
        ]
    };
};