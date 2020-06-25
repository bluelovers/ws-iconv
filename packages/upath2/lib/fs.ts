/**
 * Created by user on 2017/12/10/010.
 */

import { fn, upath, IPath, PathWrap } from '../core';

declare module './type'
{
	interface IPath
	{
		vaildNameEntry?<T = string>(name: T): T
		filterNameEntry?<T = string>(name: T): string
	}
}

let r_vaild = /[\\\?\/\!'"\:\<\>\*\|]+/g;

export function vaildNameEntry<T = string>(name: T): T
{
	return r_vaild.test(name.toString()) ? void 0 : name;
}

export function filterNameEntry<T = string>(name: T): string
{
	return name.toString().replace(r_vaild, '');
}

fn.vaildNameEntry = vaildNameEntry;
fn.filterNameEntry = filterNameEntry;

// @ts-ignore
//console.log(upath.vaildNameEntry('a/b.test'), upath.filterNameEntry('a/b.test'));
