"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUpPathsRuntimeAsync = exports.findUpPathsAsync = exports.findUpPathsRuntime = exports.findUpPaths = exports._throwIfNoEntry = exports._handlePattern = exports.handleOptions = void 0;
const path_parents_1 = require("path-parents");
const fs_stat_1 = require("fs-stat");
function handleOptions(cwd, opts) {
    var _a;
    var _b;
    const runtime = (0, path_parents_1.handleOptions)(cwd, opts);
    (_a = (_b = runtime.opts).includeCurrentDirectory) !== null && _a !== void 0 ? _a : (_b.includeCurrentDirectory = true);
    return runtime;
}
exports.handleOptions = handleOptions;
function _checkStringArray(pattern) {
    pattern.forEach(name => {
        if (typeof name !== 'string' || !(name === null || name === void 0 ? void 0 : name.length)) {
            throw new TypeError(`'${name}' should be non-empty string`);
        }
        else if (name === '.' || name === '..' || name === '/' || name === '\\' || name === '../' || name === '..\\') {
            throw new TypeError(`'${name}' is invalid pattern`);
        }
    });
}
function _handlePattern(pattern) {
    pattern = [pattern].flat();
    _checkStringArray(pattern);
    return pattern;
}
exports._handlePattern = _handlePattern;
function _throwIfNoEntry(runtime) {
    if (runtime.opts.throwIfNoEntry) {
        throw new RangeError(`can't found any entries of given patterns`);
    }
}
exports._throwIfNoEntry = _throwIfNoEntry;
function findUpPaths(pattern, opts) {
    const runtime = handleOptions(opts);
    return findUpPathsRuntime(pattern, runtime);
}
exports.findUpPaths = findUpPaths;
function findUpPathsRuntime(pattern, runtime) {
    const { onlyDirectories, onlyFiles, } = runtime.opts;
    pattern = _handlePattern(pattern);
    const _opts = {
        onlyDirectories,
        onlyFiles,
    };
    for (const dir of (0, path_parents_1.pathParentsGeneratorRuntime)(runtime)) {
        let stat;
        let result;
        const name = pattern
            .find(name => {
            result = runtime.path.resolve(dir, name);
            stat = (0, fs_stat_1.fsStatSync)(result, {
                followSymlinks: true,
                throwIfNoEntry: false,
            });
            return (0, fs_stat_1.isDirectoryOrFileStat)(stat, _opts);
        });
        if (name === null || name === void 0 ? void 0 : name.length) {
            return {
                stat,
                result,
            };
        }
    }
    _throwIfNoEntry(runtime);
}
exports.findUpPathsRuntime = findUpPathsRuntime;
async function findUpPathsAsync(pattern, opts) {
    const runtime = handleOptions(opts);
    return findUpPathsRuntimeAsync(pattern, runtime);
}
exports.findUpPathsAsync = findUpPathsAsync;
async function findUpPathsRuntimeAsync(pattern, runtime) {
    const { onlyDirectories, onlyFiles, } = runtime.opts;
    pattern = _handlePattern(pattern);
    const _opts = {
        onlyDirectories,
        onlyFiles,
    };
    for (const dir of (0, path_parents_1.pathParentsGeneratorRuntime)(runtime)) {
        let stat;
        let result;
        for (const name of pattern) {
            result = runtime.path.resolve(dir, name);
            stat = await (0, fs_stat_1.fsStat)(result, {
                followSymlinks: true,
                throwIfNoEntry: false,
            });
            if ((0, fs_stat_1.isDirectoryOrFileStat)(stat, _opts)) {
                return {
                    stat,
                    result,
                };
            }
        }
    }
    _throwIfNoEntry(runtime);
}
exports.findUpPathsRuntimeAsync = findUpPathsRuntimeAsync;
exports.default = findUpPaths;
//# sourceMappingURL=index.js.map