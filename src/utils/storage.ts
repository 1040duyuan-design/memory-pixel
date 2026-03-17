import type { PixelCharacter, Memory } from '../types';

const STORAGE_KEY = 'memory-pixel-character';
const MEMORIES_KEY = 'memory-pixel-memories';

// 保存角色
export function saveCharacter(character: PixelCharacter): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
}

// 获取角色
export function getCharacter(): PixelCharacter | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// 删除角色
export function clearCharacter(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// 保存回忆列表
export function saveMemories(memories: Memory[]): void {
  localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories));
}

// 获取回忆列表
export function getMemories(): Memory[] {
  const data = localStorage.getItem(MEMORIES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}
