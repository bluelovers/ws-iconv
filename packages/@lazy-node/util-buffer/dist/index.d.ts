export type IBufferValueInput = string | number | Uint8Array;
export declare function _valueLength(value: IBufferValueInput): number;
export declare function _bufferLastIndexOf(buf: Buffer, value: IBufferValueInput, byteOffset?: number, encoding?: BufferEncoding): {
	len: number;
	i: number;
};
export declare function _endWith(buf: any[] | Uint8Array, i: number, len: number): boolean;
export declare function _indexWith(i: number, byteOffset: number): boolean;
export declare function bufferEndWith(buf: Buffer, value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): boolean;
export declare function bufferStripEndWith(buf: Buffer, value: IBufferValueInput, byteOffset?: number, encoding?: BufferEncoding): Buffer;
export declare function bufferIndexWith(buf: Buffer, value: IBufferValueInput, byteOffset: number, encoding?: BufferEncoding): boolean;
export declare function splitBufferByBuffer(buffer: Buffer, value: Uint8Array): Buffer[];

export {
	bufferEndWith as bufferEndWithByBuffer,
	bufferIndexWith as bufferIndexWithByBuffer,
	bufferStripEndWith as bufferStripEndWithByBuffer,
};

export {};
