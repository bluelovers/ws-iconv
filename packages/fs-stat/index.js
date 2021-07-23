"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSymbolicLinkSync = exports.fsStatSync = exports.fsStat = exports.IStats = void 0;
/**
 * Created by user on 2020/6/22.
 */
const fs_extra_1 = require("fs-extra");
Object.defineProperty(exports, "IStats", { enumerable: true, get: function () { return fs_extra_1.Stats; } });
function fsStat(path, options) {
    return ((options === null || options === void 0 ? void 0 : options.allowSymlinks) ? fs_extra_1.stat : fs_extra_1.lstat)(path);
}
exports.fsStat = fsStat;
function fsStatSync(path, options) {
    return ((options === null || options === void 0 ? void 0 : options.allowSymlinks) ? fs_extra_1.statSync : fs_extra_1.lstatSync)(path);
}
exports.fsStatSync = fsStatSync;
function isSymbolicLinkSync(dir0, options) {
    const stats = fsStatSync(dir0, {
        throwIfNoEntry: false,
        ...options,
    });
    return stats.isSymbolicLink();
}
exports.isSymbolicLinkSync = isSymbolicLinkSync;
exports.default = fsStat;
//# sourceMappingURL=index.js.map