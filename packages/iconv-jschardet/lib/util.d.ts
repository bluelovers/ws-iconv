import { vEncoding } from './const';
export declare function getIconvLiteCodec(encoding: vEncoding): {
    codec: {
        encodingName?: string;
        enc?: string;
    };
    enc: string;
    enc2: string;
};
