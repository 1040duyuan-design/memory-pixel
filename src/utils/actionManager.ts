import type { PixelCharacter, AutonomousAction, ActionType } from '../types';

// 活动池，根据性格爱好生成可能的行为
const AVAILABLE_ACTIONS: Record<string, { type: ActionType; activity: string; minDuration: number; maxDuration: number }[]> = {
  reading: [
    { type: 'reading', activity: '坐在沙发上看报纸', minDuration: 60000, maxDuration: 300000 },
    { type: 'reading', activity: '在阳台看书', minDuration: 120000, maxDuration: 480000 },
  ],
  watchingTv: [
    { type: 'watching-tv', activity: '坐在沙发看电视新闻', minDuration: 180000, maxDuration: 600000 },
    { type: 'watching-tv', activity: '看京剧/戏曲节目', minDuration: 300000, maxDuration: 600000 },
  ],
  walking: [
    { type: 'walking', activity: '在小区散步', minDuration: 180000, maxDuration: 360000 },
    { type: 'walking', activity: '去公园逛逛', minDuration: 300000, maxDuration: 600000 },
  ],
  cooking: [
    { type: 'cooking', activity: '在厨房熬汤', minDuration: 120000, maxDuration: 300000 },
    { type: 'cooking', activity: '整理厨房', minDuration: 60000, maxDuration: 180000 },
  ],
  gardening: [
    { type: 'gardening', activity: '给阳台的花浇水', minDuration: 30000, maxDuration: 120000 },
    { type: 'gardening', activity: '修剪花草', minDuration: 60000, maxDuration: 180000 },
  ],
  napping: [
    { type: 'napping', activity: '在摇椅上打盹', minDuration: 180000, maxDuration: 480000 },
    { type: 'napping', activity: '沙发上午睡', minDuration: 120000, maxDuration: 360000 },
  ],
  petting: [
    { type: 'petting', activity: '陪着猫咪晒太阳', minDuration: 120000, maxDuration: 300000 },
    { type: 'petting', activity: '遛狗', minDuration: 180000, maxDuration: 360000 },
  ],
  drinkingTea: [
    { type: 'drinking-tea', activity: '在茶几旁泡茶', minDuration: 60000, maxDuration: 180000 },
    { type: 'drinking-tea', activity: '慢慢品茶', minDuration: 120000, maxDuration: 300000 },
  ],
  cleaning: [
    { type: 'cleaning', activity: '打扫客厅', minDuration: 60000, maxDuration: 180000 },
    { type: 'cleaning', activity: '擦桌子整理', minDuration: 30000, maxDuration: 90000 },
  ],
  sitting: [
    { type: 'sitting', activity: '坐在阳台晒太阳', minDuration: 120000, maxDuration: 300000 },
    { type: 'sitting', activity: '坐在窗边发呆', minDuration: 60000, maxDuration: 180000 },
  ],
  photoAlbum: [
    { type: 'photo-album', activity: '翻看老相册', minDuration: 180000, maxDuration: 480000 },
  ],
};

// 根据角色性格和爱好，随机选择一个行为
export function randomNextAction(character: PixelCharacter): AutonomousAction {
  // 合并爱好默认行为
  const possibleActions: { type: ActionType; activity: string; minDuration: number; maxDuration: number }[] = [];
  
  character.hobbies.forEach(hobby => {
    const key = hobby.toLowerCase();
    for (const category in AVAILABLE_ACTIONS) {
      if (key.includes(category) || category.includes(key)) {
        possibleActions.push(...AVAILABLE_ACTIONS[category]);
      }
    }
  });

  // 如果没匹配到，加入所有默认行为
  if (possibleActions.length === 0) {
    for (const category in AVAILABLE_ACTIONS) {
      possibleActions.push(...AVAILABLE_ACTIONS[category]);
    }
  }

  // 随机选一个
  const selected = possibleActions[Math.floor(Math.random() * possibleActions.length)];
  const duration = Math.floor(
    selected.minDuration + Math.random() * (selected.maxDuration - selected.minDuration)
  );

  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: selected.type,
    activity: selected.activity,
    duration,
    startTime: Date.now(),
  };
}

// 获取当前行为描述
export function getCurrentActionDescription(action: AutonomousAction): string {
  return action.activity;
}

// 检查行为是否结束
export function isActionFinished(action: AutonomousAction): boolean {
  return Date.now() - action.startTime > action.duration;
}
