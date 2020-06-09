"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
let r_vaild = /[\\\?\/\!'"\:\<\>\*\|]+/g;
function vaildNameEntry(name) {
    return r_vaild.test(name.toString()) ? null : name;
}
exports.vaildNameEntry = vaildNameEntry;
function filterNameEntry(name) {
    return name.toString().replace(r_vaild, '');
}
exports.filterNameEntry = filterNameEntry;
core_1.fn.vaildNameEntry = vaildNameEntry;
core_1.fn.filterNameEntry = filterNameEntry;
const self = require("./fs");
exports.default = self;
Object.freeze(exports);
