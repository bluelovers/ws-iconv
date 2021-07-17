const windowsReservedRe = newRegExpWindowsUnsafeName();

const windowsReservedRe2 = newRegExpWindowsUnsafeName(true);

/**
 * @see https://stackoverflow.com/questions/38457621/what-happens-when-writing-to-aux-file-on-windows
 * @see https://github.com/parshap/node-sanitize-filename/blob/209c39b914c8eb48ee27bcbde64b2c7822fdf3de/test.js#L83
 */
export function newRegExpWindowsUnsafeName(mode?: boolean)
{
	if (mode)
	{
		return /^(con|prn|aux|nul|com\d{1,2}|lpt\d{1,2})(\..*)?$/i
	}

	return /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i
}

export function hasWindowsUnsafeName(name: string, mode?: boolean)
{
	return name.match(mode ? windowsReservedRe2 : windowsReservedRe)
}

export function replaceWindowsUnsafeName(name: string,
	replaceValue: string | ((substring: string, ...args: (string | undefined)[]) => string),
	mode?: boolean,
)
{
	return name.replace(mode ? windowsReservedRe2 : windowsReservedRe, replaceValue as any)
}

export default hasWindowsUnsafeName
