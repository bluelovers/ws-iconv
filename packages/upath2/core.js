"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _path = require("path");
const type_1 = require("./lib/type");
exports.types = type_1.default;
class PathWrap {
    constructor(path, id) {
        this.sep = '/';
        let _static = getStatic(this);
        this[type_1.ORIGIN_KEY] = path;
        this.name = id;
        delete this[id];
        this[id] = this;
        Object.defineProperty(this, type_1.ORIGIN_KEY, { enumerable: false, });
        this.fn = Object.assign(this.__proto__, path, _static.fn);
    }
    join(path, ...paths) {
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
        return _replace_sep(this, _this_origin(this).format(pathObject));
    }
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
    for (let i in Object.getOwnPropertyDescriptors(PathWrap.prototype)) {
        __proto__[i] = PathWrap.prototype[i];
    }
    PathWrap.fn = __proto__;
    PathWrap.fn['fn'] = PathWrap.fn;
    PathWrap.fn.sep = '/';
    PathWrap.prototype.fn = PathWrap.fn;
})(PathWrap = exports.PathWrap || (exports.PathWrap = {}));
function getStatic(who) {
    return who.__proto__.constructor;
}
exports.posix = new PathWrap(_path.posix, 'posix');
exports.win32 = new PathWrap(_path.win32, 'win32');
const _upath = new PathWrap(_path, 'upath');
exports.upath = _upath;
exports.upath.PathWrap = PathWrap;
exports.upath.fn.win32 = exports.win32;
exports.upath.fn.posix = exports.posix;
exports.upath.fn.upath = exports.upath;
exports.upath.fn.default = exports.upath;
exports.fn = PathWrap.fn = exports.upath.fn;
_path.upath = exports.upath;
for (let key of [
    'win32',
    'posix',
    'upath',
]) {
    exports.win32.fn[key] = exports.posix.fn[key] = exports.upath.fn[key] = exports.upath[key];
}
exports.win32.default = exports.posix.default = exports.upath.default = exports.upath;
exports.default = exports.upath;
function _this_origin(who) {
    if (who[type_1.ORIGIN_KEY]) {
        return who[type_1.ORIGIN_KEY];
    }
    else if (who === exports.upath) {
        return _path;
    }
    else if (who === exports.win32) {
        return _path.win32;
    }
    else if (who === exports.posix) {
        return _path.posix;
    }
    throw new TypeError(`this not PathWrap`);
}
function _replace_sep(who, input) {
    return input.replace(/\\/g, who.sep);
}
Object.freeze(exports);
