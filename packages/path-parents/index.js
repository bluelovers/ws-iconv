"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathSplit = exports.pathSplitGenerator = exports.pathParents = exports.pathParentsGenerator = exports.pathParentsCore = exports.handleOptions = void 0;
const tslib_1 = require("tslib");
const core_1 = tslib_1.__importDefault(require("upath2/core"));
const path_1 = tslib_1.__importDefault(require("path"));
const path_is_same_1 = tslib_1.__importDefault(require("path-is-same"));
function handleOptions(cwd, opts) {
    if (typeof opts === 'undefined') {
        if (typeof cwd !== 'string') {
            ([opts, cwd] = [cwd, opts]);
        }
    }
    cwd = cwd !== null && cwd !== void 0 ? cwd : process.cwd();
    opts = opts !== null && opts !== void 0 ? opts : {};
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
    return {
        // @ts-ignore
        cwd,
        opts,
        path,
    };
}
exports.handleOptions = handleOptions;
function pathParentsCore(cwd, runtime) {
    let path = runtime.path.dirname(cwd);
    if (!(0, path_is_same_1.default)(cwd, path)) {
        return path;
    }
}
exports.pathParentsCore = pathParentsCore;
function* pathParentsGenerator(cwd, opts) {
    let runtime = handleOptions(cwd, opts);
    let _do = true;
    let current = runtime.cwd;
    let last;
    do {
        last = current;
        current = pathParentsCore(current, runtime);
        if (typeof current === 'undefined') {
            _do = false;
            break;
        }
        yield current;
    } while (_do);
}
exports.pathParentsGenerator = pathParentsGenerator;
function pathParents(cwd, opts) {
    return [...pathParentsGenerator(cwd, opts)];
}
exports.pathParents = pathParents;
function* pathSplitGenerator(cwd, opts) {
    const runtime = handleOptions(cwd, opts);
    for (const p of pathParentsGenerator(cwd, runtime.opts)) {
        let r = runtime.path.basename(p);
        if (!(r === null || r === void 0 ? void 0 : r.length)) {
            r = p;
        }
        yield r;
    }
}
exports.pathSplitGenerator = pathSplitGenerator;
function pathSplit(cwd, opts) {
    return [...pathSplitGenerator(cwd, opts)];
}
exports.pathSplit = pathSplit;
exports.default = pathParents;
//# sourceMappingURL=index.js.map