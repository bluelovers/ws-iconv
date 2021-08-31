import { createBOMEncoding, detectBOMEncoding, EnumEncoding, whatwgBOMEncoding } from '../index';

describe("detectBOMEncoding", () =>
{
	it("should return UTF-8 for a UTF-8 BOM", () =>
	{
		const buffer = new Buffer([0xEF, 0xBB, 0xBF, 0xE2, 0x82, 0xAC, 0xE2, 0x80, 0xA2]);
		const encoding = whatwgBOMEncoding(buffer);

		expect(encoding).toStrictEqual(EnumEncoding.utf_8);

		const encoding2 = detectBOMEncoding(buffer);
		expect(encoding2).toMatchSnapshot();
	});

	it("should return UTF-16LE for a UTF-16LE BOM", () =>
	{
		const buffer = new Buffer([0xFF, 0xFE, 0xAC, 0x20, 0x22, 0x20]);
		const encoding = whatwgBOMEncoding(buffer);

		expect(encoding).toStrictEqual(EnumEncoding.utf_16le);

		const encoding2 = detectBOMEncoding(buffer);
		expect(encoding2).toMatchSnapshot();
	});

	it("should return UTF-16BE for a UTF-16BE BOM", () =>
	{
		const buffer = new Buffer([0xFE, 0xFF, 0x20, 0xAC, 0x20, 0x22]);
		const encoding = whatwgBOMEncoding(buffer);

		expect(encoding).toStrictEqual(EnumEncoding.utf_16be);

		const encoding2 = detectBOMEncoding(buffer);
		expect(encoding2).toMatchSnapshot();
	});

	it("should return null for no BOM", () =>
	{
		const buffer = new Buffer([0x80, 0x95]);
		const encoding = whatwgBOMEncoding(buffer);

		expect(encoding).toStrictEqual(null);

		const encoding2 = detectBOMEncoding(buffer);
		expect(encoding2).toMatchSnapshot();
	});

	it("should return UTF-16LE for a UTF-32LE BOM", () =>
	{
		const buffer = new Buffer([0xFF, 0xFE, 0x00, 0x00]);
		const encoding = whatwgBOMEncoding(buffer);

		expect(encoding).toStrictEqual(EnumEncoding.utf_16le);

		const encoding2 = detectBOMEncoding(buffer);
		expect(encoding2).toMatchSnapshot();

		const encoding3 = detectBOMEncoding(buffer, {
			utf_32le: true,
		});
		expect(encoding3).toStrictEqual(EnumEncoding.utf_32le);
		expect(encoding3).toMatchSnapshot();
	});

	it("should return null for a UTF-32BE BOM", () =>
	{
		const buffer = new Buffer(createBOMEncoding(EnumEncoding.utf_32be));
		const encoding = whatwgBOMEncoding(buffer);

		expect(encoding).toStrictEqual(null);

		const encoding2 = detectBOMEncoding(buffer);
		expect(encoding2).toMatchSnapshot();
	});

	it("should return null for an empty buffer", () =>
	{
		const buffer = new Buffer([]);
		const encoding = whatwgBOMEncoding(buffer);

		expect(encoding).toStrictEqual(null);

		const encoding2 = detectBOMEncoding(buffer);
		expect(encoding2).toMatchSnapshot();
	});

	it("should return null for a one-byte buffer", () =>
	{
		const buffer = new Buffer([0xFF]);
		const encoding = whatwgBOMEncoding(buffer);

		expect(encoding).toStrictEqual(null);

		const encoding2 = detectBOMEncoding(buffer);
		expect(encoding2).toMatchSnapshot();
	});

	it(`should return null for a ${EnumEncoding.gb_18030} BOM`, () =>
	{
		const buffer = new Buffer(createBOMEncoding(EnumEncoding.gb_18030));
		const encoding = whatwgBOMEncoding(buffer);

		expect(encoding).toStrictEqual(null);

		const encoding2 = detectBOMEncoding(buffer);
		expect(encoding2).toMatchSnapshot();
	});

	it(`should return null for a ${EnumEncoding.unicode} BOM`, () =>
	{
		const buffer = new Buffer(createBOMEncoding(EnumEncoding.unicode));
		const encoding = whatwgBOMEncoding(buffer);

		expect(encoding).toStrictEqual(null);

		expect(detectBOMEncoding(buffer)).toStrictEqual(null);

		const encoding2 = detectBOMEncoding(buffer, {
			unicode: true,
		});
		expect(encoding2).toMatchSnapshot();
	});
});