import {
	outputJSON as _outputJSON,
	outputJSONSync as _outputJSONSync,
	readJSON,
	readJSONSync,
	writeJSON as _writeJSON,
	writeJSONSync as _writeJSONSync,
	WriteOptions,
} from 'fs-extra';
import { stringify } from 'jsonfile/utils';
import { JFWriteOptions } from 'jsonfile';

declare module 'fs-extra'
{
	interface WriteOptions extends Exclude<JFWriteOptions, string | null>
	{
		finalEOL?: boolean
	}
}

export type IWriteOptions = WriteOptions & Exclude<JFWriteOptions, string | null>;

export function _handleWriteOptions(options?: IWriteOptions): IWriteOptions
{
	options ??= {};
	options.finalEOL ??= true;
	return options
}

export {
	readJSON,
	readJSONSync,
}

export function outputJSON(file: string, data: any, options?: IWriteOptions)
{
	options = _handleWriteOptions(options);
	return _outputJSON(file, data, options)
}

export function outputJSONSync(file: string, data: any, options?: IWriteOptions)
{
	options = _handleWriteOptions(options);
	return _outputJSONSync(file, data, options)
}

export function writeJSON(file: string, data: any, options?: IWriteOptions)
{
	options = _handleWriteOptions(options);
	return _writeJSON(file, data, options)
}

export function writeJSONSync(file: string, data: any, options?: IWriteOptions)
{
	options = _handleWriteOptions(options);
	return _writeJSONSync(file, data, options)
}

export function stringifyJSON(data: any, options?: IWriteOptions): string
{
	options = _handleWriteOptions(options);
	return stringify(data, options as any)
}

export function parseJSON(stringOrUint8Array: string | Uint8Array,
	reviver?: (this: any, key: string, value: any) => any,
): string
{
	return JSON.parse(stringOrUint8Array.toString(), reviver)
}
