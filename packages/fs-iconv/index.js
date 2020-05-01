"use strict";
/**
 * Created by user on 2018/1/27/027.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimFilename = void 0;
__exportStar(require("./fs"), exports);
const fs = require("./fs");
const util_1 = require("./util");
Object.defineProperty(exports, "trimFilename", { enumerable: true, get: function () { return util_1.trimFilename; } });
exports.default = fs;
//# sourceMappingURL=index.js.map