"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathParents = exports.pathParentsGenerator = exports.pathParentsCore = exports.handleOptions = void 0;
const core_1 = __importDefault(require("upath2/core"));
const path_1 = __importDefault(require("path"));
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
    if (path !== cwd) {
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
exports.default = pathParents;
//# sourceMappingURL=index.js.map