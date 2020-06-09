"use strict";
/**
 * Created by user on 2020/6/9.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._this_origin = void 0;
const type_1 = require("./type");
const core_1 = __importStar(require("../core"));
const path_1 = __importDefault(require("path"));
function _this_origin(who) {
    if (who[type_1.ORIGIN_KEY]) {
        // @ts-ignore
        return who[type_1.ORIGIN_KEY];
    }
    else if (who === core_1.default) {
        // @ts-ignore
        return path_1.default;
    }
    else if (who === core_1.win32) {
        // @ts-ignore
        return path_1.default.win32;
    }
    else if (who === core_1.posix) {
        // @ts-ignore
        return path_1.default.posix;
    }
    throw new TypeError(`this not PathWrap`);
}
exports._this_origin = _this_origin;
//# sourceMappingURL=core.js.map