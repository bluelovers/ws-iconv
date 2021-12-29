import { readJSON, readJSONSync, WriteOptions } from 'fs-extra';
import { JFWriteOptions } from 'jsonfile';
declare module 'fs-extra' {
    interface WriteOptions extends Exclude<JFWriteOptions, string | null> {
        finalEOL?: boolean;
    }
}
export declare type IWriteOptions = WriteOptions & Exclude<JFWriteOptions, string | null>;
export declare function _handleWriteOptions(options?: IWriteOptions): IWriteOptions;
export { readJSON, readJSONSync, };
export declare function outputJSON(file: string, data: any, options?: IWriteOptions): Promise<void>;
export declare function outputJSONSync(file: string, data: any, options?: IWriteOptions): void;
export declare function writeJSON(file: string, data: any, options?: IWriteOptions): Promise<void>;
export declare function writeJSONSync(file: string, data: any, options?: IWriteOptions): void;
export declare function stringifyJSON(data: any, options?: IWriteOptions): string;
export declare function parseJSON(stringOrUint8Array: string | Uint8Array, reviver?: (this: any, key: string, value: any) => any): string;
