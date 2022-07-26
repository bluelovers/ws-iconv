import { IOptions } from 'path-parents';
import { Stats } from 'fs-extra';
export interface IOptionsFindUpPaths extends IOptions {
    onlyDirectories?: boolean;
    onlyFiles?: boolean;
}
export declare function findUpPaths(pattern: string | string[], opts?: IOptionsFindUpPaths): {
    stat: Stats;
    result: string;
};
export declare function findUpPathsAsync(pattern: string | string[], opts?: IOptionsFindUpPaths): Promise<{
    stat: Stats;
    result: string;
}>;
export default findUpPaths;
