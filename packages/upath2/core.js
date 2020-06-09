"use strict";
/**
 * Created by user on 2017/12/9/009.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", { value: true });
exports._this_origin = exports.fn = exports.upath = exports.win32 = exports.posix = exports.PathWrap = void 0;
const path_1 = __importDefault(require("path"));
const type_1 = require("./lib/type");
const util_1 = require("./lib/util");
const lodash_decorators_1 = require("lodash-decorators");
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
__decorate([
    lodash_decorators_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof T !== "undefined" && T) === "function" ? _a : Object, typeof (_b = typeof U !== "undefined" && U) === "function" ? _b : Object]),
    __metadata("design:returntype", String)
], PathWrap.prototype, "join", null);
__decorate([
    lodash_decorators_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof T !== "undefined" && T) === "function" ? _c : Object]),
    __metadata("design:returntype", String)
], PathWrap.prototype, "normalize", null);
__decorate([
    lodash_decorators_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof T !== "undefined" && T) === "function" ? _d : Object, typeof (_e = typeof U !== "undefined" && U) === "function" ? _e : Object]),
    __metadata("design:returntype", String)
], PathWrap.prototype, "relative", null);
__decorate([
    lodash_decorators_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof T !== "undefined" && T) === "function" ? _f : Object, typeof (_g = typeof U !== "undefined" && U) === "function" ? _g : Object]),
    __metadata("design:returntype", String)
], PathWrap.prototype, "resolve", null);
__decorate([
    lodash_decorators_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof T !== "undefined" && T) === "function" ? _h : Object]),
    __metadata("design:returntype", Object)
], PathWrap.prototype, "parse", null);
__decorate([
    lodash_decorators_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof T !== "undefined" && T) === "function" ? _j : Object]),
    __metadata("design:returntype", String)
], PathWrap.prototype, "format", null);
__decorate([
    lodash_decorators_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof T !== "undefined" && T) === "function" ? _k : Object, typeof (_l = typeof U !== "undefined" && U) === "function" ? _l : Object]),
    __metadata("design:returntype", String)
], PathWrap.prototype, "basename", null);
__decorate([
    lodash_decorators_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof T !== "undefined" && T) === "function" ? _m : Object]),
    __metadata("design:returntype", String)
], PathWrap.prototype, "dirname", null);
__decorate([
    lodash_decorators_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof T !== "undefined" && T) === "function" ? _o : Object]),
    __metadata("design:returntype", String)
], PathWrap.prototype, "extname", null);
__decorate([
    lodash_decorators_1.bind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof T !== "undefined" && T) === "function" ? _p : Object]),
    __metadata("design:returntype", Boolean)
], PathWrap.prototype, "isAbsolute", null);
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
//upath.win32 = win32;
//upath.posix = posix;
//upath.upath = upath;
//PathWrap.fn = upath.fn;
exports.upath.fn.win32 = exports.win32;
exports.upath.fn.posix = exports.posix;
exports.upath.fn.upath = exports.upath;
// @ts-ignore
exports.upath.fn.default = exports.upath;
exports.fn = PathWrap.fn = exports.upath.fn;
// @ts-ignore
path_1.default.upath = exports.upath;
for (const key of [
    'win32',
    'posix',
    'upath',
]) {
    exports.win32.fn[key] = exports.posix.fn[key] = exports.upath.fn[key] = exports.upath[key];
}
exports.win32.default = exports.posix.default = exports.upath.default = exports.upath;
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