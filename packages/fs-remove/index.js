"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsRemove = fsRemove;
exports.fsRemoveSync = fsRemoveSync;
exports.fsRemoveFile = fsRemoveFile;
exports.fsRemoveFileSync = fsRemoveFileSync;
exports.fsRemoveDirectories = fsRemoveDirectories;
exports.fsRemoveDirectoriesSync = fsRemoveDirectoriesSync;
const fs_extra_1 = require("fs-extra");
const fs_stat_1 = require("fs-stat");
/**
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing.
 */
async function fsRemove(dirOrFile, options) {
    if (options) {
        if (!await (0, fs_stat_1.fsStatExists)(dirOrFile, options)) {
            return false;
        }
    }
    return (0, fs_extra_1.remove)(dirOrFile);
}
/**
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing.
 */
function fsRemoveSync(dirOrFile, options) {
    if (options) {
        if (!(0, fs_stat_1.fsStatExistsSync)(dirOrFile, options)) {
            return false;
        }
    }
    return (0, fs_extra_1.removeSync)(dirOrFile);
}
function fsRemoveFile(dirOrFile) {
    return fsRemove(dirOrFile, {
        onlyFiles: true,
    });
}
function fsRemoveFileSync(dirOrFile) {
    return fsRemoveSync(dirOrFile, {
        onlyFiles: true,
    });
}
function fsRemoveDirectories(dirOrFile) {
    return fsRemove(dirOrFile, {
        onlyDirectories: true,
    });
}
function fsRemoveDirectoriesSync(dirOrFile) {
    return fsRemoveSync(dirOrFile, {
        onlyDirectories: true,
    });
}
exports.default = fsRemove;
//# sourceMappingURL=index.js.map