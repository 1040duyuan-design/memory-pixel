import React from 'react';
import type { SceneState } from '../types';
import './Scene.css';

interface Props {
  sceneState: SceneState;
  children: React.ReactNode;
  currentRoom?: string;
}

const Scene: React.FC<Props> = ({ sceneState, children, currentRoom = 'livingroom' }) => {
  const getBackgroundClass = () => {
    return `scene scene-${sceneState.timeOfDay} scene-${sceneState.weather} scene-${sceneState.season}`;
  };

  // 根据季节调整窗外颜色
  const getSeasonalSky = () => {
    const base = getWindowColor();
    if (sceneState.season === 'winter') {
      // 冬天更灰白
      return blendColor(base, '#f0f0f0', 0.3);
    }
    if (sceneState.season === 'autumn') {
      // 秋天偏橙
      return blendColor(base, '#e67e22', 0.15);
    }
    if (sceneState.season === 'summer') {
      // 夏天更蓝
      return blendColor(base, '#3498db', 0.2);
    }
    return base;
  };

  // 颜色混合
  function blendColor(color1: string, color2: string, ratio: number): string {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  function getWindowColor() {
    if (sceneState.timeOfDay === 'night') return '#1a1a2e';
    if (sceneState.timeOfDay === 'evening') return '#ff9966';
    if (sceneState.weather === 'rainy') return '#888888';
    if (sceneState.weather === 'cloudy') return '#b8c8d8';
    return '#87CEEB';
  }

  function getTVColor() {
    if (sceneState.timeOfDay === 'night') return '#ffffcc';
    return '#4a90e2';
  }

  function getRandomBookColor(i: number) {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#34495e'];
    return colors[i % colors.length];
  }

  function getSceneDescription() {
    const timeDescriptions: Record<SceneState['timeOfDay'], string> = {
      dawn: '黎明',
      morning: '早晨',
      afternoon: '下午',
      evening: '傍晚',
      night: '夜晚',
    };
    const weatherDescriptions: Record<SceneState['weather'], string> = {
      sunny: '晴朗',
      cloudy: '多云',
      rainy: '下雨',
      snowy: '下雪',
    };
    const seasonDescriptions: Record<SceneState['season'], string> = {
      spring: '春天',
      summer: '夏天',
      autumn: '秋天',
      winter: '冬天',
    };
    const roomNames: Record<string, string> = {
      livingroom: '客厅',
      bedroom: '卧室',
      study: '书房',
      garden: '小院',
    };
    return `${roomNames[currentRoom]} · ${seasonDescriptions[sceneState.season]} ${timeDescriptions[sceneState.timeOfDay]}，${weatherDescriptions[sceneState.weather]}`;
  }

  // 雨滴效果
  const renderRains = () => {
    if (sceneState.weather !== 'rainy') return null;
    return (
      <g className="rain">
        {Array.from({ length: 20 }).map((_, i) => (
          <line 
            key={i}
            x1={20 + i * 40} 
            y1={0} 
            x2={10 + i * 40} 
            y2={320} 
            stroke="#aabbcc" 
            strokeWidth="1" 
            strokeOpacity="0.6"
            className="rain-drop"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </g>
    );
  };

  return (
    <div className={getBackgroundClass()}>
      <div className="living-room">
        {/* 像素客厅场景 */}
        <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
          {/* 地板 */}
          <rect x="0" y="320" width="800" height="180" fill="#8b5a2b" />
          {/* 地板木纹 */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 40} y1="320" x2={i * 40} y2="500" stroke="#7a4f25" strokeWidth="2" />
          ))}
          
          {/* 后墙 */}
          <rect x="0" y="0" width="800" height="320" fill="#f5f5dc" />
          {/* 墙线装饰 */}
          <rect x="0" y="300" width="800" height="20" fill="#d2b48c" />
          
          {/* 左边墙 */}
          <rect x="0" y="0" width="20" height="320" fill="#e8e4c9" />
          
          {/* 右边墙 */}
          <rect x="780" y="0" width="20" height="320" fill="#e8e4c9" />
          
          {/* 踢脚线 */}
          <rect x="20" y="300" width="760" height="20" fill="#d2b48c" />
          
          {/* 窗户 - 左边墙上 */}
          <g transform="translate(60, 60)">
            <rect x="0" y="0" width="120" height="140" fill="#87CEEB" stroke="#d2b48c" strokeWidth="8" />
            {/* 窗户分格 */}
            <line x1="60" y1="0" x2="60" y2="140" stroke="#d2b48c" strokeWidth="4" />
            <line x1="0" y1="70" x2="120" y2="70" stroke="#d2b48c" strokeWidth="4" />
            {/* 窗外根据时间变颜色 */}
            <rect x="4" y="4" width="52" height="62" fill={getSeasonalSky()} />
            <rect x="64" y="4" width="52" height="62" fill={getSeasonalSky()} />
            <rect x="4" y="74" width="52" height="62" fill={getSeasonalSky()} />
            <rect x="64" y="74" width="52" height="62" fill={getSeasonalSky()} />
            {/* 窗框高光 */}
            <line x1="0" y1="0" x2="120" y2="0" stroke="#f0e6cc" strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="140" stroke="#f0e6cc" strokeWidth="2" />
          </g>
          
          {/* 沙发 - 靠墙放着 */}
          <g transform="translate(280, 180)">
            {/* 沙发靠背 */}
            <rect x="0" y="0" width="240" height="60" fill="#8b0000" stroke="#5c0000" strokeWidth="4" />
            {/* 沙发坐垫 */}
            <rect x="0" y="60" width="240" height="40" fill="#a52a2a" stroke="#5c0000" strokeWidth="4" />
            {/* 扶手 */}
            <rect x="-8" y="40" width="12" height="60" fill="#5c0000" />
            <rect x="236" y="40" width="12" height="60" fill="#5c0000" />
            {/* 靠垫 */}
            <rect x="40" y="10" width="60" height="40" fill="#cd5c5c" rx="4" />
            <rect x="140" y="10" width="60" height="40" fill="#cd5c5c" rx="4" />
            {/* 缝线装饰 */}
            <line x1="0" y1="30" x2="240" y2="30" stroke="#5c0000" strokeWidth="2" />
          </g>
          
          {/* 茶几 */}
          <g transform="translate(360, 240)">
            <rect x="0" y="0" width="120" height="20" fill="#d2b48c" />
            <rect x="10" y="20" width="20" height="60" fill="#a0826d" />
            <rect x="90" y="20" width="20" height="60" fill="#a0826d" />
            {/* 茶几玻璃反光 */}
            <rect x="5" y="2" width="30" height="8" fill="rgba(255,255,255,0.3)" />
          </g>
          
          {/* 电视柜 */}
          <g transform="translate(480, 120)">
            <rect x="0" y="0" width="160" height="80" fill="#654321" />
            {/* 电视屏幕 */}
            <rect x="10" y="10" width="140" height="60" fill="#222" stroke="#333" strokeWidth="2" />
            <rect x="20" y="20" width="120" height="40" fill={getTVColor()} />
            {/* 电视品牌logo小点 */}
            <circle cx="70" cy="60" r="3" fill="#444" />
          </g>
          
          {/* 落地灯 */}
          <g transform="translate(180, 40)">
            <rect x="45" y="0" width="10" height="220" fill="#654321" />
            <ellipse cx="50" cy="0" rx="30" ry="15" fill="#f5deb3" />
            {/* 灯光光晕 - 夜晚更亮 */}
            {sceneState.timeOfDay === 'night' && (
              <ellipse cx="50" cy="220" rx="60" ry="40" fill="rgba(245, 222, 179, 0.3)" />
            )}
          </g>
          
          {/* 照片墙 - 沙发上方 */}
          <g transform="translate(300, 80)">
            <rect x="0" y="0" width="140" height="80" fill="#ffffff" stroke="#333" strokeWidth="2" />
            <rect x="4" y="4" width="132" height="72" fill="#f0f0f0" />
            <text x="70" y="45" fontSize="10" fill="#666" textAnchor="middle">珍贵合影</text>
          </g>
          
          {/* 绿植盆栽在角落 */}
          <g transform="translate(660, 240)">
            <ellipse cx="40" cy="300" rx="35" ry="20" fill="#8b4513" /> {/* 花盆 */}
            <ellipse cx="40" cy="290" rx="35" ry="12" fill="#a0522d" />
            {/* 叶子 */}
            <circle cx="25" cy="260" r="18" fill="#228b22" />
            <circle cx="45" cy="240" r="22" fill="#32cd32" />
            <circle cx="60" cy="270" r="20" fill="#228b22" />
            <circle cx="38" cy="275" r="20" fill="#32cd32" />
            <circle cx="52" cy="290" r="16" fill="#2e8b2e" />
          </g>
          
          {/* 书架 */}
          <g transform="translate(20, 120)">
            <rect x="0" y="0" width="80" height="180" fill="#654321" />
            {/* 书架层板 */}
            {[0, 1, 2].map(i => (
              <rect key={i} x="4" y={45 + i * 45} width="72" height="4" fill="#8b6914" />
            ))}
            {/* 书 */}
            {[0, 1, 2, 3, 4].map(i => (
              <rect key={i} x={8 + i * 14} y={10} width="10" height={30} fill={getRandomBookColor(i)} />
            ))}
          </g>

          {/* 下雨效果 */}
          {renderRains()}
          
          {/* 夜晚整体阴影遮罩 */}
          {sceneState.timeOfDay === 'night' && (
            <rect x="0" y="0" width="800" height="500" fill="rgba(0, 0, 0, 0.3)" />
          )}
          
          {/* 可移动区域放人物 */}
          <foreignObject x="0" y="0" width="800" height="500">
            <div className="scene-character-area">
              {children}
            </div>
          </foreignObject>
        </svg>
      </div>
      <div className="scene-footer">
        {getSceneDescription()}
      </div>
    </div>
  );
};

export default Scene;
