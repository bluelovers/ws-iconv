/// <reference types="node" />
import { before, test } from 'node:test';
//@noUnusedParameters:false

import { findUpPaths } from '../index';

before(async () =>
{

});

test(`.git`, (t: test.TestContext) =>
{

	let actual = findUpPaths('.git');

	t.assert.ok(actual.result.includes('.git'));

});
