
export function pathStripSep(input: string)
{
	return input
		.replace(/([^/\\:])[/\\]+$/, '$1')
		.replace(/(^[/\\])[/\\]{2,}$/, '$1')
		;
}

export default pathStripSep
