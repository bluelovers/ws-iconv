/**
 * Created by user on 2018/1/27/027.
 */

import * as self from '../';

(async ()=>
{

	/**
	 * no need set encoding
	 */
	let big5_2 = await self.readFile('./res/big5.txt');
	self.saveFile('./temp/out/_big5_2.txt', big5_2);

	/**
	 * will fail if didn't set encoding
	 */
	let big5 = "\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed";
	self.saveFile('./temp/out/_big5.txt', big5, {
		encoding: 'big5',
	});

})();
