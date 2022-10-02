import { INewLineCharacter } from './types';
import { EnumNewLineCharacter } from './index';

export function handleOptionNewLineCharacter(newLineCharacter?: INewLineCharacter): number[]
{
	if (!newLineCharacter)
	{
		return [EnumNewLineCharacter.LF];
	}
	else if (typeof newLineCharacter !== 'number')
	{
		const ls = [] as number[];

		for (let i = 0; i < newLineCharacter.length; i++)
		{
			const c = newLineCharacter[i];

			if (typeof c !== 'number')
			{
				ls.push(c.charCodeAt(0))
			}
			else
			{
				ls.push(c)
			}
		}

		return ls
	}

	return [newLineCharacter]
}

