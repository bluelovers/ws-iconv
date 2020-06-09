export interface IPathLibLike {
    normalize?(path: string): string;
    sep?: string;
}
/**
 * dir normalize with end of path.sep
 */
export declare function pathDirNormalize(dir: string, pathLib?: IPathLibLike): string;
export declare function createPathDirNormalize(defaultPathLib: {
    normalize(path: string): string;
    sep: string;
}): (dir: string, pathLib?: IPathLibLike) => string;
export default pathDirNormalize;
