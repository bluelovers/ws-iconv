import { stat } from 'fs/promises';
import { getOptionResolvers} from './options';
import { resolve, parse } from 'path';
import { IStatsExtra, IOptions } from './types';

export function statExtra(pathname: string, options?: IOptions)
{
	const resolvedpath = resolve(pathname);
	const parsedPath = parse(resolvedpath)

	return stat(resolvedpath)
		// @ts-ignore
		.then((statData: IStatsExtra) => {

			statData.parsed = parsedPath;

			return Promise
				.all(getOptionResolvers(options).map(fn=> fn(parsedPath, statData)))
				.then(() => {
					return statData
				})
		})
	;
}

export default statExtra
