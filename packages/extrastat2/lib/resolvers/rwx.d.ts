/**
 * Created by user on 2020/6/25.
 */
/// <reference types="node" />
import { ParsedPath } from "path";
import { IStatsExtra } from '../types';
export declare function rwx(parsedPath: ParsedPath, stat: IStatsExtra): IStatsExtra;
export default rwx;
