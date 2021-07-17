/**
 * Created by user on 2019/3/17.
 */

import sanitize from '@lazy-node/sanitize-filename';

export function trimFilename(name): string
{
	let ret = name.toString()
		.replace(/\r\n|\r|\n/g, ' ')
		.replace(/[\r\n\t  \xA0]+/g, ' ')
	;

	return sanitize(ret)
		.trim()
		.replace(/^[　\s_]+/g, '')
		.replace(/[　\s_]+$/g, '')
		;
}

export default exports as typeof import('./util');
