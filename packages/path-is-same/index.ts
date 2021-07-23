import { relative } from 'path';
import { realpathSync } from 'fs';

export function fsSameRealpath(dir0: string, dir1: string)
{
	try
	{
		let real01 = realpathSync(dir0);
		let real02 = realpathSync(dir1);

		return pathIsSame(real01, real02)
	}
	catch (e)
	{

	}
}

export function pathIsSame(p1: string, p2: string, ...ps: string[]): boolean
export function pathIsSame(p1: string, ...ps: string[])
{
	if (ps.length <= 0)
	{
		throw new TypeError(`p2 must be protected`)
	}

	return ps.every(p2 => relative(p1, p2) === '')
}

export default pathIsSame
