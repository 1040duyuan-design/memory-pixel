import { useState, useEffect } from 'react';
import type { PixelCharacter, AutonomousAction, SceneState, CharacterPosition } from './types';
import { getCharacter } from './utils/storage';
import { randomNextAction, isActionFinished } from './utils/actionManager';
import CreateCharacter from './components/CreateCharacter';
import PixelCharacterComponent from './components/PixelCharacter';
import Scene from './components/Scene';
import ChatBox from './components/ChatBox';
import MemoryAlbum from './components/MemoryAlbum';
import './App.css';

// 不同动作对应的位置
const actionPositions: Record<string, CharacterPosition> = {
  'reading':      { x: 320, y: 200 },  // 沙发左边
  'watching-tv':  { x: 400, y: 220 },  // 沙发中间
  'walking':      { x: 200, y: 340 },  // 客厅散步位置
  'standing':     { x: 100, y: 160 },  // 窗边
  'watering':     { x: 680, y: 280 },  // 绿植旁边
  'napping':      { x: 340, y: 200 },  // 沙发睡觉
  'cleaning':     { x: 200, y: 340 },  // 打扫
  'sitting-tea':  { x: 400, y: 280 },  // 茶几旁边
  'sitting':      { x: 380, y: 220 },  // 沙发发呆
  'photo-album':  { x: 340, y: 240 },  // 沙发翻相册
};

function App() {
  const [character, setCharacter] = useState<PixelCharacter | null>(null);
  const [currentAction, setCurrentAction] = useState<AutonomousAction | null>(null);
  const [characterPosition, setCharacterPosition] = useState<CharacterPosition>({ x: 400, y: 280 });
  const [sceneState, setSceneState] = useState<SceneState>(getInitialSceneState());
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'memories'>('home');

  useEffect(() => {
    const saved = getCharacter();
    setCharacter(saved);
    
    if (saved) {
      // 初始随机行为
      const action = randomNextAction(saved);
      setCurrentAction(action);
      // 设置对应位置
      if (action.type && actionPositions[action.type]) {
        setCharacterPosition(actionPositions[action.type]);
      }
    }
  }, []);

  // 更新场景状态（时间、天气、季节）
  useEffect(() => {
    const timer = setInterval(() => {
      setSceneState(updateSceneState);
    }, 60000); // 每分钟更新一次

    return () => clearInterval(timer);
  }, []);

  // 检查行为是否结束，选择新行为
  useEffect(() => {
    if (!character || !currentAction) return;

    const timer = setInterval(() => {
      if (isActionFinished(currentAction)) {
        const newAction = randomNextAction(character);
        setCurrentAction(newAction);
        // 移动到对应位置
        if (newAction.type && actionPositions[newAction.type]) {
          setCharacterPosition(actionPositions[newAction.type]);
        }
      }
    }, 30000); // 每30秒检查一次

    return () => clearInterval(timer);
  }, [character, currentAction]);

  function getInitialSceneState(): SceneState {
    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth() + 1;

    let timeOfDay: SceneState['timeOfDay'] = 'morning';
    if (hour < 6) timeOfDay = 'night';
    else if (hour < 12) timeOfDay = 'morning';
    else if (hour < 17) timeOfDay = 'afternoon';
    else if (hour < 20) timeOfDay = 'evening';
    else timeOfDay = 'night';

    let season: SceneState['season'] = 'spring';
    if (month >= 3 && month <= 5) season = 'spring';
    else if (month >= 6 && month <= 8) season = 'summer';
    else if (month >= 9 && month <= 11) season = 'autumn';
    else season = 'winter';

    // 随机天气，这里简单处理
    const weather: SceneState['weather'] = ['sunny', 'sunny', 'sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 5)] as any;

    return { timeOfDay, weather, season };
  }

  function updateSceneState(prev: SceneState): SceneState {
    const now = new Date();
    const hour = now.getHours();
    
    let timeOfDay: SceneState['timeOfDay'] = prev.timeOfDay;
    if (hour < 6) timeOfDay = 'night';
    else if (hour < 12) timeOfDay = 'morning';
    else if (hour < 17) timeOfDay = 'afternoon';
    else if (hour < 20) timeOfDay = 'evening';
    else timeOfDay = 'night';

    return { ...prev, timeOfDay };
  }

  function handleCharacterCreated(char: PixelCharacter) {
    setCharacter(char);
    const action = randomNextAction(char);
    setCurrentAction(action);
    if (action.type && actionPositions[action.type]) {
      setCharacterPosition(actionPositions[action.type]);
    }
  }

  function handleCharacterClick() {
    setShowChat(!showChat);
  }

  if (!character) {
    return <CreateCharacter onCreated={handleCharacterCreated} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>记忆像素</h1>
        <nav>
          <button 
            className={activeTab === 'home' ? 'active' : ''} 
            onClick={() => setActiveTab('home')}
          >
            主页
          </button>
          <button 
            className={activeTab === 'memories' ? 'active' : ''} 
            onClick={() => setActiveTab('memories')}
          >
            回忆相册
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'home' ? (
          <Scene sceneState={sceneState}>
            <PixelCharacterComponent 
              character={character} 
              currentAction={currentAction}
              position={characterPosition}
              onClick={handleCharacterClick}
            />
          </Scene>
        ) : (
          <MemoryAlbum characterId={character.id} />
        )}
      </main>

      {showChat && activeTab === 'home' && (
        <ChatBox character={character} />
      )}
    </div>
  );
}

export default App;
