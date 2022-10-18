"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryFsRealpathNativeAsync = exports.tryFsRealpathNativeSync = exports.fsRealpathNativeAsync = exports.fsRealpathNativeSync = void 0;
const fs_1 = require("fs");
exports.fsRealpathNativeSync = fs_1.realpathSync.native;
async function fsRealpathNativeAsync(path, options) {
    return (0, exports.fsRealpathNativeSync)(path, options);
}
exports.fsRealpathNativeAsync = fsRealpathNativeAsync;
function tryFsRealpathNativeSync(path, options) {
    try {
        path = fs_1.realpathSync.native(path, options);
    }
    catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
    return path;
}
exports.tryFsRealpathNativeSync = tryFsRealpathNativeSync;
async function tryFsRealpathNativeAsync(path, options) {
    return tryFsRealpathNativeSync(path, options);
}
exports.tryFsRealpathNativeAsync = tryFsRealpathNativeAsync;
exports.default = tryFsRealpathNativeSync;
//# sourceMappingURL=index.js.map