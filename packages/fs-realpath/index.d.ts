/**
 * fs-realpath-native - 檔案系統實體路徑處理
 *
 * 這個模組提供了檔案系統實體路徑處理的功能，包括同步和異步操作，以及錯誤處理。
 *
 * @module fs-realpath-native
 * @author bluelovers
 */
import { BufferEncodingOption, EncodingOption, PathLike, realpathSync } from 'fs';
/** 同步解析實體路徑函數 */
export declare const fsRealpathNativeSync: typeof realpathSync.native;
/**
 * 異步解析實體路徑
 *
 * 這個函數會異步解析指定路徑的實體路徑，支援不同的編碼選項。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {EncodingOption} [options] 編碼選項
 * @returns {Promise<string>} Promise，解析為字串
 */
export declare function fsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string>;
/**
 * 異步解析實體路徑
 *
 * 這個函數會異步解析指定路徑的實體路徑，支援不同的編碼選項。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {BufferEncodingOption} options 編碼選項
 * @returns {Promise<Buffer>} Promise，解析為緩衝區
 */
export declare function fsRealpathNativeAsync(path: PathLike, options: BufferEncodingOption): Promise<Buffer>;
/**
 * 異步解析實體路徑
 *
 * 這個函數會異步解析指定路徑的實體路徑，支援不同的編碼選項。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {EncodingOption} [options] 編碼選項
 * @returns {Promise<string | Buffer>} Promise，解析為字串或緩衝區
 */
export declare function fsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string | Buffer>;
/**
 * 嘗試解析實體路徑（同步）
 *
 * 這個函數會嘗試解析指定路徑的實體路徑，如果路徑不存在則返回原路徑，不拋出錯誤。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {EncodingOption} [options] 編碼選項
 * @returns {string} 解析後的路徑或原路徑
 * @see https://github.com/facebook/jest/blob/main/packages/jest-util/src/tryRealpath.ts
 */
export declare function tryFsRealpathNativeSync(path: PathLike, options?: EncodingOption): string;
/**
 * 嘗試解析實體路徑（同步）
 *
 * 這個函數會嘗試解析指定路徑的實體路徑，如果路徑不存在則返回原路徑，不拋出錯誤。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {BufferEncodingOption} options 編碼選項
 * @returns {Buffer} 解析後的路徑或原路徑
 * @see https://github.com/facebook/jest/blob/main/packages/jest-util/src/tryRealpath.ts
 */
export declare function tryFsRealpathNativeSync(path: PathLike, options: BufferEncodingOption): Buffer;
/**
 * 嘗試解析實體路徑（同步）
 *
 * 這個函數會嘗試解析指定路徑的實體路徑，如果路徑不存在則返回原路徑，不拋出錯誤。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {EncodingOption} [options] 編碼選項
 * @returns {string | Buffer} 解析後的路徑或原路徑
 * @see https://github.com/facebook/jest/blob/main/packages/jest-util/src/tryRealpath.ts
 */
export declare function tryFsRealpathNativeSync(path: PathLike, options?: EncodingOption): string | Buffer;
/**
 * 嘗試解析實體路徑（異步）
 *
 * 這個函數會嘗試異步解析指定路徑的實體路徑，如果路徑不存在則返回原路徑，不拋出錯誤。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {EncodingOption} [options] 編碼選項
 * @returns {Promise<string>} Promise，解析為字串
 */
export declare function tryFsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string>;
/**
 * 嘗試解析實體路徑（異步）
 *
 * 這個函數會嘗試異步解析指定路徑的實體路徑，如果路徑不存在則返回原路徑，不拋出錯誤。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {BufferEncodingOption} options 編碼選項
 * @returns {Promise<Buffer>} Promise，解析為緩衝區
 */
export declare function tryFsRealpathNativeAsync(path: PathLike, options: BufferEncodingOption): Promise<Buffer>;
/**
 * 嘗試解析實體路徑（異步）
 *
 * 這個函數會嘗試異步解析指定路徑的實體路徑，如果路徑不存在則返回原路徑，不拋出錯誤。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {EncodingOption} [options] 編碼選項
 * @returns {Promise<string | Buffer>} Promise，解析為字串或緩衝區
 */
export declare function tryFsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string | Buffer>;
/** 預設導出 - 嘗試解析實體路徑（同步）函數 */
export default tryFsRealpathNativeSync;
