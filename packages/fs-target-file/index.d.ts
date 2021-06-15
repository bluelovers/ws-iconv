import { ReadOptions, WriteOptions } from 'fs-extra';
import { ITSResolvable } from 'ts-type/lib/generic';
import { ITSRequiredPick } from 'ts-type/lib/type/record';
export interface IFileMethodAsyncOptions<RO = ReadOptions, WO = WriteOptions, D = unknown, N = string> {
    read?<T = D>(file: N, options?: RO): Promise<T>;
    write?<T = D>(file: N, data: ITSResolvable<T>, options?: RO): Promise<any>;
    readOptions?: RO;
    writeOptions?: WO;
}
export declare function fsFileMethodAsync<RO = ReadOptions, WO = WriteOptions, D = unknown, N = string>(options?: IFileMethodAsyncOptions<RO, WO, D, N>): {
    read: (<T = D>(file: N, options?: RO) => Promise<T>) | ((file: any, options: any) => Promise<any>);
    write: <T_1 = D>(file: N, data: ITSResolvable<T_1>, options?: RO) => Promise<any>;
};
export interface ITargetFileOptions<N = string> {
    inputFile: N;
    outputFile?: N;
}
export declare function toTargetFileOptions<N = string>(targetOptions: N | ITargetFileOptions<N>): ITSRequiredPick<ITargetFileOptions<N>>;
export declare function fsTargetFile<D = unknown, RO = ReadOptions, WO = WriteOptions, N = string>(targetOptions: N | ITargetFileOptions<N>, options?: IFileMethodAsyncOptions<RO, WO, D, N>): {
    readonly inputFile: N;
    readonly outputFile: N;
    read<T = D>(options?: RO): Promise<T>;
    write<T_1 extends D = D>(data: T_1, options?: RO): Promise<unknown>;
    async(): Promise<any>;
};
export default fsTargetFile;
