import { IResolver, IOptions } from './types';
export declare const defaultOptions: IOptions;
export declare function getOptions(options: IOptions, sync?: boolean): IOptions;
export declare function getOptionResolvers(options: IOptions, sync?: boolean): IResolver[];
