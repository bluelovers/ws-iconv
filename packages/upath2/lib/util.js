"use strict";
/**
 * Created by user on 2020/6/9.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatic = exports._replace_sep = exports._strip_sep = void 0;
const tslib_1 = require("tslib");
const path_is_network_drive_1 = (0, tslib_1.__importDefault)(require("path-is-network-drive"));
const path_strip_sep_1 = (0, tslib_1.__importDefault)(require("path-strip-sep"));
exports._strip_sep = path_strip_sep_1.default;
function _replace_sep(who, input) {
    let sep = who.sep;
    if (who.name !== 'posix' && (0, path_is_network_drive_1.default)(input)) {
        sep = '\\';
        input = sep + sep + input
            .slice(2)
            .replace(/[/\\]/g, sep);
    }
    else {
        input = input
            .replace(/[/\\]/g, sep);
    }
    //	if (/^\w:[/\\]$/.test(input))
    //	{
    //		return input
    //	}
    return input;
}
exports._replace_sep = _replace_sep;
function getStatic(who) {
    return who.__proto__.constructor;
}
exports.getStatic = getStatic;
//# sourceMappingURL=util.js.map