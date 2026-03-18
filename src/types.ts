// 像素人物数据结构
export interface PixelCharacter {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  personality: string[];
  hobbies: string[];
  appearance: {
    hair: string;
    clothes: string;
    accessories: string[];
  };
  favoriteQuotes: string[];
  memories: Memory[];
  createdAt: number;
}

// 回忆记录
export interface Memory {
  id: string;
  title: string;
  content: string;
  photoUrl?: string;
  date: number;
  tags: string[];
}

// 自主行为
export interface AutonomousAction {
  id: string;
  type: ActionType;
  activity: string;
  duration: number; // 持续时间（毫秒）
  startTime: number;
  targetPosition?: { x: number; y: number }; // 移动目标位置
  startPosition?: { x: number; y: number }; // 起始位置
}

// 行为类型
export type ActionType = 
  | 'reading'      // 在沙发读书看报
  | 'watching-tv' // 坐在沙发看电视
  | 'walking'      // 在客厅散步
  | 'standing'     // 站在窗边
  | 'watering'     // 给绿植浇水
  | 'napping'      // 在沙发打盹
  | 'cleaning'     // 打扫客厅
  | 'sitting-tea'  // 在茶几喝茶
  | 'sitting'      // 坐着发呆
  | 'photo-album'; // 翻看相册

// 场景状态
export interface SceneState {
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';
  weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

// 人物位置
export interface CharacterPosition {
  x: number;
  y: number;
}

// 对话消息
export interface ChatMessage {
  id: string;
  sender: 'user' | 'character';
  content: string;
  timestamp: number;
}
