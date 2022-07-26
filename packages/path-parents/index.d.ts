import { IPathNode, IPathPlatform } from 'upath2/lib/type';
export interface IOptions {
    cwd?: string;
    platform?: IPathPlatform;
    stopPath?: string | string[];
    limit?: number;
}
export interface IRuntime<OPTS extends IOptions = IOptions> {
    cwd: string;
    opts: OPTS;
    path: Pick<IPathNode, 'normalize' | 'dirname' | 'basename' | 'resolve' | 'join'>;
    stopPath: string[];
    limit: number;
}
export declare function handleOptions<T extends IOptions>(cwd?: string | T, opts?: T): IRuntime<T>;
export declare function pathParentsCore(cwd: string, runtime: IRuntime): string;
export declare function pathParentsGenerator(cwd?: string | IOptions, opts?: IOptions): Generator<string, void, unknown>;
export declare function pathParents(cwd?: string | IOptions, opts?: IOptions): string[];
export declare function pathSplitGenerator(cwd?: string | IOptions, opts?: IOptions): Generator<string, void, unknown>;
export declare function pathSplit(cwd?: string | IOptions, opts?: IOptions): string[];
export default pathParents;
