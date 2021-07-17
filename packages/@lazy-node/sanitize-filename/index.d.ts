import { Options } from 'filenamify/filenamify';
export interface IOptions extends Options {
    removeDotFile?: boolean;
    replaceToFullWidth?: boolean;
    trim?: boolean;
    noTrimSpace?: boolean;
    throwEmpty?: boolean;
}
export declare function sanitizeFilename(name: string, options?: IOptions): string;
export declare function replaceToFullWidth(name: string): string;
export declare function trimSpace(name: string): string;
export declare function trimFilename(name: string): string;
export default sanitizeFilename;
