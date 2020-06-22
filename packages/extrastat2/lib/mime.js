"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._mimetype = void 0;
const mime_types_1 = require("mime-types");
function _mimetype(parsedPath, dirent) {
    return (dirent.isFile() ? mime_types_1.lookup(parsedPath.ext) :
        dirent.isDirectory() ? "application/directory" /* directory */ :
            dirent.isFIFO() ? "application/FIFO" /* fifo */ :
                dirent.isSocket() ? "application/socket" /* socket */ :
                    "application/unknown" /* unknown */) || void 0;
}
exports._mimetype = _mimetype;
//# sourceMappingURL=mime.js.map