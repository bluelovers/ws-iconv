/**
 * Created by User on 2019/6/21.
 */

import { loadFileSync } from '..';
import { join } from 'path';

it(`no error when load empty file`, function ()
{
	expect(() => {
		return loadFileSync(join(__dirname, 'res/empty.txt'), {
			autoDecode: true,
		})
	}).not.toThrow()
});
