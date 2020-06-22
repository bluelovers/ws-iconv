"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionResolvers = exports.getOptions = exports.defaultOptions = void 0;
const resolvers = __importStar(require("./resolvers"));
const lodash_1 = require("lodash");
exports.defaultOptions = {
    "name": true,
    "pathname": true,
    "mimetype": true,
    "siblings": false,
    "children": false,
};
function getOptions(options, sync) {
    return lodash_1.defaults(options, exports.defaultOptions);
}
exports.getOptions = getOptions;
function getOptionResolvers(options, sync) {
    return Object.entries(getOptions(options, sync))
        .reduce((fns, [name, bool]) => {
        if (bool) {
            let fn;
            if (sync) {
                fn = resolvers[name + 'Sync'];
            }
            fn = fn !== null && fn !== void 0 ? fn : resolvers[name];
            if (typeof fn !== 'undefined') {
                fns.push(fn);
            }
        }
        return fns;
    }, []);
}
exports.getOptionResolvers = getOptionResolvers;
//# sourceMappingURL=options.js.map