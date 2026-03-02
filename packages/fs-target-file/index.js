"use strict";
/**
 * fs-target-file - 檔案目標處理工具
 *
 * 這個模組提供了檔案目標處理的功能，支援讀取和寫入操作，並可以指定輸入和輸出檔案。
 *
 * @module fs-target-file
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsFileMethodAsync = fsFileMethodAsync;
exports.toTargetFileOptions = toTargetFileOptions;
exports.fsTargetFile = fsTargetFile;
const fs_extra_1 = require("fs-extra");
/**
 * 檔案方法異步處理
 *
 * 這個函數會處理檔案的異步讀取和寫入操作，支援自定義函數和選項。
 *
 * @template RO 讀取選項類型
 * @template WO 寫入選項類型
 * @template D 資料類型
 * @template N 檔案路徑類型
 * @param {IFileMethodAsyncOptions<RO, WO, D, N>} [options] 選項
 * @returns {object} 包含 read 和 write 方法的物件
 */
function fsFileMethodAsync(options) {
    // 設置預設選項
    options !== null && options !== void 0 ? options : (options = {});
    const { readOptions, writeOptions = {
        spaces: 2,
    }, } = options;
    // 設置預設函數
    const { read = (file, options) => (0, fs_extra_1.readJSON)(file, {
        ...readOptions,
        ...options,
    }), write = (file, data, options) => (0, fs_extra_1.outputJSON)(file, data, {
        ...writeOptions,
        ...options,
    }), } = options !== null && options !== void 0 ? options : {};
    return {
        read,
        write,
    };
}
/**
 * 轉換檔案目標選項
 *
 * 這個函數會將目標選項轉換為標準格式，支援直接傳入檔案路徑或選項物件。
 *
 * @template N 檔案路徑類型
 * @param {N | ITargetFileOptions<N>} targetOptions 目標選項
 * @returns {ITSRequiredPick<ITargetFileOptions<N>>} 標準化後的選項
 */
function toTargetFileOptions(targetOptions) {
    var _a;
    let inputFile;
    let outputFile;
    // 檢查是否為選項物件
    // @ts-ignore
    if (typeof (targetOptions === null || targetOptions === void 0 ? void 0 : targetOptions.inputFile) !== 'undefined') {
        // @ts-ignore
        inputFile = targetOptions.inputFile;
        // @ts-ignore
        outputFile = (_a = targetOptions.outputFile) !== null && _a !== void 0 ? _a : inputFile;
    }
    else {
        inputFile = outputFile = targetOptions;
    }
    return {
        inputFile,
        outputFile,
    };
}
/**
 * 檔案目標處理
 *
 * 這個函數會創建一個檔案目標處理器，支援讀取和寫入操作，並可以指定輸入和輸出檔案。
 *
 * @template D 資料類型
 * @template RO 讀取選項類型
 * @template WO 寫入選項類型
 * @template N 檔案路徑類型
 * @param {N | ITargetFileOptions<N>} targetOptions 目標選項
 * @param {IFileMethodAsyncOptions<RO, WO, D, N>} [options] 選項
 * @returns {object} 檔案目標處理器
 */
function fsTargetFile(targetOptions, options) {
    // 獲取讀取和寫入方法
    const { read, write } = fsFileMethodAsync(options);
    // 獲取標準化後的選項
    const { inputFile, outputFile } = toTargetFileOptions(targetOptions);
    // 創建檔案目標處理器
    const target = {
        /** 輸入檔案路徑 */
        get inputFile() {
            return inputFile;
        },
        /** 輸出檔案路徑 */
        get outputFile() {
            return outputFile;
        },
        /**
         * 讀取檔案
         *
         * @template T 資料類型
         * @param {RO} [options] 選項
         * @returns {Promise<T>} Promise，解析為資料
         */
        read(options) {
            return read(inputFile, options);
        },
        /**
         * 寫入檔案
         *
         * @template T 資料類型
         * @param {T} data 資料
         * @param {RO} [options] 選項
         * @returns {Promise<unknown>} Promise
         */
        write(data, options) {
            return write(outputFile, data, options);
        },
        /**
         * 異步處理
         *
         * @returns {Promise<object>} Promise，解析為檔案目標處理器
         */
        async async() {
            return target;
        }
    };
    return target;
}
/** 預設導出 - 檔案目標處理函數 */
exports.default = fsTargetFile;
//# sourceMappingURL=index.js.map