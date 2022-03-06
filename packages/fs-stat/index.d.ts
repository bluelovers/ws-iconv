/// <reference types="node" />
/// <reference types="node" />
/**
 * Created by user on 2020/6/22.
 */
import { Stats } from 'fs-extra';
import { StatOptions, BigIntStats } from 'fs';
export type { Stats as IStats };
export type { Stats };
export type { BigIntStats };
export interface IOptions extends StatOptions {
    followSymlinks?: boolean;
    /**
     * @alias followSymlinks
     * @deprecated use `followSymlinks`
     */
    allowSymlinks?: boolean;
}
export declare function _handleOptions(options: IOptions): IOptions;
export declare function fsStat(path: string | Buffer, options?: IOptions): Promise<Stats>;
export declare function fsStatSync<S extends Stats | BigIntStats = Stats>(path: string | Buffer, options?: IOptions): S;
export declare function isSymbolicLink(dir0: string, options?: IOptions): Promise<boolean>;
export declare function isSymbolicLinkSync(dir0: string, options?: IOptions): boolean;
export declare function isSameStat<S extends Stats | BigIntStats>(st1: S, st2: S, ...stats: S[]): boolean;
export default fsStat;
