/// <reference types="node" />
import { ParsedPath } from "path";
import * as resolvers from './resolvers';
import { Stats } from 'fs-extra';
export interface IList {
    name: string;
    pathname: string;
    mimetype: string;
}
export interface IOptions extends Record<(keyof typeof resolvers) | keyof IList, boolean> {
}
export interface IStatsExtra extends Stats, Partial<IList> {
    name?: string;
    pathname?: string;
    children?: IList[];
    siblings?: IList[];
}
export interface IResolver {
    (parsedPath: ParsedPath, stat: IStatsExtra): IStatsExtra;
}
export declare const enum EnumMimetypePlus {
    directory = "application/directory",
    fifo = "application/FIFO",
    socket = "application/socket",
    unknown = "application/unknown"
}
