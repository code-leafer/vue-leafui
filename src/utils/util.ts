/**
 * 常用工具函数集合
 */

/**
 * 生成唯一ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 10);
};

/**
 * 深拷贝对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  const result: any = Array.isArray(obj) ? [] : {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  
  return result;
};

/**
 * 对象合并
 */
export const merge = (target: Record<string, any>, ...sources: Record<string, any>[]): Record<string, any> => {
  if (sources.length === 0) {
    return target;
  }
  
  const source = sources.shift();
  
  if (source === undefined) {
    return target;
  }
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) {
          target[key] = {};
        }
        merge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    });
  }
  
  return merge(target, ...sources);
};

/**
 * 判断是否为对象
 */
export const isObject = (item: any): boolean => {
  return (item && typeof item === 'object' && !Array.isArray(item));
};

/**
 * 获取对象属性值（支持嵌套路径）
 */
export const getPropByPath = (obj: Record<string, any>, path: string): any => {
  const keys = path.split('.');
  let result = obj;
  
  for (let i = 0; i < keys.length; i++) {
    if (result === undefined) return undefined;
    result = result[keys[i]];
  }
  
  return result;
};

/**
 * 防抖函数
 */
export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void => {
  let timer: number | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    
    timer = window.setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
};

/**
 * 节流函数
 */
export const throttle = <T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void => {
  let lastCall = 0;
  
  return function(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}; 