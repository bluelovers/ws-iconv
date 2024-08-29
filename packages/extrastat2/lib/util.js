"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassemble = reassemble;
const path_1 = require("path");
function reassemble(pathparts) {
    return (0, path_1.join)('/', ...pathparts);
}
//# sourceMappingURL=util.js.map