import { IPathNode, IPathPlatform } from 'upath2/lib/type';
export interface IOptions {
    cwd?: string;
    platform?: IPathPlatform;
    stopPath?: string | string[];
    limit?: number;
}
export interface IRuntime {
    cwd: string;
    opts: IOptions;
    path: Pick<IPathNode, 'normalize' | 'dirname' | 'basename'>;
    stopPath: string[];
    limit: number;
}
export declare function handleOptions(cwd?: string | IOptions, opts?: IOptions): IRuntime;
export declare function pathParentsCore(cwd: string, runtime: IRuntime): string;
export declare function pathParentsGenerator(cwd?: string | IOptions, opts?: IOptions): Generator<string, void, unknown>;
export declare function pathParents(cwd?: string | IOptions, opts?: IOptions): string[];
export declare function pathSplitGenerator(cwd?: string | IOptions, opts?: IOptions): Generator<string, void, unknown>;
export declare function pathSplit(cwd?: string | IOptions, opts?: IOptions): string[];
export default pathParents;
