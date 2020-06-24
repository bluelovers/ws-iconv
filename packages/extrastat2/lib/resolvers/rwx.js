"use strict";
/**
 * Created by user on 2020/6/25.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rwx = void 0;
const stat_mode_1 = __importDefault(require("stat-mode"));
function rwx(parsedPath, stat) {
    stat.rwx = stat_mode_1.default(stat.mode);
    return stat;
}
exports.rwx = rwx;
exports.default = rwx;
//# sourceMappingURL=rwx.js.map