/**
 * Created by user on 2020/6/9.
 */

import { IPath } from './type';
import { PathWrap } from '../core';

export function _replace_sep(who: IPath, input: string): string
{
	return input.replace(/\\/g, who.sep);
}

export function getStatic(who): PathWrap
{
	return who.__proto__.constructor;
}
