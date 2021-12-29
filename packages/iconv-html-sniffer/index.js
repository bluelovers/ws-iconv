"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSniffHTMLEncoding = exports.createIconvDecode = void 0;
const tslib_1 = require("tslib");
const iconv_jschardet_1 = require("iconv-jschardet");
const html_encoding_sniffer_1 = tslib_1.__importDefault(require("html-encoding-sniffer"));
function createIconvDecode(defaultEncodingBase, sniffHTMLEncoding) {
    if (!sniffHTMLEncoding) {
        sniffHTMLEncoding = createSniffHTMLEncoding(defaultEncodingBase);
    }
    return (buf, defaultEncoding = defaultEncodingBase, transportLayerEncodingLabel) => {
        return (0, iconv_jschardet_1.decode)(buf, sniffHTMLEncoding(buf, defaultEncoding, transportLayerEncodingLabel));
    };
}
exports.createIconvDecode = createIconvDecode;
function createSniffHTMLEncoding(defaultEncodingBase) {
    return (buf, defaultEncoding = defaultEncodingBase, transportLayerEncodingLabel) => {
        return (0, html_encoding_sniffer_1.default)(buf, {
            defaultEncoding,
            transportLayerEncodingLabel,
        });
    };
}
exports.createSniffHTMLEncoding = createSniffHTMLEncoding;
exports.default = createIconvDecode;
//# sourceMappingURL=index.js.map