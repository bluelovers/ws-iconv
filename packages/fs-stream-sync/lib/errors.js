"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumFsStreamErrorCode = exports.createError = exports.NodeLikeError = void 0;
class NodeLikeError extends Error {
    constructor(code, msg) {
        super(msg);
        this.code = code;
    }
}
exports.NodeLikeError = NodeLikeError;
function createError(Err, code, msg) {
    let e = new Err(msg);
    e.code = code;
    return e;
}
exports.createError = createError;
var EnumFsStreamErrorCode;
(function (EnumFsStreamErrorCode) {
    EnumFsStreamErrorCode["ERR_STREAM_WRITE_AFTER_END"] = "ERR_STREAM_WRITE_AFTER_END";
    EnumFsStreamErrorCode["ERR_STREAM_DESTROYED"] = "ERR_STREAM_DESTROYED";
})(EnumFsStreamErrorCode = exports.EnumFsStreamErrorCode || (exports.EnumFsStreamErrorCode = {}));
//# sourceMappingURL=errors.js.map