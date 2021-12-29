"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconv = exports.saveFile = exports.loadFileSync = exports.loadFile = exports._outputStream = exports._createStreamPassThrough = exports._autoDecode = exports.saveFileSync = exports.ensureWriteStream = void 0;
const tslib_1 = require("tslib");
/**
 * Created by user on 2019/3/17.
 */
const core_1 = require("./core");
const core_2 = require("./core");
Object.defineProperty(exports, "ensureWriteStream", { enumerable: true, get: function () { return core_2.ensureWriteStream; } });
Object.defineProperty(exports, "saveFileSync", { enumerable: true, get: function () { return core_2.saveFileSync; } });
Object.defineProperty(exports, "_autoDecode", { enumerable: true, get: function () { return core_2._autoDecode; } });
Object.defineProperty(exports, "_createStreamPassThrough", { enumerable: true, get: function () { return core_2._createStreamPassThrough; } });
Object.defineProperty(exports, "_outputStream", { enumerable: true, get: function () { return core_2._outputStream; } });
Object.defineProperty(exports, "loadFile", { enumerable: true, get: function () { return core_2.loadFile; } });
Object.defineProperty(exports, "loadFileSync", { enumerable: true, get: function () { return core_2.loadFileSync; } });
Object.defineProperty(exports, "saveFile", { enumerable: true, get: function () { return core_2.saveFile; } });
const iconv_jschardet_1 = tslib_1.__importDefault(require("iconv-jschardet"));
exports.iconv = iconv_jschardet_1.default;
tslib_1.__exportStar(require("fs-extra"), exports);
const fs = (0, core_1.WrapFSIconv)(require('fs-extra'));
// @ts-ignore
exports = module.exports = fs;
//# sourceMappingURL=fs.js.map