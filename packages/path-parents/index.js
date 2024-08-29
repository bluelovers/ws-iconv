"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = handleOptions;
exports.pathParentsCore = pathParentsCore;
exports._checkRuntimeLimit = _checkRuntimeLimit;
exports.pathParentsGenerator = pathParentsGenerator;
exports.pathParentsGeneratorRuntime = pathParentsGeneratorRuntime;
exports.pathParents = pathParents;
exports.pathSplitGenerator = pathSplitGenerator;
exports.pathSplit = pathSplit;
const tslib_1 = require("tslib");
const core_1 = tslib_1.__importDefault(require("upath2/core"));
const path_1 = tslib_1.__importDefault(require("path"));
const path_is_same_1 = require("path-is-same");
function handleOptions(cwd, opts) {
    var _a, _b;
    if (typeof opts === 'undefined') {
        if (typeof cwd !== 'string') {
            // @ts-ignore
            ([opts, cwd] = [cwd, opts]);
        }
    }
    // @ts-ignore
    opts = opts !== null && opts !== void 0 ? opts : {};
    cwd = (_a = cwd !== null && cwd !== void 0 ? cwd : opts.cwd) !== null && _a !== void 0 ? _a : process.cwd();
    opts = {
        ...opts,
    };
    let path = core_1.default;
    if (typeof opts.platform === 'string') {
        switch (opts.platform) {
            case 'win32':
            case 'posix':
                path = core_1.default[opts.platform];
                break;
            case 'upath':
                path = core_1.default;
                break;
            case 'node':
                path = path_1.default;
                break;
            default:
                path = core_1.default;
        }
    }
    cwd = path.normalize(cwd);
    const stopPath = [(_b = opts.stopPath) !== null && _b !== void 0 ? _b : []]
        .flat()
        .map(p => path.normalize(p));
    const limit = opts.limit > 0 ? opts.limit : Infinity;
    opts.cwd = cwd;
    opts.stopPath = stopPath;
    opts.limit = limit;
    return {
        cwd,
        opts,
        path,
        stopPath,
        limit,
    };
}
function pathParentsCore(cwd, runtime) {
    let path = runtime.path.dirname(cwd);
    if (!(0, path_is_same_1.pathIsSame)(cwd, path)) {
        return path;
    }
}
/**
 * if return true, then stop
 */
function _checkRuntimeLimit(current, runtime) {
    return --runtime.limit <= 0 || runtime.stopPath.includes(current);
}
function* pathParentsGenerator(cwd, opts) {
    const runtime = handleOptions(cwd, opts);
    yield* pathParentsGeneratorRuntime(runtime);
}
function* pathParentsGeneratorRuntime(runtime) {
    let _do = true;
    let current = runtime.cwd;
    let last;
    if (runtime.opts.includeCurrentDirectory) {
        yield current;
        if (_checkRuntimeLimit(current, runtime)) {
            return;
        }
    }
    do {
        last = current;
        current = pathParentsCore(current, runtime);
        if (typeof current === 'undefined') {
            _do = false;
            break;
        }
        yield current;
        if (_checkRuntimeLimit(current, runtime)) {
            break;
        }
    } while (_do);
}
function pathParents(cwd, opts) {
    return [...pathParentsGenerator(cwd, opts)];
}
function* pathSplitGenerator(cwd, opts) {
    const runtime = handleOptions(cwd, opts);
    for (const p of pathParentsGeneratorRuntime(runtime)) {
        let r = runtime.path.basename(p);
        if (!(r === null || r === void 0 ? void 0 : r.length)) {
            r = p;
        }
        yield r;
    }
}
function pathSplit(cwd, opts) {
    return [...pathSplitGenerator(cwd, opts)];
}
exports.default = pathParents;
//# sourceMappingURL=index.js.map