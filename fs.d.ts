/**
 * Created by user on 2019/3/17.
 */
import { WrapFSIconv } from './core';
import { ensureWriteStream, saveFileSync, _autoDecode, _createStreamPassThrough, _outputStream, loadFile, loadFileSync, saveFile } from './core';
import iconv from 'iconv-jschardet';
export * from 'fs-extra';
export { ensureWriteStream, saveFileSync, _autoDecode, _createStreamPassThrough, _outputStream, loadFile, loadFileSync, saveFile };
export import IWrapFSIconvOptions = WrapFSIconv.IWrapFSIconvOptions;
export import IWrapFSIconvOptionsLoadFile = WrapFSIconv.IWrapFSIconvOptionsLoadFile;
export import IWrapFSIconvOptionsLoadFile2 = WrapFSIconv.IWrapFSIconvOptionsLoadFile2;
export import IEncoding = WrapFSIconv.IEncoding;
export { iconv };
