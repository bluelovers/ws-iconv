/// <reference types="node" />
import { INewLineCharacter } from './types';
export declare function handleOptionNewLineCharacter(newLineCharacter?: INewLineCharacter): number[];
export declare function bufferEndWithByBuffer(buf: Buffer, value: Uint8Array, byteOffset?: number, encoding?: BufferEncoding): boolean;
export declare function bufferEndWith(buf: Buffer, value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): boolean;
export declare function bufferStripEndWithByBuffer(buf: Buffer, value: Uint8Array, byteOffset?: number, encoding?: BufferEncoding): Buffer;
export declare function bufferStripEndWith(buf: Buffer, value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): Buffer;
export declare function bufferIndexWithByBuffer(buf: Buffer, value: Uint8Array, byteOffset: number, encoding?: BufferEncoding): boolean;
export declare function bufferIndexWith(buf: Buffer, value: string | number | Uint8Array, byteOffset: number, encoding?: BufferEncoding): boolean;
export declare function splitBufferByBuffer(buffer: Buffer, value: Uint8Array): Buffer[];
