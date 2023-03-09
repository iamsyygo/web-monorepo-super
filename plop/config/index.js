import { readdirSync } from 'fs';
/**
 * 获取目录下的文件夹
 * @param path 目录路径
 * @param includeStr 包含的字符串
 * @return {string[]}
 */
export const getCoreFolders = (path, includeStr) => {
  const coreNextDir = readdirSync(path);
  return coreNextDir.filter((item) => item.startsWith(includeStr));
};
