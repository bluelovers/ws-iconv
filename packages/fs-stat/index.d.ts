/// <reference types="node" />
/**
 * Created by user on 2020/6/22.
 */
import { Stats } from 'fs-extra';
export { Stats as IStats };
export interface IOptions {
    allowSymlinks?: boolean;
}
export declare function fsStat(path: string | Buffer, options?: IOptions): Promise<Stats>;
export declare function fsStatSync(path: string | Buffer, options?: IOptions): Stats;
export default fsStat;
