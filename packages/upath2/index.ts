/**
 * Created by user on 2017/12/10/010.
 */


import { upath, PathWrap, fn, IUPath } from './core';
import * as _upath from './core';

import './lib/fs';
import types, { IPath, IPathNode, IParse } from './lib/type';

/*
const path = upath as typeof upath & {
	default: typeof upath,
};

path.default = path;
*/
const path = upath;
export = path;
