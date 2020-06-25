import { pathDirNormalize } from 'path-dir-normalize';

export function pathIsSame(p1: string, p2: string, ...ps: string[])
export function pathIsSame(p1: string, ...ps: string[])
{
	p1 = pathDirNormalize(p1);

	if (ps.length <= 0)
	{
		throw new TypeError(`p2 must be protected`)
	}

	return ps.every(p2 => pathDirNormalize(p2) === p1)
}

export default pathIsSame
