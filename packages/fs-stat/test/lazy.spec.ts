import { basename, extname } from 'path';
import { fsStat, fsStatSync } from '../index';

test(`fsStatSync:no-exists`, () =>
{

	expect(fsStatSync('./no-exists.js')).toBeUndefined();

	expect(() => fsStatSync('./no-exists.js', {
		throwIfNoEntry: true,
	})).toThrowError()

});

test(`fsStat:no-exists`, () =>
{

	expect(fsStat('./no-exists.js')).resolves.toBeUndefined()

	expect(fsStat('./no-exists.js', {
		throwIfNoEntry: true,
	})).rejects.toThrowError()

});
