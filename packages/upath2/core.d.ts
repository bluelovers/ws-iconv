/**
 * Created by user on 2017/12/9/009.
 */
import { IPathNode, IPath, IParse, IPathType } from './lib/type';
import { PathWrap } from './lib/wrap';
export type { IPathNode, IPath, IParse, IPathType };
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
