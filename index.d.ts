/// <reference types="node" />
import iconv, { vEncoding } from 'iconv-jschardet';
import { WriteStream } from "fs";
export * from 'fs-extra';
import bluebird = require('bluebird');
import stream = require('stream');
export { iconv };
export interface IOptions {
    encoding?: vEncoding;
}
export interface IOptionsLoadFile {
    encoding?: string;
    flag?: string;
    autoDecode?: boolean | string[];
}
export declare type IOptionsLoadFile2 = IOptionsLoadFile & {
    encoding: string;
};
export declare function loadFile<T = string>(file: string, options: IOptionsLoadFile2 & ({
    encoding: string;
} | {
    autoDecode: true | string[];
})): bluebird<T>;
export declare function loadFile<T = Buffer>(file: string, options?: IOptionsLoadFile): bluebird<T>;
export declare function loadFileSync<T = string>(file: string, options: IOptionsLoadFile2 & ({
    encoding: string;
} | {
    autoDecode: true | string[];
})): T;
export declare function loadFileSync<T = Buffer>(file: string, options?: IOptionsLoadFile): T;
export declare function _autoDecode<T>(buf: T, options: IOptionsLoadFile & {
    autoDecode: true | string[];
}): T | string | Buffer;
export declare function _autoDecode(buf: any, options: IOptionsLoadFile): Buffer;
export declare function saveFile(file: string, data: any, options?: IOptions): bluebird<boolean>;
export declare function ensureWriteStream(file: string): WriteStream;
export declare function _createStreamPassThrough(data: any): stream.Readable;
export declare function _outputStream(file: string, readStream: stream.Readable): WriteStream;
export declare function trimFilename(name: any): string;
import * as self from './index';
export default self;
