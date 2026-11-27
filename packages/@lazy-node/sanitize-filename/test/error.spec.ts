/// <reference types="node" />
import { describe, test } from 'node:test';
import { inspect } from 'util';
import sanitizeFilename from '../index';

describe('throw', () =>
{
	([
		'.',
		'..',
		'./',
		'../',
		'',
		undefined,
		null,
		false,
		true,
		{},
	] as any[]).forEach(input =>
	{
		test(inspect(input), (t: test.TestContext) =>
		{
			if (!input?.length)
			{
				t.assert.throws(() => sanitizeFilename(input, { throwEmpty: true }), (err) => {
					t.assert.snapshot(`${err.name}: ${err.message}`);
					return true;
				});
			}

			t.assert.throws(() => sanitizeFilename(input, { replacement: '', throwEmpty: true }), (err) => {
				t.assert.snapshot(`${err.name}: ${err.message}`);
				return true;
			});

			t.assert.throws(() => sanitizeFilename(input, { replacement: ' ', throwEmpty: true }), (err) => {
				t.assert.snapshot(`${err.name}: ${err.message}`);
				return true;
			});
		})
	})
});
