/// <reference types="node" />
import { describe, it, test } from 'node:test';
/**
 * Created by user on 2018/1/27/027.
 */

import * as self from '../';
import { BIG5_STR, BIG5_BUF, BIG5_UTF8_BUF } from './fixtures/data';
import { EnumEncoding } from '../lib/const';
import { disableCodecDataWarn, skipDecodeWarning } from '../';
import { _bufForSnapshot } from './lib/helper';

skipDecodeWarning();
disableCodecDataWarn();

// @ts-ignore
describe(`check encoding`, () =>
{
	// @ts-ignore
	it(`BIG5_STR`, function (t: test.TestContext)
	{
		let c = self.detect(BIG5_STR);

		t.assert.strictEqual(c.name, EnumEncoding.BIG5);
		t.assert.strictEqual(c.encoding, EnumEncoding.BIG5);

		t.assert.snapshot(c);

	});

	// @ts-ignore
	it(`BIG5_BUF`, function (t: test.TestContext)
	{
		let c = self.detect(BIG5_BUF);

		t.assert.strictEqual(c.name, EnumEncoding.BIG5);
		t.assert.strictEqual(c.encoding, EnumEncoding.BIG5);

		t.assert.snapshot(c);

	});
});

// @ts-ignore
describe(`iconv`, () =>
{
	// @ts-ignore
	it(`encode big5`, function (t: test.TestContext)
	{
		//console.log('it:inner', currentTest.title);
		//console.log('it:inner', currentTest.fullTitle());

		//expect(r).to.be.ok;
		//assert.isOk(r.value, util.inspect(r));

		let data = self.encode(BIG5_STR, 'big5');

		let c = self.detect(data);

		t.assert.strictEqual(c.name, EnumEncoding.BIG5);
		t.assert.strictEqual(c.encoding, EnumEncoding.BIG5);

		t.assert.snapshot(c);
		t.assert.snapshot(_bufForSnapshot(data));

	});
	// @ts-ignore
	it(`encode big5`, function (t: test.TestContext)
	{
		//console.log('it:inner', currentTest.title);
		//console.log('it:inner', currentTest.fullTitle());

		//expect(r).to.be.ok;
		//assert.isOk(r.value, util.inspect(r));

		let data = self.encode(BIG5_BUF, 'big5');

		let c = self.detect(data, true);

		t.assert.strictEqual(c.name, EnumEncoding.BIG5);
		t.assert.strictEqual(c.encoding, EnumEncoding.BIG5);

		t.assert.snapshot(c);
		t.assert.snapshot(_bufForSnapshot(data));

	});

	// @ts-ignore
	it(`encode`, function (t: test.TestContext)
	{
		let data = self.encode(BIG5_STR);

		let c = self.detect(data);

		t.assert.strictEqual(c.name, EnumEncoding.UTF8);
		t.assert.strictEqual(c.encoding, EnumEncoding.UTF8);

		t.assert.deepStrictEqual(data, BIG5_UTF8_BUF);

		t.assert.snapshot(c);
		t.assert.snapshot(_bufForSnapshot(data));

	});

	// @ts-ignore
	it(`encode`, function (t: test.TestContext)
	{
		//console.log('it:inner', currentTest.title);
		//console.log('it:inner', currentTest.fullTitle());

		//expect(r).to.be.ok;
		//assert.isOk(r.value, util.inspect(r));

		let data = self.encode(BIG5_BUF);

		let c = self.detect(data);

		t.assert.strictEqual(c.name, EnumEncoding.UTF8);
		t.assert.strictEqual(c.encoding, EnumEncoding.UTF8);

		t.assert.deepStrictEqual(data, BIG5_UTF8_BUF);

		t.assert.snapshot(c);
		t.assert.snapshot(_bufForSnapshot(data));

	});
});
