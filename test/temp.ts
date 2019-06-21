/**
 * Created by user on 2018/1/28/028.
 */

import * as fs from '../';

const iconv = fs.iconv;

//fs.readFile('./temp/asc.txt')
//	.then(function (buf)
//	{
//		let c = iconv.detect(buf);
//
//		console.log(c);
//		console.log(iconv.codec_data(c.encoding));
//
//		let b2 = iconv.encode(buf, 'UTF8');
//		let c2 = iconv.detect(b2);
//
//		console.log(777, c2);
//
//		console.log(iconv.codec_data(c2.encoding));
//	})
//;

fs.loadFile('./res/empty.txt', {
	autoDecode: true,
});
