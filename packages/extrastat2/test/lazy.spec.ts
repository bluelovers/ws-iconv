import * as resolvers from '../lib/resolvers'
import extrastatAsync from '../index';

describe(`resolvers`, () =>
{
	Object.keys(resolvers).forEach(name => {

		test(name, async () => {

			let stat = await extrastatAsync(process.cwd(), {
				[name]: true,
			})

			expect(stat).toHaveProperty(name)
			expect(stat[name]).toBeTruthy()

		})

	})

})
