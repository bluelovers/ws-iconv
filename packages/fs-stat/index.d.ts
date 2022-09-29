/// <reference types="node" />
/// <reference types="node" />
/**
 * Created by user on 2020/6/22.
 */
import { Stats } from 'fs-extra';
import { BigIntStats, StatOptions, StatSyncOptions } from 'fs';
import { ITSRequireAtLeastOne } from 'ts-type/lib/type/record';
export type { Stats as IStats };
export type { Stats };
export type { BigIntStats };
export type IStatsInput = Stats | BigIntStats;
export interface IOptions extends StatSyncOptions, StatOptions {
    followSymlinks?: boolean;
    /**
     * @alias followSymlinks
     * @deprecated use `followSymlinks`
     */
    allowSymlinks?: boolean;
}
export interface IOptionsIsDirectoryOrFileStat {
    onlyDirectories?: boolean;
    onlyFiles?: boolean;
}
export interface IOptionsWithOnlyDirectoryOrFile extends IOptions, IOptionsIsDirectoryOrFileStat {
}
export declare function _handleOptions<T extends IOptions>(options: T): T;
export declare function fsStat<S extends IStatsInput = Stats>(path: string | Buffer, options?: IOptions): Promise<S>;
export declare function fsStatSync<S extends IStatsInput = Stats>(path: string | Buffer, options?: IOptions): S;
export declare function isSymbolicLink(dir0: string, options?: IOptions): Promise<boolean>;
export declare function isSymbolicLinkSync(dir0: string, options?: IOptions): boolean;
export declare function isSameStat<S extends IStatsInput>(st1: S, st2: S, ...stats: S[]): boolean;
export declare function isDirectoryOrFileStat(stat: IStatsInput, opts: ITSRequireAtLeastOne<IOptionsIsDirectoryOrFileStat>): boolean;
export declare function isExistsStat(stat: IStatsInput, options?: IOptionsIsDirectoryOrFileStat): boolean;
export declare function fsStatExists(path: string | Buffer, options?: IOptionsWithOnlyDirectoryOrFile): Promise<boolean>;
export declare function fsStatExistsSync(path: string | Buffer, options?: IOptionsWithOnlyDirectoryOrFile): boolean;
export default fsStat;
