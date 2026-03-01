/**
 * fs-iconv 核心功能模組
 *
 * 這個模組提供了檔案系統操作的編碼轉換功能，可以處理各種文字編碼的檔案讀寫操作。
 *
 * @module fs-iconv/core
 * @author bluelovers
 * @since 2019/3/17
 */
import { vEncoding } from 'iconv-jschardet';
import fsExtra from 'fs-extra';
import iconv from 'iconv-jschardet';
import Bluebird from 'bluebird';
import stream from 'stream';
import { ITSRequireAtLeastOne } from 'ts-type';
/** 檔案系統庫符號，用於內部引用原始的 fs-extra 實例 */
export declare const SymFSLib: unique symbol;
/**
 * 包裝檔案系統操作並添加編碼轉換功能
 *
 * @template F 檔案系統類型，預設為 fs-extra
 * @param {F} fsLib 要包裝的檔案系統庫
 * @returns {WrapFSIconv.IWrapFS<F>} 包裝後的檔案系統實例
 */
export declare function WrapFSIconv<F extends typeof fsExtra = typeof fsExtra>(fsLib: F): WrapFSIconv.IWrapFS<F>;
/**
 * 確保檔案存在並創建寫入流
 *
 * 這個函數會先確保目標檔案存在（如果不存在則創建），然後返回一個可寫入的檔案流。
 *
 * @param {string} file 檔案路徑
 * @returns {fsExtra.WriteStream} 檔案寫入流
 */
export declare function ensureWriteStream(file: string): fsExtra.WriteStream;
/**
 * 同步保存檔案並處理編碼轉換
 *
 * 這個函數會將資料保存到指定檔案，並在需要時進行編碼轉換。
 *
 * @param {string} file 檔案路徑
 * @param {any} data 要保存的資料
 * @param {WrapFSIconv.IWrapFSIconvOptions} [options={}] 選項
 * @param {vEncoding} [options.encoding] 目標編碼
 * @returns {boolean} 總是返回 true
 */
export declare function saveFileSync(file: string, data: any, options?: WrapFSIconv.IWrapFSIconvOptions): boolean;
/**
 * 異步保存檔案並處理編碼轉換
 *
 * 這個函數會將資料保存到指定檔案，並在需要時進行編碼轉換。使用 Promise 處理異步操作。
 *
 * @param {string} file 檔案路徑
 * @param {any} data 要保存的資料
 * @param {WrapFSIconv.IWrapFSIconvOptions} [options={}] 選項
 * @param {vEncoding} [options.encoding] 目標編碼
 * @returns {Bluebird<boolean>} Promise，解析為 true
 */
export declare function saveFile(file: string, data: any, options?: WrapFSIconv.IWrapFSIconvOptions): Bluebird<boolean>;
export declare namespace WrapFSIconv {
    type IWrapFS<F extends typeof fsExtra = typeof fsExtra> = F & {
        [SymFSLib]: F | typeof fsExtra;
        iconv: typeof iconv;
        ensureWriteStream(file: string): fsExtra.WriteStream;
        saveFile(file: string, data: any, options?: WrapFSIconv.IWrapFSIconvOptions): Bluebird<boolean>;
        saveFileSync(file: string, data: any, options?: WrapFSIconv.IWrapFSIconvOptions): boolean;
        loadFile<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): Bluebird<T>;
        loadFile<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Bluebird<T>;
        loadFileSync<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): T;
        loadFileSync<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): T;
        _createStreamPassThrough(data: unknown): stream.Readable;
        _outputStream(file: string, readStream: stream.Readable): fsExtra.WriteStream;
        _autoDecode<T>(buf: T, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile & {
            autoDecode: true | string[];
        }): T | string | Buffer;
        _autoDecode(buf: unknown, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Buffer;
        trimFilename(name: unknown): string;
    };
    interface IWrapFSIconvOptions {
        encoding?: vEncoding;
    }
    interface IWrapFSIconvOptionsLoadFile {
        encoding?: string;
        flag?: string;
        autoDecode?: boolean | string[];
    }
    type IWrapFSIconvOptionsLoadFile2 = ITSRequireAtLeastOne<IWrapFSIconvOptionsLoadFile, 'encoding' | 'autoDecode'>;
    type IEncoding = vEncoding;
}
/**
 * 創建數據流傳遞流
 *
 * 這個函數將創建一個 PassThrough 流，用於在讀取和寫入操作之間傳遞數據。
 *
 * @param {unknown} data 要傳遞的資料
 * @returns {stream.Readable} 可讀取的數據流
 */
export declare function _createStreamPassThrough(data: any): stream.Readable;
/**
 * 創建檔案輸出流
 *
 * 這個函數將創建一個寫入流，用於將數據流寫入指定檔案。
 *
 * @param {string} file 檔案路徑
 * @param {stream.Readable} readStream 要寫入的數據流
 * @returns {fsExtra.WriteStream} 檔案寫入流
 */
export declare function _outputStream(file: string, readStream: stream.Readable): fsExtra.WriteStream;
/**
 * 自動解碼緩衝區
 *
 * 這個函數會根據提供的選項自動檢測並解碼緩衝區。如果提供了 autoDecode 選項，會嘗試使用指定的編碼進行解碼。
 *
 * @template T 緩衝區類型
 * @param {T} buf 要解碼的緩衝區
 * @param {WrapFSIconv.IWrapFSIconvOptionsLoadFile} options 解碼選項
 * @param {boolean | string[]} [options.autoDecode] 自動解碼選項
 * @param {string} [options.encoding] 目標編碼
 * @returns {T | string | Buffer} 解碼後的結果
 */
export declare function _autoDecode<T>(buf: T, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile & {
    autoDecode: true | string[];
}): T | string | Buffer;
export declare function _autoDecode(buf: any, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Buffer;
/**
 * 異步載入檔案並處理編碼轉換
 *
 * 這個函數會異步載入指定檔案，並根據提供的選項進行編碼轉換。
 *
 * @template T 返回類型，預設為 string
 * @param {string} file 檔案路徑
 * @param {WrapFSIconv.IWrapFSIconvOptionsLoadFile2} options 載入選項
 * @param {string} [options.encoding] 目標編碼
 * @param {boolean | string[]} [options.autoDecode] 自動解碼選項
 * @returns {Bluebird<T>} Promise，解析為載入的資料
 */
export declare function loadFile<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): Bluebird<T>;
export declare function loadFile<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Bluebird<T>;
/**
 * 同步載入檔案並處理編碼轉換
 *
 * 這個函數會同步載入指定檔案，並根據提供的選項進行編碼轉換。
 *
 * @template T 返回類型，預設為 string
 * @param {string} file 檔案路徑
 * @param {WrapFSIconv.IWrapFSIconvOptionsLoadFile2} options 載入選項
 * @param {string} [options.encoding] 目標編碼
 * @param {boolean | string[]} [options.autoDecode] 自動解碼選項
 * @returns {T} 載入的資料
 */
export declare function loadFileSync<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): T;
export declare function loadFileSync<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): T;
declare const _default: typeof import("./core");
export default _default;
