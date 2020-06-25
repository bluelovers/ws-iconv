import pathIsSame from '../index';

test(`sep`, () =>
{

	expect(pathIsSame(__dirname, __dirname + '/')).toBeTruthy()
	expect(pathIsSame(__dirname, __dirname + '\\')).toBeTruthy()

});
