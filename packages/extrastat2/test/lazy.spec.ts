/// <reference types="node" />
import { describe, test } from 'node:test';
import * as resolvers from '../lib/resolvers'
import extrastatAsync from '../index';

describe(`resolvers`, () =>
{
	Object.keys(resolvers).forEach(name => {

		test(name, async (t: test.TestContext) => {

			let stat = await extrastatAsync(process.cwd(), {
				[name]: true,
			})

			t.assert.ok(name in stat)
			t.assert.ok(stat[name])

		})

	})

})
