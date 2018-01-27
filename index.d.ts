/// <reference types="node" />
import iconv from './iconv';
import { WriteStream } from "fs";
export * from 'fs-extra';
import * as stream from 'stream';
export { iconv };
export interface IOptions {
    encoding?: string | null;
}
export declare function outputFile(file: any, data: any, options?: IOptions): any;
export declare function createStreamPassThrough(data: any): stream.Readable;
export declare function outputStream(file: any, readStream: stream.Readable): WriteStream;
