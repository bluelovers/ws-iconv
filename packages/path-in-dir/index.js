"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathInsideDirectory = void 0;
const path_dir_normalize_1 = require("path-dir-normalize");
const upath2_1 = require("upath2");
function pathInsideDirectory(input, dir) {
    dir = (0, path_dir_normalize_1.pathDirNormalize)(dir);
    input = (0, upath2_1.normalize)(input);
    return input.startsWith(dir);
}
exports.pathInsideDirectory = pathInsideDirectory;
exports.default = pathInsideDirectory;
//# sourceMappingURL=index.js.map