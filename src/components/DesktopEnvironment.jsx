import React, { useState, useEffect, useRef } from 'react';
import RetroPlayer from './RetroPlayer.jsx';
import ChatRoom from './ChatRoom.jsx';
import SecureTerminal from './SecureTerminal.jsx';
import { playClickSound, playStartupSound } from '../lib/soundEffects';

export default function DesktopEnvironment() {
  const [windows, setWindows] = useState({
    welcome: { title: 'readme.txt', isOpen: true, isMinimized: false, zIndex: 10, x: 50, y: 30 },
    chat: { title: 'IRC_Chat_#garden', isOpen: false, isMinimized: false, zIndex: 11, x: 100, y: 60 },
    player: { title: 'Winamp_v2.91.exe', isOpen: false, isMinimized: false, zIndex: 12, x: 200, y: 100 },
    terminal: { title: 'Terminal_Seguro.exe', isOpen: false, isMinimized: false, zIndex: 14, x: 250, y: 180 },
  });

  const [activeWindow, setActiveWindow] = useState('welcome');
  const [dragging, setDragging] = useState(null);
  const [relPos, setRelPos] = useState({ x: 0, y: 0 });

  // Áudio global em segundo plano persistente
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    playStartupSound();
    audioRef.current = new Audio('/assets/garden-track.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleGlobalAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log("Erro ao reproduzir áudio:", e));
      setIsPlaying(true);
    }
  };

  const openWindow = (key) => {
    playClickSound();
    setWindows(prev => ({
      ...prev,
      [key]: { ...prev[key], isOpen: true, isMinimized: false }
    }));
    bringToFront(key);
  };

  const closeWindow = (key) => {
    playClickSound();
    setWindows(prev => ({
      ...prev,
      [key]: { ...prev[key], isOpen: false }
    }));
  };

  const minimizeWindow = (key) => {
    playClickSound();
    setWindows(prev => ({
      ...prev,
      [key]: { ...prev[key], isMinimized: true }
    }));
  };

  const bringToFront = (key) => {
    setActiveWindow(key);
    setWindows(prev => {
      const maxZ = Math.max(...Object.values(prev).map(w => w.zIndex || 10));
      return {
        ...prev,
        [key]: { ...prev[key], zIndex: maxZ + 1 }
      };
    });
  };

  const handleMouseDown = (e, key) => {
    bringToFront(key);
    const win = windows[key];
    setDragging(key);
    setRelPos({
      x: e.clientX - win.x,
      y: e.clientY - win.y
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const newX = e.clientX - relPos.x;
    const newY = e.clientY - relPos.y;

    setWindows(prev => ({
      ...prev,
      [dragging]: {
        ...prev[dragging],
        x: Math.max(0, newX),
        y: Math.max(0, newY)
      }
    }));
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div 
      style={styles.desktop}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Ícones da Área de Trabalho */}
      <div style={styles.desktopIcons}>
        <div style={styles.iconItem} onClick={() => openWindow('welcome')}>
          <span style={styles.iconImg}>📄</span>
          <span style={styles.iconText}>readme.txt</span>
        </div>
        <div style={styles.iconItem} onClick={() => openWindow('chat')}>
          <span style={styles.iconImg}>💬</span>
          <span style={styles.iconText}>IRC Chat</span>
        </div>
        <div style={styles.iconItem} onClick={() => openWindow('player')}>
          <span style={styles.iconImg}>🎵</span>
          <span style={styles.iconText}>Winamp</span>
        </div>
        <div style={styles.iconItem} onClick={() => openWindow('terminal')}>
          <span style={styles.iconImg}>💻</span>
          <span style={styles.iconText}>Terminal.exe</span>
        </div>
        <a href="/music" onClick={() => playClickSound()} style={{ ...styles.iconItem, textDecoration: 'none' }}>
          <span style={styles.iconImg}>🎶</span>
          <span style={styles.iconText}>Acervo Demos</span>
        </a>
        <a href="/classifieds" onClick={() => playClickSound()} style={{ ...styles.iconItem, textDecoration: 'none' }}>
          <span style={styles.iconImg}>🗂️</span>
          <span style={styles.iconText}>Classificados</span>
        </a>
      </div>

      {/* Barra de Tarefas com controle de áudio global */}
      <div style={styles.taskbar}>
        <button onClick={toggleGlobalAudio} style={styles.taskbarAudioBtn}>
          {isPlaying ? '🔊 [ÁUDIO: ON]' : '🔇 [ÁUDIO: OFF]'}
        </button>
      </div>

      {/* Janela 1: Readme */}
      {windows.welcome.isOpen && !windows.welcome.isMinimized && (
        <div 
          style={{ ...styles.window, zIndex: windows.welcome.zIndex, left: `${windows.welcome.x}px`, top: `${windows.welcome.y}px` }} 
          onClick={() => bringToFront('welcome')}
        >
          <div style={styles.titleBar} onMouseDown={(e) => handleMouseDown(e, 'welcome')}>
            <span>📁 Sistema — readme.txt</span>
            <div style={styles.windowControls}>
              <button onClick={() => minimizeWindow('welcome')} style={styles.minBtn}>_</button>
              <button onClick={() => closeWindow('welcome')} style={styles.closeBtn}>X</button>
            </div>
          </div>
          <div style={styles.windowBody}>
            <h3 style={{ color: '#873C36', marginTop: 0 }}>GOOD GARDEN ARCHIVE v2.0</h3>
            <p>Conexão estabelecida com o núcleo do sistema.</p>
            <p>Arraste as janelas pela barra de título ou explore o Terminal.exe e o Winamp.</p>
            <div style={{ borderTop: '1px dashed #A49B86', marginTop: '10px', paddingTop: '5px', fontSize: '11px', color: '#183D28' }}>
              [ARG_HINT]: Digite "help" no terminal ou desbloqueie faixas com "unlock track-03".
            </div>
          </div>
        </div>
      )}

      {/* Janela 2: IRC Chat */}
      {windows.chat.isOpen && !windows.chat.isMinimized && (
        <div 
          style={{ ...styles.window, zIndex: windows.chat.zIndex, left: `${windows.chat.x}px`, top: `${windows.chat.y}px` }} 
          onClick={() => bringToFront('chat')}
        >
          <div style={styles.titleBar} onMouseDown={(e) => handleMouseDown(e, 'chat')}>
            <span>💬 IRC Chat — #good-garden</span>
            <div style={styles.windowControls}>
              <button onClick={() => minimizeWindow('chat')} style={styles.minBtn}>_</button>
              <button onClick={() => closeWindow('chat')} style={styles.closeBtn}>X</button>
            </div>
          </div>
          <div style={styles.windowBody}>
            <ChatRoom />
          </div>
        </div>
      )}

      {/* Janela 3: Winamp Player */}
      {windows.player.isOpen && !windows.player.isMinimized && (
        <div 
          style={{ ...styles.window, zIndex: windows.player.zIndex, left: `${windows.player.x}px`, top: `${windows.player.y}px` }} 
          onClick={() => bringToFront('player')}
        >
          <div style={styles.titleBar} onMouseDown={(e) => handleMouseDown(e, 'player')}>
            <span>🎵 Winamp v2.91</span>
            <div style={styles.windowControls}>
              <button onClick={() => minimizeWindow('player')} style={styles.minBtn}>_</button>
              <button onClick={() => closeWindow('player')} style={styles.closeBtn}>X</button>
            </div>
          </div>
          <div style={styles.windowBody}>
            <RetroPlayer />
          </div>
        </div>
      )}

      {/* Janela 4: Terminal Seguro */}
      {windows.terminal.isOpen && !windows.terminal.isMinimized && (
        <div 
          style={{ ...styles.window, width: '420px', zIndex: windows.terminal.zIndex, left: `${windows.terminal.x}px`, top: `${windows.terminal.y}px` }} 
          onClick={() => bringToFront('terminal')}
        >
          <div style={styles.titleBar} onMouseDown={(e) => handleMouseDown(e, 'terminal')}>
            <span>💻 Terminal Seguro.exe</span>
            <div style={styles.windowControls}>
              <button onClick={() => minimizeWindow('terminal')} style={styles.minBtn}>_</button>
              <button onClick={() => closeWindow('terminal')} style={styles.closeBtn}>X</button>
            </div>
          </div>
          <div style={styles.windowBody}>
            <SecureTerminal />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  desktop: {
    position: 'relative',
    width: '100%',
    height: '80vh',
    backgroundColor: '#004e4e',
    backgroundImage: 'radial-gradient(#006b6b 1px, transparent 1px)',
    backgroundSize: '8px 8px',
    padding: '20px',
    overflow: 'hidden',
    border: '2px inset #fff',
    userSelect: 'none',
  },
  desktopIcons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'flex-start',
  },
  iconItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  iconImg: {
    fontSize: '28px',
    filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))',
  },
  iconText: {
    color: '#fff',
    fontSize: '11px',
    fontFamily: "'Tahoma', sans-serif",
    textShadow: '1px 1px #000',
    marginTop: '4px',
    wordBreak: 'break-all',
  },
  taskbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35px',
    backgroundColor: '#c0c0c0',
    borderTop: '2px solid #fff',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    zIndex: 9999,
  },
  taskbarAudioBtn: {
    backgroundColor: '#c0c0c0',
    border: '2px outset #fff',
    fontFamily: "'Tahoma', sans-serif",
    fontSize: '11px',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '4px 8px',
  },
  window: {
    position: 'absolute',
    width: '380px',
    backgroundColor: '#c0c0c0',
    border: '2px solid',
    borderColor: '#fff #404040 #404040 #fff',
    boxShadow: '4px 4px 10px rgba(0,0,0,0.6)',
  },
  titleBar: {
    background: 'linear-gradient(90deg, #000080, #1084d0)',
    color: '#fff',
    padding: '4px 8px',
    fontWeight: 'bold',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: "'Tahoma', sans-serif",
    cursor: 'grab',
  },
  windowControls: {
    display: 'flex',
    gap: '2px',
  },
  minBtn: {
    backgroundColor: '#c0c0c0',
    border: '2px outset #fff',
    fontSize: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1',
  },
  closeBtn: {
    backgroundColor: '#c0c0c0',
    border: '2px outset #fff',
    fontSize: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  windowBody: {
    padding: '10px',
    backgroundColor: '#c0c0c0',
    color: '#000',
    fontFamily: "'Tahoma', sans-serif",
    fontSize: '12px',
  }
};