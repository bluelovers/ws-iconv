"use strict";
/**
 * Created by user on 2020/6/9.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatic = exports._replace_sep = void 0;
function _replace_sep(who, input) {
    return input.replace(/\\/g, who.sep);
}
exports._replace_sep = _replace_sep;
function getStatic(who) {
    return who.__proto__.constructor;
}
exports.getStatic = getStatic;
//# sourceMappingURL=util.js.map