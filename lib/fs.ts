/**
 * Created by user on 2017/12/10/010.
 */

import { fn, upath, IPath } from '../core';

let r_vaild = /[\\\?\/\!'"\:\<\>\*\|]+/g;

export function vaildNameEntry<T = string>(name: T): T
{
	return r_vaild.test(name.toString()) ? null : name;
}

export function filterNameEntry<T = string>(name: T): string
{
	return name.toString().replace(r_vaild, '');
}

fn.vaildNameEntry = vaildNameEntry;
fn.filterNameEntry = filterNameEntry;

// @ts-ignore
//console.log(upath.vaildNameEntry('a/b.test'), upath.filterNameEntry('a/b.test'));

import * as self from './fs';
export default self;
