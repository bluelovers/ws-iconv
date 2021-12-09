"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsHardlinkSync = exports.fsHardlink = exports.fsSymlinkSync = exports.fsSymlink = exports._handleOverwrite = void 0;
const fs_extra_1 = require("fs-extra");
const fs_stat_1 = require("fs-stat");
const path_is_same_1 = require("path-is-same");
function _handleOverwrite(src, dest, options, async) {
    var _a;
    const opts = {
        followSymlinks: true,
        throwIfNoEntry: false,
    };
    if (async) {
        return Promise.resolve()
            .then(async () => {
            var _a;
            if (!(options === null || options === void 0 ? void 0 : options.overwrite)) {
                return null;
            }
            else if ((0, path_is_same_1.fsSameRealpath)(src, dest)) {
                return false;
            }
            let s1 = await (0, fs_stat_1.fsStat)(src, opts);
            let s2 = (_a = await (0, fs_stat_1.fsStat)(dest, opts)) !== null && _a !== void 0 ? _a : await (0, fs_stat_1.fsStat)(dest, {
                ...opts,
                followSymlinks: false,
            });
            if (s1 && s2 && !(0, fs_stat_1.isSameStat)(s1, s2)) {
                await (0, fs_extra_1.unlink)(dest);
                return true;
            }
            return false;
        });
    }
    else {
        if (!(options === null || options === void 0 ? void 0 : options.overwrite)) {
            return null;
        }
        else if ((0, path_is_same_1.fsSameRealpath)(src, dest)) {
            return false;
        }
        let s1 = (0, fs_stat_1.fsStatSync)(src, opts);
        let s2 = (_a = (0, fs_stat_1.fsStatSync)(dest, opts)) !== null && _a !== void 0 ? _a : (0, fs_stat_1.fsStatSync)(dest, {
            ...opts,
            followSymlinks: false,
        });
        if (s1 && s2 && !(0, fs_stat_1.isSameStat)(s1, s2)) {
            (0, fs_extra_1.unlinkSync)(dest);
            return true;
        }
        return false;
    }
}
exports._handleOverwrite = _handleOverwrite;
async function fsSymlink(src, dest, options) {
    await _handleOverwrite(src, dest, options, true);
    return (0, fs_extra_1.ensureSymlink)(src, dest, options === null || options === void 0 ? void 0 : options.type);
}
exports.fsSymlink = fsSymlink;
function fsSymlinkSync(src, dest, options) {
    _handleOverwrite(src, dest, options, false);
    return (0, fs_extra_1.ensureSymlinkSync)(src, dest, options === null || options === void 0 ? void 0 : options.type);
}
exports.fsSymlinkSync = fsSymlinkSync;
async function fsHardlink(src, dest, options) {
    await _handleOverwrite(src, dest, options, true);
    return (0, fs_extra_1.ensureLink)(src, dest);
}
exports.fsHardlink = fsHardlink;
function fsHardlinkSync(src, dest, options) {
    return (0, fs_extra_1.ensureLinkSync)(src, dest);
}
exports.fsHardlinkSync = fsHardlinkSync;
exports.default = fsSymlinkSync;
//# sourceMappingURL=index.js.map