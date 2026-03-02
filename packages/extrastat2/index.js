"use strict";
/**
 * extrastat2 - 擴展檔案狀態資訊
 * Extended file status information
 *
 * 解析 fs.Stat 物件，提供 MIME 類型、擁有者名稱、群組名稱和可讀權限等額外資訊
 * Resolves fs.Stat to mimetype, ownername, groupname, and human-readable permissions
 *
 * @module extrastat2
 * @author Colten Jackson
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.statExtra = void 0;
const tslib_1 = require("tslib");
const lib_1 = require("./lib");
Object.defineProperty(exports, "statExtra", { enumerable: true, get: function () { return lib_1.statExtra; } });
/**
 * 重新導出類型定義
 * Re-export type definitions
 */
tslib_1.__exportStar(require("./lib/types"), exports);
/**
 * 預設導出 - statExtra 函數
 * Default export - statExtra function
 */
exports.default = lib_1.statExtra;
//# sourceMappingURL=index.js.map