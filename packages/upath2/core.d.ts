/**
 * Created by user on 2017/12/9/009.
 */
import { IPathNode, IPath, IParse, IPathType, ORIGIN_KEY } from './lib/type';
import * as types from './lib/type';
export type { IPathNode, IPath, IParse, IPathType };
export declare class PathWrap implements IPath {
    sep: string;
    name: string;
    delimiter: string;
    win32: IPath;
    posix: IPath;
    upath: PathWrap;
    default: PathWrap;
    fn: IPath;
    [ORIGIN_KEY]?: IPathType;
    constructor(path: any, id: string);
    join<T = string, U = string>(path: T, ...paths: U[]): string;
    normalize<T = string>(path: T): string;
    relative<T = string, U = string>(from: T, to: U): string;
    resolve<T = string, U = string>(path: T, ...paths: U[]): string;
    parse<T = string>(path: T): IParse;
    format<T = IParse>(pathObject: T): string;
    basename<T = string, U = string>(path: T, ext?: U): string;
    dirname<T = string>(path: T): string;
    extname<T = string>(path: T): string;
    isAbsolute<T = string>(path: T): boolean;
}
export declare namespace PathWrap {
    let fn: types.IPath;
    type IPath = types.IPath;
    type IPathNode = types.IPathNode;
    type IParse = types.IParse;
}
export declare const posix: IPath;
export declare const win32: IPath;
export declare type IUPath = PathWrap & {
    default: IUPath;
    upath: IUPath;
    PathWrap: typeof PathWrap;
};
export declare const upath: IUPath;
export declare const fn: IPath;
export default upath;
export declare function _this_origin(who: IPath): IPathNode;
