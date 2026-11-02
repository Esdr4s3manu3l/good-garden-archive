import React, { useState } from 'react';
import GamePage from './components/GamePage';
import ArchiveView from './owl-raccoon-the-loop/src/ui/ArchiveView'; // Opcional se quiser usar o painel de lore

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'game', 'archive'

  return (
    <div style={{ background: '#050805', minHeight: '100vh', color: '#3fb950', fontFamily: 'monospace' }}>
      <header style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #1a2e1a' }}>
        <h1>GOOD GARDEN ARCHIVE</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
          <button onClick={() => setCurrentView('home')} style={btnStyle}>Início</button>
          <button onClick={() => setCurrentView('game')} style={btnStyle}>Jogar: The Loop</button>
          <button onClick={() => setCurrentView('archive')} style={btnStyle}>Arquivos &amp; Lore</button>
        </div>
      </header>

      <main style={{ padding: '20px' }}>
        {currentView === 'home' && (
          <div style={{ textAlign: 'center' }}>
            <h2>Bem-vindo ao Repositório Principal</h2>
            <p style={{ color: '#8b949e' }}>Selecione uma opção acima para iniciar o jogo ou visualizar os registros.</p>
          </div>
        )}

        {currentView === 'game' && (
          <GamePage onBackToArchive={() => setCurrentView('home')} />
        )}

        {currentView === 'archive' && (
          <ArchiveView onBack={() => setCurrentView('home')} />
        )}
      </main>
    </div>
  );
}

const btnStyle = {
  background: '#1a2e1a',
  color: '#3fb950',
  border: '1px solid #3fb950',
  padding: '6px 12px',
  cursor: 'pointer',
  fontFamily: 'monospace'
};