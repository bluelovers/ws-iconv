import { IOptions, IRuntime } from 'path-parents';
import { IOptionsIsDirectoryOrFileStat } from 'fs-stat';
import { Stats } from 'fs-extra';
export interface IOptionsFindUpPaths extends IOptions, IOptionsIsDirectoryOrFileStat {
    onlyDirectories?: boolean;
    onlyFiles?: boolean;
    throwIfNoEntry?: boolean;
}
export declare function handleOptions<T extends IOptionsFindUpPaths>(cwd?: string | T, opts?: T): IRuntime<T>;
export declare function _handlePattern(pattern: string | string[]): string[];
export declare function _throwIfNoEntry(runtime: IRuntime<IOptionsFindUpPaths>): void;
export declare function findUpPaths(pattern: string | string[], opts?: IOptionsFindUpPaths): {
    stat: Stats;
    result: string;
};
export declare function findUpPathsAsync(pattern: string | string[], opts?: IOptionsFindUpPaths): Promise<{
    stat: Stats;
    result: string;
}>;
export default findUpPaths;
