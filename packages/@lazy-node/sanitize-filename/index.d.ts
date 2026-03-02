/**
 * @lazy-node/sanitize-filename - 檔案名稱安全化模組
 *
 * 這個模組提供了將字串轉換為安全檔案名稱的功能，移除或替換不安全的字元，
 * 支援多種選項來自訂處理方式。
 *
 * @module @lazy-node/sanitize-filename
 * @author bluelovers
 */
import { Options } from 'filenamify/filenamify';
/**
 * 檔案名稱安全化選項介面
 *
 * @description 擴展 filenamify 的選項，添加額外的處理選項
 * @interface IOptions
 * @extends {Options}
 */
export interface IOptions extends Options {
    /** 是否移除點檔案（以點開頭的檔案） */
    removeDotFile?: boolean;
    /** 是否將特殊字元替換為全形字元 */
    replaceToFullWidth?: boolean;
    /** 是否進行完整修剪（移除前後底線、連字號、加號） */
    trim?: boolean;
    /** 是否跳過空格修剪 */
    noTrimSpace?: boolean;
    /** 當結果為空時是否拋出錯誤 */
    throwEmpty?: boolean;
}
/**
 * 將字串轉換為安全的檔案名稱
 *
 * @description 移除或替換不安全的字元，確保檔案名稱在各種作業系統上都能正常使用
 * @param {string} name 要處理的原始字串
 * @param {IOptions} [options] 處理選項
 * @returns {string} 安全的檔案名稱
 * @example
 * ```typescript
 * const safeName = sanitizeFilename('my file?.txt');
 * console.log(safeName); // 'my file!.txt'
 * ```
 */
export declare function sanitizeFilename(name: string, options?: IOptions): string;
/**
 * 將特殊字元替換為全形字元
 *
 * @description 將常見的特殊字元轉換為對應的全形字元，使檔案名稱更美觀
 * @param {string} name 要處理的字串
 * @returns {string} 替換後的字串
 * @example
 * ```typescript
 * const fullWidth = replaceToFullWidth('file?name*');
 * console.log(fullWidth); // 'file？name＊'
 * ```
 */
export declare function replaceToFullWidth(name: string): string;
/**
 * 修剪空格
 *
 * @description 移除字串前後的空格和特殊空白字元
 * @param {string} name 要處理的字串
 * @returns {string} 修剪後的字串
 */
export declare function trimSpace(name: string): string;
/**
 * 修剪檔案名稱
 *
 * @description 移除字串前後的空格、底線、連字號和加號
 * @param {string} name 要處理的字串
 * @returns {string} 修剪後的字串
 */
export declare function trimFilename(name: string): string;
/**
 * 預設匯出：檔案名稱安全化函數
 *
 * @description 這是最主要的函數，提供完整的檔案名稱安全化功能
 * @type {typeof sanitizeFilename}
 */
export default sanitizeFilename;
