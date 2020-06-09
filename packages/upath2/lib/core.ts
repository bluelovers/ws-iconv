/**
 * Created by user on 2020/6/9.
 */

import { IPath, IPathNode, ORIGIN_KEY } from './type';
import upath, { win32, posix } from '../core';
import _path from "path";

export function _this_origin(who: IPath): IPathNode
{
	if (who[ORIGIN_KEY])
	{
		// @ts-ignore
		return who[ORIGIN_KEY];
	}
	else if (who === upath)
	{
		// @ts-ignore
		return _path;
	}
	else if (who === win32)
	{
		// @ts-ignore
		return _path.win32;
	}
	else if (who === posix)
	{
		// @ts-ignore
		return _path.posix;
	}

	throw new TypeError(`this not PathWrap`);
}
