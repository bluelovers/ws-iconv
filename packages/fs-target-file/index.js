"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsTargetFile = exports.toTargetFileOptions = exports.fsFileMethodAsync = void 0;
const fs_extra_1 = require("fs-extra");
function fsFileMethodAsync(options) {
    options !== null && options !== void 0 ? options : (options = {});
    const { readOptions, writeOptions = {
        spaces: 2,
    }, } = options;
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
exports.fsFileMethodAsync = fsFileMethodAsync;
function toTargetFileOptions(targetOptions) {
    var _a;
    let inputFile;
    let outputFile;
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
exports.toTargetFileOptions = toTargetFileOptions;
function fsTargetFile(targetOptions, options) {
    const { read, write } = fsFileMethodAsync(options);
    const { inputFile, outputFile } = toTargetFileOptions(targetOptions);
    const target = {
        get inputFile() {
            return inputFile;
        },
        get outputFile() {
            return outputFile;
        },
        read(options) {
            return read(inputFile, options);
        },
        write(data, options) {
            return write(outputFile, data, options);
        },
        async async() {
            return target;
        }
    };
    return target;
}
exports.fsTargetFile = fsTargetFile;
exports.default = fsTargetFile;
//# sourceMappingURL=index.js.map