//@noUnusedParameters:false

import { findUpPaths } from '../index';

beforeAll(async () =>
{

});

test(`.git`, () =>
{

	let actual = findUpPaths('.git');

	expect(actual.result).toContain('.git');

});
