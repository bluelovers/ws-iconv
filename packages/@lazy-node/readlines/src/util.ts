import { EnumNewLineCharacter, INewLineCharacter } from './types';

export function handleOptionNewLineCharacter(newLineCharacter?: INewLineCharacter): number[]
{
	if (!newLineCharacter)
	{
		return [EnumNewLineCharacter.LF];
	}
	else if (typeof newLineCharacter !== 'number')
	{
		let ls = [] as number[]

		for (let i = 0; i < newLineCharacter.length; i++)
		{
			let c = newLineCharacter[i];

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

