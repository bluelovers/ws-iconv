"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._mimetype = void 0;
const mime_types_1 = require("mime-types");
function _mimetype(parsedPath, dirent) {
    return (dirent.isFile() ? (0, mime_types_1.lookup)(parsedPath.ext) :
        dirent.isDirectory() ? "application/directory" /* EnumMimetypePlus.directory */ :
            dirent.isFIFO() ? "application/FIFO" /* EnumMimetypePlus.fifo */ :
                dirent.isSocket() ? "application/socket" /* EnumMimetypePlus.socket */ :
                    "application/unknown" /* EnumMimetypePlus.unknown */) || void 0;
}
exports._mimetype = _mimetype;
//# sourceMappingURL=mime.js.map