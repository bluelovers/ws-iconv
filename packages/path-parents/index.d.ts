import { IPathNode, IPathPlatform } from 'upath2/lib/type';
export interface IOptions {
    platform?: IPathPlatform;
}
export interface IRuntime {
    cwd: string;
    opts: IOptions;
    path: IPathNode;
}
export declare function handleOptions(cwd?: string | IOptions, opts?: IOptions): IRuntime;
export declare function pathParentsCore(cwd: string, runtime: IRuntime): string;
export declare function pathParentsGenerator(cwd?: string | IOptions, opts?: IOptions): Generator<string, void, unknown>;
export declare function pathParents(cwd?: string | IOptions, opts?: IOptions): string[];
export declare function pathSplitGenerator(cwd?: string | IOptions, opts?: IOptions): Generator<string, void, unknown>;
export declare function pathSplit(cwd?: string | IOptions, opts?: IOptions): string[];
export default pathParents;
