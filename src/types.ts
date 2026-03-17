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
}

// 行为类型
export type ActionType = 
  | 'reading'      // 读书看报
  | 'watching-tv'  // 看电视
  | 'walking'      // 散步
  | 'cooking'      // 做饭
  | 'gardening'    // 浇花种花
  | 'napping'      // 打盹
  | 'petting'      // 撸猫/遛狗
  | 'drinking-tea' // 喝茶
  | 'cleaning'     // 打扫
  | 'sitting'      // 坐着发呆
  | 'photo-album'; // 翻看相册

// 场景状态
export interface SceneState {
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';
  weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

// 对话消息
export interface ChatMessage {
  id: string;
  sender: 'user' | 'character';
  content: string;
  timestamp: number;
}
