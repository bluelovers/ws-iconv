/**
 * @see https://stackoverflow.com/questions/38457621/what-happens-when-writing-to-aux-file-on-windows
 * @see https://github.com/parshap/node-sanitize-filename/blob/209c39b914c8eb48ee27bcbde64b2c7822fdf3de/test.js#L83
 */
export declare function newRegExpWindowsUnsafeName(mode?: boolean): RegExp;
export declare function hasWindowsUnsafeName(name: string, mode?: boolean): RegExpMatchArray;
export declare function replaceWindowsUnsafeName(name: string, replaceValue: string | ((substring: string, ...args: (string | undefined)[]) => string), mode?: boolean): string;
export default hasWindowsUnsafeName;
