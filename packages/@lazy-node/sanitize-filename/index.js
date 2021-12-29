"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimFilename = exports.trimSpace = exports.replaceToFullWidth = exports.sanitizeFilename = void 0;
const tslib_1 = require("tslib");
const filenamify_1 = tslib_1.__importDefault(require("filenamify"));
const zero_width_1 = require("zero-width");
const index_1 = require("@lazy-node/windows-unsafe-filename/index");
function sanitizeFilename(name, options) {
    var _a, _b, _c;
    var _d;
    const old = name;
    options = {
        ...(options || null),
    };
    (_a = (_d = options).replacement) !== null && _a !== void 0 ? _a : (_d.replacement = '!');
    name = (0, zero_width_1.removeZeroWidth)(name, true);
    name = (0, zero_width_1.removeBom)(name, true);
    name = (0, zero_width_1.nbspToSpace)(name);
    name = (0, zero_width_1.trimWithZeroWidth)(name);
    name = name
        .replace(/[\r\n]/g, '');
    let dot = '';
    if (!options.removeDotFile) {
        dot = (_c = (_b = name.match(/^(\.)(?=\w)/i)) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : '';
    }
    if (options.replaceToFullWidth) {
        name = replaceToFullWidth(name);
    }
    let bool;
    name = (0, index_1.replaceWindowsUnsafeName)(name, ($0, $1, $2) => {
        bool = true;
        return '~!' + ($2 !== null && $2 !== void 0 ? $2 : '');
    }, true);
    name = (0, filenamify_1.default)(name, options);
    if (bool === true) {
        name = name.replace(/^~!?(?:(?=\.)|$)/, options.replacement);
    }
    if (options.trim) {
        name = trimFilename(name);
    }
    else if (!options.noTrimSpace) {
        name = trimSpace(name);
    }
    name = (0, index_1.replaceWindowsUnsafeName)(name, ($0, $1, $2) => options.replacement + ($2 !== null && $2 !== void 0 ? $2 : ''), true);
    if (name.length === 0 || old.length === 0) {
        if (options.throwEmpty) {
            throw new RangeError(`Invalid filename: {'${old}' => '${name}'} length ${old.length} => ${name.length}`);
        }
        else if (old.length !== 0) {
            name = options.replacement;
        }
    }
    return dot + name;
}
exports.sanitizeFilename = sanitizeFilename;
function replaceToFullWidth(name) {
    return name
        .replace(/\//g, '／')
        .replace(/\\/g, '＼')
        .replace(/\?/g, '？')
        .replace(/\*/g, '＊')
        .replace(/>/g, '＞')
        .replace(/</g, '＜');
}
exports.replaceToFullWidth = replaceToFullWidth;
function trimSpace(name) {
    name = name
        .replace(/^[　\s\xA0]+/g, '')
        .replace(/[　\s\xA0]+$/g, '');
    return name;
}
exports.trimSpace = trimSpace;
function trimFilename(name) {
    name = trimSpace(name)
        .replace(/^[_\-+]+/g, '')
        .replace(/[_\-+]+$/g, '');
    return name;
}
exports.trimFilename = trimFilename;
exports.default = sanitizeFilename;
//# sourceMappingURL=index.js.map