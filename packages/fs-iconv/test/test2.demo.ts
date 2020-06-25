/**
 * Created by user on 2018/1/27/027.
 */

import * as self from '../';

const jschardet = self.iconv.jschardet;
const iconvLite = self.iconv.iconvLite;

let big5 = "\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed";

// @ts-ignore
console.log(big5, jschardet.detect('123'));

console.log(Buffer.from(big5));
console.log(self.iconv.encode(big5, 'big5'));

//big5 = self.iconv.decode(big5);
// @ts-ignore
big5 = self.iconv.encode(big5, 'big5');

(async ()=>
{
	let big5_2 = await self.readFile('./res/big5.txt');
	let big5_utf8 = iconvLite.encode(self.iconv.decode(big5, 'big5'), 'utf8');

	console.log('big5', big5, self.iconv.detect(big5));
	console.log('big5_2', big5_2, self.iconv.detect(big5_2));
	console.log('big5_utf8', big5_utf8, self.iconv.detect(big5_utf8));

	self.outputFile('./temp/out/big5_2.txt', big5_2);
	self.outputFile('./temp/out/big5.txt', big5);
	self.outputFile('./temp/out/big5_utf8.txt', big5_utf8);

	console.log(Buffer.from('a6b8b160a5ceb0eaa672bcd0b7c7a672c5e9aaed', 'hex'));

})();
