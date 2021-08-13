import { async, sync } from 'cross-spawn-extra';
import { crlf } from 'crlf-normalize';

/**
 * @internal
 */
export function _handleOutput(stdout: string | Buffer)
{
	return crlf(stdout.toString()).split('\n').filter(Boolean)
}

export function winHardlinkList(file: string, options?: {
	cwd?: string,
})
{
	return async('fsutil', [
		'hardlink',
		'list',
		file,
	], {
		cwd: options?.cwd ?? process.cwd(),
	})
		.then(cp => _handleOutput(cp.stdout))
}

export function winHardlinkListSync(file: string, options?: {
	cwd?: string,
})
{
	let cp = sync('fsutil', [
		'hardlink',
		'list',
		file,
	], {
		cwd: options?.cwd ?? process.cwd(),
	})

	return _handleOutput(cp.stdout)
}

export default winHardlinkList
