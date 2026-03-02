"use strict";
/**
 * path-parents - 父目錄路徑處理工具
 *
 * 這個模組提供了獲取所有父目錄路徑的功能，支援多種選項和平台。
 *
 * @module path-parents
 * @author James Halliday <mail@substack.net> (http://substack.net)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = handleOptions;
exports.pathParentsCore = pathParentsCore;
exports._checkRuntimeLimit = _checkRuntimeLimit;
exports.pathParentsGenerator = pathParentsGenerator;
exports.pathParentsGeneratorRuntime = pathParentsGeneratorRuntime;
exports.pathParents = pathParents;
exports.pathSplitGenerator = pathSplitGenerator;
exports.pathSplit = pathSplit;
const tslib_1 = require("tslib");
const core_1 = tslib_1.__importDefault(require("upath2/core"));
const path_1 = tslib_1.__importDefault(require("path"));
const path_is_same_1 = require("path-is-same");
/**
 * 處理選項參數
 *
 * 這個函數會處理選項參數，設置預設值並檢查參數有效性。
 *
 * @template T 選項類型
 * @param {string | T} [cwd] 當前工作目錄或選項
 * @param {T} [opts] 選項
 * @returns {IRuntime<T>} 執行時環境
 */
function handleOptions(cwd, opts) {
    var _a, _b;
    // 處理參數順序
    if (typeof opts === 'undefined') {
        if (typeof cwd !== 'string') {
            // @ts-ignore
            ([opts, cwd] = [cwd, opts]);
        }
    }
    // 設置預設選項
    // @ts-ignore
    opts = opts !== null && opts !== void 0 ? opts : {};
    cwd = (_a = cwd !== null && cwd !== void 0 ? cwd : opts.cwd) !== null && _a !== void 0 ? _a : process.cwd();
    opts = {
        ...opts,
    };
    // 設置預設路徑處理函數
    let path = core_1.default;
    // 根據平台類型選擇路徑處理函數
    if (typeof opts.platform === 'string') {
        switch (opts.platform) {
            case 'win32':
            case 'posix':
                path = core_1.default[opts.platform];
                break;
            case 'upath':
                path = core_1.default;
                break;
            case 'node':
                path = path_1.default;
                break;
            default:
                path = core_1.default;
        }
    }
    // 規範化當前工作目錄
    cwd = path.normalize(cwd);
    // 處理停止路徑
    const stopPath = [(_b = opts.stopPath) !== null && _b !== void 0 ? _b : []]
        .flat()
        .map(p => path.normalize(p));
    // 設置限制層數
    const limit = opts.limit > 0 ? opts.limit : Infinity;
    // 更新選項
    opts.cwd = cwd;
    opts.stopPath = stopPath;
    opts.limit = limit;
    return {
        cwd,
        opts,
        path,
        stopPath,
        limit,
    };
}
/**
 * 獲取父目錄核心函數
 *
 * 這個函數會獲取指定路徑的父目錄。
 *
 * @param {string} cwd 當前工作目錄
 * @param {IRuntime} runtime 執行時環境
 * @returns {string | undefined} 父目錄路徑或 undefined
 */
function pathParentsCore(cwd, runtime) {
    // 獲取父目錄
    let path = runtime.path.dirname(cwd);
    // 檢查是否為同一路徑
    if (!(0, path_is_same_1.pathIsSame)(cwd, path)) {
        return path;
    }
}
/**
 * 檢查執行時限制
 *
 * 這個函數會檢查是否達到執行時限制，包括層數限制和停止路徑。
 *
 * @param {string} current 當前路徑
 * @param {IRuntime} runtime 執行時環境
 * @returns {boolean} 是否應該停止
 */
function _checkRuntimeLimit(current, runtime) {
    return --runtime.limit <= 0 || runtime.stopPath.includes(current);
}
/**
 * 父目錄路徑生成器
 *
 * 這個生成器會生成所有父目錄路徑。
 *
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {Generator<string>} 父目錄路徑生成器
 */
function* pathParentsGenerator(cwd, opts) {
    // 處理選項
    const runtime = handleOptions(cwd, opts);
    // 生成父目錄路徑
    yield* pathParentsGeneratorRuntime(runtime);
}
/**
 * 父目錄路徑生成器（執行時）
 *
 * 這個生成器會根據執行時環境生成所有父目錄路徑。
 *
 * @param {IRuntime} runtime 執行時環境
 * @returns {Generator<string>} 父目錄路徑生成器
 */
function* pathParentsGeneratorRuntime(runtime) {
    let _do = true;
    let current = runtime.cwd;
    let last;
    // 是否包含當前目錄
    if (runtime.opts.includeCurrentDirectory) {
        yield current;
        if (_checkRuntimeLimit(current, runtime)) {
            return;
        }
    }
    do {
        last = current;
        current = pathParentsCore(current, runtime);
        if (typeof current === 'undefined') {
            _do = false;
            break;
        }
        yield current;
        if (_checkRuntimeLimit(current, runtime)) {
            break;
        }
    } while (_do);
}
/**
 * 獲取所有父目錄路徑
 *
 * 這個函數會返回所有父目錄路徑的陣列。
 *
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {string[]} 所有父目錄路徑陣列
 */
function pathParents(cwd, opts) {
    return [...pathParentsGenerator(cwd, opts)];
}
/**
 * 路徑分割生成器
 *
 * 這個生成器會生成路徑的每個部分。
 *
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {Generator<string>} 路徑部分生成器
 */
function* pathSplitGenerator(cwd, opts) {
    // 處理選項
    const runtime = handleOptions(cwd, opts);
    // 生成路徑部分
    for (const p of pathParentsGeneratorRuntime(runtime)) {
        let r = runtime.path.basename(p);
        if (!(r === null || r === void 0 ? void 0 : r.length)) {
            r = p;
        }
        yield r;
    }
}
/**
 * 分割路徑
 *
 * 這個函數會返回路徑的每個部分的陣列。
 *
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {string[]} 路徑部分陣列
 */
function pathSplit(cwd, opts) {
    return [...pathSplitGenerator(cwd, opts)];
}
/** 預設導出 - pathParents 函數 */
exports.default = pathParents;
//# sourceMappingURL=index.js.map