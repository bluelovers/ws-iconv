import { normalize } from 'path';

export function pathIsSame(p1: string, p2: string, ...ps: string[])
export function pathIsSame(p1: string, ...ps: string[])
{
	p1 = normalize(p1);

	return ps.length > 0 && ps.every(p2 => normalize(p2) === p1)
}

export default pathIsSame
