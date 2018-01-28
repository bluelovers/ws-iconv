/**
 * Created by user on 2018/1/29/029.
 */

import * as fs from '..';

fs.loadFile('./res/big5.txt', {
	autoDecode: true,
})
	.then(function (buf)
	{
		// autoDecode, so will try decode/encode to utf8 buffer

		console.log('[autoDecode]');
		console.log(Buffer.isBuffer(buf), buf);
		console.log(fs.iconv.detect(buf));
		console.log(buf.toString());
	})
;

fs.loadFile('./res/big5.txt', {
		encoding: 'big5',
	})
	.then(function (buf)
	{
		// encoding is set, so will return string

		console.log('[encoding:big5]');
		console.log(Buffer.isBuffer(buf), buf);
		console.log(fs.iconv.detect(buf));
		console.log(buf.toString());
	})
;

fs.loadFile('./res/big5.txt', {
		autoDecode: ['gbk'],
	})
	.then(function (buf)
	{
		// buf is big5, but only allow decode gbk, so skip decode/encode

		console.log('[autoDecode:gbk]');
		console.log(Buffer.isBuffer(buf), buf);
		console.log(fs.iconv.detect(buf));
		console.log(buf.toString());
	})
;
