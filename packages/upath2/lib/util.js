"use strict";
/**
 * Created by user on 2020/6/9.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatic = exports._strip_sep = exports._replace_sep = void 0;
const path_is_network_drive_1 = __importDefault(require("path-is-network-drive"));
function _replace_sep(who, input) {
    let sep = who.sep;
    if (who.name !== 'posix' && path_is_network_drive_1.default(input)) {
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
function _strip_sep(input) {
    return input
        .replace(/([^/\\])[/\\]$/, '$1');
}
exports._strip_sep = _strip_sep;
function getStatic(who) {
    return who.__proto__.constructor;
}
exports.getStatic = getStatic;
//# sourceMappingURL=util.js.map