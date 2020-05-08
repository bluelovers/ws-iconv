/**
 * Created by user on 2020/5/1.
 */
/// <reference types="node" />
export declare function arrayBufferToString(buf: number[] | ArrayBuffer, encoding?: BufferEncoding, from?: BufferEncoding): string;
export declare function arrayBufferToBuffer(buf: number[] | ArrayBuffer, encoding?: BufferEncoding, from?: BufferEncoding): Buffer;
export default arrayBufferToString;
