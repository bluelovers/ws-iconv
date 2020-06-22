/// <reference types="node" />
/**
 * Created by user on 2020/6/22.
 */
import { Stats } from 'fs-extra';
export { Stats as IStats };
export declare function fsStat(path: string | Buffer, options?: {
    allowSymlinks?: boolean;
}): Promise<Stats>;
export declare function fsStatSync(path: string | Buffer, options?: {
    allowSymlinks?: boolean;
}): Stats;
export default fsStat;
