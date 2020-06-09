import pathDirNormalize from '../index';

test(`__dirname`, () =>
{
	console.dir(__dirname)

	let actual = pathDirNormalize(__dirname);

	expect(actual).toMatch(/[/\\]$/);

});
