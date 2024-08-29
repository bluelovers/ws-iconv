"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJSONSync = exports.readJSON = void 0;
exports._handleWriteOptions = _handleWriteOptions;
exports.outputJSON = outputJSON;
exports.outputJSONSync = outputJSONSync;
exports.writeJSON = writeJSON;
exports.writeJSONSync = writeJSONSync;
exports.stringifyJSON = stringifyJSON;
exports.parseJSON = parseJSON;
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
function outputJSON(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.outputJSON)(file, data, options);
}
function outputJSONSync(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.outputJSONSync)(file, data, options);
}
function writeJSON(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.writeJSON)(file, data, options);
}
function writeJSONSync(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.writeJSONSync)(file, data, options);
}
function stringifyJSON(data, options) {
    options = _handleWriteOptions(options);
    return (0, utils_1.stringify)(data, options);
}
function parseJSON(stringOrUint8Array, reviver) {
    return JSON.parse(stringOrUint8Array.toString(), reviver);
}
//# sourceMappingURL=index.js.map