/**
 * Created by user on 2020/6/9.
 */

import { IPath } from './type';
import { PathWrap } from '../core';

export function _replace_sep(who: Pick<IPath, 'sep' | 'name'>, input: string): string
{
	let sep = who.sep;

	if (who.name === 'win32' && /^\\\\(?![/\\])/.test(input))
	{
		sep = '\\';
	}

	return input.replace(/(?<![/\\])[/\\](?![/\\])/g, sep);
}

export function getStatic(who): PathWrap
{
	return who.__proto__.constructor;
}
