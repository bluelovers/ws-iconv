import { inspect } from 'util';
import sanitizeFilename from '../index';

describe('throw', () =>
{
	([
		'.',
		'..',
		'./',
		'../',
		'',
		undefined,
		null,
		false,
		true,
		{},
	] as any[]).forEach(input =>
	{
		test(inspect(input), () =>
		{
			if (!input?.length)
			{
				expect(() => sanitizeFilename(input, { throwEmpty: true })).toThrowErrorMatchingSnapshot();
			}

			expect(() => sanitizeFilename(input, { replacement: '', throwEmpty: true })).toThrowErrorMatchingSnapshot();

			expect(() => sanitizeFilename(input, { replacement: ' ', throwEmpty: true })).toThrowErrorMatchingSnapshot();
		})
	})
});
