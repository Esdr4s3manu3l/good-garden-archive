import React, { useState, useRef, useEffect } from 'react';
import { playKeySound } from '../lib/soundEffects';

export default function SecureTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'GOOD_GARDEN_OS [Version 2.0.06]' },
    { type: 'system', text: 'Copyright (c) 2006 Garden Corporation. Todos os direitos reservados.' },
    { type: 'system', text: 'Digite "help" para listar os comandos públicos disponíveis.\n' }
  ]);
  
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response = '';

    switch (cmd) {
      // 1. SISTEMA
      case 'help':
        response = `COMANDOS PÚBLICOS (SISTEMA):
  help        - Mostra esta lista de comandos
  clear       - Limpa a tela do terminal
  about       - Sobre o GOOD GARDEN ARCHIVE
  version     - Versão do sistema operacional
  status      - Estado atual dos nós de rede
  whoami      - Identificação do operador atual
  date / time - Carimbo temporal do servidor
  uptime      - Tempo de atividade do sistema`;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        response = 'Aviso: Sessão protegida. Feche a janela pelo botão superior [X].';
        break;
      case 'about':
        response = 'GOOD GARDEN ARCHIVE: Portal de preservação de dados, mídias e registros arqueológicos da família Good Garden (2004-2006).';
        break;
      case 'version':
        response = 'GOOD_GARDEN_OS v2.0.06 [Build 2006.11.04] - Stable Release';
        break;
      case 'status':
        response = '[SYSCHECK] Nó Principal: ONLINE\n[SYSCHECK] Frequência Owl: ESTÁVEL\n[SYSCHECK] Perímetro Raccoon: ANOMALIA DETECTADA NA PORTA LESTE';
        break;
      case 'date':
      case 'time':
        response = `Carimbo temporal do sistema: ${new Date().toLocaleString('pt-BR')}`;
        break;
      case 'whoami':
        response = 'guest@good-garden-archive [Nível de acesso: RESTRITO]';
        break;
      case 'hostname':
        response = 'HOST: gga-core-node-086.net';
        break;
      case 'uptime':
        response = 'Sistema no ar há: 14 dias, 06 horas, 42 minutos (Estável)';
        break;
      case 'history':
        response = history.filter(h => h.type === 'user').map(h => h.text).join('\n');
        break;
      case 'banner':
        response = '=== GOOD GARDEN ARCHIVE SYSTEM v2.0 ===\n[ SECURE PERIMETER: ACTIVE ]';
        break;
      case 'neofetch':
        response = '  ___  ___  _   _ \n / _ \\/ _ \\| | | |\n| (_) | (_) | |_| |\n \\___/ \\___/ \\__,_|  OS: Good Garden OS 2.0\n                    Kernel: 2.6.15-owl\n                    Uptime: 14 days\n                    Shell: bash 3.0\n                    Theme: Win98 Classic\n                    Memory: 640K / 256MB';
        break;

      // 2. NAVEGAÇÃO E ARQUIVOS
      case 'ls':
      case 'dir':
        response = 'Volume na unidade C é GARDEN_ROOT\nDiretório de C:\\SYSTEM\\ARCHIVE\n\n  [.]          [..]\n  LOG_086.LOG  1.420 bytes\n  OWL.SYS      512 bytes\n  RACCOON.DAT  890 bytes\n  TAPES/       <DIR>\n  PHOTOS/      <DIR>\n\n          5 arquivo(s)     2.822 bytes';
        break;
      case 'pwd':
        response = 'C:\\SYSTEM\\ARCHIVE';
        break;
      case 'tree':
        response = 'C:\\\n ├── SYSTEM\n │   ├── LOG_086.LOG\n │   ├── OWL.SYS\n │   └── RACCOON.DAT\n ├── TAPES\n │   └── audio_track_01.mp3\n └── SECRETS\n     └── classified_086.txt';
        break;
      case 'cat log':
      case 'cat log_086.log':
        response = '[LOG CONFIDENCIAL #086]\n"Raccoon tentou sabotar o nó central na noite de 12 de outubro. Owl interceptou os pacotes de dados antes que o firewall caísse. A chave está nas raízes."';
        break;
      case 'file':
        response = 'Tipo de arquivo: ASCII Text / System Log Encrypted';
        break;

      // 3. UNIVERSO OWL & RACCOON
      case 'owl':
        response = 'OWL: Operador analítico e guardião do perímetro. Focado em manter a estabilidade do arquivo.';
        break;
      case 'raccoon':
        response = 'RACCOON: Entidade anômala e caótica. Conhecida por vazar arquivos criptografados e corromper registros.';
        break;
      case 'lore':
      case 'universe':
      case 'world':
        response = 'UNIVERSO: CRAZY & CORE / OWL & RACCOON. Rede clandestina operacional entre 2004 e 2006.';
        break;
      case 'characters':
        response = 'PERSONAGENS: 1. Owl (Guardião do Core) | 2. Raccoon (Infiltrador)';
        break;

      // 4. JOGO E ARG
      case 'game':
      case 'game start':
        response = 'Iniciando protocolo Owl vs Raccoon... Use o minigame na Área de Trabalho para interceptar as invasões.';
        break;
      case 'game score':
      case 'game progress':
        response = 'Progresso atual do agente: 0% descriptografado.';
        break;

      // 5. ARQUIVOS SECRETOS
      case 'archive':
      case 'lostfiles':
        response = 'Diretório de arquivos perdidos: 3 mídias recuperadas pelo cache secundário.';
        break;
      case 'decrypt':
      case 'decode':
        response = '[DECRYPT] Utilize a chave mestra encontrada no código-fonte ou classificados.';
        break;

      // 6. REDE E CONEXÃO
      case 'network':
      case 'signal':
      case 'frequency':
        response = 'Sinal de rede: ESTÁVEL. Frequências: 086.4 MHz (Owl) e 99.1 MHz (Raccoon).';
        break;
      case 'ping':
        response = 'PING 127.0.0.1 (32 bytes): icmp_seq=1 ttl=64 tempo=0.042 ms\nPing bem-sucedido.';
        break;

      // 7. EASTER EGGS E COMANDOS ESPECIAIS
      case '085':
      case 'ggf':
      case 'goodgarden':
        response = '🔓 [EASTER EGG] Bem-vindo ao núcleo interno da Good Garden Family. O jardim nunca esquece.';
        break;
      case 'crazycore':
        response = 'CRAZY & CORE: O protocolo binário subjacente que rege a dualidade entre Owl e Raccoon.';
        break;
      case 'sudo':
      case 'root':
      case 'admin':
        response = 'ACESSO NEGADO. Credenciais de superusuário exigem chave de nível 3.';
        break;
      case 'secrets.txt':
      case 'cat secrets.txt':
        response = 'GGA{terminal_master_command_2006} -> Parabéns, investigador! Chave mestra do ARG resgatada.';
        break;

      // 8. INTERAÇÃO E ESTÉTICA
      case 'matrix':
        response = '01000111 01001111 01001111 01000100 -- O jardim está assistindo.';
        break;
      case 'glitch':
        response = '[WARNING] Anomalia visual injetada no setor de vídeo.';
        break;

      // 9. DIAGNÓSTICO E DESENVOLVEDOR
      case 'syscheck':
      case 'diagnostics':
        response = 'DIAGNÓSTICO: Supabase Realtime OK. Conexão WebSocket Ativa.';
        break;
      case 'dev':
      case 'contributors':
        response = 'GOOD GARDEN ARCHIVE — Desenvolvido com Astro, React e Supabase (2006 Web Aesthetic).';
        break;

      default:
        response = `Comando não reconhecido: "${cmd}". Digite "help" para ver os comandos públicos.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'user', text: `C:\\> ${input}` },
      { type: 'output', text: response }
    ]);
    setInput('');
  };

  return (
    <div style={styles.terminal}>
      <div style={styles.body}>
        {history.map((item, index) => (
          <div key={index} style={{ ...styles.line, color: item.type === 'user' ? '#fff' : '#00ff00' }}>
            <pre style={styles.pre}>{item.text}</pre>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleCommand} style={styles.form}>
        <span style={styles.prompt}>C:\&gt;</span>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => {
            playKeySound();
            setInput(e.target.value);
          }} 
          style={styles.input}
          autoFocus
        />
      </form>
    </div>
  );
}

const styles = {
  terminal: {
    backgroundColor: '#000',
    border: '2px inset #00ff00',
    padding: '8px',
    fontFamily: "'Courier New', monospace",
    height: '280px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    fontSize: '11px',
    paddingRight: '5px',
  },
  line: {
    marginBottom: '4px',
  },
  pre: {
    margin: 0,
    fontFamily: 'inherit',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #005500',
    paddingTop: '4px',
  },
  prompt: {
    color: '#00ff00',
    fontSize: '11px',
    fontWeight: 'bold',
    marginRight: '6px',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#00ff00',
    border: 'none',
    fontFamily: 'inherit',
    fontSize: '11px',
    outline: 'none',
  }
};