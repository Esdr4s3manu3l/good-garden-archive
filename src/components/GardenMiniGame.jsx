import React, { useEffect, useRef, useState } from 'react';

export default function GardenMiniGame() {
  const gameContainerRef = useRef(null);
  const gameInstanceRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let phaserGame = null;

    // Carrega o Phaser dinamicamente apenas no cliente para evitar erros de SSR (window is not defined)
    import('phaser').then((Phaser) => {
      import('../../owl-raccoon-the-loop/src/scenes/BootScene.jsx').then((bootModule) => {
        import('../../owl-raccoon-the-loop/src/scenes/MainMenuScene.jsx').then((menuModule) => {
          import('../../owl-raccoon-the-loop/src/scenes/GameScene.jsx').then((gameModule) => {
            
            if (!gameContainerRef.current || gameInstanceRef.current) return;

            const config = {
              type: Phaser.default.AUTO,
              width: 480,
              height: 270,
              parent: gameContainerRef.current,
              pixelArt: true,
              physics: {
                default: 'arcade',
                arcade: {
                  gravity: { y: 400 },
                  debug: false
                }
              },
              scene: [
                bootModule.BootScene,
                menuModule.MainMenuScene,
                gameModule.GameScene
              ]
            };

            gameInstanceRef.current = new Phaser.default.Game(config);
          });
        });
      });
    });

    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, [isClient]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>🕹️ OWL & RACCOON: THE LOOP — ARCADE SYSTEM</span>
        <span style={{ color: '#00ff00' }}>● ONLINE</span>
      </div>

      <div style={styles.gameArea}>
        <div ref={gameContainerRef} style={styles.canvasWrapper} />
      </div>

      <div style={styles.footer}>
        <span>CONTROLES: SETAS (Mover/Pular) | Q ou TAB (Trocar Personagem)</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0c0f0c',
    border: '2px inset #A49B86',
    padding: '6px',
    fontFamily: "'Courier New', monospace",
  },
  header: {
    backgroundColor: '#183D28',
    color: '#fff',
    padding: '4px 8px',
    fontSize: '11px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
  },
  gameArea: {
    backgroundColor: '#000',
    border: '1px inset #404040',
    width: '100%',
    height: '270px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  canvasWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: '6px',
    fontSize: '9px',
    color: '#A49B86',
    textAlign: 'center',
    borderTop: '1px dashed #183D28',
    paddingTop: '4px',
  }
};