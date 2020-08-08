/// <reference types="node" />
import { PathLike } from 'fs';
export declare function isWritableAsync(target: PathLike): Promise<boolean>;
export declare function isWritableSync(target: PathLike): boolean;
export declare function isWritableFileAsync(target: PathLike): Promise<boolean>;
export declare function isWritableFileSync(target: PathLike): boolean;
export declare function isWritableDirectoryAsync(target: PathLike): Promise<boolean>;
export declare function isWritableDirectorySync(target: PathLike): boolean;
export default isWritableSync;
