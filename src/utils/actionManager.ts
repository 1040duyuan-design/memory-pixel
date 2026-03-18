import type { PixelCharacter, AutonomousAction, ActionType } from '../types';

// 活动池 - 客厅场景下的日常行为
const AVAILABLE_ACTIONS: { type: ActionType; activity: string; minDuration: number; maxDuration: number }[] = [
  { type: 'reading', activity: '坐在沙发上看书', minDuration: 60000, maxDuration: 300000 },
  { type: 'reading', activity: '靠在沙发读报纸', minDuration: 120000, maxDuration: 480000 },
  { type: 'watching-tv', activity: '坐在沙发看电视', minDuration: 180000, maxDuration: 600000 },
  { type: 'watching-tv', activity: '看喜欢的戏曲节目', minDuration: 300000, maxDuration: 600000 },
  { type: 'walking', activity: '在客厅慢慢散步', minDuration: 60000, maxDuration: 180000 },
  { type: 'walking', activity: '踱步思考', minDuration: 30000, maxDuration: 120000 },
  { type: 'standing', activity: '站在窗边眺望', minDuration: 60000, maxDuration: 180000 },
  { type: 'standing', activity: '看着窗外发呆', minDuration: 120000, maxDuration: 240000 },
  { type: 'watering', activity: '给绿植浇水', minDuration: 30000, maxDuration: 90000 },
  { type: 'watering', activity: '整理花叶', minDuration: 60000, maxDuration: 120000 },
  { type: 'napping', activity: '在沙发上打盹', minDuration: 180000, maxDuration: 480000 },
  { type: 'napping', activity: '躺着午休', minDuration: 300000, maxDuration: 600000 },
  { type: 'cleaning', activity: '打扫客厅', minDuration: 60000, maxDuration: 180000 },
  { type: 'cleaning', activity: '擦拭茶几', minDuration: 30000, maxDuration: 90000 },
  { type: 'sitting-tea', activity: '在茶几旁喝茶', minDuration: 120000, maxDuration: 300000 },
  { type: 'sitting-tea', activity: '品茶休息', minDuration: 60000, maxDuration: 180000 },
  { type: 'sitting', activity: '坐在沙发发呆', minDuration: 120000, maxDuration: 300000 },
  { type: 'sitting', activity: '闭目养神', minDuration: 60000, maxDuration: 180000 },
  { type: 'photo-album', activity: '坐在沙发翻相册', minDuration: 180000, maxDuration: 480000 },
];

// 根据角色性格和爱好，随机选择一个行为
export function randomNextAction(character: PixelCharacter): AutonomousAction {
  // 所有客厅行为都可用，根据爱好稍微加权
  let possibleActions = [...AVAILABLE_ACTIONS];
  
  // 如果有匹配爱好，增加其权重
  character.hobbies.forEach(hobby => {
    const key = hobby.toLowerCase();
    AVAILABLE_ACTIONS.forEach(action => {
      if (key.includes(action.activity.toLowerCase()) || action.activity.toLowerCase().includes(key)) {
        // 匹配的动作多加一次，增加选中概率
        possibleActions.push(action);
      }
    });
  });

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
