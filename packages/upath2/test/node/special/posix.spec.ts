
import { posix as path } from 'path';
import { _fix_special } from '../../util/fix-special';
const { normalize, join, dirname } = path;

_fix_special(path)
