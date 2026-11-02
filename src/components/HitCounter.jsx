import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function HitCounter() {
  const [count, setCount] = useState(104206);

  useEffect(() => {
    async function updateAndFetchVisits() {
      // Verifica se já contou nesta sessão do navegador
      const hasVisited = sessionStorage.getItem('gga_visited');
      
      if (!hasVisited) {
        sessionStorage.setItem('gga_visited', 'true');
        // Incrementa no banco
        await supabase.rpc('increment_visitor', { row_id: 1 }).catch(() => {
          // Fallback se a função RPC não existir: busca direto
        });
      }

      // Busca o valor atual
      const { data, error } = await supabase
        .from('site_stats')
        .select('visitors_count')
        .eq('id', 1)
        .single();

      if (data && !error) {
        setCount(data.visitors_count);
      }
    }

    updateAndFetchVisits();
  }, []);

  return (
    <div style={styles.counterBox}>
      <p style={styles.label}>VISITANTES REAIS:</p>
      <div style={styles.display}>
        [{String(count).padStart(6, '0')}]
      </div>
    </div>
  );
}

const styles = {
  counterBox: {
    marginTop: '20px',
    padding: '8px',
    backgroundColor: '#000',
    border: '1px inset #808080',
    textAlign: 'center',
  },
  label: {
    fontFamily: "'Courier New', monospace",
    fontSize: '10px',
    color: '#00ff00',
    margin: '0 0 4px 0',
  },
  display: {
    fontFamily: "'Courier New', monospace",
    fontSize: '15px',
    color: '#00ff00',
    letterSpacing: '2px',
    fontWeight: 'bold',
  }
};