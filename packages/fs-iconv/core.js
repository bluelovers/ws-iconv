"use strict";
/**
 * Created by user on 2019/3/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymFSLib = void 0;
exports.WrapFSIconv = WrapFSIconv;
exports.ensureWriteStream = ensureWriteStream;
exports.saveFileSync = saveFileSync;
exports.saveFile = saveFile;
exports._createStreamPassThrough = _createStreamPassThrough;
exports._outputStream = _outputStream;
exports._autoDecode = _autoDecode;
exports.loadFile = loadFile;
exports.loadFileSync = loadFileSync;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const iconv_jschardet_1 = tslib_1.__importDefault(require("iconv-jschardet"));
const bluebird_1 = tslib_1.__importDefault(require("bluebird"));
const util_1 = require("./util");
const stream_1 = require("stream");
exports.SymFSLib = Symbol('fsLib');
function WrapFSIconv(fsLib) {
    let fs = (0, lodash_1.clone)(fsLib);
    Object.keys(fs)
        .forEach(k => {
        if (typeof fsLib[k] === 'function') {
            fs[k] = fsLib[k].bind(fsLib);
        }
    });
    fs[exports.SymFSLib] = fsLib;
    fs.iconv = iconv_jschardet_1.default;
    fs.ensureWriteStream = ensureWriteStream.bind(fs);
    fs.saveFile = saveFile.bind(fs);
    fs.saveFileSync = saveFileSync.bind(fs);
    fs.loadFileSync = loadFileSync.bind(fs);
    fs.loadFile = loadFile.bind(fs);
    fs._createStreamPassThrough = _createStreamPassThrough.bind(fs);
    fs._outputStream = _outputStream.bind(fs);
    fs._autoDecode = _autoDecode.bind(fs);
    fs.trimFilename = util_1.trimFilename;
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-ignore
    fs.default = fs;
    return fs;
}
function ensureWriteStream(file) {
    // @ts-ignore
    let fs = this[exports.SymFSLib];
    fs.ensureFileSync(file);
    return fs.createWriteStream(file);
}
function saveFileSync(file, data, options = {}) {
    // @ts-ignore
    let fs = this[exports.SymFSLib];
    fs.ensureFileSync(file);
    if (options.encoding) {
        data = iconv_jschardet_1.default.encode(data, options.encoding);
    }
    fs.outputFileSync(file, data);
    return true;
}
function saveFile(file, data, options = {}) {
    // @ts-ignore
    let self = this;
    let fs = self[exports.SymFSLib];
    return bluebird_1.default
        .resolve(fs.ensureFile(file))
        .tap(function () {
        return new bluebird_1.default(function (resolve, reject) {
            if (options.encoding) {
                data = iconv_jschardet_1.default.encode(data, options.encoding);
            }
            let readStream = self._createStreamPassThrough(data);
            let writeStream = self._outputStream(file, readStream);
            writeStream.on('error', reject);
            writeStream.on('finish', resolve);
        });
    })
        .thenReturn(true);
}
function _createStreamPassThrough(data) {
    let readStream = new stream_1.PassThrough();
    readStream.end(data);
    return readStream;
}
function _outputStream(file, readStream) {
    // @ts-ignore
    let fs = this[exports.SymFSLib];
    let writeStream = fs.createWriteStream(file);
    readStream.pipe(writeStream);
    return writeStream;
}
function _autoDecode(buf, options) {
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
}
function loadFile(file, options = {}) {
    // @ts-ignore
    let self = this;
    let fs = self[exports.SymFSLib];
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
            return self._autoDecode(buf, options);
        });
    }
    else {
        ps = fs.readFile(file, options);
    }
    return bluebird_1.default.resolve(ps);
}
function loadFileSync(file, options = {}) {
    // @ts-ignore
    let self = this;
    let fs = self[exports.SymFSLib];
    let ps;
    if (options.encoding) {
        let enc = iconv_jschardet_1.default.isNodeEncoding(options.encoding);
        if (enc) {
            // @ts-ignore
            ps = fs.readFileSync(file, options);
        }
        else {
            let ops = Object.assign({}, options);
            delete ops.encoding;
            // @ts-ignore
            ps = iconv_jschardet_1.default.decode(fs.readFileSync(file, ops), options.encoding);
        }
    }
    else if (options.autoDecode) {
        // @ts-ignore
        ps = self._autoDecode(fs.readFileSync(file, options), options);
    }
    else {
        // @ts-ignore
        ps = fs.readFileSync(file, options);
    }
    return ps;
}
exports.default = exports;
//# sourceMappingURL=core.js.map