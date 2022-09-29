import { IOptionsWithOnlyDirectoryOrFile } from 'fs-stat';
/**
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing.
 */
export declare function fsRemove(dirOrFile: string, options?: IOptionsWithOnlyDirectoryOrFile): Promise<false | void>;
/**
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing.
 */
export declare function fsRemoveSync(dirOrFile: string, options?: IOptionsWithOnlyDirectoryOrFile): false | void;
export declare function fsRemoveFile(dirOrFile: string): Promise<false | void>;
export declare function fsRemoveFileSync(dirOrFile: string): false | void;
export declare function fsRemoveDirectories(dirOrFile: string): Promise<false | void>;
export declare function fsRemoveDirectoriesSync(dirOrFile: string): false | void;
export default fsRemove;
