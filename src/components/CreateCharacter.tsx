import React, { useState } from 'react';
import type { PixelCharacter } from '../types';
import { saveCharacter } from '../utils/storage';
import './CreateCharacter.css';

interface Props {
  onCreated: (character: PixelCharacter) => void;
}

const CreateCharacter: React.FC<Props> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(60);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [personalityText, setPersonalityText] = useState('温和，慈祥，爱干净');
  const [hobbiesText, setHobbiesText] = useState('看报纸，喝茶，散步');
  const [quotesText, setQuotesText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const personality = personalityText.split(/[，,、\n]/).filter(s => s.trim());
    const hobbies = hobbiesText.split(/[，,、\n]/).filter(s => s.trim());
    const favoriteQuotes = quotesText.split(/[。\n]/).filter(s => s.trim());

    const character: PixelCharacter = {
      id: Date.now().toString(),
      name,
      age,
      gender,
      personality,
      hobbies,
      appearance: {
        hair: 'default',
        clothes: 'default',
        accessories: [],
      },
      favoriteQuotes,
      memories: [],
      createdAt: Date.now(),
    };

    saveCharacter(character);
    onCreated(character);
  };

  return (
    <div className="create-character">
      <h1>创建像素纪念人</h1>
      <p className="subtitle">填写亲人的信息，生成专属于他的像素小人</p>
      
      <form onSubmit={handleSubmit} className="creation-form">
        <div className="form-group">
          <label>姓名</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="填写他的名字"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>年龄</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(parseInt(e.target.value) || 0)}
              min="0"
              max="120"
              required
            />
          </div>

          <div className="form-group">
            <label>性别</label>
            <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')}>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>性格</label>
          <textarea
            value={personalityText}
            onChange={e => setPersonalityText(e.target.value)}
            placeholder="用逗号分隔，比如：温和，慈祥，爱干净"
            rows={2}
          />
        </div>

        <div className="form-group">
          <label>爱好</label>
          <textarea
            value={hobbiesText}
            onChange={e => setHobbiesText(e.target.value)}
            placeholder="用逗号分隔，比如：看报纸，喝茶，散步"
            rows={2}
          />
        </div>

        <div className="form-group">
          <label>常说的话（一句一行）</label>
          <textarea
            value={quotesText}
            onChange={e => setQuotesText(e.target.value)}
            placeholder="记录他生前常说的话，互动时会随机出现"
            rows={4}
          />
        </div>

        <button type="submit" className="submit-btn">创建像素小人</button>
      </form>
    </div>
  );
};

export default CreateCharacter;
