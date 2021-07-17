import { inspect } from 'util';
import sanitizeFilename from '../index';

describe(`describe`, () =>
{

	[
		"con",
		"COM1",
		"PRN.",
		"aux.txt",
		"LPT9.asdfasdf",
		"LPT10.txt",
	].forEach(input =>
	{
		test(inspect(input), () =>
		{
			let actual = sanitizeFilename(input);

			expect(actual).toMatchSnapshot();

			console.log(inspect(input) , '=>', inspect(actual))
		})
	});

})
