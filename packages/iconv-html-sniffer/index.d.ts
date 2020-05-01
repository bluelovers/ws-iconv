export declare type ICreateFnDecode<T, E extends string = string> = (buf: unknown | ArrayLike<number>, defaultEncoding?: E) => T;
export declare function createIconvDecode(defaultEncodingBase?: string, sniffHTMLEncoding?: ICreateFnDecode<string>): ICreateFnDecode<string>;
export declare function createSniffHTMLEncoding(defaultEncodingBase: string): ICreateFnDecode<string>;
declare const _default: {
    createIconvDecode: typeof createIconvDecode;
    createSniffHTMLEncoding: typeof createSniffHTMLEncoding;
};
export default _default;
