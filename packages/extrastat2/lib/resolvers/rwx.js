"use strict";
/**
 * Created by user on 2020/6/25.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rwx = void 0;
const tslib_1 = require("tslib");
const stat_mode_1 = tslib_1.__importDefault(require("stat-mode"));
function rwx(parsedPath, stat) {
    stat.rwx = (0, stat_mode_1.default)(stat.mode);
    return stat;
}
exports.rwx = rwx;
exports.default = rwx;
//# sourceMappingURL=rwx.js.map