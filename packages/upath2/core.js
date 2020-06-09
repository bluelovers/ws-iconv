"use strict";
/**
 * Created by user on 2017/12/9/009.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._this_origin = exports.fn = exports.upath = exports.win32 = exports.posix = exports.PathWrap = void 0;
const path_1 = __importDefault(require("path"));
const type_1 = require("./lib/type");
const util_1 = require("./lib/util");
class PathWrap {
    constructor(path, id) {
        this.sep = '/';
        let _static = util_1.getStatic(this);
        //this._origin = path;
        this[type_1.ORIGIN_KEY] = path;
        this.name = id;
        delete this[id];
        this[id] = this;
        //Object.defineProperty(this, '_origin', { enumerable: false, });
        Object.defineProperty(this, type_1.ORIGIN_KEY, { enumerable: false });
        // @ts-ignore
        this.fn = Object.assign(this.__proto__, path, _static.fn);
        [
            'join',
            'normalize',
            'relative',
            'resolve',
            'parse',
            'format',
            'basename',
            'dirname',
            'extname',
            'isAbsolute',
        ]
            .forEach(prop => {
            this.fn[prop] = this.fn[prop].bind(this);
        });
    }
    join(path, ...paths) {
        //console.log(this.name, this.sep);
        return _this_origin(this).join(path, ...paths).replace(/\\/g, this.sep);
    }
    normalize(path) {
        return _this_origin(this).normalize(path).replace(/\\/g, this.sep);
    }
    relative(from, to) {
        return _this_origin(this).relative(from.toString(), to.toString()).replace(/\\/g, this.sep);
    }
    resolve(path, ...paths) {
        return _this_origin(this).resolve(path, ...paths).replace(/\\/g, this.sep);
    }
    parse(path) {
        let ret = _this_origin(this).parse(path);
        ret.root = ret.root.replace(/\\/g, this.sep);
        ret.dir = ret.dir.replace(/\\/g, this.sep);
        return ret;
    }
    format(pathObject) {
        return util_1._replace_sep(this, _this_origin(this).format(pathObject));
    }
    // ---------
    basename(path, ext) {
        return _this_origin(this).basename(path, ext);
    }
    dirname(path) {
        return _this_origin(this).dirname(path);
    }
    extname(path) {
        return _this_origin(this).extname(path);
    }
    isAbsolute(path) {
        return _this_origin(this).isAbsolute(path);
    }
}
exports.PathWrap = PathWrap;
(function (PathWrap) {
    let __proto__ = {};
    // get prototype from class
    for (let i in Object.getOwnPropertyDescriptors(PathWrap.prototype)) {
        __proto__[i] = PathWrap.prototype[i];
    }
    PathWrap.fn = __proto__;
    PathWrap.fn['fn'] = PathWrap.fn;
    PathWrap.fn.sep = '/';
    PathWrap.prototype.fn = PathWrap.fn;
})(PathWrap = exports.PathWrap || (exports.PathWrap = {}));
exports.posix = new PathWrap(path_1.default.posix, 'posix');
exports.win32 = new PathWrap(path_1.default.win32, 'win32');
const _upath = new PathWrap(path_1.default, 'upath');
exports.upath = _upath;
exports.upath.PathWrap = PathWrap;
exports.fn = PathWrap.fn = exports.upath.fn;
// @ts-ignore
path_1.default.upath = exports.upath;
for (const [key, lib] of [
    ['win32', exports.win32],
    ['posix', exports.posix],
    ['upath', exports.upath],
    ['default', exports.upath],
]) {
    delete exports.win32.fn[key];
    delete exports.posix.fn[key];
    delete exports.upath.fn[key];
    delete exports.win32[key];
    delete exports.posix[key];
    delete exports.upath[key];
    // @ts-ignore
    exports.win32[key] = exports.posix[key] = exports.upath[key] = lib;
    //win32.__proto__[key] = posix.__proto__[key] = lib;
}
Object.defineProperty(exports.upath, "__esModule", { value: true });
// @ts-ignore
//export default upath as PathWrap & IPath & IPathNode;
exports.default = exports.upath;
function _this_origin(who) {
    if (who[type_1.ORIGIN_KEY]) {
        // @ts-ignore
        return who[type_1.ORIGIN_KEY];
    }
    else if (who === exports.upath) {
        // @ts-ignore
        return path_1.default;
    }
    else if (who === exports.win32) {
        // @ts-ignore
        return path_1.default.win32;
    }
    else if (who === exports.posix) {
        // @ts-ignore
        return path_1.default.posix;
    }
    throw new TypeError(`this not PathWrap`);
}
exports._this_origin = _this_origin;
//# sourceMappingURL=core.js.map