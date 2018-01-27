/**
 * Created by user on 2018/1/27/027.
 */

import iconv, { vEncoding } from './iconv';

import { WriteStream } from "fs";
import * as fs from 'fs-extra';
export * from 'fs-extra';
import * as path from 'path';
import * as Promise from 'bluebird';
import * as stream from 'stream';

export { iconv }

export interface IOptions
{
	encoding?: vEncoding;
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

				let readStream = createStreamPassThrough(data);
				let writeStream = outputStream(file, readStream);

				writeStream.on('error', reject);
				writeStream.on('finish', resolve);
			})
		})
	;
}

export function createStreamPassThrough(data): stream.Readable
{
	let readStream = new stream.PassThrough();
	readStream.end(data);
	return readStream;
}

export function outputStream(file: string, readStream: stream.Readable): WriteStream
{
	let writeStream = fs.createWriteStream(file);
	readStream.pipe(writeStream);
	return writeStream;
}

import * as self from './index';
export default self;
