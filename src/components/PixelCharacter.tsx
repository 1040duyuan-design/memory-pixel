import React from 'react';
import type { PixelCharacter as PixelCharacterType, AutonomousAction } from '../types';
import './PixelCharacter.css';

interface Props {
  character: PixelCharacterType;
  currentAction: AutonomousAction | null;
  onClick: () => void;
}

const PixelCharacter: React.FC<Props> = ({ character, currentAction, onClick }) => {
  // 根据性别和年龄生成基本颜色比例
  const getSkinColor = () => {
    return '#e6c7a8';
  };

  const getHairColor = () => {
    if (character.age > 60) return '#f0f0f0'; // 白发
    return '#3a3a3a';
  };

  return (
    <div className="pixel-character-container" onClick={onClick}>
      <svg width="120" height="160" viewBox="0 0 120 160" className="pixel-art">
        {/* 简单像素人物绘制 */}
        {/* 头 */}
        <rect x="40" y="20" width="40" height="40" fill={getSkinColor()} />
        
        {/* 头发 */}
        {character.gender === 'male' ? (
          <rect x="40" y="20" width="40" height="16" fill={getHairColor()} />
        ) : (
          <rect x="32" y="16" width="56" height="48" fill={getHairColor()} />
        )}

        {/* 眼睛 */}
        <rect x="50" y="36" width="6" height="6" fill="#000000" />
        <rect x="64" y="36" width="6" height="6" fill="#000000" />

        {/* 身体 */}
        <rect x="44" y="60" width="32" height="48" fill={getClothesColor()} />

        {/* 胳膊 */}
        <rect x="32" y="64" width="12" height="40" fill={getSkinColor()} />
        <rect x="76" y="64" width="12" height="40" fill={getSkinColor()} />

        {/* 腿 */}
        <rect x="44" y="108" width="16" height="48" fill={getPantsColor()} />
        <rect x="60" y="108" width="16" height="48" fill={getPantsColor()} />
      </svg>
      
      <div className="character-info">
        <h3>{character.name}</h3>
        {currentAction && (
          <p className="current-action">{currentAction.activity}</p>
        )}
      </div>
    </div>
  );

  function getClothesColor() {
    // 根据性别返回默认衣服颜色
    if (character.gender === 'male') return '#2c3e50';
    return '#8e44ad';
  }

  function getPantsColor() {
    return '#34495e';
  }
};

export default PixelCharacter;
