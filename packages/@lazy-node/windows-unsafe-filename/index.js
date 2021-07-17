"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceWindowsUnsafeName = exports.hasWindowsUnsafeName = exports.newRegExpWindowsUnsafeName = void 0;
const windowsReservedRe = newRegExpWindowsUnsafeName();
const windowsReservedRe2 = newRegExpWindowsUnsafeName(true);
/**
 * @see https://stackoverflow.com/questions/38457621/what-happens-when-writing-to-aux-file-on-windows
 * @see https://github.com/parshap/node-sanitize-filename/blob/209c39b914c8eb48ee27bcbde64b2c7822fdf3de/test.js#L83
 */
function newRegExpWindowsUnsafeName(mode) {
    if (mode) {
        return /^(con|prn|aux|nul|com\d{1,2}|lpt\d{1,2})(\..*)?$/i;
    }
    return /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
}
exports.newRegExpWindowsUnsafeName = newRegExpWindowsUnsafeName;
function hasWindowsUnsafeName(name, mode) {
    return name.match(mode ? windowsReservedRe2 : windowsReservedRe);
}
exports.hasWindowsUnsafeName = hasWindowsUnsafeName;
function replaceWindowsUnsafeName(name, replaceValue, mode) {
    return name.replace(mode ? windowsReservedRe2 : windowsReservedRe, replaceValue);
}
exports.replaceWindowsUnsafeName = replaceWindowsUnsafeName;
exports.default = hasWindowsUnsafeName;
//# sourceMappingURL=index.js.map