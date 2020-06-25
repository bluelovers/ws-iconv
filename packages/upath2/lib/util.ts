/**
 * Created by user on 2020/6/9.
 */

import { IPath } from './type';
import { PathWrap } from '../core';
import pathIsNetworkDrive from 'path-is-network-drive';

export function _replace_sep(who: Pick<IPath, 'sep' | 'name'>, input: string): string
{
	let sep = who.sep;

	if (who.name !== 'posix' && pathIsNetworkDrive(input))
	{
		sep = '\\';

		input = sep + sep + input
			.slice(2)
			.replace(/[/\\]/g, sep)
		;
	}
	else
	{
		input = input
			.replace(/[/\\]/g, sep)
		;
	}

	if (/^\w:[/\\]$/.test(input))
	{
		return input
	}

	return input
		.replace(/([^/\\])[/\\]$/, '$1')
		;
}

export function getStatic(who): PathWrap
{
	return who.__proto__.constructor;
}
