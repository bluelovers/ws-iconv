"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const iconv_jschardet_1 = require("iconv-jschardet");
exports.iconv = iconv_jschardet_1.default;
const fs = require("fs-extra");
__export(require("fs-extra"));
const Promise = require("bluebird");
const stream = require("stream");
const sanitize = require("sanitize-filename");
function loadFile(file, options = {}) {
    let ps;
    if (options.encoding) {
        let enc = iconv_jschardet_1.default.isNodeEncoding(options.encoding);
        if (enc) {
            ps = fs.readFile(file, options);
        }
        else {
            let ops = Object.assign({}, options);
            delete ops.encoding;
            ps = fs.readFile(file, ops)
                .then(function (buf) {
                return iconv_jschardet_1.default.decode(buf, options.encoding);
            });
        }
    }
    else if (options.autoDecode) {
        ps = fs.readFile(file, options)
            .then(function (buf) {
            if (Array.isArray(options.autoDecode)) {
                let _do;
                let c = iconv_jschardet_1.default._enc(iconv_jschardet_1.default.detect(buf, true).name);
                for (let from of options.autoDecode) {
                    let cd = iconv_jschardet_1.default.codec_data(from);
                    let key;
                    if (cd && cd.name) {
                        key = iconv_jschardet_1.default._enc(cd.name);
                        if (c === key) {
                            _do = key;
                            break;
                        }
                    }
                }
                if (_do) {
                    return iconv_jschardet_1.default.encode(buf, null, options.encoding);
                }
                else {
                    return buf;
                }
            }
            return iconv_jschardet_1.default.encode(buf);
        });
    }
    else {
        ps = fs.readFile(file, options);
    }
    return Promise.resolve(ps);
}
exports.loadFile = loadFile;
function saveFile(file, data, options = {}) {
    return Promise
        .resolve(fs.ensureFile(file))
        .then(function () {
        return new Promise(function (resolve, reject) {
            if (options.encoding) {
                data = iconv_jschardet_1.default.encode(data, options.encoding);
            }
            let readStream = _createStreamPassThrough(data);
            let writeStream = _outputStream(file, readStream);
            writeStream.on('error', reject);
            writeStream.on('finish', resolve);
        });
    });
}
exports.saveFile = saveFile;
function _createStreamPassThrough(data) {
    let readStream = new stream.PassThrough();
    readStream.end(data);
    return readStream;
}
exports._createStreamPassThrough = _createStreamPassThrough;
function _outputStream(file, readStream) {
    let writeStream = fs.createWriteStream(file);
    readStream.pipe(writeStream);
    return writeStream;
}
exports._outputStream = _outputStream;
function trimFilename(name) {
    let ret = name.toString()
        .replace(/\r\n|\r|\n/g, ' ')
        .replace(/[\r\n\t  \xA0]+/g, ' ');
    return sanitize(ret, '')
        .trim()
        .replace(/^[　\s_]+/g, '')
        .replace(/[　\s_]+$/g, '');
}
exports.trimFilename = trimFilename;
const self = require("./index");
exports.default = self;
