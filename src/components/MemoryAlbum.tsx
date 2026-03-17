import React, { useState } from 'react';
import type { Memory } from '../types';
import { saveMemories, getMemories } from '../utils/storage';
import './MemoryAlbum.css';

interface Props {
  characterId: string;
}

const MemoryAlbum: React.FC<Props> = ({ /* characterId */ }) => {
  const [memories, setMemories] = useState<Memory[]>(() => getMemories());
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAdd = () => {
    if (!newTitle.trim()) return;

    const newMemory: Memory = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim(),
      date: new Date(newDate).getTime(),
      tags: [],
    };

    const updated = [...memories, newMemory];
    setMemories(updated);
    saveMemories(updated);
    
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN');
  };

  return (
    <div className="memory-album">
      <div className="album-header">
        <h2>回忆相册</h2>
        <button className="add-btn" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? '取消' : '+ 添加回忆'}
        </button>
      </div>

      {isAdding && (
        <div className="add-memory-form">
          <input
            type="text"
            placeholder="回忆标题"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <input
            type="date"
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
          />
          <textarea
            placeholder="写下这段回忆..."
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            rows={4}
          />
          <button className="save-btn" onClick={handleAdd} disabled={!newTitle.trim()}>
            保存回忆
          </button>
        </div>
      )}

      <div className="memory-list">
        {memories.length === 0 && (
          <p className="empty-state">还没有添加回忆，添加第一个回忆吧</p>
        )}
        {memories.map(memory => (
          <div key={memory.id} className="memory-card">
            <h3 className="memory-title">{memory.title}</h3>
            <div className="memory-date">{formatDate(memory.date)}</div>
            {memory.content && <p className="memory-content">{memory.content}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryAlbum;
