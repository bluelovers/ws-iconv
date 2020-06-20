import iconvLite from 'iconv-lite';

test(`iconvLite`, () =>
{

	expect(iconvLite).toMatchSnapshot();

});

test(`getCodec`, () =>
{

	let actual;
	let expected;

	expect(iconvLite).toHaveProperty('getCodec');

	// @ts-ignore
	expect(typeof iconvLite.getCodec).toStrictEqual('function');

});
