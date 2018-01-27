"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iconvLite = require("iconv-lite");
const jschardet = require("jschardet");
function skipDecodeWarning(bool = true) {
    return iconvLite.skipDecodeWarning = bool;
}
exports.skipDecodeWarning = skipDecodeWarning;
function BufferFrom(str, encoding, from) {
    let data;
    if (from) {
        data = Buffer.from(str, from);
    }
    else {
        data = str;
    }
    data = decode(data);
    let buf = iconvLite.encode(data, encoding);
    return buf;
}
exports.BufferFrom = BufferFrom;
function detect(str) {
    let ret = jschardet.detect(str);
    ret.encoding_lc = ret.encoding.toLowerCase();
    return ret;
}
exports.detect = detect;
function decode(str, from = null) {
    let c = detect(str);
    if (!from) {
        from = c.encoding;
    }
    let data;
    switch (from.toUpperCase()) {
        case 'BIG5':
        case 'GBK':
        case 'UTF-16LE':
            data = iconvLite.decode(str, from);
            break;
        case 'ASCII':
        case 'UTF-8':
            data = str;
            break;
        default:
            console.warn('decode', from, c);
            data = iconvLite.decode(str, from);
            break;
    }
    return data;
}
exports.decode = decode;
function encode(str, to = 'utf8', from = null) {
    let buf = BufferFrom(str, 'utf8');
    return iconvLite.encode(buf, to);
}
exports.encode = encode;
const self = require("./iconv");
exports.default = self;
