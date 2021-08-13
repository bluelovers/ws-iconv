"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winHardlinkListSync = exports.winHardlinkList = exports._handleOutput = void 0;
const cross_spawn_extra_1 = require("cross-spawn-extra");
const crlf_normalize_1 = require("crlf-normalize");
/**
 * @internal
 */
function _handleOutput(stdout) {
    return (0, crlf_normalize_1.crlf)(stdout.toString()).split('\n').filter(Boolean);
}
exports._handleOutput = _handleOutput;
function winHardlinkList(file, options) {
    var _a;
    return (0, cross_spawn_extra_1.async)('fsutil', [
        'hardlink',
        'list',
        file,
    ], {
        cwd: (_a = options === null || options === void 0 ? void 0 : options.cwd) !== null && _a !== void 0 ? _a : process.cwd(),
    })
        .then(cp => _handleOutput(cp.stdout));
}
exports.winHardlinkList = winHardlinkList;
function winHardlinkListSync(file, options) {
    var _a;
    let cp = (0, cross_spawn_extra_1.sync)('fsutil', [
        'hardlink',
        'list',
        file,
    ], {
        cwd: (_a = options === null || options === void 0 ? void 0 : options.cwd) !== null && _a !== void 0 ? _a : process.cwd(),
    });
    return _handleOutput(cp.stdout);
}
exports.winHardlinkListSync = winHardlinkListSync;
exports.default = winHardlinkList;
//# sourceMappingURL=index.js.map