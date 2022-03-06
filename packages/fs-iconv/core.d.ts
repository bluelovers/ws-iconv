/**
 * Created by user on 2019/3/17.
 */
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { vEncoding } from 'iconv-jschardet';
import fsExtra from 'fs-extra';
import iconv from 'iconv-jschardet';
import Bluebird from 'bluebird';
import stream from 'stream';
import { ITSRequireAtLeastOne } from 'ts-type';
export declare const SymFSLib: unique symbol;
export declare function WrapFSIconv<F extends typeof fsExtra = typeof fsExtra>(fsLib: F): WrapFSIconv.IWrapFS<F>;
export declare function ensureWriteStream(file: string): fsExtra.WriteStream;
export declare function saveFileSync(file: string, data: any, options?: WrapFSIconv.IWrapFSIconvOptions): boolean;
export declare function saveFile(file: string, data: any, options?: WrapFSIconv.IWrapFSIconvOptions): Bluebird<boolean>;
export declare namespace WrapFSIconv {
    type IWrapFS<F extends typeof fsExtra = typeof fsExtra> = F & {
        [SymFSLib]: F | typeof fsExtra;
        iconv: typeof iconv;
        ensureWriteStream(file: string): fsExtra.WriteStream;
        saveFile(file: string, data: any, options?: WrapFSIconv.IWrapFSIconvOptions): Bluebird<boolean>;
        saveFileSync(file: string, data: any, options?: WrapFSIconv.IWrapFSIconvOptions): boolean;
        loadFile<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): Bluebird<T>;
        loadFile<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Bluebird<T>;
        loadFileSync<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): T;
        loadFileSync<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): T;
        _createStreamPassThrough(data: unknown): stream.Readable;
        _outputStream(file: string, readStream: stream.Readable): fsExtra.WriteStream;
        _autoDecode<T>(buf: T, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile & {
            autoDecode: true | string[];
        }): T | string | Buffer;
        _autoDecode(buf: unknown, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Buffer;
        trimFilename(name: unknown): string;
    };
    interface IWrapFSIconvOptions {
        encoding?: vEncoding;
    }
    interface IWrapFSIconvOptionsLoadFile {
        encoding?: string;
        flag?: string;
        autoDecode?: boolean | string[];
    }
    type IWrapFSIconvOptionsLoadFile2 = ITSRequireAtLeastOne<IWrapFSIconvOptionsLoadFile, 'encoding' | 'autoDecode'>;
    type IEncoding = vEncoding;
}
export declare function _createStreamPassThrough(data: any): stream.Readable;
export declare function _outputStream(file: string, readStream: stream.Readable): fsExtra.WriteStream;
export declare function _autoDecode<T>(buf: T, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile & {
    autoDecode: true | string[];
}): T | string | Buffer;
export declare function _autoDecode(buf: any, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Buffer;
export declare function loadFile<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): Bluebird<T>;
export declare function loadFile<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): Bluebird<T>;
export declare function loadFileSync<T = string>(file: string, options: WrapFSIconv.IWrapFSIconvOptionsLoadFile2): T;
export declare function loadFileSync<T = Buffer>(file: string, options?: WrapFSIconv.IWrapFSIconvOptionsLoadFile): T;
declare const _default: typeof import("./core");
export default _default;
