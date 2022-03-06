/// <reference types="node" />
/// <reference types="node" />
import { ParsedPath } from "path";
import { Stats, Dirent } from "fs";
export declare function _mimetype(parsedPath: ParsedPath, dirent: Dirent | Stats): string;
