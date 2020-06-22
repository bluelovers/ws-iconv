"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const fs_1 = require("fs");
const mime_1 = require("./mime");
const path_1 = __importStar(require("path"));
function list(resolvedpath) {
    return new Promise((resolve, reject) => {
        fs_1.readdir(resolvedpath, {
            withFileTypes: true,
        }, (err, dirents) => {
            if (err)
                return reject(err);
            resolve(dirents.map(dirent => ({
                name: dirent.name,
                pathname: path_1.default.resolve(resolvedpath, dirent.name),
                mimetype: mime_1._mimetype(path_1.parse(dirent.name), dirent),
            })));
        });
    });
}
exports.list = list;
//# sourceMappingURL=list.js.map