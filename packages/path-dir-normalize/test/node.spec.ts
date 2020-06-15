import _pathDirNormalize from '../index';
import path from 'path';

test(`__dirname`, () =>
{
	console.dir(__dirname)

	let actual = pathDirNormalize(__dirname);

	expect(actual).toMatch(/[/\\]$/);

});

function pathDirNormalize(dir: string)
{
	return _pathDirNormalize(dir, path)
}
