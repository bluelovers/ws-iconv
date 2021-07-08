"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statExtra = void 0;
const promises_1 = require("fs/promises");
const options_1 = require("./options");
const path_1 = require("path");
function statExtra(pathname, options) {
    const resolvedpath = (0, path_1.resolve)(pathname);
    const parsedPath = (0, path_1.parse)(resolvedpath);
    return (0, promises_1.stat)(resolvedpath)
        // @ts-ignore
        .then((statData) => {
        statData.parsed = parsedPath;
        return Promise
            .all((0, options_1.getOptionResolvers)(options).map(fn => fn(parsedPath, statData)))
            .then(() => {
            return statData;
        });
    });
}
exports.statExtra = statExtra;
exports.default = statExtra;
//# sourceMappingURL=index.js.map