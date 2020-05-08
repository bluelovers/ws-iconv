/**
 * Created by user on 2020/5/1.
 */
/// <reference types="node" />
import { vEncoding } from 'iconv-jschardet';
export declare function arrayBufferToString(buf: number[] | ArrayBuffer, encoding?: vEncoding, from?: vEncoding): string;
export declare function arrayBufferToBuffer(buf: number[] | ArrayBuffer, encoding?: vEncoding, from?: vEncoding): Buffer;
export default arrayBufferToString;
