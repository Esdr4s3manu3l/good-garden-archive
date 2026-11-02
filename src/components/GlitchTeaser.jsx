import React, { useState } from 'react';

export default function GlitchTeaser() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      window.location.href = '/hidden-files';
    }, 1200);
  };

  return (
    <div 
      style={styles.container}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <span style={styles.text}>
        {clicked 
          ? "[ ESTABELECENDO CONEXÃO RESTRITA... ]" 
          : hovered 
            ? "[ ERRO DE LEITURA: 0x86_GARDEN ]" 
            : "[ ANOMALIA DETECTADA NO SETOR 4 ]"}
      </span>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0c0f0c',
    border: '1px dashed #873C36',
    padding: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    fontFamily: "'Courier New', monospace",
    fontSize: '11px',
    color: '#A49B86',
    margin: '15px 0',
    transition: 'all 0.3s ease',
  },
  text: {
    letterSpacing: '1px',
  }
};