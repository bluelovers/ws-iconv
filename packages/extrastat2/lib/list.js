"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const mime_1 = require("./mime");
const path_1 = tslib_1.__importStar(require("path"));
function list(resolvedpath) {
    return new Promise((resolve, reject) => {
        (0, fs_1.readdir)(resolvedpath, {
            withFileTypes: true,
        }, (err, dirents) => {
            if (err)
                return reject(err);
            resolve(dirents.map(dirent => Object.assign(dirent, {
                pathname: path_1.default.resolve(resolvedpath, dirent.name),
                mimetype: (0, mime_1._mimetype)((0, path_1.parse)(dirent.name), dirent),
            })));
        });
    });
}
exports.list = list;
//# sourceMappingURL=list.js.map