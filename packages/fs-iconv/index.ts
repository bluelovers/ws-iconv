/**
 * Created by user on 2018/1/27/027.
 */

import iconv from 'iconv-jschardet';
import { vEncoding } from 'iconv-jschardet';
import fsExtra = require('fs-extra');
import clone = require("lodash/clone");
import Bluebird = require('bluebird');
import stream = require('stream');

export * from './fs';
import fs = require('./fs');
import { SymFSLib } from './core';

import { trimFilename } from './util';
export { trimFilename }

export default fs;

// @ts-ignore
exports = module.exports = fs;
