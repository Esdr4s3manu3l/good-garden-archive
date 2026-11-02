import React, { useState } from 'react';

export default function RadioStream() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [channel, setChannel] = useState('FREQ_086.4_OWL');

  const toggleStream = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>📡 TRANSMISSÃO AO VIVO — {channel}</span>
        <span style={{ color: isPlaying ? '#00ff00' : '#ff0000' }}>
          {isPlaying ? '● NO AR' : '○ OFFLINE'}
        </span>
      </div>

      <div style={styles.screen}>
        {isPlaying ? (
          <div style={styles.visualizer}>
            <p style={styles.liveText}>[ TRANSMITINDO SINAL SECRETO DO JARDIM ]</p>
            <div className="wave">▄▇▅▆▇▄ █ ▇▆▅▄▇</div>
          </div>
        ) : (
          <p style={styles.offlineText}>[ CLIQUE EM "CONECTAR" PARA SINTONIZAR O SINAL ]</p>
        )}
      </div>

      <div style={styles.controls}>
        <button onClick={toggleStream} style={styles.btn}>
          {isPlaying ? '⏹ Desconectar Rádio' : '▶ Sintonizar Rádio'}
        </button>
        <div style={styles.freqSelector}>
          <button 
            onClick={() => setChannel('FREQ_086.4_OWL')} 
            style={{...styles.chanBtn, fontWeight: channel === 'FREQ_086.4_OWL' ? 'bold' : 'normal'}}
          >
            Owl.freq
          </button>
          <button 
            onClick={() => setChannel('FREQ_99.1_RACCOON')} 
            style={{...styles.chanBtn, fontWeight: channel === 'FREQ_99.1_RACCOON' ? 'bold' : 'normal'}}
          >
            Raccoon.freq
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0c0f0c',
    border: '2px inset #A49B86',
    padding: '12px',
    fontFamily: "'Courier New', monospace",
    marginBottom: '15px',
  },
  header: {
    backgroundColor: '#183D28',
    color: '#fff',
    padding: '4px 8px',
    fontSize: '11px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  screen: {
    backgroundColor: '#000',
    border: '1px inset #404040',
    height: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '8px',
    padding: '10px',
  },
  liveText: {
    color: '#00ff00',
    fontSize: '11px',
    margin: 0,
    animation: 'blink 1.5s infinite',
  },
  offlineText: {
    color: '#666',
    fontSize: '11px',
    margin: 0,
  },
  visualizer: {
    color: '#183D28',
    fontSize: '16px',
    letterSpacing: '3px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#c0c0c0',
    border: '2px outset #fff',
    padding: '4px 10px',
    fontFamily: 'inherit',
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  freqSelector: {
    display: 'flex',
    gap: '4px',
  },
  chanBtn: {
    backgroundColor: '#101310',
    color: '#A49B86',
    border: '1px solid #404040',
    fontSize: '10px',
    padding: '3px 6px',
    cursor: 'pointer',
  }
};