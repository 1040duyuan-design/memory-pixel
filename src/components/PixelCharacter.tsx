import React from 'react';
import type { PixelCharacter as PixelCharacterType, AutonomousAction, CharacterPosition } from '../types';
import './PixelCharacter.css';

interface Props {
  character: PixelCharacterType;
  currentAction: AutonomousAction | null;
  position: CharacterPosition;
  onClick: () => void;
}

const PixelCharacter: React.FC<Props> = ({ character, currentAction, position, onClick }) => {
  // 根据性别和年龄生成基本颜色比例
  const getSkinColor = () => {
    return '#e6c7a8';
  };

  const getHairColor = () => {
    if (character.age > 60) return '#f0f0f0'; // 白发
    return '#3a3a3a';
  };

  // 走路动画用 CSS 实现，不需要 JS 计算

  return (
    <div 
      className={`pixel-character-container ${currentAction?.type === 'walking' ? 'walking' : ''}`} 
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={onClick}
    >
      <svg width="80" height="120" viewBox="0 0 80 120" className="pixel-art">
        {/* 简单像素人物绘制 - 缩小适配客厅场景 */}
        {/* 头 */}
        <rect x="25" y="10" width="30" height="30" fill={getSkinColor()} />
        
        {/* 头发 */}
        {character.gender === 'male' ? (
          <rect x="25" y="10" width="30" height="12" fill={getHairColor()} />
        ) : (
          <rect x="18" y="6" width="44" height="36" fill={getHairColor()} />
        )}

        {/* 眼睛 */}
        <rect x="32" y="22" width="5" height="5" fill="#000000" />
        <rect x="43" y="22" width="5" height="5" fill="#000000" />

        {/* 身体 */}
        <rect x="30" y="40" width="20" height="35" fill={getClothesColor()} />

        {/* 胳膊 */}
        <rect x="20" y="44" width="10" height="30" fill={getSkinColor()} />
        <rect x="50" y="44" width="10" height="30" fill={getSkinColor()} />

        {/* 腿 */}
        <rect x="30" y="75" width="12" height="35" fill={getPantsColor()} />
        <rect x="38" y="75" width="12" height="35" fill={getPantsColor()} />
      </svg>
      
      <div className="character-info">
        <p className="current-action">{currentAction?.activity || ''}</p>
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
