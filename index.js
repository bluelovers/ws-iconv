"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const iconv_1 = require("./iconv");
exports.iconv = iconv_1.default;
const fs = require("fs-extra");
__export(require("fs-extra"));
const Promise = require("bluebird");
const stream = require("stream");
const sanitize = require("sanitize-filename");
function saveFile(file, data, options = {}) {
    return Promise
        .resolve(fs.ensureFile(file))
        .then(function () {
        return new Promise(function (resolve, reject) {
            if (options.encoding) {
                data = iconv_1.default.encode(data, options.encoding);
            }
            let readStream = createStreamPassThrough(data);
            let writeStream = outputStream(file, readStream);
            writeStream.on('error', reject);
            writeStream.on('finish', resolve);
        });
    });
}
exports.saveFile = saveFile;
function createStreamPassThrough(data) {
    let readStream = new stream.PassThrough();
    readStream.end(data);
    return readStream;
}
exports.createStreamPassThrough = createStreamPassThrough;
function outputStream(file, readStream) {
    let writeStream = fs.createWriteStream(file);
    readStream.pipe(writeStream);
    return writeStream;
}
exports.outputStream = outputStream;
function trimFilename(name) {
    let ret = name.toString()
        .replace(/\r\n|\r|\n|　/g, ' ')
        .replace(/[\s\r\n\t  \xA0　]+/g, ' ');
    return sanitize(ret, '')
        .trim()
        .replace(/^[　\s_]+/g, '')
        .replace(/[　\s_]+$/g, '');
}
exports.trimFilename = trimFilename;
const self = require("./index");
exports.default = self;
