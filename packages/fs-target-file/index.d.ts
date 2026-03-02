/**
 * fs-target-file - 檔案目標處理工具
 *
 * 這個模組提供了檔案目標處理的功能，支援讀取和寫入操作，並可以指定輸入和輸出檔案。
 *
 * @module fs-target-file
 * @author bluelovers
 */
import { ReadOptions, WriteOptions } from 'fs-extra';
import { ITSResolvable } from 'ts-type/lib/generic';
import { ITSRequiredPick } from 'ts-type/lib/type/record';
/**
 * 檔案方法異步選項
 *
 * @interface IFileMethodAsyncOptions
 * @template RO 讀取選項類型
 * @template WO 寫入選項類型
 * @template D 資料類型
 * @template N 檔案路徑類型
 */
export interface IFileMethodAsyncOptions<RO = ReadOptions, WO = WriteOptions, D = unknown, N = string> {
    /** 讀取函數 */
    read?<T = D>(file: N, options?: RO): Promise<T>;
    /** 寫入函數 */
    write?<T = D>(file: N, data: ITSResolvable<T>, options?: RO): Promise<any>;
    /** 讀取選項 */
    readOptions?: RO;
    /** 寫入選項 */
    writeOptions?: WO;
}
/**
 * 檔案方法異步處理
 *
 * 這個函數會處理檔案的異步讀取和寫入操作，支援自定義函數和選項。
 *
 * @template RO 讀取選項類型
 * @template WO 寫入選項類型
 * @template D 資料類型
 * @template N 檔案路徑類型
 * @param {IFileMethodAsyncOptions<RO, WO, D, N>} [options] 選項
 * @returns {object} 包含 read 和 write 方法的物件
 */
export declare function fsFileMethodAsync<RO = ReadOptions, WO = WriteOptions, D = unknown, N = string>(options?: IFileMethodAsyncOptions<RO, WO, D, N>): {
    read: (<T = D>(file: N, options?: RO) => Promise<T>) | ((file: any, options: any) => Promise<any>);
    write: <T = D>(file: N, data: ITSResolvable<T>, options?: RO) => Promise<any>;
};
/**
 * 檔案目標選項
 *
 * @interface ITargetFileOptions
 * @template N 檔案路徑類型
 */
export interface ITargetFileOptions<N = string> {
    /** 輸入檔案路徑 */
    inputFile: N;
    /** 輸出檔案路徑 */
    outputFile?: N;
}
/**
 * 轉換檔案目標選項
 *
 * 這個函數會將目標選項轉換為標準格式，支援直接傳入檔案路徑或選項物件。
 *
 * @template N 檔案路徑類型
 * @param {N | ITargetFileOptions<N>} targetOptions 目標選項
 * @returns {ITSRequiredPick<ITargetFileOptions<N>>} 標準化後的選項
 */
export declare function toTargetFileOptions<N = string>(targetOptions: N | ITargetFileOptions<N>): ITSRequiredPick<ITargetFileOptions<N>>;
/**
 * 檔案目標處理
 *
 * 這個函數會創建一個檔案目標處理器，支援讀取和寫入操作，並可以指定輸入和輸出檔案。
 *
 * @template D 資料類型
 * @template RO 讀取選項類型
 * @template WO 寫入選項類型
 * @template N 檔案路徑類型
 * @param {N | ITargetFileOptions<N>} targetOptions 目標選項
 * @param {IFileMethodAsyncOptions<RO, WO, D, N>} [options] 選項
 * @returns {object} 檔案目標處理器
 */
export declare function fsTargetFile<D = unknown, RO = ReadOptions, WO = WriteOptions, N = string>(targetOptions: N | ITargetFileOptions<N>, options?: IFileMethodAsyncOptions<RO, WO, D, N>): {
    /** 輸入檔案路徑 */
    readonly inputFile: N;
    /** 輸出檔案路徑 */
    readonly outputFile: N;
    /**
     * 讀取檔案
     *
     * @template T 資料類型
     * @param {RO} [options] 選項
     * @returns {Promise<T>} Promise，解析為資料
     */
    read<T = D>(options?: RO): Promise<T>;
    /**
     * 寫入檔案
     *
     * @template T 資料類型
     * @param {T} data 資料
     * @param {RO} [options] 選項
     * @returns {Promise<unknown>} Promise
     */
    write<T extends D = D>(data: T, options?: RO): Promise<unknown>;
    /**
     * 異步處理
     *
     * @returns {Promise<object>} Promise，解析為檔案目標處理器
     */
    async(): Promise</*elided*/ any>;
};
/** 預設導出 - 檔案目標處理函數 */
export default fsTargetFile;
