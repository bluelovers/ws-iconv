/**
 * Created by user on 2020/5/29.
 */

export function newContent(newline?: string, totalLines: number = 10)
{
	let lines = []
	for (let i = 0; i < totalLines; i++)
	{
		lines.push(i)
	}

	return lines.join(newline || `\n`)
}

