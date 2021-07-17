import { Options } from 'filenamify/filenamify';
import _ify from 'filenamify';
import {
	nbspToSpace,
	removeBom,
	removeZeroWidth,
	trimWithZeroWidth,
} from 'zero-width';
import hasWindowsUnsafeName, {
	newRegExpWindowsUnsafeName,
	replaceWindowsUnsafeName,
} from '@lazy-node/windows-unsafe-filename/index';

export interface IOptions extends Options
{
	removeDotFile?: boolean;
	replaceToFullWidth?: boolean;
	trim?: boolean;
	noTrimSpace?: boolean;
	throwEmpty?: boolean;
}

export function sanitizeFilename(name: string, options?: IOptions)
{
	const old = name;

	options = {
		...(options || null),
	};
	(options as any).replacement ??= '!'

	name = removeZeroWidth(name, true);
	name = removeBom(name, true);
	name = nbspToSpace(name);
	name = trimWithZeroWidth(name);

	name = name
		.replace(/[\r\n]/g, '')
	;

	let dot = '';

	if (!options.removeDotFile)
	{
		dot = name.match(/^(\.)(?=\w)/i)?.[1] ?? ''
	}

	if (options.replaceToFullWidth)
	{
		name = replaceToFullWidth(name);
	}

	let bool: boolean;

	name = replaceWindowsUnsafeName(name, ($0, $1, $2) => {
		bool = true;
		return '~!' + ($2 ?? '')
	}, true);

	name = _ify(name, options);

	if (bool === true)
	{
		name = name.replace(/^~!?(?:(?=\.)|$)/, options.replacement)
	}

	if (options.trim)
	{
		name = trimFilename(name);
	}
	else if (!options.noTrimSpace)
	{
		name = trimSpace(name);
	}

	name = replaceWindowsUnsafeName(name, ($0, $1, $2) => options.replacement + ($2 ?? ''), true);

	if (name.length === 0 || old.length === 0)
	{
		if (options.throwEmpty)
		{
			throw new RangeError(`Invalid filename: {'${old}' => '${name}'} length ${old.length} => ${name.length}`)
		}
		else if (old.length !== 0)
		{
			name = options.replacement;
		}
	}

	return dot + name
}

export function replaceToFullWidth(name: string)
{
	return name
		.replace(/\//g, '／')
		.replace(/\\/g, '＼')
		.replace(/\?/g, '？')
		.replace(/\*/g, '＊')
		.replace(/>/g, '＞')
		.replace(/</g, '＜')
}

export function trimSpace(name: string)
{
	name = name
		.replace(/^[　\s\xA0]+/g, '')
		.replace(/[　\s\xA0]+$/g, '')
	;

	return name
}

export function trimFilename(name: string)
{
	name = trimSpace(name)
		.replace(/^[_\-+]+/g, '')
		.replace(/[_\-+]+$/g, '')
	;

	return name
}

export default sanitizeFilename
