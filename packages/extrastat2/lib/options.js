"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = void 0;
exports.getOptions = getOptions;
exports.getOptionResolvers = getOptionResolvers;
const tslib_1 = require("tslib");
const resolvers = tslib_1.__importStar(require("./resolvers"));
const lodash_1 = require("lodash");
exports.defaultOptions = {
    "name": true,
    "pathname": true,
    "mimetype": true,
    "siblings": false,
    "children": false,
};
function getOptions(options, sync) {
    return (0, lodash_1.defaults)(options, exports.defaultOptions);
}
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
//# sourceMappingURL=options.js.map