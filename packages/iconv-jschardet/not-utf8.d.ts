/// <reference types="node" />
import { CODEC_DATA_ENCODING_ID } from './lib/const';
/**
 * 檢測 Buffer 並且返回小寫標準化後的編碼 ID
 */
export declare function detectEncoding<T extends CODEC_DATA_ENCODING_ID | string>(buf: Buffer): T;
/**
 * 當 Buffer 編碼不屬於 UTF-8 或者 ascii 時
 * 返回編碼資訊
 */
export declare function notUTF8Buffer(buf: Buffer): import("./index").IDetectData;
/**
 * 當 Buffer | string 編碼不屬於 UTF-8 或者 ascii 時
 * 返回編碼資訊
 */
export declare function notUTF8(buf: Buffer | string): import("./index").IDetectData;
declare const _default: typeof import("./not-utf8");
export default _default;
