"use strict";
/**
 * fs-iconv 核心功能模組
 *
 * 這個模組提供了檔案系統操作的編碼轉換功能，可以處理各種文字編碼的檔案讀寫操作。
 *
 * @module fs-iconv/core
 * @author bluelovers
 * @since 2019/3/17
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymFSLib = void 0;
exports.WrapFSIconv = WrapFSIconv;
exports.ensureWriteStream = ensureWriteStream;
exports.saveFileSync = saveFileSync;
exports.saveFile = saveFile;
exports._createStreamPassThrough = _createStreamPassThrough;
exports._outputStream = _outputStream;
exports._autoDecode = _autoDecode;
exports.loadFile = loadFile;
exports.loadFileSync = loadFileSync;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const iconv_jschardet_1 = tslib_1.__importDefault(require("iconv-jschardet"));
const bluebird_1 = tslib_1.__importDefault(require("bluebird"));
const util_1 = require("./util");
const stream_1 = require("stream");
/** 檔案系統庫符號，用於內部引用原始的 fs-extra 實例 */
exports.SymFSLib = Symbol('fsLib');
/**
 * 包裝檔案系統操作並添加編碼轉換功能
 *
 * @template F 檔案系統類型，預設為 fs-extra
 * @param {F} fsLib 要包裝的檔案系統庫
 * @returns {WrapFSIconv.IWrapFS<F>} 包裝後的檔案系統實例
 */
function WrapFSIconv(fsLib) {
    // 複製檔案系統庫以避免修改原始實例
    let fs = (0, lodash_1.clone)(fsLib);
    // 將所有函數綁定到新的 fs 實例上
    Object.keys(fs)
        .forEach(k => {
        if (typeof fsLib[k] === 'function') {
            fs[k] = fsLib[k].bind(fsLib);
        }
    });
    // 儲存原始檔案系統庫的引用
    fs[exports.SymFSLib] = fsLib;
    // 添加 iconv 編碼轉換功能
    fs.iconv = iconv_jschardet_1.default;
    // 綁定各種檔案操作方法
    fs.ensureWriteStream = ensureWriteStream.bind(fs);
    fs.saveFile = saveFile.bind(fs);
    fs.saveFileSync = saveFileSync.bind(fs);
    fs.loadFileSync = loadFileSync.bind(fs);
    fs.loadFile = loadFile.bind(fs);
    fs._createStreamPassThrough = _createStreamPassThrough.bind(fs);
    fs._outputStream = _outputStream.bind(fs);
    fs._autoDecode = _autoDecode.bind(fs);
    fs.trimFilename = util_1.trimFilename;
    // 標記為 ES 模組
    Object.defineProperty(exports, "__esModule", { value: true });
    // 設置預設導出
    // @ts-ignore
    fs.default = fs;
    return fs;
}
/**
 * 確保檔案存在並創建寫入流
 *
 * 這個函數會先確保目標檔案存在（如果不存在則創建），然後返回一個可寫入的檔案流。
 *
 * @param {string} file 檔案路徑
 * @returns {fsExtra.WriteStream} 檔案寫入流
 */
function ensureWriteStream(file) {
    // 從符號屬性獲取原始的 fs-extra 實例
    // @ts-ignore
    let fs = this[exports.SymFSLib];
    // 確保檔案存在
    fs.ensureFileSync(file);
    return fs.createWriteStream(file);
}
/**
 * 同步保存檔案並處理編碼轉換
 *
 * 這個函數會將資料保存到指定檔案，並在需要時進行編碼轉換。
 *
 * @param {string} file 檔案路徑
 * @param {any} data 要保存的資料
 * @param {WrapFSIconv.IWrapFSIconvOptions} [options={}] 選項
 * @param {vEncoding} [options.encoding] 目標編碼
 * @returns {boolean} 總是返回 true
 */
function saveFileSync(file, data, options = {}) {
    // 從符號屬性獲取原始的 fs-extra 實例
    // @ts-ignore
    let fs = this[exports.SymFSLib];
    // 確保檔案存在
    fs.ensureFileSync(file);
    // 如果需要編碼轉換，則進行轉換
    if (options.encoding) {
        data = iconv_jschardet_1.default.encode(data, options.encoding);
    }
    // 同步寫入檔案
    fs.outputFileSync(file, data);
    return true;
}
/**
 * 異步保存檔案並處理編碼轉換
 *
 * 這個函數會將資料保存到指定檔案，並在需要時進行編碼轉換。使用 Promise 處理異步操作。
 *
 * @param {string} file 檔案路徑
 * @param {any} data 要保存的資料
 * @param {WrapFSIconv.IWrapFSIconvOptions} [options={}] 選項
 * @param {vEncoding} [options.encoding] 目標編碼
 * @returns {Bluebird<boolean>} Promise，解析為 true
 */
function saveFile(file, data, options = {}) {
    // 獲取當前實例和原始的 fs-extra 實例
    // @ts-ignore
    let self = this;
    let fs = self[exports.SymFSLib];
    return bluebird_1.default
        .resolve(fs.ensureFile(file))
        .tap(function () {
        return new bluebird_1.default(function (resolve, reject) {
            // 如果需要編碼轉換，則進行轉換
            if (options.encoding) {
                data = iconv_jschardet_1.default.encode(data, options.encoding);
            }
            // 創建讀取流和寫入流
            let readStream = self._createStreamPassThrough(data);
            let writeStream = self._outputStream(file, readStream);
            // 處理流事件
            writeStream.on('error', reject);
            writeStream.on('finish', resolve);
        });
    })
        .thenReturn(true);
}
/**
 * 創建數據流傳遞流
 *
 * 這個函數將創建一個 PassThrough 流，用於在讀取和寫入操作之間傳遞數據。
 *
 * @param {unknown} data 要傳遞的資料
 * @returns {stream.Readable} 可讀取的數據流
 */
function _createStreamPassThrough(data) {
    let readStream = new stream_1.PassThrough();
    readStream.end(data);
    return readStream;
}
/**
 * 創建檔案輸出流
 *
 * 這個函數將創建一個寫入流，用於將數據流寫入指定檔案。
 *
 * @param {string} file 檔案路徑
 * @param {stream.Readable} readStream 要寫入的數據流
 * @returns {fsExtra.WriteStream} 檔案寫入流
 */
function _outputStream(file, readStream) {
    // 從符號屬性獲取原始的 fs-extra 實例
    // @ts-ignore
    let fs = this[exports.SymFSLib];
    let writeStream = fs.createWriteStream(file);
    readStream.pipe(writeStream);
    return writeStream;
}
function _autoDecode(buf, options) {
    if (Array.isArray(options.autoDecode)) {
        let _do;
        let c = iconv_jschardet_1.default._enc(iconv_jschardet_1.default.detect(buf, true).name);
        for (let from of options.autoDecode) {
            let cd = iconv_jschardet_1.default.codec_data(from);
            let key;
            if (cd && cd.name) {
                key = iconv_jschardet_1.default._enc(cd.name);
                if (c === key) {
                    _do = key;
                    break;
                }
            }
        }
        if (_do) {
            return iconv_jschardet_1.default.encode(buf, null, options.encoding);
        }
        else {
            return buf;
        }
    }
    return iconv_jschardet_1.default.encode(buf);
}
function loadFile(file, options = {}) {
    // 獲取當前實例和原始的 fs-extra 實例
    // @ts-ignore
    let self = this;
    let fs = self[exports.SymFSLib];
    let ps;
    if (options.encoding) {
        let enc = iconv_jschardet_1.default.isNodeEncoding(options.encoding);
        if (enc) {
            ps = fs.readFile(file, options);
        }
        else {
            let ops = Object.assign({}, options);
            delete ops.encoding;
            ps = fs.readFile(file, ops)
                .then(function (buf) {
                return iconv_jschardet_1.default.decode(buf, options.encoding);
            });
        }
    }
    else if (options.autoDecode) {
        ps = fs.readFile(file, options)
            .then(function (buf) {
            return self._autoDecode(buf, options);
        });
    }
    else {
        ps = fs.readFile(file, options);
    }
    return bluebird_1.default.resolve(ps);
}
function loadFileSync(file, options = {}) {
    // 獲取當前實例和原始的 fs-extra 實例
    // @ts-ignore
    let self = this;
    let fs = self[exports.SymFSLib];
    let ps;
    if (options.encoding) {
        let enc = iconv_jschardet_1.default.isNodeEncoding(options.encoding);
        if (enc) {
            // @ts-ignore
            ps = fs.readFileSync(file, options);
        }
        else {
            let ops = Object.assign({}, options);
            delete ops.encoding;
            // @ts-ignore
            ps = iconv_jschardet_1.default.decode(fs.readFileSync(file, ops), options.encoding);
        }
    }
    else if (options.autoDecode) {
        // @ts-ignore
        ps = self._autoDecode(fs.readFileSync(file, options), options);
    }
    else {
        // @ts-ignore
        ps = fs.readFileSync(file, options);
    }
    return ps;
}
exports.default = exports;
//# sourceMappingURL=core.js.map