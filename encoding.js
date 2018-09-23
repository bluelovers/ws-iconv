"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iconvLite = require("iconv-lite");
const debug_color2_1 = require("debug-color2");
exports.console = debug_color2_1.console;
function _enc(encoding) {
    return encoding.toString().toLowerCase().replace(/[^0-9a-z]|:\d{4}$/g, '');
}
exports._enc = _enc;
exports.NodeEncoding = [
    'ascii',
    'utf8',
    'utf-8',
    'utf16le',
    'ucs2',
    'base64',
    'latin1',
    'binary',
    'hex',
];
function isNodeEncoding(encoding) {
    let enc = _enc(encoding);
    return exports.NodeEncoding.includes(_enc(encoding)) ? enc : null;
}
exports.isNodeEncoding = isNodeEncoding;
let DISABLE_CODEC_DATA_WARN = false;
function disableCodecDataWarn(bool = true) {
    return DISABLE_CODEC_DATA_WARN = bool;
}
exports.disableCodecDataWarn = disableCodecDataWarn;
function codec_data(encoding) {
    let codec;
    let enc;
    let enc2;
    if (!exports.codec_table[enc = _enc(encoding)]) {
        try {
            codec = iconvLite.getCodec(encoding);
            enc2 = codec.encodingName || codec.enc;
            if (exports.codec_table[enc2]) {
                enc = enc2;
            }
        }
        catch (e) {
        }
    }
    if (exports.codec_table[enc]) {
        exports.codec_table[enc].key = exports.codec_table[enc].key || enc;
        exports.codec_table[enc].id = exports.codec_table[enc].id || enc;
        exports.codec_table[enc].input = encoding;
        return exports.codec_table[enc];
    }
    if (!DISABLE_CODEC_DATA_WARN) {
        debug_color2_1.console.warn(encoding, enc, enc2, codec);
    }
    if (enc2) {
        return {
            key: enc,
            key2: enc2,
            input: encoding,
            error: true,
            not: !codec,
        };
    }
    else {
        return null;
    }
}
exports.codec_data = codec_data;
exports.codec_table = {
    big5hkscs: {
        id: 'big5',
        name: 'Big5',
    },
    cp936: {
        name: 'GB2312',
    },
    gbk: {
        name: 'GBK',
    },
    eucjp: {
        name: 'UC-JP',
    },
    shiftjis: {
        name: 'SHIFT_JIS',
    },
    utf8: {
        name: 'UTF-8',
    },
    ucs2: {
        name: 'UTF-16LE',
    },
    utf16be: {
        name: 'UTF-16BE',
    },
    utf32be: {
        name: 'UTF-32BE',
        not: true,
    },
    utf32le: {
        name: 'UTF-32LE',
        not: true,
    },
};
const self = require("./encoding");
exports.default = self;
