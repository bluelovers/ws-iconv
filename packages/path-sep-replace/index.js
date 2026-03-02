"use strict";
/**
 * path-sep-replace - 路徑分隔符替換工具
 *
 * 這個模組提供了路徑分隔符的替換功能，可以將路徑中的正斜線和反斜線替換為指定的分隔符。
 *
 * @module path-sep-replace
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacePathSep = replacePathSep;
const path_is_network_drive_1 = require("path-is-network-drive");
const types_path_1 = require("@lazy-node/types-path");
/**
 * 替換路徑分隔符
 *
 * 這個函數會將路徑中的正斜線和反斜線替換為指定的分隔符，並處理網路磁碟機路徑的特殊情況。
 */
function replacePathSep(input, who = {}) {
    var _a;
    // 獲取分隔符
    let sep = (_a = who.sep) !== null && _a !== void 0 ? _a : "/" /* EnumPathSep.posix */;
    // 處理網路磁碟機路徑的特殊情況
    if (who.name !== "posix" /* EnumPathPlatformOrigin.posix */ && (0, path_is_network_drive_1.pathIsNetworkDrive)(input)) {
        // 網路磁碟機路徑使用反斜線
        sep = "\\" /* EnumPathSep.win32 */;
        // 處理網路磁碟機路徑格式
        input = sep + sep + input
            .slice(2);
    }
    // 替換所有正斜線和反斜線為指定的分隔符
    input = input
        .replace(types_path_1.rePathSepSlashAll, sep);
    return input;
}
exports.default = replacePathSep;
//# sourceMappingURL=index.js.map