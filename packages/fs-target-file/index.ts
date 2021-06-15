import { outputJSON, readJSON, ReadOptions, WriteOptions } from 'fs-extra';
import { ITSResolvable } from 'ts-type/lib/generic';
import { ITSRequiredPick } from 'ts-type/lib/type/record';

export interface IFileMethodAsyncOptions<RO = ReadOptions, WO = WriteOptions, D = unknown, N = string>
{
	read?<T = D>(file: N, options?: RO): Promise<T>,
	write?<T = D>(file: N, data: ITSResolvable<T>, options?: RO): Promise<any>,

	readOptions?: RO,
	writeOptions?: WO,
}

export function fsFileMethodAsync<RO = ReadOptions, WO = WriteOptions, D = unknown, N = string>(options?: IFileMethodAsyncOptions<RO, WO, D, N>)
{
	options ??= {};

	const {
		readOptions,
		writeOptions = {
			spaces: 2,
		},
	} = options;

	const {
		read = (file, options) => readJSON(file, {
			...readOptions,
			...options,
		}),
		write = (file, data, options) => outputJSON(file, data, {
			...writeOptions,
			...options,
		}),
	} = options ?? {};

	return {
		read,
		write,
	}
}

export interface ITargetFileOptions<N = string>
{
	inputFile: N,
	outputFile?: N,
}

export function toTargetFileOptions<N = string>(targetOptions: N | ITargetFileOptions<N>): ITSRequiredPick<ITargetFileOptions<N>>
{
	let inputFile: N;
	let outputFile: N;

	// @ts-ignore
	if (typeof targetOptions?.inputFile !== 'undefined')
	{
		// @ts-ignore
		inputFile = targetOptions.inputFile;
		// @ts-ignore
		outputFile = targetOptions.outputFile ?? inputFile;
	}
	else
	{
		inputFile = outputFile = targetOptions as N;
	}

	return {
		inputFile,
		outputFile,
	}
}

export function fsTargetFile<D = unknown, RO = ReadOptions, WO = WriteOptions, N = string>(targetOptions: N | ITargetFileOptions<N>, options?: IFileMethodAsyncOptions<RO, WO, D, N>)
{
	const { read, write } = fsFileMethodAsync<RO, WO, D, N>(options);

	const { inputFile, outputFile } = toTargetFileOptions(targetOptions);

	const target = {

		get inputFile()
		{
			return inputFile
		},

		get outputFile()
		{
			return outputFile
		},

		read<T = D>(options?: RO): Promise<T>
		{
			return read(inputFile, options)
		},

		write<T extends D = D>(data: T, options?: RO): Promise<unknown>
		{
			return write(outputFile, data, options)
		},

		async async()
		{
			return target
		}

	};

	return target

}

export default fsTargetFile
