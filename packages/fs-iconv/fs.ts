/**
 * Created by user on 2019/3/17.
 */
import { WrapFSIconv, SymFSLib } from './core';
import { ensureWriteStream, saveFileSync, _autoDecode, _createStreamPassThrough, _outputStream, loadFile, loadFileSync, saveFile } from './core';
import { vEncoding } from 'iconv-jschardet';
import fsExtra = require('fs-extra');
import clone = require("lodash/clone");
import iconv from 'iconv-jschardet';
import Bluebird from 'bluebird';
import stream from 'stream';

export * from 'fs-extra';

export { ensureWriteStream, saveFileSync, _autoDecode, _createStreamPassThrough, _outputStream, loadFile, loadFileSync, saveFile }

export import IWrapFSIconvOptions = WrapFSIconv.IWrapFSIconvOptions;
export import IWrapFSIconvOptionsLoadFile = WrapFSIconv.IWrapFSIconvOptionsLoadFile;
export import IWrapFSIconvOptionsLoadFile2 = WrapFSIconv.IWrapFSIconvOptionsLoadFile2;
export import IEncoding = WrapFSIconv.IEncoding;


export { iconv }

const fs = WrapFSIconv(require('fs-extra') as typeof import('fs-extra'));

// @ts-ignore
exports = module.exports = fs;
