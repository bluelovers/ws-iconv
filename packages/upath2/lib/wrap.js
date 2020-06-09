"use strict";
/**
 * Created by user on 2020/6/9.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathWrap = void 0;
const type_1 = require("./type");
const util_1 = require("./util");
const core_1 = require("./core");
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
    }
    join(path, ...paths) {
        //console.log(this.name, this.sep);
        return core_1._this_origin(this).join(path, ...paths).replace(/\\/g, this.sep);
    }
    normalize(path) {
        return core_1._this_origin(this).normalize(path).replace(/\\/g, this.sep);
    }
    relative(from, to) {
        return core_1._this_origin(this).relative(from.toString(), to.toString()).replace(/\\/g, this.sep);
    }
    resolve(path, ...paths) {
        return core_1._this_origin(this).resolve(path, ...paths).replace(/\\/g, this.sep);
    }
    parse(path) {
        let ret = core_1._this_origin(this).parse(path);
        ret.root = ret.root.replace(/\\/g, this.sep);
        ret.dir = ret.dir.replace(/\\/g, this.sep);
        return ret;
    }
    format(pathObject) {
        return util_1._replace_sep(this, core_1._this_origin(this).format(pathObject));
    }
    // ---------
    basename(path, ext) {
        return core_1._this_origin(this).basename(path, ext);
    }
    dirname(path) {
        return core_1._this_origin(this).dirname(path);
    }
    extname(path) {
        return core_1._this_origin(this).extname(path);
    }
    isAbsolute(path) {
        return core_1._this_origin(this).isAbsolute(path);
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
exports.default = PathWrap;
//# sourceMappingURL=wrap.js.map