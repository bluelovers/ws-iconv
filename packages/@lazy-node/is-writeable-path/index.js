"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWritableDirectorySync = exports.isWritableDirectoryAsync = exports.isWritableFileSync = exports.isWritableFileAsync = exports.isWritableSync = exports.isWritableAsync = void 0;
const fs_1 = require("fs");
const fs_stat_1 = require("fs-stat");
const RW_OK = fs_1.constants.W_OK | fs_1.constants.R_OK;
function isWritableAsync(target) {
    return fs_1.promises.access(target, RW_OK)
        .then(r => { var _a; return (_a = r) !== null && _a !== void 0 ? _a : true; });
}
exports.isWritableAsync = isWritableAsync;
function isWritableSync(target) {
    var _a;
    try {
        return (_a = (0, fs_1.accessSync)(target, RW_OK)) !== null && _a !== void 0 ? _a : true;
    }
    catch (err) { }
}
exports.isWritableSync = isWritableSync;
function isWritableFileAsync(target) {
    return (0, fs_stat_1.fsStatExists)(target, {
        onlyFiles: true,
    }).then(() => isWritableAsync(target));
}
exports.isWritableFileAsync = isWritableFileAsync;
function isWritableFileSync(target) {
    return (0, fs_stat_1.fsStatExistsSync)(target, {
        onlyFiles: true,
    }) && isWritableSync(target);
}
exports.isWritableFileSync = isWritableFileSync;
function isWritableDirectoryAsync(target) {
    return (0, fs_stat_1.fsStatExists)(target, {
        onlyDirectories: true,
    }).then(() => isWritableAsync(target));
}
exports.isWritableDirectoryAsync = isWritableDirectoryAsync;
function isWritableDirectorySync(target) {
    return (0, fs_stat_1.fsStatExistsSync)(target, {
        onlyDirectories: true,
    }) && isWritableSync(target);
}
exports.isWritableDirectorySync = isWritableDirectorySync;
exports.default = isWritableSync;
//# sourceMappingURL=index.js.map