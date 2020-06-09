/**
 * Created by user on 2019/3/17.
 */

import { vEncoding } from 'iconv-jschardet';
import fsExtra from 'fs-extra';
import { clone } from "lodash";
import iconv from 'iconv-jschardet';
import Bluebird from 'bluebird';
import stream from 'stream';
import { trimFilename } from './util';
import { ITSRequiredWith, ITSRequireAtLeastOne } from 'ts-type';
import { PassThrough } from 'stream';

export const SymFSLib = Symbol('fsLib');

export function WrapFSIconv<F extends typeof fsExtra = typeof fsExtra>(fsLib: F): WrapFSIconv.IWrapFS<F>
{
	let fs = clone(fsLib) as any as WrapFSIconv.IWrapFS<F>;

	Object.keys(fs)
		.forEach(k => {
			if (typeof fsLib[k] === 'function')
			{
				fs[k] = fsLib[k].bind(fsLib);
			}
		})
	;

	fs[SymFSLib] = fsLib;

	fs.iconv = iconv;

	fs.ensureWriteStream = ensureWriteStream.bind(fs);
	fs.saveFile = saveFile.bind(fs);
	fs.saveFileSync = saveFileSync.bind(fs);

	fs.loadFileSync = loadFileSync.bind(fs);
	fs.loadFile = loadFile.bind(fs);

	fs._createStreamPassThrough = _createStreamPassThrough.bind(fs);
	fs._outputStream = _outputStream.bind(fs);
	fs._autoDecode = _autoDecode.bind(fs);

	fs.trimFilename = trimFilename;

	Object.defineProperty(exports, "__esModule", { value: true });

	// @ts-ignore
	fs.default = fs;

	return fs;
}

export function ensureWriteStream(file: string)
{
	// @ts-ignore
	let fs = (this as any as WrapFSIconv.IWrapFS)[SymFSLib] as typeof fsExtra;

	fs.ensureFileSync(file);
	return fs.createWriteStream(file);
}

export function saveFileSync(file: string, data, options: WrapFSIconv.IWrapFSIconvOptions = {})
{
	// @ts-ignore
	let fs = (this as any as WrapFSIconv.IWrapFS)[SymFSLib] as typeof fsExtra;

	fs.ensureFileSync(file);

	if (options.encoding)
	{
		data = iconv.encode(data, options.encoding);
	}

	fs.outputFileSync(file, data);

	return true;
}

export function saveFile(file: string, data, options: WrapFSIconv.IWrapFSIconvOptions = {})
{
	// @ts-ignore
	let self: WrapFSIconv.IWrapFS<typeof fsExtra> = this;
	let fs = self[SymFSLib] as typeof fsExtra;

	return Bluebird
		.resolve(fs.ensureFile(file))
		.tap(function ()
		{
			return new Bluebird(function (resolve, reject)
			{
				if (options.encoding)
				{
					data = iconv.encode(data, options.encoding);
				}

				let readStream = self._createStreamPassThrough(data);
				let writeStream = self._outputStream(file, readStream);

				writeStream.on('error', reject);
				writeStream.on('finish', resolve);
			})
		})
		.thenReturn(true)
		;
}

export declare namespace WrapFSIconv
{
	export type IWrapFS<F extends typeof fsExtra = typeof fsExtra> = F &
	{
		[SymFSLib]: F | typeof fsExtra;

		iconv: typeof iconv;
		ensureWriteStream(file: string): fsExtra.WriteStream;

		// --------------------

		saveFile(file: string, data, options?: WrapFSIconv.IWrapFSIconvOptions): Bluebird<boolean>;

		saveFileSync(file: string, data, options?: WrapFSIconv.IWrapFSIconvOptions): boolean

		// --------------------

		loadFile<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): Bluebird<T>;
		loadFile<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Bluebird<T>;

		loadFileSync<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): T;
		loadFileSync<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): T;

		// --------------------

		_createStreamPassThrough(data: unknown): stream.Readable;
		_outputStream(file: string, readStream: stream.Readable): fsExtra.WriteStream;

		_autoDecode<T>(buf: T, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile & {
			autoDecode: true | string[];
		}): T | string | Buffer;
		_autoDecode(buf: unknown, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Buffer;

		// ----------

		trimFilename(name: unknown): string
	}

	export interface IWrapFSIconvOptions
	{
		encoding?: vEncoding;
	}

	export interface IWrapFSIconvOptionsLoadFile
	{
		encoding?: string;
		flag?: string;

		autoDecode?: boolean | string[],
	}

	export type IWrapFSIconvOptionsLoadFile2 = ITSRequireAtLeastOne<IWrapFSIconvOptionsLoadFile, 'encoding' | 'autoDecode'>

	export type IEncoding = vEncoding
}

export function _createStreamPassThrough(data): stream.Readable
{
	let readStream = new PassThrough();
	readStream.end(data);
	return readStream;
}

export function _outputStream(file: string, readStream: stream.Readable): fsExtra.WriteStream
{
	// @ts-ignore
	let fs = (this as any as WrapFSIconv.IWrapFS)[SymFSLib] as typeof fsExtra;

	let writeStream = fs.createWriteStream(file);
	readStream.pipe(writeStream);
	return writeStream;
}

export function _autoDecode<T>(buf: T, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile & {
	autoDecode: true | string[],
}): T | string | Buffer
export function _autoDecode(buf, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Buffer
export function _autoDecode(buf, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile): string | Buffer
{
	if (Array.isArray(options.autoDecode))
	{
		let _do: string;
		let c = iconv._enc(iconv.detect(buf, true).name);

		for (let from of (options.autoDecode as string[]))
		{
			let cd = iconv.codec_data(from);
			let key: string;

			if (cd && cd.name)
			{
				key = iconv._enc(cd.name);

				if (c === key)
				{
					_do = key;

					break;
				}
			}
		}

		if (_do)
		{
			return iconv.encode(buf, null, options.encoding);
		}
		else
		{
			return buf;
		}
	}

	return iconv.encode(buf);
}

export function loadFile<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): Bluebird<T>
export function loadFile<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Bluebird<T>
export function loadFile(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile = {}): Bluebird<Buffer | string>
{
	// @ts-ignore
	let self: WrapFSIconv.IWrapFS<typeof fsExtra> = this;
	let fs = self[SymFSLib] as typeof fsExtra;

	let ps: Promise<any>;

	if (options.encoding)
	{
		let enc = iconv.isNodeEncoding(options.encoding);

		if (enc)
		{
			ps = fs.readFile(file, options);
		}
		else
		{
			let ops: WrapFSIconv.IWrapFSIconvOptionsLoadFile = Object.assign({}, options);
			delete ops.encoding;

			ps = fs.readFile(file, ops)
				.then(function (buf)
				{
					return iconv.decode(buf, options.encoding);
				})
			;
		}
	}
	else if (options.autoDecode)
	{
		ps = fs.readFile(file, options)
			.then(function (buf)
			{
				return self._autoDecode(buf, options);
			})
		;
	}
	else
	{
		ps = fs.readFile(file, options);
	}

	return Bluebird.resolve(ps);
}

export function loadFileSync<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): T
export function loadFileSync<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): T
export function loadFileSync(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile = {}): Buffer | string
{
	// @ts-ignore
	let self: WrapFSIconv.IWrapFS<typeof fsExtra> = this;
	let fs = self[SymFSLib] as typeof fsExtra;

	let ps;

	if (options.encoding)
	{
		let enc = iconv.isNodeEncoding(options.encoding);

		if (enc)
		{
			// @ts-ignore
			ps = fs.readFileSync(file, options);
		}
		else
		{
			let ops: WrapFSIconv.IWrapFSIconvOptionsLoadFile = Object.assign({}, options);
			delete ops.encoding;

			// @ts-ignore
			ps = iconv.decode(fs.readFileSync(file, ops), options.encoding);
		}
	}
	else if (options.autoDecode)
	{
		// @ts-ignore
		ps = self._autoDecode(fs.readFileSync(file, options), options);
	}
	else
	{
		// @ts-ignore
		ps = fs.readFileSync(file, options);
	}

	return ps;
}

export default exports as typeof import('./core');
