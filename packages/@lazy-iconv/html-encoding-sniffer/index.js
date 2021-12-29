"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeHTML = void 0;
const tslib_1 = require("tslib");
const html_encoding_sniffer_1 = tslib_1.__importDefault(require("html-encoding-sniffer"));
const whatwg_encoding_1 = tslib_1.__importDefault(require("whatwg-encoding"));
function normalizeHTML(html = '', transportLayerEncodingLabel) {
    let encoding = "UTF-8";
    if (ArrayBuffer.isView(html)) {
        // @ts-ignore
        html = Buffer.from(html.buffer, html.byteOffset, html.byteLength);
    }
    else if (html instanceof ArrayBuffer) {
        html = Buffer.from(html);
    }
    if (Buffer.isBuffer(html)) {
        encoding = (0, html_encoding_sniffer_1.default)(html, { defaultEncoding: "windows-1252", transportLayerEncodingLabel });
        html = whatwg_encoding_1.default.decode(html, encoding);
    }
    else {
        html = String(html);
    }
    return { html, encoding };
}
exports.normalizeHTML = normalizeHTML;
exports.default = normalizeHTML;
//# sourceMappingURL=index.js.map