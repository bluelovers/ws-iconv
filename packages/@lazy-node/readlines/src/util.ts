import { INewLineCharacter } from './types';
import { EnumNewLineCharacter } from './index';

/**
 * 處理換行字元選項，將各種輸入格式轉換為位元組陣列
 * Process new line character option, converting various input formats to byte array
 *
 * @param {INewLineCharacter} [newLineCharacter] - 換行字元設定 / New line character configuration
 * @returns {number[]} 換行字元的位元組陣列 / Byte array of new line characters
 */
export function handleOptionNewLineCharacter(newLineCharacter?: INewLineCharacter): number[]
{
	// 若未提供換行字元，預設使用 LF (\n) / If no new line character provided, default to LF
	if (!newLineCharacter)
	{
		return [EnumNewLineCharacter.LF];
	}
	// 處理字串、陣列或 Buffer 類型 / Handle string, array, or Buffer types
	else if (typeof newLineCharacter !== 'number')
	{
		const ls = [] as number[];

		for (let i = 0; i < newLineCharacter.length; i++)
		{
			const c = newLineCharacter[i];

			// 將字元轉換為其字元碼 / Convert character to its char code
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

	// 數字類型直接包裝為陣列 / Number type wrapped directly as array
	return [newLineCharacter]
}

