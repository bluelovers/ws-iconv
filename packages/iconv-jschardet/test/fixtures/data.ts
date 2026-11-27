
/**
 * 次常用國字標準字體表
 */
export const BIG5_STR = "\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed";
export const BIG5_BUF = Buffer.from('a6b8b160a5ceb0eaa672bcd0b7c7a672c5e9aaed', 'hex');
export const BIG5_UTF8_BUF = Buffer.from('e6 ac a1 e5 b8 b8 e7 94 a8 e5 9c 8b e5 ad 97 e6 a8 99 e6 ba 96 e5 ad 97 e9 ab 94 e8 a1 a8'.replace(/\s/g, ''), 'hex');

/**
 * 简体中文编码测试文本 (GBK)
 */
export const GBK_STR = "\xbc\xf2\xcc\xe5\xd6\xd0\xce\xc4\xb1\xe0\xc2\xeb\xb2\xe2\xca\xd4\xce\xc4\xb1\xbe";
export const GBK_BUF = Buffer.from('bcf2cce5d6d0cec4b1e0c2ebb2e2cad4cec4b1be', 'hex');
export const GBK_UTF8_BUF = Buffer.from('e7 ae 80 e4 bd 93 e4 b8 ad e6 96 87 e7 bc 96 e7 a0 81 e6 b5 8b e8 af 95 e6 96 87 e6 9c ac'.replace(/\s/g, ''), 'hex');

/**
 * 日本語のテスト文 (Shift_JIS)
 */
export const SJIS_STR = "\x93\xfa\x96\x7b\x8c\xea\x82\xcc\x83\x65\x83\x58\x83\x67\x95\xb6";
export const SJIS_BUF = Buffer.from('93fa967b8cea82cc83658358836795b6', 'hex');
export const SJIS_UTF8_BUF = Buffer.from('e6 97 a5 e6 9c ac e8 aa 9e e3 81 ae e3 83 86 e3 82 b9 e3 83 88 e6 96 87'.replace(/\s/g, ''), 'hex');

/**
 * 日本語のテスト文 (EUC-JP)
 */
export const EUCJP_STR = "\xc6\xfc\xcb\xdc\xb8\xec\xa4\xce\xa5\xc6\xa5\xb9\xa5\xc8\xca\xb8";
export const EUCJP_BUF = Buffer.from('c6fccbdcb8eca4cea5c6a5b9a5c8cab8', 'hex');
export const EUCJP_UTF8_BUF = Buffer.from('e6 97 a5 e6 9c ac e8 aa 9e e3 81 ae e3 83 86 e3 82 b9 e3 83 88 e6 96 87'.replace(/\s/g, ''), 'hex');

/**
 * 한국어 인코딩 테스트 (EUC-KR)
 */
export const EUCKR_STR = "\xc7\xd1\xb1\xb9\xbe\xee\x20\xc0\xce\xc4\xda\xb5\xf9\x20\xc5\xd7\xbd\xba\xc6\xae";
export const EUCKR_BUF = Buffer.from('c7d1b1b9beee20c0cec4dab5f920c5d7bdbac6ae', 'hex');
export const EUCKR_UTF8_BUF = Buffer.from('ed 95 9c ea b5 ad ec 96 b4 20 ec 9d b8 ec bd 94 eb 94 a9 20 ed 85 8c ec 8a a4 ed 8a b8'.replace(/\s/g, ''), 'hex');
