import React, { useEffect } from 'react';

export default function ArgLogger() {
  useEffect(() => {
    console.log(
      "%c[GOOD GARDEN ARCHIVE — PROTOCOLO 086]",
      "color: #00ff00; background: #101310; font-size: 14px; font-weight: bold; padding: 4px;"
    );
    console.log(
      "%cPista de Owl: \"O que os olhos de Raccoon não veem, o console revela. Procure pela chave oculta no armazenamento local (localStorage.getItem('garden_key')).\"",
      "color: #A49B86; font-family: monospace;"
    );

    // Inserir uma chave secreta no localStorage do navegador para os investigadores acharem
    if (typeof window !== 'undefined') {
      localStorage.setItem('garden_key', 'GGA{owl_eye_security_9982}');
    }
  }, []);

  return null;
}