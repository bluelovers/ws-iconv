"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSniffHTMLEncoding = exports.createIconvDecode = void 0;
const iconv_jschardet_1 = require("iconv-jschardet");
const html_encoding_sniffer_1 = require("html-encoding-sniffer");
function createIconvDecode(defaultEncodingBase, sniffHTMLEncoding) {
    if (!sniffHTMLEncoding) {
        sniffHTMLEncoding = createSniffHTMLEncoding(defaultEncodingBase);
    }
    return (buf, defaultEncoding = defaultEncodingBase) => {
        return iconv_jschardet_1.decode(buf, sniffHTMLEncoding(buf, defaultEncoding));
    };
}
exports.createIconvDecode = createIconvDecode;
function createSniffHTMLEncoding(defaultEncodingBase) {
    return (buf, defaultEncoding = defaultEncodingBase) => {
        return html_encoding_sniffer_1.default(buf, {
            defaultEncoding,
        });
    };
}
exports.createSniffHTMLEncoding = createSniffHTMLEncoding;
exports.default = createIconvDecode;
//# sourceMappingURL=index.js.map