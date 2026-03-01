
/**
 * @lazy-node/util-buffer - Buffer 工具函數模組
 * 
 * 這個模組提供了多種 Buffer 處理的工具函數，包括字串搜尋、截取、分割等功能。
 * 
 * @module @lazy-node/util-buffer
 * @author bluelovers
 */

/**
 * Buffer 值輸入類型
 * 
 * @description 支援多種類型的 Buffer 輸入值
 * @type {string | number | Uint8Array | Buffer}
 */
export type IBufferValueInput = string | number | Uint8Array | Buffer;

/**
 * 獲取值的長度
 * 
 * @description 計算輸入值的位元組長度，數字類型固定為 1
 * @param {IBufferValueInput} value 要計算長度的值
 * @returns {number} 值的長度
 */
export function _valueLength(value: IBufferValueInput)
{
	return typeof value === 'number' ? 1 : value.length;
}

/**
 * 在 Buffer 中尋找最後出現的位置
 * 
 * @description 使用 lastIndexOf 方法尋找指定值在 Buffer 中最後出現的位置
 * @param {Buffer} buf 要搜尋的 Buffer
 * @param {IBufferValueInput} value 要尋找的值
 * @param {number} [byteOffset] 搜尋的起始位置
 * @param {BufferEncoding} [encoding] 字串編碼格式
 * @returns {{len: number, i: number}} 包含長度和索引的物件
 */
export function _bufferLastIndexOf(buf: Buffer,
	value: IBufferValueInput,
	byteOffset?: number,
	encoding?: BufferEncoding,
)
{
	const len = _valueLength(value);
	const i = buf.lastIndexOf(value as any, byteOffset ?? (0 - len), encoding);

	return {
		len,
		i,
	}
}

/**
 * 檢查 Buffer 是否以指定值結尾
 * 
 * @description 判斷 Buffer 是否在指定位置以給定值結尾
 * @param {any[] | Uint8Array | Buffer} buf 要檢查的 Buffer
 * @param {number} i 索引位置
 * @param {number} len 長度
 * @returns {buf is Uint8Array | Buffer} 是否以指定值結尾
 */
export function _endWith(buf: any[] | Uint8Array | Buffer, i: number, len: number): buf is Uint8Array | Buffer
{
	return i !== -1 && (i + len) === buf.length
}

/**
 * 檢查索引是否匹配指定位置
 * 
 * @description 判斷索引是否等於指定的位移位置
 * @param {number} i 索引位置
 * @param {number} byteOffset 位移位置
 * @returns {boolean} 是否匹配
 */
export function _indexWith(i: number, byteOffset: number)
{
	return i !== -1 && i === byteOffset
}

/**
 * 檢查 Buffer 是否以指定值結尾
 * 
 * @description 判斷 Buffer 是否以給定的值結尾
 * @param {Buffer} buf 要檢查的 Buffer
 * @param {IBufferValueInput} value 要檢查的值
 * @param {number} [byteOffset] 搜尋的起始位置
 * @param {BufferEncoding} [encoding] 字串編碼格式
 * @returns {boolean} 是否以指定值結尾
 */
export function bufferEndWith(buf: Buffer,
	value: IBufferValueInput,
	byteOffset?: number,
	encoding?: BufferEncoding,
)
{
	const { len, i } = _bufferLastIndexOf(buf, value, byteOffset, encoding);

	return _endWith(buf as any, i, len)
}

/**
 * @deprecated 使用 bufferEndWith 替代
 */
export { bufferEndWith as bufferEndWithByBuffer }

/**
 * 移除 Buffer 結尾的指定值
 * 
 * @description 如果 Buffer 以指定值結尾，則移除該值
 * @param {Buffer} buf 要處理的 Buffer
 * @param {IBufferValueInput} value 要移除的值
 * @param {number} [byteOffset] 搜尋的起始位置
 * @param {BufferEncoding} [encoding] 字串編碼格式
 * @returns {Buffer} 處理後的 Buffer
 */
export function bufferStripEndWith(buf: Buffer,
	value: IBufferValueInput,
	byteOffset?: number,
	encoding?: BufferEncoding,
)
{
	const { len, i } = _bufferLastIndexOf(buf, value, byteOffset, encoding);

	if (_endWith(buf, i, len))
	{
		return buf.subarray(0, i)
	}

	return buf
}

/**
 * @deprecated 使用 bufferStripEndWith 替代
 */
export { bufferStripEndWith as bufferStripEndWithByBuffer }

/**
 * 檢查 Buffer 是否在指定位置包含指定值
 * 
 * @description 判斷 Buffer 在給定位置是否包含指定的值
 * @param {Buffer} buf 要檢查的 Buffer
 * @param {IBufferValueInput} value 要尋找的值
 * @param {number} byteOffset 搜尋的起始位置
 * @param {BufferEncoding} [encoding] 字串編碼格式
 * @returns {boolean} 是否在指定位置找到值
 */
export function bufferIndexWith(buf: Buffer,
	value: IBufferValueInput,
	byteOffset: number,
	encoding?: BufferEncoding,
)
{
	const i = buf.indexOf(value as any, byteOffset, encoding);

	return _indexWith(i, byteOffset)
}

/**
 * @deprecated 使用 bufferIndexWith 替代
 */
export { bufferIndexWith as bufferIndexWithByBuffer }

/**
 * 根據指定值分割 Buffer
 * 
 * @description 將 Buffer 按照給定的分隔值進行分割，返回分割後的 Buffer 陣列
 * @param {Buffer} buffer 要分割的 Buffer
 * @param {Uint8Array} value 分隔值
 * @returns {Buffer[]} 分割後的 Buffer 陣列
 */
export function splitBufferByBuffer(buffer: Buffer, value: Uint8Array)
{
	const len = _valueLength(value);

	const lines: Buffer[] = [];
	let bufferPosition = 0;

	let lastNewLineBufferPosition = 0;
	while (true)
	{
		let line: Buffer;
		const bufferPositionValue = buffer[bufferPosition];

		if (bufferIndexWith(buffer, value, bufferPosition++))
		{
			line = buffer.subarray(lastNewLineBufferPosition, bufferPosition += (len - 1));
			lines.push(line);
			lastNewLineBufferPosition = bufferPosition;
		}
		else if (bufferPositionValue === void 0)
		{
			break;
		}
	}

	const leftovers = buffer.subarray(lastNewLineBufferPosition, bufferPosition);
	if (leftovers.length)
	{
		lines.push(leftovers);
	}

	return lines;
}
