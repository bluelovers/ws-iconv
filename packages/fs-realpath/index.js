"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsRealpathNativeSync = void 0;
exports.fsRealpathNativeAsync = fsRealpathNativeAsync;
exports.tryFsRealpathNativeSync = tryFsRealpathNativeSync;
exports.tryFsRealpathNativeAsync = tryFsRealpathNativeAsync;
const fs_1 = require("fs");
exports.fsRealpathNativeSync = fs_1.realpathSync.native;
async function fsRealpathNativeAsync(path, options) {
    return (0, exports.fsRealpathNativeSync)(path, options);
}
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
async function tryFsRealpathNativeAsync(path, options) {
    return tryFsRealpathNativeSync(path, options);
}
exports.default = tryFsRealpathNativeSync;
//# sourceMappingURL=index.js.map