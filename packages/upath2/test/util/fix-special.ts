/// <reference types="node" />
import { describe, test } from 'node:test';
import { IPathNode } from '../../lib/type';

export function _fix_special(path: IPathNode)
{
	const { normalize, join, dirname } = path;

	describe('c:', () =>
	{

		([
			`normalize`,
			`dirname`,
		] as const).forEach(fn =>
		{

			test(fn, (t: test.TestContext) =>
			{

				t.assert.snapshot(path[fn]('c:'));
				t.assert.snapshot(path[fn]('c:/'));
				t.assert.snapshot(path[fn]('c:\\'));
				t.assert.snapshot(path[fn]('c:.'));
				t.assert.snapshot(path[fn]('c:./'));
				t.assert.snapshot(path[fn]('c:.\\'));

			});

		});


		([
			`join`,
		] as const).forEach(fn =>
		{

			test(fn, (t: test.TestContext) =>
			{

				t.assert.snapshot(path[fn]('c:', 'kk'));
				t.assert.snapshot(path[fn]('c:/', 'kk'));
				t.assert.snapshot(path[fn]('c:\\', 'kk'));
				t.assert.snapshot(path[fn]('c:.', 'kk'));
				t.assert.snapshot(path[fn]('c:./', 'kk'));
				t.assert.snapshot(path[fn]('c:.\\', 'kk'));

			});

		});

	})
}
