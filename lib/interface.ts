import * as fs from "fs";
import { URL } from "url";

export import PathLike = fs.PathLike

export interface IFsStreamOptions
{
	flags?: string;
	/**
	 * @default null
	 */
	encoding?: string;
	/**
	 * @default null
	 */
	fd?: number;
	/**
	 * @default 0o666
	 */
	mode?: number;
	/**
	 * @default true
	 */
	autoClose?: boolean;
	start?: number;
}

export interface IFsReadStreamOptions extends IFsStreamOptions
{
	/**
	 * @default Infinity
	 */
	end?: number;
	/**
	 * @default 64 * 1024
	 */
	highWaterMark?: number;
}

export type IFsWriteStreamOptions = IFsStreamOptions

export interface IFsStreamState
{
	destroyed: boolean,
	sync: boolean,
}

export interface IFsStream
{
	autoClose: boolean
	flags: string
	fd: number
	mode: number
	pos: number
	closed: boolean
	destroyed: boolean

	_writableState: IFsStreamState
	_readableState: IFsStreamState
}

export interface IFsStreamData
{
	opened?: boolean
}

// @ts-ignore
Object.freeze(exports)
