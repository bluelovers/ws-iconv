/**
 * Created by User on 2019/6/21.
 */

// @ts-ignore
/// <reference types="mocha" />
// @ts-ignore
/// <reference types="benchmark" />
// @ts-ignore
/// <reference types="chai" />
// @ts-ignore
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync, SymbolLogOutput } from './_local-dev';
import fs from '../index';

// @ts-ignore
describe(relative(__filename), () =>
{
	// @ts-ignore
	let currentTest: Mocha.Test;

	// @ts-ignore
	beforeEach(function ()
	{
		// @ts-ignore
		currentTest = this.currentTest;

		delete currentTest[SymbolLogOutput];

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	// @ts-ignore
	afterEach(function ()
	{
		let out = currentTest[SymbolLogOutput];
		let t = typeof out;

		if (t === 'string')
		{
			console.log(`----------`);
			console.log(out);
			console.log(`----------`);
		}
		else if (t === 'function')
		{
			out(currentTest)
		}
		else if (out != null)
		{
			console.dir(out);
		}

	});

	// @ts-ignore
	describe(`suite`, () =>
	{
		// @ts-ignore
		it(`no error when load empty file`, function ()
		{
			//console.log('it:inner', currentTest.title);
			//console.log('it:inner', currentTest.fullTitle());

			fs.loadFileSync(path.join(__dirname, 'res/empty.txt'), {
				autoDecode: true,
			});

			let actual;
			let expected;

//			currentTest[SymbolLogOutput] = actual;

			//expect(actual).to.be.ok;
			//expect(actual).to.be.deep.equal(expected);
			//assert.isOk(actual.value, util.inspect(actual));
		});
	});
});
