/**
 * Created by user on 2020/6/9.
 */
import { IPath } from './type';
import { PathWrap } from '../core';
export declare function _replace_sep(who: Pick<IPath, 'sep' | 'name'>, input: string): string;
export declare function _strip_sep(input: string): string;
export declare function getStatic(who: any): PathWrap;
