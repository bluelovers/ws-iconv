/// <reference types="node" />
import { describe, it, test } from 'node:test';
import extrastatAsync, { IOptions, IList } from '../';
import path, { join } from 'path';
import { ensureDirSync } from 'fs-extra';

describe('extrastatSync Default Behavoir', () =>
{

	it(
		'Returns an object containing a key for each options set to true',
		async (t: test.TestContext) =>
		{
			let stat = await extrastatAsync(process.cwd());

			[
				'name',
				'pathname',
				'mimetype',
			].forEach(name => t.assert.ok(name in stat))
			;

			[
				'role',
				'filestat',
				'ownername',
				'groupname',
				'parents',
				'children',
				'siblings',
			].forEach(name => t.assert.ok(!(name in stat)))
			;
		},
	)
})

describe('options for children and siblings', () =>
{
	it(
		'lets you get the children of the current working directory',
		async (t: test.TestContext) =>
		{
			let stat = await extrastatAsync(process.cwd(), {
				children: true,
			} as IOptions)

			checkList(t, stat.children)
		},
	)

	it('gives you the siblings of a file', async (t: test.TestContext) =>
	{
		let stat = await extrastatAsync('package.json', { children: true, siblings: true } as IOptions)
		t.assert.strictEqual(stat.children, null)

		checkList(t, stat.siblings)
	})

	it(
		'lets you request children on a nondirectory, returning null',
		async (t: test.TestContext) =>
		{
			let stat = await extrastatAsync('package.json', { children: true } as IOptions)
			t.assert.strictEqual(stat.children, null)
		},
	)

	it(
		'returns an empty array as children when it encounters an empty directory',
		async (t: test.TestContext) =>
		{
			let target = join(__dirname, 'exampleEmpty')
			ensureDirSync(target)

			let stat = await extrastatAsync(target, {
				children: true,
				siblings: true
			} as IOptions)
			t.assert.deepStrictEqual(Array.isArray(stat.children), true)
			t.assert.strictEqual(stat.children.length, 0)
		},
	)
})

export function checkList(t: test.TestContext, list: IList[])
{
	t.assert.ok(list.length >= 1)

	list
		.forEach(row => {
			t.assert.strictEqual(typeof row.name, 'string')
			t.assert.strictEqual(typeof row.pathname, 'string')
			t.assert.ok('mimetype' in row)
		})
	;


}
