import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function MediaManager({ filterType = 'all', title = 'ARQUIVOS' }) {
  const [mediaList, setMediaList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  async function fetchMediaFiles() {
    const { data, error } = await supabase.storage.from('garden-media').list('', {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (data && !error) {
      const files = data.filter(f => f.name !== '.emptyFolderPlaceholder');
      
      // Filtrar de acordo com o tipo solicitado pela página
      const filtered = files.filter(file => {
        const isImage = file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        const isAudio = file.name.match(/\.(mp3|wav|ogg|m4a)$/i);
        const isVideo = file.name.match(/\.(mp4|webm|mov|avi)$/i);

        if (filterType === 'image') return isImage;
        if (filterType === 'audio') return isAudio;
        if (filterType === 'video') return isVideo;
        return true; // 'all'
      });

      setMediaList(filtered);
    }
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from('garden-media')
      .upload(fileName, file);

    setUploading(false);

    if (error) {
      alert('Erro ao enviar arquivo: ' + error.message);
    } else {
      fetchMediaFiles();
      alert('Arquivo enviado com sucesso para o servidor!');
    }
  }

  const getPublicUrl = (path) => {
    const { data } = supabase.storage.from('garden-media').getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <div style={styles.container}>
      <div style={styles.toolbar}>
        <span>📁 {title}</span>
        <label style={styles.uploadBtn}>
          {uploading ? 'Enviando...' : '📤 Enviar Arquivo'}
          <input 
            type="file" 
            onChange={handleFileUpload} 
            style={{ display: 'none' }} 
            accept={
              filterType === 'image' ? 'image/*' :
              filterType === 'audio' ? 'audio/*' :
              filterType === 'video' ? 'video/*' : 'image/*,audio/*,video/*'
            } 
          />
        </label>
      </div>

      <div style={styles.fileGrid}>
        {mediaList.length === 0 ? (
          <p style={{ color: '#666', fontSize: '12px', padding: '10px' }}>Nenhum arquivo encontrado neste diretório.</p>
        ) : (
          mediaList.map((file) => {
            const url = getPublicUrl(file.name);
            const isImage = file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
            const isAudio = file.name.match(/\.(mp3|wav|ogg|m4a)$/i);
            const isVideo = file.name.match(/\.(mp4|webm|mov|avi)$/i);
            const displayName = file.name.substring(file.name.indexOf('_') + 1);

            return (
              <div key={file.name} style={styles.fileCard}>
                <div style={styles.fileHeader}>📄 {displayName}</div>
                <div style={styles.previewContainer}>
                  {isImage && <img src={url} alt={displayName} style={styles.mediaPreviewImg} />}
                  {isAudio && <audio controls src={url} style={styles.mediaAudio} />}
                  {isVideo && <video controls src={url} style={styles.mediaVideo} />}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0c0f0c',
    border: '2px inset #A49B86',
    padding: '10px',
    fontFamily: "'Courier New', monospace",
  },
  toolbar: {
    backgroundColor: '#183D28',
    padding: '6px 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    fontSize: '11px',
    marginBottom: '10px',
  },
  uploadBtn: {
    backgroundColor: '#c0c0c0',
    color: '#000',
    border: '2px outset #fff',
    padding: '2px 8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '11px',
  },
  fileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '10px',
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '5px',
  },
  fileCard: {
    backgroundColor: '#000',
    border: '1px solid #183D28',
    padding: '8px',
  },
  fileHeader: {
    fontSize: '10px',
    color: '#A49B86',
    marginBottom: '6px',
    wordBreak: 'break-all',
  },
  previewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaPreviewImg: {
    maxWidth: '100%',
    maxHeight: '140px',
    border: '1px solid #404040',
  },
  mediaAudio: {
    width: '100%',
    height: '35px',
  },
  mediaVideo: {
    width: '100%',
    maxHeight: '140px',
    border: '1px solid #404040',
  },
};