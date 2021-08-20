import { relative } from 'upath2';
import { realpathSync } from 'fs';

export function _pathIsSame(p1: string, p2: string): boolean
{
	return relative(p1, p2) === ''
}

export function _assertInputArgv(p1: string, ...ps: string[])
{
	if (ps.length <= 0)
	{
		throw new TypeError(`p2 must be provide`)
	}
}

export function fsSameRealpath(p1: string, p2: string, ...ps: string[]): boolean
export function fsSameRealpath(p1: string, ...ps: string[]): boolean
{
	_assertInputArgv(p1, ...ps);

	if (!p1?.length || !ps[0]?.length)
	{
		return false
	}

	p1 = realpathSync(p1);

	return ps.every(p2 =>
	{

		try
		{
			p2 = realpathSync(p2);
		}
		catch (e)
		{
			return false
		}

		return _pathIsSame(p1, p2);
	})
}

export function pathIsSame(p1: string, p2: string, ...ps: string[]): boolean
export function pathIsSame(p1: string, ...ps: string[]): boolean
{
	_assertInputArgv(p1, ...ps);

	if (!p1?.length || !ps[0]?.length)
	{
		return false
	}

	return ps.every(p2 => _pathIsSame(p1, p2))
}

export default pathIsSame
