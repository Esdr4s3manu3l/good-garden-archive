import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('Anônimo_' + Math.floor(Math.random() * 1000));
  const [text, setText] = useState('');
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Busca mensagens iniciais
    async function fetchMessages() {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50);
      
      if (data && !error) {
        setMessages(data);
      }
    }
    fetchMessages();

    // Inscreve-se no canal de tempo real (WebSockets do Supabase)
    const channel = supabase
      .channel('public:chat_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Rola para o final sempre que houver novas mensagens
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await supabase.from('chat_messages').insert([
      { username: username, message: text }
    ]);
    setText('');
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>
        <span>IRC Chat — #good-garden (Online)</span>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={styles.nickInput}
          title="Seu apelido"
        />
      </div>

      <div style={styles.messageBox}>
        {messages.map((msg) => (
          <div key={msg.id || Math.random()} style={styles.msgLine}>
            <span style={styles.time}>
              [{msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}]
            </span>
            <strong style={styles.user}> &lt;{msg.username}&gt;:</strong> 
            <span style={styles.text}> {msg.message}</span>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <form onSubmit={sendMessage} style={styles.form}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Digite sua mensagem para o jardim..." 
          style={styles.input}
        />
        <button type="submit" style={styles.sendBtn}>Enviar</button>
      </form>
    </div>
  );
}

const styles = {
  chatContainer: {
    backgroundColor: '#0c0f0c',
    border: '2px inset #A49B86',
    padding: '10px',
    fontFamily: "'Courier New', monospace",
  },
  header: {
    backgroundColor: '#183D28',
    color: '#fff',
    padding: '4px 8px',
    fontSize: '11px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  nickInput: {
    backgroundColor: '#101310',
    color: '#A49B86',
    border: '1px solid #A49B86',
    fontSize: '10px',
    padding: '2px 4px',
    width: '120px',
  },
  messageBox: {
    backgroundColor: '#000',
    border: '1px inset #404040',
    height: '200px',
    overflowY: 'auto',
    padding: '8px',
    fontSize: '12px',
    marginBottom: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  msgLine: {
    wordBreak: 'break-word',
  },
  time: {
    color: '#666',
    fontSize: '10px',
  },
  user: {
    color: '#873C36',
  },
  text: {
    color: '#A49B86',
  },
  form: {
    display: 'flex',
    gap: '5px',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    border: '1px inset #808080',
    padding: '4px',
    fontFamily: 'inherit',
    fontSize: '12px',
  },
  sendBtn: {
    backgroundColor: '#c0c0c0',
    border: '2px outset #fff',
    padding: '4px 12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '12px',
  }
};