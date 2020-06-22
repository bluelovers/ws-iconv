/// <reference types="node" />
import { ParsedPath } from "path";
import { IStatsExtra } from './types';
export declare function name(parsedPath: ParsedPath, stat: IStatsExtra): IStatsExtra;
export declare function pathname(parsedPath: ParsedPath, stat: IStatsExtra): IStatsExtra;
export declare function mimetype(parsedPath: ParsedPath, stat: IStatsExtra): IStatsExtra;
export declare function siblings(parsedPath: ParsedPath, stat: IStatsExtra): Promise<IStatsExtra>;
export declare function children(parsedPath: ParsedPath, stat: IStatsExtra): Promise<IStatsExtra>;