/**
 * Created by user on 2020/6/9.
 */

import { IPath } from './type';
import { PathWrap } from '../core';
import pathIsNetworkDrive from 'path-is-network-drive';
import _strip_sep from 'path-strip-sep';

export { _strip_sep }

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

//	if (/^\w:[/\\]$/.test(input))
//	{
//		return input
//	}

	return input
		//.replace(/([^/\\])[/\\]$/, '$1')
		;
}

export function getStatic(who): PathWrap
{
	return who.__proto__.constructor;
}

export function defaults(destination, ...input)
{
	destination = destination || {};

	input.forEach(defaults => {
		for (const key in defaults) {
			if (defaults.hasOwnProperty(key) && !destination.hasOwnProperty(key)) {
				destination[key] = defaults[key];
			}
		}
	});
	  
	return destination;
}
