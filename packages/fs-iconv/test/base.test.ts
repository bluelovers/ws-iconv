/// <reference types="node" />
import { it, test } from 'node:test';
/**
 * Created by User on 2019/6/21.
 */

import { loadFileSync } from '..';
import { join } from 'path';

it(`no error when load empty file`, function (t: test.TestContext)
{
	t.assert.doesNotThrow(() => {
		return loadFileSync(join(__dirname, 'res/empty.txt'), {
			autoDecode: true,
		})
	})
});
