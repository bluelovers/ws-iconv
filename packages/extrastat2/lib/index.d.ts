/**
 * 擴展檔案狀態核心模組
 * Extended file status core module
 *
 * 提供 statExtra 函數以取得擴展的檔案狀態資訊
 * Provides statExtra function to get extended file status information
 */
import { IStatsExtra, IOptions } from './types';
/**
 * 取得擴展檔案狀態
 * Get extended file status
 *
 * 解析檔案路徑並取得包含 MIME 類型、權限等額外資訊的狀態物件
 * Resolves file path and returns status object with additional info like MIME type, permissions
 *
 * @param {string} pathname - 檔案路徑 / File path
 * @param {IOptions} [options] - 選項 / Options
 * @returns {Promise<IStatsExtra>} 擴展狀態物件 / Extended status object
 */
export declare function statExtra(pathname: string, options?: IOptions): Promise<IStatsExtra>;
/**
 * 預設導出 - statExtra 函數
 * Default export - statExtra function
 */
export default statExtra;
