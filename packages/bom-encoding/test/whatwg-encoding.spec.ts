/// <reference types="node" />
import { describe, it, test } from 'node:test';
import { createBOMEncoding, detectBOMEncoding, EnumEncoding, whatwgBOMEncoding } from '../index';

describe("detectBOMEncoding", () =>
{
	it("should return UTF-8 for a UTF-8 BOM", (t: test.TestContext) =>
	{
		const buffer = new Buffer([0xEF, 0xBB, 0xBF, 0xE2, 0x82, 0xAC, 0xE2, 0x80, 0xA2]);
		const encoding = whatwgBOMEncoding(buffer);

		t.assert.deepStrictEqual(encoding, EnumEncoding.utf_8);

		const encoding2 = detectBOMEncoding(buffer);
		t.assert.snapshot(encoding2);
	});

	it("should return UTF-16LE for a UTF-16LE BOM", (t: test.TestContext) =>
	{
		const buffer = new Buffer([0xFF, 0xFE, 0xAC, 0x20, 0x22, 0x20]);
		const encoding = whatwgBOMEncoding(buffer);

		t.assert.deepStrictEqual(encoding, EnumEncoding.utf_16le);

		const encoding2 = detectBOMEncoding(buffer);
		t.assert.snapshot(encoding2);
	});

	it("should return UTF-16BE for a UTF-16BE BOM", (t: test.TestContext) =>
	{
		const buffer = new Buffer([0xFE, 0xFF, 0x20, 0xAC, 0x20, 0x22]);
		const encoding = whatwgBOMEncoding(buffer);

		t.assert.deepStrictEqual(encoding, EnumEncoding.utf_16be);

		const encoding2 = detectBOMEncoding(buffer);
		t.assert.snapshot(encoding2);
	});

	it("should return null for no BOM", (t: test.TestContext) =>
	{
		const buffer = new Buffer([0x80, 0x95]);
		const encoding = whatwgBOMEncoding(buffer);

		t.assert.deepStrictEqual(encoding, null);

		const encoding2 = detectBOMEncoding(buffer);
		t.assert.snapshot(encoding2);
	});

	it("should return UTF-16LE for a UTF-32LE BOM", (t: test.TestContext) =>
	{
		const buffer = new Buffer([0xFF, 0xFE, 0x00, 0x00]);
		const encoding = whatwgBOMEncoding(buffer);

		t.assert.deepStrictEqual(encoding, EnumEncoding.utf_16le);

		const encoding2 = detectBOMEncoding(buffer);
		t.assert.snapshot(encoding2);

		const encoding3 = detectBOMEncoding(buffer, {
			utf_32le: true,
		});
		t.assert.deepStrictEqual(encoding3, EnumEncoding.utf_32le);
		t.assert.snapshot(encoding3);
	});

	it("should return null for a UTF-32BE BOM", (t: test.TestContext) =>
	{
		const buffer = new Buffer(createBOMEncoding(EnumEncoding.utf_32be));
		const encoding = whatwgBOMEncoding(buffer);

		t.assert.deepStrictEqual(encoding, null);

		const encoding2 = detectBOMEncoding(buffer);
		t.assert.snapshot(encoding2);
	});

	it("should return null for an empty buffer", (t: test.TestContext) =>
	{
		const buffer = new Buffer([]);
		const encoding = whatwgBOMEncoding(buffer);

		t.assert.deepStrictEqual(encoding, null);

		const encoding2 = detectBOMEncoding(buffer);
		t.assert.snapshot(encoding2);
	});

	it("should return null for a one-byte buffer", (t: test.TestContext) =>
	{
		const buffer = new Buffer([0xFF]);
		const encoding = whatwgBOMEncoding(buffer);

		t.assert.deepStrictEqual(encoding, null);

		const encoding2 = detectBOMEncoding(buffer);
		t.assert.snapshot(encoding2);
	});

	it(`should return null for a ${EnumEncoding.gb_18030} BOM`, (t: test.TestContext) =>
	{
		const buffer = new Buffer(createBOMEncoding(EnumEncoding.gb_18030));
		const encoding = whatwgBOMEncoding(buffer);

		t.assert.deepStrictEqual(encoding, null);

		const encoding2 = detectBOMEncoding(buffer);
		t.assert.snapshot(encoding2);
	});

	it(`should return null for a ${EnumEncoding.unicode} BOM`, (t: test.TestContext) =>
	{
		const buffer = new Buffer(createBOMEncoding(EnumEncoding.unicode));
		const encoding = whatwgBOMEncoding(buffer);

		t.assert.deepStrictEqual(encoding, null);

		t.assert.deepStrictEqual(detectBOMEncoding(buffer), null);

		const encoding2 = detectBOMEncoding(buffer, {
			unicode: true,
		});
		t.assert.snapshot(encoding2);
	});
});
