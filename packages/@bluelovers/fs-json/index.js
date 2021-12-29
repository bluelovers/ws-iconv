"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = exports.stringifyJSON = exports.writeJSONSync = exports.writeJSON = exports.outputJSONSync = exports.outputJSON = exports.readJSONSync = exports.readJSON = exports._handleWriteOptions = void 0;
const fs_extra_1 = require("fs-extra");
Object.defineProperty(exports, "readJSON", { enumerable: true, get: function () { return fs_extra_1.readJSON; } });
Object.defineProperty(exports, "readJSONSync", { enumerable: true, get: function () { return fs_extra_1.readJSONSync; } });
const utils_1 = require("jsonfile/utils");
function _handleWriteOptions(options) {
    var _a;
    options !== null && options !== void 0 ? options : (options = {});
    (_a = options.finalEOL) !== null && _a !== void 0 ? _a : (options.finalEOL = true);
    return options;
}
exports._handleWriteOptions = _handleWriteOptions;
function outputJSON(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.outputJSON)(file, data, options);
}
exports.outputJSON = outputJSON;
function outputJSONSync(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.outputJSONSync)(file, data, options);
}
exports.outputJSONSync = outputJSONSync;
function writeJSON(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.writeJSON)(file, data, options);
}
exports.writeJSON = writeJSON;
function writeJSONSync(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.writeJSONSync)(file, data, options);
}
exports.writeJSONSync = writeJSONSync;
function stringifyJSON(data, options) {
    options = _handleWriteOptions(options);
    return (0, utils_1.stringify)(data, options);
}
exports.stringifyJSON = stringifyJSON;
function parseJSON(stringOrUint8Array, reviver) {
    return JSON.parse(stringOrUint8Array.toString(), reviver);
}
exports.parseJSON = parseJSON;
//# sourceMappingURL=index.js.map