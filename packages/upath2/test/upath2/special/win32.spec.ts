
import { win32 as path } from '../../..';
import { _fix_special } from '../../util/fix-special';
const { normalize, join, dirname } = path;

_fix_special(path)
