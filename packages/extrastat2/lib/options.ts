import * as resolvers from './resolvers';
import { defaults } from 'lodash';
import { IResolver, IOptions } from './types';

export const defaultOptions: IOptions = {
	"name": true,
	"pathname": true,
	"mimetype": true,
	"siblings": false,
	"children": false,
}

export function getOptions(options: IOptions, sync?: boolean): IOptions
{
	return defaults(options, defaultOptions)
}

export function getOptionResolvers(options: IOptions, sync?: boolean)
{
	return Object.entries(getOptions(options, sync))
		.reduce((fns, [name, bool]) =>
		{

			if (bool)
			{
				let fn;

				if (sync)
				{
					fn = resolvers[name + 'Sync']
				}

				fn = fn ?? resolvers[name];

				if (typeof fn !== 'undefined')
				{
					fns.push(fn)
				}
			}

			return fns;
		}, [] as IResolver[])
}
