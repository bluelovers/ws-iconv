//@noUnusedParameters:false
/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="expect" />

import { bufferEndWith, bufferEndWithByBuffer } from '../src/index';

beforeAll(async () =>
{

});

test(bufferEndWithByBuffer.name, () =>
{
	const line = Buffer.from('\n777777\n')

	let actual = bufferEndWithByBuffer(line, '\n' as any);

	expect(actual).toBeTruthy();

	actual = bufferEndWithByBuffer(line, '\n'.charCodeAt(0) as any);

	expect(actual).toBeTruthy();

	actual = bufferEndWithByBuffer(line, '77\n' as any);

	expect(actual).toBeTruthy();

});

test(bufferEndWith.name, () =>
{
	const line = Buffer.from('\n777777\n')

	let actual = bufferEndWith(line, '\n' as any);

	expect(actual).toBeTruthy();

	actual = bufferEndWith(line, '\n'.charCodeAt(0) as any);

	expect(actual).toBeTruthy();

	actual = bufferEndWith(line, '77\n' as any);

	expect(actual).toBeTruthy();

});
