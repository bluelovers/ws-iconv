import { normalize as _normalize, sep as _sep } from 'upath2';
import { _strip_sep } from 'upath2/lib/util';

export interface IPathLibLike
{
	normalize?(path: string): string,
	sep?: string,
}

/**
 * dir normalize with end of path.sep
 */
export function pathDirNormalize(dir: string, pathLib?: IPathLibLike): string
{
	pathLib = pathLib ?? {};
	let sep = (pathLib.sep ?? _sep);

	let ret = _strip_sep((pathLib.normalize ?? _normalize)(dir));

	return ret + sep
}

export function createPathDirNormalize(defaultPathLib: {
	normalize(path: string): string,
	sep: string,
})
{
	if (typeof defaultPathLib.normalize !== 'function')
	{
		throw new TypeError(`normalize must be function`)
	}

	if (typeof defaultPathLib.sep !== 'string' || !defaultPathLib.sep.length)
	{
		throw new TypeError(`sep must be not empty string`)
	}

	return function pathDirNormalize(dir: string, pathLib?: IPathLibLike): string
	{
		pathLib = pathLib ?? {};

		return (pathLib.normalize ?? defaultPathLib.normalize)(dir + (pathLib.sep ?? defaultPathLib.sep))
	}
}

export default pathDirNormalize;
