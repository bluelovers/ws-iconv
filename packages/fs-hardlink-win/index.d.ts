/// <reference types="node" />
/// <reference types="bluebird" />
/**
 * @internal
 */
export declare function _handleOutput(stdout: string | Buffer): string[];
export declare function winHardlinkList(file: string, options?: {
    cwd?: string;
}): import("bluebird")<string[]>;
export declare function winHardlinkListSync(file: string, options?: {
    cwd?: string;
}): string[];
export default winHardlinkList;
