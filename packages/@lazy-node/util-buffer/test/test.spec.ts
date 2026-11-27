//@noUnusedParameters:false
/// <reference types="node" />
import { before, test } from 'node:test';

import { bufferEndWith, bufferEndWithByBuffer } from '../src/index';

before(async () =>
{

});

test(bufferEndWithByBuffer.name, (t: test.TestContext) =>
{
	const line = Buffer.from('\n777777\n')

	let actual = bufferEndWithByBuffer(line, '\n' as any);

	t.assert.ok(actual);

	actual = bufferEndWithByBuffer(line, '\n'.charCodeAt(0) as any);

	t.assert.ok(actual);

	actual = bufferEndWithByBuffer(line, '77\n' as any);

	t.assert.ok(actual);

});

test(bufferEndWith.name, (t: test.TestContext) =>
{
	const line = Buffer.from('\n777777\n')

	let actual = bufferEndWith(line, '\n' as any);

	t.assert.ok(actual);

	actual = bufferEndWith(line, '\n'.charCodeAt(0) as any);

	t.assert.ok(actual);

	actual = bufferEndWith(line, '77\n' as any);

	t.assert.ok(actual);

});
