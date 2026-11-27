/// <reference types="node" />
import { test } from 'node:test';
import { stringifyJSON } from '../index';

test(`stringify`, (t: test.TestContext) =>
{

	let actual = stringifyJSON({});

	t.assert.match(actual, /\n$/);
	t.assert.snapshot(actual);

});
