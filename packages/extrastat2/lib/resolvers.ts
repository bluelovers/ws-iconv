import { ParsedPath, join, sep } from "path";
import { _mimetype } from './mime';
import { list } from './list';
import { IStatsExtra } from './types';
import pathParents from 'path-parents/index';
export { rwx } from './resolvers/rwx';

/*
module.exports = {
filename: filename,
filestat: filestat,
pathname: pathname,

filemode: (pathparts, stat) =>
{
	let { mode } = stat

	if (!mode)
	{
		return { 'filemode': '.........' }
	}
	else
	{
		return {
			'filemode': [
				mode >> 6 & 4 ? role == 'user' ? 'R' : 'r' : '-',
				mode >> 6 & 2 ? role == 'user' ? 'W' : 'w' : '-',
				mode >> 6 & 1 ? role == 'user' ? 'X' : 'x' : '-',
				mode << 3 >> 6 & 4 ? role == 'group' ? 'R' : 'r' : '-',
				mode << 3 >> 6 & 2 ? role == 'group' ? 'W' : 'w' : '-',
				mode << 3 >> 6 & 1 ? role == 'group' ? 'X' : 'x' : '-',
				mode << 6 >> 6 & 4 ? role == 'other' ? 'R' : 'r' : '-',
				mode << 6 >> 6 & 2 ? role == 'other' ? 'W' : 'w' : '-',
				mode << 6 >> 6 & 1 ? role == 'other' ? 'X' : 'x' : '-',
			].join(''),
		}
	}
},

	mimetype: mimetype,
	parents: parents,

	children: children,

	siblings: siblings,
}
 */

/*
export function parents(parsedPath: ParsedPath, stat: IStatsExtra)
{
	const lastIndex = array => array[array.length - 1] || '';
	const ancestors = [];

	for (let i = 0; i < pathparts.length; i++)
	{
		ancestors.push(
			path.join(
				'/',
				lastIndex(ancestors),
				pathparts[i],
				'/',
			),
		)
	}

	return {
		'parents':
			ancestors.map((ancestor, index) =>
			{
				return {
					filename: pathparts[index],
					pathname: ancestor,
					mimetype: 'application/directory',
				}
			}),
	}
}
*/

export function parents(parsedPath: ParsedPath, stat: IStatsExtra)
{
	let resolvedpath = join(parsedPath.dir, parsedPath.name)

	stat.parents = pathParents(resolvedpath)

	return stat
}

export function name(parsedPath: ParsedPath, stat: IStatsExtra)
{
	stat.name = parsedPath.name

	return stat
}

export function pathname(parsedPath: ParsedPath, stat: IStatsExtra)
{
	let resolvedpath = join(parsedPath.dir, parsedPath.name)

	if (stat.isDirectory())
	{
		resolvedpath = resolvedpath + sep
	}

	stat.pathname = resolvedpath;

	return stat
}

export function mimetype(parsedPath: ParsedPath, stat: IStatsExtra)
{
	stat.mimetype = _mimetype(parsedPath, stat)

	return stat
}

export async function siblings(parsedPath: ParsedPath, stat: IStatsExtra)
{
	stat.siblings = await list(parsedPath.dir)

	return stat
}

export async function children(parsedPath: ParsedPath, stat: IStatsExtra)
{
	if (!stat.isDirectory())
	{
		stat.children = null;
	}
	else
	{
		const resolvedpath = join(parsedPath.dir, parsedPath.name)

		stat.children = await list(resolvedpath)
	}

	return stat
}
