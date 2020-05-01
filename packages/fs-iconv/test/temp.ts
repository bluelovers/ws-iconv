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

fs.loadFile('G:\\Users\\The Project\\nodejs-test\\node-novel2\\dist_novel\\ts\\葉隠桜は嘆かない\\00000_一章\\00030_003　黯然靠近的黑影.txt', {
	autoDecode: true,
})
	.then(v => console.dir(v))

;
