/// <reference types="node" />
import { describe, it, test } from 'node:test';
import * as self from '../';
import selfDefault from '../';
import iconv from 'iconv-jschardet';
import { trimFilename } from '../util';

describe(`fs-extra`, () =>
{
	const _fs = require('fs-extra');

	Object
		.entries(_fs)
		.forEach(([k, v]) => {
			it(k, (t: test.TestContext) => {
				t.assert.deepStrictEqual(typeof self[k], typeof _fs[k])
				t.assert.deepStrictEqual(typeof selfDefault[k], typeof _fs[k])
			})
		})
	;

})

it(`trimFilename`, (t: test.TestContext) => {
	const k = `trimFilename` as const;

	t.assert.deepStrictEqual(typeof self.trimFilename, 'function')

	t.assert.deepStrictEqual(self[k], trimFilename)
	t.assert.deepStrictEqual(selfDefault[k], trimFilename)
})

it(`iconv`, (t: test.TestContext) => {
	const k = `iconv` as const;

	t.assert.deepStrictEqual(self[k], iconv)
	t.assert.deepStrictEqual(selfDefault[k], iconv)
})

/*
describe(`fs`, () =>
{
	const _fs = require('fs');

	Object
		.entries(_fs)
		.forEach(([k, v]) => {
			it(k, () => {
				expect(typeof self[k]).toStrictEqual(typeof _fs[k])
				expect(typeof selfDefault[k]).toStrictEqual(typeof _fs[k])
			})
		})
	;

})
 */
