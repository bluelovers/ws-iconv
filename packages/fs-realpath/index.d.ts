/// <reference types="node" />
/// <reference types="node" />
import { BufferEncodingOption, EncodingOption, PathLike, realpathSync } from 'fs';
export declare const fsRealpathNativeSync: typeof realpathSync.native;
export declare function fsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string>;
export declare function fsRealpathNativeAsync(path: PathLike, options: BufferEncodingOption): Promise<Buffer>;
export declare function fsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string | Buffer>;
/**
 * @see https://github.com/facebook/jest/blob/main/packages/jest-util/src/tryRealpath.ts
 */
export declare function tryFsRealpathNativeSync(path: PathLike, options?: EncodingOption): string;
export declare function tryFsRealpathNativeSync(path: PathLike, options: BufferEncodingOption): Buffer;
export declare function tryFsRealpathNativeSync(path: PathLike, options?: EncodingOption): string | Buffer;
export declare function tryFsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string>;
export declare function tryFsRealpathNativeAsync(path: PathLike, options: BufferEncodingOption): Promise<Buffer>;
export declare function tryFsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string | Buffer>;
export default tryFsRealpathNativeSync;
