/**
 * Created by user on 2020/6/25.
 */

import Mode from 'stat-mode';
import { ParsedPath, join } from "path";
import { IStatsExtra } from '../types';

export function rwx(parsedPath: ParsedPath, stat: IStatsExtra)
{

	stat.rwx = Mode(stat.mode)

	return stat
}

export default rwx
