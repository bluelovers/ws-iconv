/**
 * Created by user on 2018/1/27/027.
 */

import iconv, { vEncoding } from 'iconv-jschardet';

import { WriteStream } from "fs";
import * as fs from 'fs-extra';

export * from 'fs-extra';
import * as Promise from 'bluebird';
import * as stream from 'stream';
import * as sanitize from 'sanitize-filename';
import * as path from 'path';

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

export interface IOptionsLoadFile2 extends IOptionsLoadFile
{
	encoding: string;
}

export function loadFile(file: string, options?: IOptionsLoadFile): Promise<Buffer>
export function loadFile(file: string, options: IOptionsLoadFile2): Promise<string>
export function loadFile(file: string, options: IOptionsLoadFile = {}): Promise<Buffer>
{
	let ps: Promise;

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
				if (Array.isArray(options.autoDecode))
				{
					let _do: string
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
			})
		;
	}
	else
	{
		ps = fs.readFile(file, options);
	}

	return Promise.resolve(ps);
}

export function saveFile(file: string, data, options: IOptions = {}): Promise<any>
{
	return Promise
		.resolve(fs.ensureFile(file))
		.then(function ()
		{
			return new Promise(function (resolve, reject)
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
		;
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
		.replace(/\r\n|\r|\n|　/g, ' ')
		.replace(/[\s\r\n\t  \xA0　]+/g, ' ')
	;

	return sanitize(ret, '')
		.trim()
		.replace(/^[　\s_]+/g, '')
		.replace(/[　\s_]+$/g, '')
		;
}

import * as self from './index';

export default self;
