import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

// Importe as cenas que convertemos para JSX
import { BootScene } from '../owl-raccoon-the-loop/src/scenes/BootScene';
import { MainMenuScene } from '../owl-raccoon-the-loop/src/scenes/MainMenuScene';
import { CharacterSelectScene } from '../owl-raccoon-the-loop/src/scenes/CharacterSelectScene';
import { GameScene } from '../owl-raccoon-the-loop/src/scenes/GameScene';
import { PauseScene } from '../owl-raccoon-the-loop/src/scenes/PauseScene';
import { ResultsScene } from '../owl-raccoon-the-loop/src/scenes/ResultsScene';

export default function GamePage({ onBackToArchive }) {
  const gameRef = useRef(null);

  useEffect(() => {
    // Configuração do Phaser apontando para a div de referência
    const config = {
      type: Phaser.AUTO,
      width: 320,
      height: 180,
      parent: gameRef.current,
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

    const game = new Phaser.Game(config);

    // Limpeza ao desmontar o componente para evitar vazamento de memória do canvas
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#050805',
      color: '#3fb950',
      fontFamily: 'monospace',
      padding: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '640px', marginBottom: '10px' }}>
        <span>[ MÓDULO ATIVO: OWL &amp; RACCOON ]</span>
        <button 
          onClick={onBackToArchive}
          style={{
            background: '#1a2e1a',
            color: '#3fb950',
            border: '1px solid #3fb950',
            padding: '2px 8px',
            cursor: 'pointer',
            fontFamily: 'monospace'
          }}
        >
          [ VOLTAR AO GOOGLE ARCHIVE ]
        </button>
      </div>

      {/* Canvas do Jogo com escala estilo Arcade/CRT (dobro da resolução interna) */}
      <div 
        ref={gameRef} 
        style={{ 
          width: '640px', 
          height: '360px', 
          boxShadow: '0 0 20px rgba(63, 185, 80, 0.3)',
          border: '2px solid #1a2e1a'
        }} 
      />
    </div>
  );
}