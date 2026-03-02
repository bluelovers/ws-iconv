/**
 * extrastat2 - 擴展檔案狀態資訊
 * Extended file status information
 *
 * 解析 fs.Stat 物件，提供 MIME 類型、擁有者名稱、群組名稱和可讀權限等額外資訊
 * Resolves fs.Stat to mimetype, ownername, groupname, and human-readable permissions
 *
 * @module extrastat2
 * @author Colten Jackson
 */
import { statExtra } from './lib';
/**
 * 重新導出類型定義
 * Re-export type definitions
 */
export * from './lib/types';
/**
 * 導出主要函數
 * Export main function
 */
export { statExtra };
/**
 * 預設導出 - statExtra 函數
 * Default export - statExtra function
 */
export default statExtra;
