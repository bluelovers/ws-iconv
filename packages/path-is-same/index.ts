import { relative } from 'path';

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
