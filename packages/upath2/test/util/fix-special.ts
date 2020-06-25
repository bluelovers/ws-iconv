import { IPathNode } from '../../lib/type';

export function _fix_special(path: IPathNode)
{
	const { normalize, join, dirname } = path;

	describe('c:', () =>
	{

		([
			`normalize`,
			`dirname`,
		] as const).forEach(fn =>
		{

			test(fn, () =>
			{

				expect(path[fn]('c:')).toMatchSnapshot();
				expect(path[fn]('c:/')).toMatchSnapshot();
				expect(path[fn]('c:\\')).toMatchSnapshot();
				expect(path[fn]('c:.')).toMatchSnapshot();
				expect(path[fn]('c:./')).toMatchSnapshot();
				expect(path[fn]('c:.\\')).toMatchSnapshot();

			});

		});


		([
			`join`,
		] as const).forEach(fn =>
		{

			test(fn, () =>
			{

				expect(path[fn]('c:', 'kk')).toMatchSnapshot();
				expect(path[fn]('c:/', 'kk')).toMatchSnapshot();
				expect(path[fn]('c:\\', 'kk')).toMatchSnapshot();
				expect(path[fn]('c:.', 'kk')).toMatchSnapshot();
				expect(path[fn]('c:./', 'kk')).toMatchSnapshot();
				expect(path[fn]('c:.\\', 'kk')).toMatchSnapshot();

			});

		});

	})
}
