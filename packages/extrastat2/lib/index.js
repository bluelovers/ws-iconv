"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statExtra = void 0;
const fs_extra_1 = require("fs-extra");
const options_1 = require("./options");
const path_1 = require("path");
function statExtra(pathname, options) {
    const resolvedpath = path_1.resolve(pathname);
    const parsedPath = path_1.parse(resolvedpath);
    return fs_extra_1.stat(resolvedpath)
        .then(statData => {
        return Promise
            .all(options_1.getOptionResolvers(options).map(fn => fn(parsedPath, statData)))
            .then(r => statData);
    });
}
exports.statExtra = statExtra;
exports.default = statExtra;
//# sourceMappingURL=index.js.map