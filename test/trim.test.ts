/**
 * Created by user on 2018/1/27/027.
 */

import * as iconvLite from 'iconv-lite';
import localDev, { relative, expect, path, assert, util } from './_local-dev';

import * as self from '../';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest;

	let tests = [
		[
			'9　合流',
			'9　合流',
		]
	];

	// @ts-ignore
	beforeEach(function ()
	{
		currentTest = this.currentTest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	describe(`init`, () =>
	{
		tests.forEach(function (value, index, array)
		{
			// @ts-ignore
			it(`${value[0]}`, function (done)
			{
				let c = self.trimFilename(value[0]);

				expect(c).to.be.equal(value[1]);

				done();
			});
		});
	});
});
