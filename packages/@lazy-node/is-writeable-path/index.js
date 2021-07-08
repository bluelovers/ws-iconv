"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWritableDirectorySync = exports.isWritableDirectoryAsync = exports.isWritableFileSync = exports.isWritableFileAsync = exports.isWritableSync = exports.isWritableAsync = void 0;
const fs_1 = require("fs");
function isWritableAsync(target) {
    return fs_1.promises.access(target, fs_1.constants.W_OK | fs_1.constants.R_OK)
        .then(r => { var _a; return (_a = r) !== null && _a !== void 0 ? _a : true; });
}
exports.isWritableAsync = isWritableAsync;
function isWritableSync(target) {
    var _a;
    try {
        return (_a = (0, fs_1.accessSync)(target, fs_1.constants.W_OK | fs_1.constants.R_OK)) !== null && _a !== void 0 ? _a : true;
    }
    catch (err) { }
}
exports.isWritableSync = isWritableSync;
function isWritableFileAsync(target) {
    return fs_1.promises.stat(target)
        .then((stat) => {
        return stat.isFile() && isWritableAsync(target);
    });
}
exports.isWritableFileAsync = isWritableFileAsync;
function isWritableFileSync(target) {
    const stat = (0, fs_1.statSync)(target);
    return stat.isFile() && isWritableSync(target);
}
exports.isWritableFileSync = isWritableFileSync;
function isWritableDirectoryAsync(target) {
    return fs_1.promises.stat(target)
        .then((stat) => {
        return stat.isDirectory() && isWritableAsync(target);
    });
}
exports.isWritableDirectoryAsync = isWritableDirectoryAsync;
function isWritableDirectorySync(target) {
    const stat = (0, fs_1.statSync)(target);
    return stat.isDirectory() && isWritableSync(target);
}
exports.isWritableDirectorySync = isWritableDirectorySync;
exports.default = isWritableSync;
//# sourceMappingURL=index.js.map