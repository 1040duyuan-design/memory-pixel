import React from 'react';
import type { SceneState } from '../types';
import './Scene.css';

interface Props {
  sceneState: SceneState;
  children: React.ReactNode;
}

const Scene: React.FC<Props> = ({ sceneState, children }) => {
  const getBackgroundClass = () => {
    return `scene scene-${sceneState.timeOfDay} scene-${sceneState.weather} scene-${sceneState.season}`;
  };

  return (
    <div className={getBackgroundClass()}>
      <div className="scene-content">
        {children}
      </div>
      <div className="scene-footer">
        {getSceneDescription()}
      </div>
    </div>
  );

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
    return `${seasonDescriptions[sceneState.season]} ${timeDescriptions[sceneState.timeOfDay]}，${weatherDescriptions[sceneState.weather]}`;
  }
};

export default Scene;
