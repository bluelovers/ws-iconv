"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.children = exports.siblings = exports.mimetype = exports.pathname = exports.name = exports.parents = exports.rwx = void 0;
const tslib_1 = require("tslib");
const path_1 = require("path");
const mime_1 = require("./mime");
const list_1 = require("./list");
const index_1 = tslib_1.__importDefault(require("path-parents/index"));
var rwx_1 = require("./resolvers/rwx");
Object.defineProperty(exports, "rwx", { enumerable: true, get: function () { return rwx_1.rwx; } });
/*
module.exports = {
filename: filename,
filestat: filestat,
pathname: pathname,

filemode: (pathparts, stat) =>
{
    let { mode } = stat

    if (!mode)
    {
        return { 'filemode': '.........' }
    }
    else
    {
        return {
            'filemode': [
                mode >> 6 & 4 ? role == 'user' ? 'R' : 'r' : '-',
                mode >> 6 & 2 ? role == 'user' ? 'W' : 'w' : '-',
                mode >> 6 & 1 ? role == 'user' ? 'X' : 'x' : '-',
                mode << 3 >> 6 & 4 ? role == 'group' ? 'R' : 'r' : '-',
                mode << 3 >> 6 & 2 ? role == 'group' ? 'W' : 'w' : '-',
                mode << 3 >> 6 & 1 ? role == 'group' ? 'X' : 'x' : '-',
                mode << 6 >> 6 & 4 ? role == 'other' ? 'R' : 'r' : '-',
                mode << 6 >> 6 & 2 ? role == 'other' ? 'W' : 'w' : '-',
                mode << 6 >> 6 & 1 ? role == 'other' ? 'X' : 'x' : '-',
            ].join(''),
        }
    }
},

    mimetype: mimetype,
    parents: parents,

    children: children,

    siblings: siblings,
}
 */
/*
export function parents(parsedPath: ParsedPath, stat: IStatsExtra)
{
    const lastIndex = array => array[array.length - 1] || '';
    const ancestors = [];

    for (let i = 0; i < pathparts.length; i++)
    {
        ancestors.push(
            path.join(
                '/',
                lastIndex(ancestors),
                pathparts[i],
                '/',
            ),
        )
    }

    return {
        'parents':
            ancestors.map((ancestor, index) =>
            {
                return {
                    filename: pathparts[index],
                    pathname: ancestor,
                    mimetype: 'application/directory',
                }
            }),
    }
}
*/
function parents(parsedPath, stat) {
    let resolvedpath = (0, path_1.join)(parsedPath.dir, parsedPath.name);
    stat.parents = (0, index_1.default)(resolvedpath);
    return stat;
}
exports.parents = parents;
function name(parsedPath, stat) {
    stat.name = parsedPath.name;
    return stat;
}
exports.name = name;
function pathname(parsedPath, stat) {
    let resolvedpath = (0, path_1.join)(parsedPath.dir, parsedPath.name);
    if (stat.isDirectory()) {
        resolvedpath = resolvedpath + path_1.sep;
    }
    stat.pathname = resolvedpath;
    return stat;
}
exports.pathname = pathname;
function mimetype(parsedPath, stat) {
    stat.mimetype = (0, mime_1._mimetype)(parsedPath, stat);
    return stat;
}
exports.mimetype = mimetype;
async function siblings(parsedPath, stat) {
    stat.siblings = await (0, list_1.list)(parsedPath.dir);
    return stat;
}
exports.siblings = siblings;
async function children(parsedPath, stat) {
    if (!stat.isDirectory()) {
        stat.children = null;
    }
    else {
        const resolvedpath = (0, path_1.join)(parsedPath.dir, parsedPath.name);
        stat.children = await (0, list_1.list)(resolvedpath);
    }
    return stat;
}
exports.children = children;
//# sourceMappingURL=resolvers.js.map