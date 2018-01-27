/**
 * Created by user on 2018/1/28/028.
 */

import * as iconvLite from 'iconv-lite';
import * as iconv from '../iconv';
import * as iconv_encoding from '../encoding';
import * as fs from '../';

fs.readFile('./temp/asc.txt')
	.then(function (buf)
	{
		let c = iconv.detect(buf);

		console.log(c);
		console.log(iconv_encoding.codec_data(c.encoding));

		let b2 = iconv.encode(buf, 'UTF8');
		let c2 = iconv.detect(b2);

		console.log(777, c2);

		console.log(iconv_encoding.codec_data(c2.encoding));
	})
;
