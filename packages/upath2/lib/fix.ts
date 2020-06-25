import { IPath } from './type';

export function _fix_special<T extends string>(who: Pick<IPath, 'sep' | 'name'>, path: T, returnOldIfNoPreset?: boolean): T
{
	let m: RegExpMatchArray;
	if ((m = path?.match(/^(\w+:)(?:\.[\/\\]?)?$/))?.length)
	{
		return m[1] + who.sep as any
	}
	else if (returnOldIfNoPreset === true)
	{
		return path
	}
}

