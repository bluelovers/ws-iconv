"use strict";
/**
 * @lazy-node/sanitize-filename - 檔案名稱安全化模組
 *
 * 這個模組提供了將字串轉換為安全檔案名稱的功能，移除或替換不安全的字元，
 * 支援多種選項來自訂處理方式。
 *
 * @module @lazy-node/sanitize-filename
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFilename = sanitizeFilename;
exports.replaceToFullWidth = replaceToFullWidth;
exports.trimSpace = trimSpace;
exports.trimFilename = trimFilename;
const tslib_1 = require("tslib");
const filenamify_1 = tslib_1.__importDefault(require("filenamify"));
const zero_width_1 = require("zero-width");
const windows_unsafe_filename_1 = require("@lazy-node/windows-unsafe-filename");
/**
 * 將字串轉換為安全的檔案名稱
 *
 * @description 移除或替換不安全的字元，確保檔案名稱在各種作業系統上都能正常使用
 * @param {string} name 要處理的原始字串
 * @param {IOptions} [options] 處理選項
 * @returns {string} 安全的檔案名稱
 * @example
 * ```typescript
 * const safeName = sanitizeFilename('my file?.txt');
 * console.log(safeName); // 'my file!.txt'
 * ```
 */
function sanitizeFilename(name, options) {
    var _a, _b, _c;
    var _d;
    const old = name;
    // 合併預設選項
    options = {
        ...(options || null),
    };
    (_a = (_d = options).replacement) !== null && _a !== void 0 ? _a : (_d.replacement = '!');
    // 移除零寬字元
    name = (0, zero_width_1.removeZeroWidth)(name, true);
    // 移除 BOM 標記
    name = (0, zero_width_1.removeBom)(name, true);
    // 將不換行空格轉換為普通空格
    name = (0, zero_width_1.nbspToSpace)(name);
    // 修剪包含零寬字元的空白
    name = (0, zero_width_1.trimWithZeroWidth)(name);
    // 移除換行符號
    name = name
        .replace(/[\r\n]/g, '');
    let dot = '';
    // 處理點檔案
    if (!options.removeDotFile) {
        dot = (_c = (_b = name.match(/^(\.)(?=\w)/i)) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : '';
    }
    // 替換為全形字元
    if (options.replaceToFullWidth) {
        name = replaceToFullWidth(name);
    }
    let bool;
    // 處理 Windows 不安全名稱
    name = (0, windows_unsafe_filename_1.replaceWindowsUnsafeName)(name, ($0, $1, $2) => {
        bool = true;
        return '~!' + ($2 !== null && $2 !== void 0 ? $2 : '');
    }, true);
    // 使用 filenamify 處理
    name = (0, filenamify_1.default)(name, options);
    // 處理替換後的前綴
    if (bool === true) {
        name = name.replace(/^~!?(?:(?=\.)|$)/, options.replacement);
    }
    // 修剪處理
    if (options.trim) {
        name = trimFilename(name);
    }
    else if (!options.noTrimSpace) {
        name = trimSpace(name);
    }
    // 再次處理 Windows 不安全名稱
    name = (0, windows_unsafe_filename_1.replaceWindowsUnsafeName)(name, ($0, $1, $2) => options.replacement + ($2 !== null && $2 !== void 0 ? $2 : ''), true);
    // 處理空結果
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
/**
 * 將特殊字元替換為全形字元
 *
 * @description 將常見的特殊字元轉換為對應的全形字元，使檔案名稱更美觀
 * @param {string} name 要處理的字串
 * @returns {string} 替換後的字串
 * @example
 * ```typescript
 * const fullWidth = replaceToFullWidth('file?name*');
 * console.log(fullWidth); // 'file？name＊'
 * ```
 */
function replaceToFullWidth(name) {
    return name
        .replace(/\//g, '／')
        .replace(/\\/g, '＼')
        .replace(/\?/g, '？')
        .replace(/\*/g, '＊')
        .replace(/>/g, '＞')
        .replace(/</g, '＜');
}
/**
 * 修剪空格
 *
 * @description 移除字串前後的空格和特殊空白字元
 * @param {string} name 要處理的字串
 * @returns {string} 修剪後的字串
 */
function trimSpace(name) {
    name = name
        .replace(/^[　\s\xA0]+/g, '')
        .replace(/[　\s\xA0]+$/g, '');
    return name;
}
/**
 * 修剪檔案名稱
 *
 * @description 移除字串前後的空格、底線、連字號和加號
 * @param {string} name 要處理的字串
 * @returns {string} 修剪後的字串
 */
function trimFilename(name) {
    name = trimSpace(name)
        .replace(/^[_\-+]+/g, '')
        .replace(/[_\-+]+$/g, '');
    return name;
}
/**
 * 預設匯出：檔案名稱安全化函數
 *
 * @description 這是最主要的函數，提供完整的檔案名稱安全化功能
 * @type {typeof sanitizeFilename}
 */
exports.default = sanitizeFilename;
//# sourceMappingURL=index.js.map