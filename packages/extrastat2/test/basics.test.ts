import extrastatAsync, { IOptions, IList } from '../';
import path, { join } from 'path';
import { ensureDirSync } from 'fs-extra';

describe('extrastatSync Default Behavoir', () =>
{

	it(
		'Returns an object containing a key for each options set to true',
		async () =>
		{
			let stat = await extrastatAsync(process.cwd());

			[
				'name',
				'pathname',
				'mimetype',
			].forEach(name => expect(stat).toHaveProperty(name))
			;

			[
				'role',
				'filestat',
				'ownername',
				'groupname',
				'parents',
				'children',
				'siblings',
			].forEach(name => expect(stat).not.toHaveProperty(name))
			;
		},
	)
})

describe('options for children and siblings', () =>
{
	it(
		'lets you get the children of the current working directory',
		async () =>
		{
			let stat = await extrastatAsync(process.cwd(), {
				children: true,
			} as IOptions)

			checkList(stat.children)
		},
	)

	it('gives you the siblings of a file', async () =>
	{
		let stat = await extrastatAsync('package.json', { children: true, siblings: true } as IOptions)
		expect(stat.children).toBe(null)

		checkList(stat.siblings)
	})

	it(
		'lets you request children on a nondirectory, returning null',
		async () =>
		{
			let stat = await extrastatAsync('package.json', { children: true } as IOptions)
			expect(stat.children).toBe(null)
		},
	)

	it(
		'returns an empty array as children when it encounters an empty directory',
		async () =>
		{
			let target = join(__dirname, 'exampleEmpty')
			ensureDirSync(target)

			let stat = await extrastatAsync(target, {
				children: true,
				siblings: true
			} as IOptions)
			expect(Array.isArray(stat.children)).toStrictEqual(true)
			expect(stat.children).toHaveLength(0)
		},
	)
})

export function checkList(list: IList[])
{
	expect(list.length).toBeGreaterThanOrEqual(1)

	list
		.forEach(row => {
			expect(row).toMatchObject({
				name: expect.any(String),
				pathname: expect.any(String),
			}as IList)

			expect(row).toHaveProperty('mimetype')
		})
	;


}
