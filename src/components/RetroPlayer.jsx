import React, { useState, useRef } from 'react';

export default function RetroPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        alert('Erro ao reproduzir áudio. Verifique se o arquivo existe na pasta public/assets/');
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={styles.playerContainer}>
      {/* Elemento de áudio real apontando para a pasta public/assets/ */}
      <audio ref={audioRef} src="/assets/garden-track.mp3" loop />

      <div style={styles.lcdScreen}>
        <div style={styles.trackInfo}>
          {isPlaying ? "▶ TOCANDO: Acervo_Garden_01.mp3" : "❚❚ PAUSADO: Winamp Idle"}
        </div>
        <div style={styles.equalizer}>
          {isPlaying ? "▇▆▅▄▃▂ █ ▂▃▄▅▆▇" : "_ _ _ _ _ _ _ _ _ _"}
        </div>
      </div>
      
      <div style={styles.controls}>
        <button onClick={togglePlay} style={styles.winButton}>
          {isPlaying ? "■ Parar" : "▶ Tocar"}
        </button>
        <span style={styles.freqText}>128kbps / 44kHz</span>
      </div>
    </div>
  );
}

const styles = {
  playerContainer: {
    backgroundColor: '#222',
    border: '2px inset #555',
    padding: '10px',
    fontFamily: "'Courier New', monospace",
  },
  lcdScreen: {
    backgroundColor: '#000',
    border: '1px solid #183D28',
    padding: '8px',
    marginBottom: '8px',
  },
  trackInfo: {
    fontSize: '11px',
    color: '#00ff00',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  equalizer: {
    fontSize: '12px',
    color: '#183D28',
    letterSpacing: '1px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  winButton: {
    backgroundColor: '#c0c0c0',
    border: '2px outset #fff',
    padding: '3px 10px',
    fontFamily: 'inherit',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '11px',
  },
  freqText: {
    fontSize: '9px',
    color: '#888',
  }
};