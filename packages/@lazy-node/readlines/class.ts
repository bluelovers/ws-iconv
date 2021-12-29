/**
 * Created by user on 2020/5/29.
 */

import { IPathLike, IOptions, EnumNewLineCharacter } from './lib/types';
import { readSync, closeSync, openSync } from 'fs';
import {
	handleOptionNewLineCharacter,
	splitBufferByBuffer,
	bufferStripEndWithByBuffer,
	bufferEndWithByBuffer,
} from './lib/util';

export class LineByLine
{
	#file: IPathLike;
	#fd: number;
	#options: IOptions;
	readonly #newLineCharacter: Buffer;
	#eofReached: boolean;
	#linesCache: Buffer[];
	#fdPosition: number;
	#readChunk: number;
	#lineNumber: number = -1;

	constructor(file: IPathLike, options?: IOptions)
	{
		let { readChunk, newLineCharacter } = (options = options || {});

		if (!readChunk) readChunk = 1024;

		this.#file = file;
		this.#options = options;

		this.#newLineCharacter = Buffer.from(handleOptionNewLineCharacter(newLineCharacter));
		this.#readChunk = readChunk;

		if (this.#newLineCharacter.length <= 0)
		{
			throw new TypeError(`newLineCharacter should have length > 0`)
		}

		this._open();
		this.reset();
	}

	protected _open()
	{
		if (typeof this.#file === 'number')
		{
			this.#fd = this.#file;
		}
		else
		{
			this.#fd = openSync(this.#file, 'r');
		}
	}

	get file()
	{
		return this.#file
	}

	get fd()
	{
		return this.#fd
	}

	get options()
	{
		return this.#options
	}

	get fdPosition()
	{
		return this.#fdPosition
	}

	get newLineCharacter()
	{
		return this.#newLineCharacter
	}

	get eofReached()
	{
		return this.#eofReached
	}

	/**
	 * get current lineNumber
	 */
	get lineNumber()
	{
		return this.#lineNumber
	}

	reset()
	{
		this.#eofReached = false;
		this.#linesCache = [];
		this.#fdPosition = 0;
		this.#lineNumber = -1;
	}

	close()
	{
		this.#fd && closeSync(this.#fd);
		this.#fd = null;
	}

	protected _extractLines(buffer: Buffer)
	{
		return splitBufferByBuffer(buffer, this.#newLineCharacter)
	};

	protected _readChunk(lineLeftovers?: Buffer)
	{
		let totalBytesRead = 0;

		let bytesRead: number;
		const buffers: Buffer[] = [];
		do
		{
			const readBuffer = Buffer.alloc(this.#readChunk);

			bytesRead = readSync(this.#fd, readBuffer, 0, this.#readChunk, this.#fdPosition);
			totalBytesRead = totalBytesRead + bytesRead;

			this.#fdPosition = this.#fdPosition + bytesRead;

			buffers.push(readBuffer);
		}
		while (bytesRead && buffers[buffers.length - 1].indexOf(this.#newLineCharacter) === -1);

		let bufferData = Buffer.concat(buffers);

		if (bytesRead < this.#readChunk)
		{
			this.#eofReached = true;
			bufferData = bufferData.slice(0, totalBytesRead);
		}

		if (totalBytesRead)
		{
			this.#linesCache = this._extractLines(bufferData);

			if (lineLeftovers)
			{
				this.#linesCache[0] = Buffer.concat([lineLeftovers, this.#linesCache[0]]);
			}
		}

		return totalBytesRead;
	}

	next()
	{
		if (!this.#fd || this.#eofReached && this.#linesCache.length === 0)
		{
			return;
		}

		let line: Buffer;
		let bytesRead: number;

		if (!this.#linesCache.length)
		{
			bytesRead = this._readChunk();
		}

		if (this.#linesCache.length)
		{
			line = this.#linesCache.shift();

			//const lastLineCharacter = line[line.length - 1];

			if (!bufferEndWithByBuffer(line, this.#newLineCharacter))
			{
				bytesRead = this._readChunk(line);

				if (bytesRead)
				{
					line = this.#linesCache.shift();
				}
			}
		}

		if (this.#eofReached && this.#linesCache.length === 0)
		{
			this.close();
		}

		if (line)
		{
			line = bufferStripEndWithByBuffer(line, this.#newLineCharacter, 0 - this.#newLineCharacter.length)
		}

		this.#lineNumber++;

		return line;
	}

	* generator()
	{
		let line: Buffer;
		while (line = this.next())
		{
			yield line
		}
	}

	static* generator(file: IPathLike, options?: IOptions)
	{
		const liner = new this(file, options)
		yield* liner.generator()
	}

	static LineByLine = LineByLine;
	static default = LineByLine;
}

Object.defineProperty(LineByLine, "__esModule", { value: true });

export default LineByLine
