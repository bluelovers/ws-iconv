/**
 * Created by user on 2020/6/9.
 */
import * as types from './type';
import { IPath, ORIGIN_KEY, IPathType, IParse } from './type';
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
export default PathWrap;
