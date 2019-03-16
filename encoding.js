"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iconvLite = require("iconv-lite");
const debug_color2_1 = require("debug-color2");
exports.console = debug_color2_1.console;
function _enc(encoding) {
    return encoding.toString().toLowerCase().replace(/[^0-9a-z]|:\d{4}$/g, '');
}
exports._enc = _enc;
exports.NodeEncoding = [
    'ascii',
    'utf8',
    'utf-8',
    'utf16le',
    'ucs2',
    'base64',
    'latin1',
    'binary',
    'hex',
];
function isNodeEncoding(encoding) {
    let enc = _enc(encoding);
    return exports.NodeEncoding.includes(_enc(encoding)) ? enc : null;
}
exports.isNodeEncoding = isNodeEncoding;
let DISABLE_CODEC_DATA_WARN = false;
function disableCodecDataWarn(bool = true) {
    return DISABLE_CODEC_DATA_WARN = bool;
}
exports.disableCodecDataWarn = disableCodecDataWarn;
function codec_data(encoding) {
    let codec;
    let enc;
    let enc2;
    if (!exports.codec_table[enc = _enc(encoding)]) {
        try {
            // @ts-ignore
            codec = iconvLite.getCodec(encoding);
            enc2 = codec.encodingName || codec.enc;
            if (exports.codec_table[enc2]) {
                enc = enc2;
            }
        }
        catch (e) {
        }
    }
    if (exports.codec_table[enc]) {
        exports.codec_table[enc].key = exports.codec_table[enc].key || enc;
        exports.codec_table[enc].id = exports.codec_table[enc].id || enc;
        exports.codec_table[enc].input = encoding;
        return exports.codec_table[enc];
    }
    if (!DISABLE_CODEC_DATA_WARN) {
        debug_color2_1.console.warn(encoding, enc, enc2, codec);
    }
    if (enc2) {
        return {
            key: enc,
            key2: enc2,
            input: encoding,
            error: true,
            not: !codec,
        };
    }
    else {
        return null;
    }
}
exports.codec_data = codec_data;
exports.codec_table = {
    big5hkscs: {
        id: 'big5',
        name: 'Big5',
    },
    cp936: {
        name: 'GB2312',
    },
    gbk: {
        name: 'GBK',
    },
    eucjp: {
        name: 'UC-JP',
    },
    shiftjis: {
        name: 'SHIFT_JIS',
    },
    //------------------
    utf8: {
        name: 'UTF-8',
    },
    ucs2: {
        name: 'UTF-16LE',
    },
    //------------------
    utf16be: {
        name: 'UTF-16BE',
    },
    /**
     * Error: Encoding not recognized: '' (searched as: '')
     */
    utf32be: {
        name: 'UTF-32BE',
        not: true,
    },
    utf32le: {
        name: 'UTF-32LE',
        not: true,
    },
};
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbmNvZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdDQUF5QztBQUN6QywrQ0FBdUM7QUFFOUIsa0JBRkEsc0JBQU8sQ0FFQTtBQUVoQixTQUFnQixJQUFJLENBQUMsUUFBZ0I7SUFFcEMsT0FBTyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFIRCxvQkFHQztBQStCWSxRQUFBLFlBQVksR0FBRztJQUMzQixPQUFPO0lBRVAsTUFBTTtJQUNOLE9BQU87SUFFUCxTQUFTO0lBQ1QsTUFBTTtJQUVOLFFBQVE7SUFFUixRQUFRO0lBQ1IsUUFBUTtJQUVSLEtBQUs7Q0FDTCxDQUFDO0FBRUYsU0FBZ0IsY0FBYyxDQUFDLFFBQWdCO0lBRTlDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QixPQUFPLG9CQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUMzRCxDQUFDO0FBSkQsd0NBSUM7QUFFRCxJQUFJLHVCQUF1QixHQUFHLEtBQUssQ0FBQztBQUVwQyxTQUFnQixvQkFBb0IsQ0FBQyxPQUFnQixJQUFJO0lBRXhELE9BQU8sdUJBQXVCLEdBQUcsSUFBSSxDQUFDO0FBQ3ZDLENBQUM7QUFIRCxvREFHQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxRQUF5QjtJQUVuRCxJQUFJLEtBR0gsQ0FBQztJQUNGLElBQUksR0FBVyxDQUFDO0lBQ2hCLElBQUksSUFBWSxDQUFDO0lBRWpCLElBQUksQ0FBQyxtQkFBVyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDdEM7UUFDQyxJQUNBO1lBQ0MsYUFBYTtZQUNiLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLElBQUksR0FBRyxLQUFLLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFFdkMsSUFBSSxtQkFBVyxDQUFDLElBQUksQ0FBQyxFQUNyQjtnQkFDQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2FBQ1g7U0FDRDtRQUNELE9BQU8sQ0FBQyxFQUNSO1NBRUM7S0FDRDtJQUVELElBQUksbUJBQVcsQ0FBQyxHQUFHLENBQUMsRUFDcEI7UUFDQyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDbkQsbUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsbUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDO1FBRWpELG1CQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUVsQyxPQUFPLG1CQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEI7SUFFRCxJQUFJLENBQUMsdUJBQXVCLEVBQzVCO1FBQ0Msc0JBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDekM7SUFFRCxJQUFJLElBQUksRUFDUjtRQUNDLE9BQU87WUFDTixHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxJQUFJO1lBRVYsS0FBSyxFQUFFLFFBQVE7WUFFZixLQUFLLEVBQUUsSUFBSTtZQUVYLEdBQUcsRUFBRSxDQUFDLEtBQUs7U0FDWCxDQUFDO0tBQ0Y7U0FFRDtRQUNDLE9BQU8sSUFBSSxDQUFDO0tBQ1o7QUFDRixDQUFDO0FBNURELGdDQTREQztBQUVZLFFBQUEsV0FBVyxHQUF3QjtJQUMvQyxTQUFTLEVBQUU7UUFDVixFQUFFLEVBQUUsTUFBTTtRQUNWLElBQUksRUFBRSxNQUFNO0tBQ1o7SUFDRCxLQUFLLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNkO0lBRUQsR0FBRyxFQUFFO1FBQ0osSUFBSSxFQUFFLEtBQUs7S0FDWDtJQUVELEtBQUssRUFBRTtRQUNOLElBQUksRUFBRSxPQUFPO0tBQ2I7SUFDRCxRQUFRLEVBQUU7UUFDVCxJQUFJLEVBQUUsV0FBVztLQUNqQjtJQUVELG9CQUFvQjtJQUVwQixJQUFJLEVBQUU7UUFDTCxJQUFJLEVBQUUsT0FBTztLQUNiO0lBQ0QsSUFBSSxFQUFFO1FBQ0wsSUFBSSxFQUFFLFVBQVU7S0FDaEI7SUFFRCxvQkFBb0I7SUFFcEIsT0FBTyxFQUFFO1FBQ1IsSUFBSSxFQUFFLFVBQVU7S0FDaEI7SUFFRDs7T0FFRztJQUNILE9BQU8sRUFBRTtRQUNSLElBQUksRUFBRSxVQUFVO1FBQ2hCLEdBQUcsRUFBRSxJQUFJO0tBQ1Q7SUFDRCxPQUFPLEVBQUU7UUFDUixJQUFJLEVBQUUsVUFBVTtRQUNoQixHQUFHLEVBQUUsSUFBSTtLQUNUO0NBQ0QsQ0FBQztBQUVGLGtCQUFlLE9BQXNDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaWNvbnYgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG5pbXBvcnQgaWNvbnZMaXRlID0gcmVxdWlyZSgnaWNvbnYtbGl0ZScpO1xuaW1wb3J0IHsgY29uc29sZSB9IGZyb20gJ2RlYnVnLWNvbG9yMic7XG5cbmV4cG9ydCB7IGNvbnNvbGUgfVxuXG5leHBvcnQgZnVuY3Rpb24gX2VuYyhlbmNvZGluZzogc3RyaW5nKTogc3RyaW5nXG57XG5cdHJldHVybiBlbmNvZGluZy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW14wLTlhLXpdfDpcXGR7NH0kL2csICcnKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRW5jb2RpbmdDb2RlY1xue1xuXHRrZXk/OiBzdHJpbmcsXG5cdGtleTI/OiBzdHJpbmcsXG5cblx0aWQ/OiBzdHJpbmcsXG5cblx0bmFtZT86IHN0cmluZyxcblx0aW5wdXQ/OiBzdHJpbmcsXG5cblx0ZXJyb3I/OiBib29sZWFuLFxuXHRub3Q/OiBib29sZWFuLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFbmNvZGluZ0NvZGVjVGFibGVcbntcblx0YmlnNWhrc2NzOiBJRW5jb2RpbmdDb2RlYyxcblx0Y3A5MzY6IElFbmNvZGluZ0NvZGVjLFxuXHRldWNqcDogSUVuY29kaW5nQ29kZWMsXG5cdHNoaWZ0amlzOiBJRW5jb2RpbmdDb2RlYyxcblx0dXRmODogSUVuY29kaW5nQ29kZWMsXG5cdHVjczI6IElFbmNvZGluZ0NvZGVjLFxuXHR1dGYxNmJlOiBJRW5jb2RpbmdDb2RlYyxcblx0dXRmMzJiZTogSUVuY29kaW5nQ29kZWMsXG5cdHV0ZjMybGU6IElFbmNvZGluZ0NvZGVjLFxuXG5cdFtrZXk6IHN0cmluZ106IElFbmNvZGluZ0NvZGVjLFxufVxuXG5leHBvcnQgY29uc3QgTm9kZUVuY29kaW5nID0gW1xuXHQnYXNjaWknLFxuXG5cdCd1dGY4Jyxcblx0J3V0Zi04JyxcblxuXHQndXRmMTZsZScsXG5cdCd1Y3MyJyxcblxuXHQnYmFzZTY0JyxcblxuXHQnbGF0aW4xJyxcblx0J2JpbmFyeScsXG5cblx0J2hleCcsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNOb2RlRW5jb2RpbmcoZW5jb2Rpbmc6IHN0cmluZyk6IHN0cmluZ1xue1xuXHRsZXQgZW5jID0gX2VuYyhlbmNvZGluZyk7XG5cdHJldHVybiBOb2RlRW5jb2RpbmcuaW5jbHVkZXMoX2VuYyhlbmNvZGluZykpID8gZW5jIDogbnVsbDtcbn1cblxubGV0IERJU0FCTEVfQ09ERUNfREFUQV9XQVJOID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlQ29kZWNEYXRhV2Fybihib29sOiBib29sZWFuID0gdHJ1ZSlcbntcblx0cmV0dXJuIERJU0FCTEVfQ09ERUNfREFUQV9XQVJOID0gYm9vbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvZGVjX2RhdGEoZW5jb2Rpbmc6IGljb252LnZFbmNvZGluZyk6IElFbmNvZGluZ0NvZGVjXG57XG5cdGxldCBjb2RlYzoge1xuXHRcdGVuY29kaW5nTmFtZT86IHN0cmluZyxcblx0XHRlbmM/OiBzdHJpbmcsXG5cdH07XG5cdGxldCBlbmM6IHN0cmluZztcblx0bGV0IGVuYzI6IHN0cmluZztcblxuXHRpZiAoIWNvZGVjX3RhYmxlW2VuYyA9IF9lbmMoZW5jb2RpbmcpXSlcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGNvZGVjID0gaWNvbnZMaXRlLmdldENvZGVjKGVuY29kaW5nKTtcblx0XHRcdGVuYzIgPSBjb2RlYy5lbmNvZGluZ05hbWUgfHwgY29kZWMuZW5jO1xuXG5cdFx0XHRpZiAoY29kZWNfdGFibGVbZW5jMl0pXG5cdFx0XHR7XG5cdFx0XHRcdGVuYyA9IGVuYzI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNhdGNoIChlKVxuXHRcdHtcblxuXHRcdH1cblx0fVxuXG5cdGlmIChjb2RlY190YWJsZVtlbmNdKVxuXHR7XG5cdFx0Y29kZWNfdGFibGVbZW5jXS5rZXkgPSBjb2RlY190YWJsZVtlbmNdLmtleSB8fCBlbmM7XG5cdFx0Y29kZWNfdGFibGVbZW5jXS5pZCA9IGNvZGVjX3RhYmxlW2VuY10uaWQgfHwgZW5jO1xuXG5cdFx0Y29kZWNfdGFibGVbZW5jXS5pbnB1dCA9IGVuY29kaW5nO1xuXG5cdFx0cmV0dXJuIGNvZGVjX3RhYmxlW2VuY107XG5cdH1cblxuXHRpZiAoIURJU0FCTEVfQ09ERUNfREFUQV9XQVJOKVxuXHR7XG5cdFx0Y29uc29sZS53YXJuKGVuY29kaW5nLCBlbmMsIGVuYzIsIGNvZGVjKTtcblx0fVxuXG5cdGlmIChlbmMyKVxuXHR7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGtleTogZW5jLFxuXHRcdFx0a2V5MjogZW5jMixcblxuXHRcdFx0aW5wdXQ6IGVuY29kaW5nLFxuXG5cdFx0XHRlcnJvcjogdHJ1ZSxcblxuXHRcdFx0bm90OiAhY29kZWMsXG5cdFx0fTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5leHBvcnQgY29uc3QgY29kZWNfdGFibGU6IElFbmNvZGluZ0NvZGVjVGFibGUgPSB7XG5cdGJpZzVoa3Njczoge1xuXHRcdGlkOiAnYmlnNScsXG5cdFx0bmFtZTogJ0JpZzUnLFxuXHR9LFxuXHRjcDkzNjoge1xuXHRcdG5hbWU6ICdHQjIzMTInLFxuXHR9LFxuXG5cdGdiazoge1xuXHRcdG5hbWU6ICdHQksnLFxuXHR9LFxuXG5cdGV1Y2pwOiB7XG5cdFx0bmFtZTogJ1VDLUpQJyxcblx0fSxcblx0c2hpZnRqaXM6IHtcblx0XHRuYW1lOiAnU0hJRlRfSklTJyxcblx0fSxcblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdHV0Zjg6IHtcblx0XHRuYW1lOiAnVVRGLTgnLFxuXHR9LFxuXHR1Y3MyOiB7XG5cdFx0bmFtZTogJ1VURi0xNkxFJyxcblx0fSxcblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdHV0ZjE2YmU6IHtcblx0XHRuYW1lOiAnVVRGLTE2QkUnLFxuXHR9LFxuXG5cdC8qKlxuXHQgKiBFcnJvcjogRW5jb2Rpbmcgbm90IHJlY29nbml6ZWQ6ICcnIChzZWFyY2hlZCBhczogJycpXG5cdCAqL1xuXHR1dGYzMmJlOiB7XG5cdFx0bmFtZTogJ1VURi0zMkJFJyxcblx0XHRub3Q6IHRydWUsXG5cdH0sXG5cdHV0ZjMybGU6IHtcblx0XHRuYW1lOiAnVVRGLTMyTEUnLFxuXHRcdG5vdDogdHJ1ZSxcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHMgYXMgdHlwZW9mIGltcG9ydCgnLi9lbmNvZGluZycpO1xuIl19