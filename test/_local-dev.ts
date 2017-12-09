/**
 * Created by user on 2017/12/9/009.
 */

import * as chai from 'chai';
import * as path from 'path';

export { path };

export const rootDir = path.join(__dirname, '..');

export function relative(filename): string
{
	return path.relative(rootDir, filename);
}

export const expect = chai.expect;
export const assert = chai.assert;
