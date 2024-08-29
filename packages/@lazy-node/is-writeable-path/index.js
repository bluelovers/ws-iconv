"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWritableAsync = isWritableAsync;
exports.isWritableSync = isWritableSync;
exports.isWritableFileAsync = isWritableFileAsync;
exports.isWritableFileSync = isWritableFileSync;
exports.isWritableDirectoryAsync = isWritableDirectoryAsync;
exports.isWritableDirectorySync = isWritableDirectorySync;
const fs_1 = require("fs");
const fs_stat_1 = require("fs-stat");
const RW_OK = fs_1.constants.W_OK | fs_1.constants.R_OK;
function isWritableAsync(target) {
    return fs_1.promises.access(target, RW_OK)
        .then(r => { var _a; return (_a = r) !== null && _a !== void 0 ? _a : true; });
}
function isWritableSync(target) {
    var _a;
    try {
        return (_a = (0, fs_1.accessSync)(target, RW_OK)) !== null && _a !== void 0 ? _a : true;
    }
    catch (err) { }
}
function isWritableFileAsync(target) {
    return (0, fs_stat_1.fsStatExists)(target, {
        onlyFiles: true,
    }).then(() => isWritableAsync(target));
}
function isWritableFileSync(target) {
    return (0, fs_stat_1.fsStatExistsSync)(target, {
        onlyFiles: true,
    }) && isWritableSync(target);
}
function isWritableDirectoryAsync(target) {
    return (0, fs_stat_1.fsStatExists)(target, {
        onlyDirectories: true,
    }).then(() => isWritableAsync(target));
}
function isWritableDirectorySync(target) {
    return (0, fs_stat_1.fsStatExistsSync)(target, {
        onlyDirectories: true,
    }) && isWritableSync(target);
}
exports.default = isWritableSync;
//# sourceMappingURL=index.js.map