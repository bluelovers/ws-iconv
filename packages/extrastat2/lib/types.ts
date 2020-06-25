import { ParsedPath } from "path";
import * as resolvers from './resolvers';
import { Stats, Dirent } from 'fs';
import { Mode } from 'stat-mode';
import { ITSPartialRecord } from 'ts-type';

export interface IStatsPlus
{
	name: string,
	pathname: string,
	mimetype: string,
}

export interface IList extends Dirent, IStatsPlus
{

}

export interface IOptions extends ITSPartialRecord<(keyof typeof resolvers) | keyof IStatsPlus, boolean>
{

}

export interface IStatsExtra extends Stats, Partial<IStatsPlus>
{
	name?: string,
	pathname?: string,
	children?: IList[],
	siblings?: IList[],

	rwx?: Mode

	parsed: ParsedPath,

	parents?: string[],
}

export interface IResolver
{
	(parsedPath: ParsedPath, stat: IStatsExtra): IStatsExtra
}

export const enum EnumMimetypePlus
{
	directory = 'application/directory',
	fifo = 'application/FIFO',
	socket = 'application/socket',
	unknown = 'application/unknown',
}
