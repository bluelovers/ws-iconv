import { stringifyJSON } from '../index';

test(`stringify`, () =>
{

	let actual = stringifyJSON({});

	expect(actual).toMatch(/\n$/);
	expect(actual).toMatchSnapshot();

});

