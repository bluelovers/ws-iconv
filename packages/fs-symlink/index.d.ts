import { SymlinkType } from 'fs-extra';
import { ITSResolvable } from 'ts-type';
export interface IOptions {
    overwrite?: boolean;
    /**
     * only for symlink
     */
    type?: SymlinkType;
}
export declare function _handleOverwrite(src: string, dest: string, options: IOptions, async: true): Promise<boolean>;
export declare function _handleOverwrite(src: string, dest: string, options: IOptions, async: false): boolean;
export declare function _handleOverwrite(src: string, dest: string, options: IOptions, async: boolean): ITSResolvable<boolean>;
export declare function fsSymlink(src: string, dest: string, options?: IOptions): Promise<void>;
export declare function fsSymlinkSync(src: string, dest: string, options?: IOptions): void;
export declare function fsHardlink(src: string, dest: string, options?: IOptions): Promise<void>;
export declare function fsHardlinkSync(src: string, dest: string, options?: IOptions): void;
export default fsSymlinkSync;
