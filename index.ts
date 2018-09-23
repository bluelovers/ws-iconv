/**
 * Created by user on 2018/1/27/027.
 */

import iconv, { vEncoding } from 'iconv-jschardet';

import { WriteStream } from "fs";
import fs = require('fs-extra');

export * from 'fs-extra';
import bluebird = require('bluebird');
import stream = require('stream');
import sanitize = require('sanitize-filename');
import path = require('path');

export { iconv }

export interface IOptions
{
	encoding?: vEncoding;
}

export interface IOptionsLoadFile
{
	encoding?: string;
	flag?: string;

	autoDecode?: boolean | string[],
}

export type IOptionsLoadFile2 = IOptionsLoadFile & {
	encoding: string;
};

export function loadFile<T = string>(file: string, options: IOptionsLoadFile2 & ({
	encoding: string,
} | {
	autoDecode: true | string[],
})): bluebird<T>
export function loadFile<T = Buffer>(file: string, options?: IOptionsLoadFile): bluebird<T>
export function loadFile(file: string, options: IOptionsLoadFile = {}): bluebird<Buffer | string>
{
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
			let ops: IOptionsLoadFile = Object.assign({}, options);
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
				return _autoDecode(buf, options);
			})
		;
	}
	else
	{
		ps = fs.readFile(file, options);
	}

	return bluebird.resolve(ps);
}

export function loadFileSync<T = string>(file: string, options: IOptionsLoadFile2 & ({
	encoding: string,
} | {
	autoDecode: true | string[],
})): T
export function loadFileSync<T = Buffer>(file: string, options?: IOptionsLoadFile): T
export function loadFileSync(file: string, options: IOptionsLoadFile = {}): Buffer | string
{
	let ps;

	if (options.encoding)
	{
		let enc = iconv.isNodeEncoding(options.encoding);

		if (enc)
		{
			ps = fs.readFileSync(file, options);
		}
		else
		{
			let ops: IOptionsLoadFile = Object.assign({}, options);
			delete ops.encoding;

			ps = iconv.decode(fs.readFileSync(file, ops), options.encoding);
		}
	}
	else if (options.autoDecode)
	{
		ps = _autoDecode(fs.readFileSync(file, options), options);
	}
	else
	{
		ps = fs.readFileSync(file, options);
	}

	return ps;
}

export function _autoDecode<T>(buf: T, options: IOptionsLoadFile & {
	autoDecode: true | string[],
}): T | string | Buffer
export function _autoDecode(buf, options: IOptionsLoadFile): Buffer
export function _autoDecode(buf, options: IOptionsLoadFile): string | Buffer
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

export function saveFile(file: string, data, options: IOptions = {})
{
	return bluebird
		.resolve(fs.ensureFile(file))
		.tap(function ()
		{
			return new bluebird(function (resolve, reject)
			{
				if (options.encoding)
				{
					data = iconv.encode(data, options.encoding);
				}

				let readStream = _createStreamPassThrough(data);
				let writeStream = _outputStream(file, readStream);

				writeStream.on('error', reject);
				writeStream.on('finish', resolve);
			})
		})
		.thenReturn(true)
		;
}

export function ensureWriteStream(file: string)
{
	fs.ensureFileSync(file);
	return fs.createWriteStream(file);
}

export function _createStreamPassThrough(data): stream.Readable
{
	let readStream = new stream.PassThrough();
	readStream.end(data);
	return readStream;
}

export function _outputStream(file: string, readStream: stream.Readable): WriteStream
{
	let writeStream = fs.createWriteStream(file);
	readStream.pipe(writeStream);
	return writeStream;
}

export function trimFilename(name): string
{
	let ret = name.toString()
		.replace(/\r\n|\r|\n/g, ' ')
		.replace(/[\r\n\t  \xA0]+/g, ' ')
	;

	return sanitize(ret, '')
		.trim()
		.replace(/^[　\s_]+/g, '')
		.replace(/[　\s_]+$/g, '')
		;
}

import * as self from './index';

export default self;
