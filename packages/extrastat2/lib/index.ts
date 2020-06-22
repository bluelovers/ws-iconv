import { stat } from 'fs-extra';
import { getOptionResolvers} from './options';
import { resolve, parse } from 'path';
import { IStatsExtra, IOptions } from './types';

export function statExtra(pathname: string, options?: IOptions)
{
	const resolvedpath = resolve(pathname);
	const parsedPath = parse(resolvedpath)

	return stat(resolvedpath)
		.then(statData => {
			return Promise
				.all(getOptionResolvers(options).map(fn=> fn(parsedPath, statData)))
				.then(r => statData as IStatsExtra)
		})
	;
}

export default statExtra
