import React from 'react';
import { LoreSystem } from '../systems/LoreSystem';

export default function ArchiveView({ onBack }) {
  const secrets = LoreSystem.getSecrets();

  return (
    <div style={{
      background: '#050805',
      border: '1px solid #3fb950',
      padding: '20px',
      maxWidth: '640px',
      margin: '0 auto',
      fontFamily: 'monospace',
      color: '#3fb950',
      boxShadow: '0 0 15px rgba(63, 185, 80, 0.2)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a2e1a', paddingBottom: '10px', marginBottom: '15px' }}>
        <h2 style={{ fontSize: '12px', margin: 0 }}>--- ARQUIVOS SECRETOS &amp; LORE ---</h2>
        <button 
          onClick={onBack}
          style={{
            background: '#1a2e1a',
            color: '#3fb950',
            border: '1px solid #3fb950',
            padding: '3px 8px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '8px'
          }}
        >
          [ESC] VOLTAR
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {secrets.map((secret) => (
          <div key={secret.id} style={{
            border: '1px dashed #1a2e1a',
            padding: '10px',
            background: secret.unlocked ? '#091209' : '#050805'
          }}>
            <div style={{ fontSize: '8px', color: secret.unlocked ? '#58a6ff' : '#8b949e', marginBottom: '4px' }}>
              {secret.unlocked ? '[DESBLOQUEADO]' : '[BLOQUEADO]'} — {secret.unlocked ? secret.title : '??????????????????'}
            </div>
            <div style={{ fontSize: '7px', color: '#8b949e', lineHeight: '1.4' }}>
              {secret.unlocked ? secret.description : 'Explore os ciclos de jogo e utilize as habilidades FOCUS e INSTINCT para decodificar este arquivo.'}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', fontSize: '6px', color: '#8b949e', textAlign: 'center' }}>
        OWL &amp; RACCOON: THE LOOP — UNIVERSO EXPANDIDO &amp; GOOD GARDEN ARCHIVE
      </div>
    </div>
  );
}