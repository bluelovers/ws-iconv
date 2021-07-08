"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassemble = void 0;
const path_1 = require("path");
function reassemble(pathparts) {
    return (0, path_1.join)('/', ...pathparts);
}
exports.reassemble = reassemble;
//# sourceMappingURL=util.js.map