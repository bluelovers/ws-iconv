import { isWritableDirectoryAsync, isWritableFileAsync, isWritableDirectorySync, isWritableFileSync } from '../index';

test(`isWritableDirectoryAsync`, () =>
{
	return expect(isWritableDirectoryAsync(__dirname)).resolves.toStrictEqual(true);
});

test(`isWritableFileAsync`, () =>
{
	return expect(isWritableFileAsync(__filename)).resolves.toStrictEqual(true);
});

test(`isWritableDirectorySync`, () =>
{
	return expect(isWritableDirectorySync(__dirname)).toStrictEqual(true);
});

test(`isWritableFileSync`, () =>
{
	return expect(isWritableFileSync(__filename)).toStrictEqual(true);
});

