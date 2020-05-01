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
			it(k, () => {
				expect(typeof self[k]).toStrictEqual(typeof _fs[k])
				expect(typeof selfDefault[k]).toStrictEqual(typeof _fs[k])
			})
		})
	;

})

it(`trimFilename`, () => {
	const k = `trimFilename` as const;

	expect(typeof self.trimFilename).toStrictEqual('function')

	expect(self[k]).toStrictEqual(trimFilename)
	expect(selfDefault[k]).toStrictEqual(trimFilename)
})

it(`iconv`, () => {
	const k = `iconv` as const;

	expect(self[k]).toStrictEqual(iconv)
	expect(selfDefault[k]).toStrictEqual(iconv)
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
