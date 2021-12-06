
import { pathDirNormalize } from 'path-dir-normalize';
import { normalize } from 'upath2';

export function pathInsideDirectory(input: string, dir: string)
{
	dir = pathDirNormalize(dir);
	input = normalize(input);

	return input.startsWith(dir)
}

export default pathInsideDirectory
