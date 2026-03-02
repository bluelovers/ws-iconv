/**
 * fs-hardlink-win - Windows 硬連結工具
 *
 * 這個模組提供了在 Windows 系統上檢查硬連結的工具，可以列出指定檔案的所有硬連結。
 *
 * @module fs-hardlink-win
 * @author bluelovers
 */
/**
 * 處理命令列輸出
 *
 * 這個內部函數會處理 fsutil 命令的輸出，將其轉換為陣列格式。
 *
 * @internal
 * @param {string | Buffer} stdout 命令列輸出
 * @returns {string[]} 處理後的輸出陣列
 */
export declare function _handleOutput(stdout: string | Buffer): string[];
/**
 * 異步檢查硬連結列表
 *
 * 這個函數會使用 fsutil 命令檢查指定檔案的所有硬連結，並返回結果陣列。
 *
 * @param {string} file 要檢查的檔案路徑
 * @param {object} [options={}] 選項
 * @param {string} [options.cwd] 工作目錄
 * @returns {Promise<string[]>} Promise，解析為硬連結列表陣列
 */
export declare function winHardlinkList(file: string, options?: {
    cwd?: string;
}): import("bluebird")<string[]>;
/**
 * 同步檢查硬連結列表
 *
 * 這個函數會使用 fsutil 命令同步檢查指定檔案的所有硬連結，並返回結果陣列。
 *
 * @param {string} file 要檢查的檔案路徑
 * @param {object} [options={}] 選項
 * @param {string} [options.cwd] 工作目錄
 * @returns {string[]} 硬連結列表陣列
 */
export declare function winHardlinkListSync(file: string, options?: {
    cwd?: string;
}): string[];
/** 預設導出 - 異步檢查硬連結列表函數 */
export default winHardlinkList;
