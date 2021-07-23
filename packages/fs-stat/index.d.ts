/// <reference types="node" />
/**
 * Created by user on 2020/6/22.
 */
import { Stats } from 'fs-extra';
import { StatOptions } from 'fs';
export { Stats as IStats };
export interface IOptions extends StatOptions {
    allowSymlinks?: boolean;
}
export declare function fsStat(path: string | Buffer, options?: IOptions): Promise<Stats>;
export declare function fsStatSync(path: string | Buffer, options?: IOptions): Stats;
export declare function isSymbolicLinkSync(dir0: string, options?: IOptions): boolean;
export default fsStat;
