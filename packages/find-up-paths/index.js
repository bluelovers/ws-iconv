"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUpPathsAsync = exports.findUpPaths = void 0;
const path_parents_1 = require("path-parents");
const fs_stat_1 = require("fs-stat");
function _checkStringArray(pattern) {
    pattern.forEach(name => {
        if (typeof name !== 'string' || !(name === null || name === void 0 ? void 0 : name.length)) {
            throw new TypeError(`'${name}' should be non-empty string`);
        }
    });
}
function findUpPaths(pattern, opts) {
    const runtime = (0, path_parents_1.handleOptions)(opts);
    const { onlyDirectories, onlyFiles, } = runtime.opts;
    pattern = [pattern].flat();
    _checkStringArray(pattern);
    for (const dir of (0, path_parents_1.pathParentsGenerator)(runtime.cwd, runtime.opts)) {
        let stat;
        let result;
        const name = pattern
            .find(name => {
            result = runtime.path.resolve(dir, name);
            stat = (0, fs_stat_1.fsStatSync)(result, {
                followSymlinks: true,
                throwIfNoEntry: false,
            });
            if (!stat || onlyDirectories && !stat.isDirectory() || onlyFiles && !stat.isFile()) {
                return false;
            }
            return true;
        });
        if (name === null || name === void 0 ? void 0 : name.length) {
            return {
                stat,
                result,
            };
        }
    }
}
exports.findUpPaths = findUpPaths;
async function findUpPathsAsync(pattern, opts) {
    const runtime = (0, path_parents_1.handleOptions)(opts);
    const { onlyDirectories, onlyFiles, } = runtime.opts;
    pattern = [pattern].flat();
    _checkStringArray(pattern);
    for (const dir of (0, path_parents_1.pathParentsGenerator)(runtime.cwd, runtime.opts)) {
        let stat;
        let result;
        for (const name of pattern) {
            result = runtime.path.resolve(dir, name);
            stat = await (0, fs_stat_1.fsStat)(result, {
                followSymlinks: true,
                throwIfNoEntry: false,
            });
            if (!stat || onlyDirectories && !stat.isDirectory() || onlyFiles && !stat.isFile()) {
                continue;
            }
            if (name.length) {
                return {
                    stat,
                    result,
                };
            }
        }
    }
}
exports.findUpPathsAsync = findUpPathsAsync;
exports.default = findUpPaths;
//# sourceMappingURL=index.js.map