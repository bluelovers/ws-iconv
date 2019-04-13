"use strict";
/**
 * Created by user on 2019/3/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const clone = require("lodash/clone");
const iconv_jschardet_1 = require("iconv-jschardet");
const Bluebird = require("bluebird");
const stream = require("stream");
const util_1 = require("./util");
exports.SymFSLib = Symbol('fsLib');
function WrapFSIconv(fsLib) {
    let fs = clone(fsLib);
    Object.keys(fs)
        .forEach(k => {
        if (typeof fsLib[k] === 'function') {
            fs[k] = fsLib[k].bind(fsLib);
        }
    });
    fs[exports.SymFSLib] = fsLib;
    fs.iconv = iconv_jschardet_1.default;
    fs.ensureWriteStream = ensureWriteStream.bind(fs);
    fs.saveFile = saveFile.bind(fs);
    fs.saveFileSync = saveFileSync.bind(fs);
    fs.loadFileSync = loadFileSync.bind(fs);
    fs.loadFile = loadFile.bind(fs);
    fs._createStreamPassThrough = _createStreamPassThrough.bind(fs);
    fs._outputStream = _outputStream.bind(fs);
    fs._autoDecode = _autoDecode.bind(fs);
    fs.trimFilename = util_1.trimFilename;
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-ignore
    fs.default = fs;
    return fs;
}
exports.WrapFSIconv = WrapFSIconv;
function ensureWriteStream(file) {
    let fs = this[exports.SymFSLib];
    fs.ensureFileSync(file);
    return fs.createWriteStream(file);
}
exports.ensureWriteStream = ensureWriteStream;
function saveFileSync(file, data, options = {}) {
    let fs = this[exports.SymFSLib];
    fs.ensureFileSync(file);
    if (options.encoding) {
        data = iconv_jschardet_1.default.encode(data, options.encoding);
    }
    fs.outputFileSync(file, data);
    return true;
}
exports.saveFileSync = saveFileSync;
function saveFile(file, data, options = {}) {
    let self = this;
    let fs = self[exports.SymFSLib];
    return Bluebird
        .resolve(fs.ensureFile(file))
        .tap(function () {
        return new Bluebird(function (resolve, reject) {
            if (options.encoding) {
                data = iconv_jschardet_1.default.encode(data, options.encoding);
            }
            let readStream = self._createStreamPassThrough(data);
            let writeStream = self._outputStream(file, readStream);
            writeStream.on('error', reject);
            writeStream.on('finish', resolve);
        });
    })
        .thenReturn(true);
}
exports.saveFile = saveFile;
function _createStreamPassThrough(data) {
    let readStream = new stream.PassThrough();
    readStream.end(data);
    return readStream;
}
exports._createStreamPassThrough = _createStreamPassThrough;
function _outputStream(file, readStream) {
    let fs = this[exports.SymFSLib];
    let writeStream = fs.createWriteStream(file);
    readStream.pipe(writeStream);
    return writeStream;
}
exports._outputStream = _outputStream;
function _autoDecode(buf, options) {
    if (Array.isArray(options.autoDecode)) {
        let _do;
        let c = iconv_jschardet_1.default._enc(iconv_jschardet_1.default.detect(buf, true).name);
        for (let from of options.autoDecode) {
            let cd = iconv_jschardet_1.default.codec_data(from);
            let key;
            if (cd && cd.name) {
                key = iconv_jschardet_1.default._enc(cd.name);
                if (c === key) {
                    _do = key;
                    break;
                }
            }
        }
        if (_do) {
            return iconv_jschardet_1.default.encode(buf, null, options.encoding);
        }
        else {
            return buf;
        }
    }
    return iconv_jschardet_1.default.encode(buf);
}
exports._autoDecode = _autoDecode;
function loadFile(file, options = {}) {
    let self = this;
    let fs = self[exports.SymFSLib];
    let ps;
    if (options.encoding) {
        let enc = iconv_jschardet_1.default.isNodeEncoding(options.encoding);
        if (enc) {
            ps = fs.readFile(file, options);
        }
        else {
            let ops = Object.assign({}, options);
            delete ops.encoding;
            ps = fs.readFile(file, ops)
                .then(function (buf) {
                return iconv_jschardet_1.default.decode(buf, options.encoding);
            });
        }
    }
    else if (options.autoDecode) {
        ps = fs.readFile(file, options)
            .then(function (buf) {
            return self._autoDecode(buf, options);
        });
    }
    else {
        ps = fs.readFile(file, options);
    }
    return Bluebird.resolve(ps);
}
exports.loadFile = loadFile;
function loadFileSync(file, options = {}) {
    let self = this;
    let fs = self[exports.SymFSLib];
    let ps;
    if (options.encoding) {
        let enc = iconv_jschardet_1.default.isNodeEncoding(options.encoding);
        if (enc) {
            ps = fs.readFileSync(file, options);
        }
        else {
            let ops = Object.assign({}, options);
            delete ops.encoding;
            ps = iconv_jschardet_1.default.decode(fs.readFileSync(file, ops), options.encoding);
        }
    }
    else if (options.autoDecode) {
        ps = self._autoDecode(fs.readFileSync(file, options), options);
    }
    else {
        ps = fs.readFileSync(file, options);
    }
    return ps;
}
exports.loadFileSync = loadFileSync;
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUlILHNDQUF1QztBQUN2QyxxREFBb0M7QUFDcEMscUNBQXNDO0FBQ3RDLGlDQUFrQztBQUNsQyxpQ0FBc0M7QUFFekIsUUFBQSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXhDLFNBQWdCLFdBQVcsQ0FBNEMsS0FBUTtJQUU5RSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFrQyxDQUFDO0lBRXZELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ2IsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1osSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLEVBQ2xDO1lBQ0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7SUFDRixDQUFDLENBQUMsQ0FDRjtJQUVELEVBQUUsQ0FBQyxnQkFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBRXJCLEVBQUUsQ0FBQyxLQUFLLEdBQUcseUJBQUssQ0FBQztJQUVqQixFQUFFLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxFQUFFLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFeEMsRUFBRSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJ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Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS8zLzE3LlxuICovXG5cbmltcG9ydCB7IHZFbmNvZGluZyB9IGZyb20gJ2ljb252LWpzY2hhcmRldCc7XG5pbXBvcnQgZnNFeHRyYSA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyk7XG5pbXBvcnQgY2xvbmUgPSByZXF1aXJlKFwibG9kYXNoL2Nsb25lXCIpO1xuaW1wb3J0IGljb252IGZyb20gJ2ljb252LWpzY2hhcmRldCc7XG5pbXBvcnQgQmx1ZWJpcmQgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xuaW1wb3J0IHN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuaW1wb3J0IHsgdHJpbUZpbGVuYW1lIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGNvbnN0IFN5bUZTTGliID0gU3ltYm9sKCdmc0xpYicpO1xuXG5leHBvcnQgZnVuY3Rpb24gV3JhcEZTSWNvbnY8RiBleHRlbmRzIHR5cGVvZiBmc0V4dHJhID0gdHlwZW9mIGZzRXh0cmE+KGZzTGliOiBGKTogV3JhcEZTSWNvbnYuSVdyYXBGUzxGPlxue1xuXHRsZXQgZnMgPSBjbG9uZShmc0xpYikgYXMgYW55IGFzIFdyYXBGU0ljb252LklXcmFwRlM8Rj47XG5cblx0T2JqZWN0LmtleXMoZnMpXG5cdFx0LmZvckVhY2goayA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIGZzTGliW2tdID09PSAnZnVuY3Rpb24nKVxuXHRcdFx0e1xuXHRcdFx0XHRmc1trXSA9IGZzTGliW2tdLmJpbmQoZnNMaWIpO1xuXHRcdFx0fVxuXHRcdH0pXG5cdDtcblxuXHRmc1tTeW1GU0xpYl0gPSBmc0xpYjtcblxuXHRmcy5pY29udiA9IGljb252O1xuXG5cdGZzLmVuc3VyZVdyaXRlU3RyZWFtID0gZW5zdXJlV3JpdGVTdHJlYW0uYmluZChmcyk7XG5cdGZzLnNhdmVGaWxlID0gc2F2ZUZpbGUuYmluZChmcyk7XG5cdGZzLnNhdmVGaWxlU3luYyA9IHNhdmVGaWxlU3luYy5iaW5kKGZzKTtcblxuXHRmcy5sb2FkRmlsZVN5bmMgPSBsb2FkRmlsZVN5bmMuYmluZChmcyk7XG5cdGZzLmxvYWRGaWxlID0gbG9hZEZpbGUuYmluZChmcyk7XG5cblx0ZnMuX2NyZWF0ZVN0cmVhbVBhc3NUaHJvdWdoID0gX2NyZWF0ZVN0cmVhbVBhc3NUaHJvdWdoLmJpbmQoZnMpO1xuXHRmcy5fb3V0cHV0U3RyZWFtID0gX291dHB1dFN0cmVhbS5iaW5kKGZzKTtcblx0ZnMuX2F1dG9EZWNvZGUgPSBfYXV0b0RlY29kZS5iaW5kKGZzKTtcblxuXHRmcy50cmltRmlsZW5hbWUgPSB0cmltRmlsZW5hbWU7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG5cdC8vIEB0cy1pZ25vcmVcblx0ZnMuZGVmYXVsdCA9IGZzO1xuXG5cdHJldHVybiBmcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZVdyaXRlU3RyZWFtKGZpbGU6IHN0cmluZylcbntcblx0bGV0IGZzID0gKHRoaXMgYXMgYW55IGFzIFdyYXBGU0ljb252LklXcmFwRlMpW1N5bUZTTGliXSBhcyB0eXBlb2YgZnNFeHRyYTtcblxuXHRmcy5lbnN1cmVGaWxlU3luYyhmaWxlKTtcblx0cmV0dXJuIGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUZpbGVTeW5jKGZpbGU6IHN0cmluZywgZGF0YSwgb3B0aW9uczogV3JhcEZTSWNvbnYuSVdyYXBGU0ljb252T3B0aW9ucyA9IHt9KVxue1xuXHRsZXQgZnMgPSAodGhpcyBhcyBhbnkgYXMgV3JhcEZTSWNvbnYuSVdyYXBGUylbU3ltRlNMaWJdIGFzIHR5cGVvZiBmc0V4dHJhO1xuXG5cdGZzLmVuc3VyZUZpbGVTeW5jKGZpbGUpO1xuXG5cdGlmIChvcHRpb25zLmVuY29kaW5nKVxuXHR7XG5cdFx0ZGF0YSA9IGljb252LmVuY29kZShkYXRhLCBvcHRpb25zLmVuY29kaW5nKTtcblx0fVxuXG5cdGZzLm91dHB1dEZpbGVTeW5jKGZpbGUsIGRhdGEpO1xuXG5cdHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUZpbGUoZmlsZTogc3RyaW5nLCBkYXRhLCBvcHRpb25zOiBXcmFwRlNJY29udi5JV3JhcEZTSWNvbnZPcHRpb25zID0ge30pXG57XG5cdGxldCBzZWxmOiBXcmFwRlNJY29udi5JV3JhcEZTPHR5cGVvZiBmc0V4dHJhPiA9IHRoaXM7XG5cdGxldCBmcyA9IHNlbGZbU3ltRlNMaWJdIGFzIHR5cGVvZiBmc0V4dHJhO1xuXG5cdHJldHVybiBCbHVlYmlyZFxuXHRcdC5yZXNvbHZlKGZzLmVuc3VyZUZpbGUoZmlsZSkpXG5cdFx0LnRhcChmdW5jdGlvbiAoKVxuXHRcdHtcblx0XHRcdHJldHVybiBuZXcgQmx1ZWJpcmQoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdClcblx0XHRcdHtcblx0XHRcdFx0aWYgKG9wdGlvbnMuZW5jb2RpbmcpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRkYXRhID0gaWNvbnYuZW5jb2RlKGRhdGEsIG9wdGlvbnMuZW5jb2RpbmcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHJlYWRTdHJlYW0gPSBzZWxmLl9jcmVhdGVTdHJlYW1QYXNzVGhyb3VnaChkYXRhKTtcblx0XHRcdFx0bGV0IHdyaXRlU3RyZWFtID0gc2VsZi5fb3V0cHV0U3RyZWFtKGZpbGUsIHJlYWRTdHJlYW0pO1xuXG5cdFx0XHRcdHdyaXRlU3RyZWFtLm9uKCdlcnJvcicsIHJlamVjdCk7XG5cdFx0XHRcdHdyaXRlU3RyZWFtLm9uKCdmaW5pc2gnLCByZXNvbHZlKTtcblx0XHRcdH0pXG5cdFx0fSlcblx0XHQudGhlblJldHVybih0cnVlKVxuXHRcdDtcbn1cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFdyYXBGU0ljb252XG57XG5cdGV4cG9ydCB0eXBlIElXcmFwRlM8RiBleHRlbmRzIHR5cGVvZiBmc0V4dHJhID0gdHlwZW9mIGZzRXh0cmE+ID0gRiAmXG5cdHtcblx0XHRbU3ltRlNMaWJdOiBGIHwgdHlwZW9mIGZzRXh0cmE7XG5cblx0XHRpY29udjogdHlwZW9mIGljb252O1xuXHRcdGVuc3VyZVdyaXRlU3RyZWFtKGZpbGU6IHN0cmluZyk6IGZzRXh0cmEuV3JpdGVTdHJlYW07XG5cblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0c2F2ZUZpbGUoZmlsZTogc3RyaW5nLCBkYXRhLCBvcHRpb25zPzogV3JhcEZTSWNvbnYuSVdyYXBGU0ljb252T3B0aW9ucyk6IEJsdWViaXJkPGJvb2xlYW4+O1xuXG5cdFx0c2F2ZUZpbGVTeW5jKGZpbGU6IHN0cmluZywgZGF0YSwgb3B0aW9ucz86IFdyYXBGU0ljb252LklXcmFwRlNJY29udk9wdGlvbnMpOiBib29sZWFuXG5cblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0bG9hZEZpbGU8VCA9IHN0cmluZz4oZmlsZTogc3RyaW5nLCBvcHRpb25zOiBXcmFwRlNJY29udi5JV3JhcEZTSWNvbnZPcHRpb25zTG9hZEZpbGUyICYgKHtcblx0XHRcdGVuY29kaW5nOiBzdHJpbmc7XG5cdFx0fSB8IHtcblx0XHRcdGF1dG9EZWNvZGU6IHRydWUgfCBzdHJpbmdbXTtcblx0XHR9KSk6IEJsdWViaXJkPFQ+O1xuXHRcdGxvYWRGaWxlPFQgPSBCdWZmZXI+KGZpbGU6IHN0cmluZywgb3B0aW9ucz86IFdyYXBGU0ljb252LklXcmFwRlNJY29udk9wdGlvbnNMb2FkRmlsZSk6IEJsdWViaXJkPFQ+O1xuXG5cdFx0bG9hZEZpbGVTeW5jPFQgPSBzdHJpbmc+KGZpbGU6IHN0cmluZywgb3B0aW9uczogV3JhcEZTSWNvbnYuSVdyYXBGU0ljb252T3B0aW9uc0xvYWRGaWxlMiAmICh7XG5cdFx0XHRlbmNvZGluZzogc3RyaW5nO1xuXHRcdH0gfCB7XG5cdFx0XHRhdXRvRGVjb2RlOiB0cnVlIHwgc3RyaW5nW107XG5cdFx0fSkpOiBUO1xuXHRcdGxvYWRGaWxlU3luYzxUID0gQnVmZmVyPihmaWxlOiBzdHJpbmcsIG9wdGlvbnM/OiBXcmFwRlNJY29udi5JV3JhcEZTSWNvbnZPcHRpb25zTG9hZEZpbGUpOiBUO1xuXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdF9jcmVhdGVTdHJlYW1QYXNzVGhyb3VnaChkYXRhOiB1bmtub3duKTogc3RyZWFtLlJlYWRhYmxlO1xuXHRcdF9vdXRwdXRTdHJlYW0oZmlsZTogc3RyaW5nLCByZWFkU3RyZWFtOiBzdHJlYW0uUmVhZGFibGUpOiBmc0V4dHJhLldyaXRlU3RyZWFtO1xuXG5cdFx0X2F1dG9EZWNvZGU8VD4oYnVmOiBULCBvcHRpb25zOiBXcmFwRlNJY29udi5JV3JhcEZTSWNvbnZPcHRpb25zTG9hZEZpbGUgJiB7XG5cdFx0XHRhdXRvRGVjb2RlOiB0cnVlIHwgc3RyaW5nW107XG5cdFx0fSk6IFQgfCBzdHJpbmcgfCBCdWZmZXI7XG5cdFx0X2F1dG9EZWNvZGUoYnVmOiB1bmtub3duLCBvcHRpb25zOiBXcmFwRlNJY29udi5JV3JhcEZTSWNvbnZPcHRpb25zTG9hZEZpbGUpOiBCdWZmZXI7XG5cblx0XHQvLyAtLS0tLS0tLS0tXG5cblx0XHR0cmltRmlsZW5hbWUobmFtZTogdW5rbm93bik6IHN0cmluZ1xuXHR9XG5cblx0ZXhwb3J0IGludGVyZmFjZSBJV3JhcEZTSWNvbnZPcHRpb25zXG5cdHtcblx0XHRlbmNvZGluZz86IHZFbmNvZGluZztcblx0fVxuXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVdyYXBGU0ljb252T3B0aW9uc0xvYWRGaWxlXG5cdHtcblx0XHRlbmNvZGluZz86IHN0cmluZztcblx0XHRmbGFnPzogc3RyaW5nO1xuXG5cdFx0YXV0b0RlY29kZT86IGJvb2xlYW4gfCBzdHJpbmdbXSxcblx0fVxuXG5cdGV4cG9ydCB0eXBlIElXcmFwRlNJY29udk9wdGlvbnNMb2FkRmlsZTIgPSBJV3JhcEZTSWNvbnZPcHRpb25zTG9hZEZpbGUgJiB7XG5cdFx0ZW5jb2Rpbmc6IHN0cmluZztcblx0fTtcblxuXHRleHBvcnQgdHlwZSBJRW5jb2RpbmcgPSB2RW5jb2Rpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVTdHJlYW1QYXNzVGhyb3VnaChkYXRhKTogc3RyZWFtLlJlYWRhYmxlXG57XG5cdGxldCByZWFkU3RyZWFtID0gbmV3IHN0cmVhbS5QYXNzVGhyb3VnaCgpO1xuXHRyZWFkU3RyZWFtLmVuZChkYXRhKTtcblx0cmV0dXJuIHJlYWRTdHJlYW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfb3V0cHV0U3RyZWFtKGZpbGU6IHN0cmluZywgcmVhZFN0cmVhbTogc3RyZWFtLlJlYWRhYmxlKTogZnNFeHRyYS5Xcml0ZVN0cmVhbVxue1xuXHRsZXQgZnMgPSAodGhpcyBhcyBhbnkgYXMgV3JhcEZTSWNvbnYuSVdyYXBGUylbU3ltRlNMaWJdIGFzIHR5cGVvZiBmc0V4dHJhO1xuXG5cdGxldCB3cml0ZVN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGUpO1xuXHRyZWFkU3RyZWFtLnBpcGUod3JpdGVTdHJlYW0pO1xuXHRyZXR1cm4gd3JpdGVTdHJlYW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfYXV0b0RlY29kZTxUPihidWY6IFQsIG9wdGlvbnM6IFdyYXBGU0ljb252LklXcmFwRlNJY29udk9wdGlvbnNMb2FkRmlsZSAmIHtcblx0YXV0b0RlY29kZTogdHJ1ZSB8IHN0cmluZ1tdLFxufSk6IFQgfCBzdHJpbmcgfCBCdWZmZXJcbmV4cG9ydCBmdW5jdGlvbiBfYXV0b0RlY29kZShidWYsIG9wdGlvbnM6IFdyYXBGU0ljb252LklXcmFwRlNJY29udk9wdGlvbnNMb2FkRmlsZSk6IEJ1ZmZlclxuZXhwb3J0IGZ1bmN0aW9uIF9hdXRvRGVjb2RlKGJ1Ziwgb3B0aW9uczogV3JhcEZTSWNvbnYuSVdyYXBGU0ljb252T3B0aW9uc0xvYWRGaWxlKTogc3RyaW5nIHwgQnVmZmVyXG57XG5cdGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuYXV0b0RlY29kZSkpXG5cdHtcblx0XHRsZXQgX2RvOiBzdHJpbmc7XG5cdFx0bGV0IGMgPSBpY29udi5fZW5jKGljb252LmRldGVjdChidWYsIHRydWUpLm5hbWUpO1xuXG5cdFx0Zm9yIChsZXQgZnJvbSBvZiAob3B0aW9ucy5hdXRvRGVjb2RlIGFzIHN0cmluZ1tdKSlcblx0XHR7XG5cdFx0XHRsZXQgY2QgPSBpY29udi5jb2RlY19kYXRhKGZyb20pO1xuXHRcdFx0bGV0IGtleTogc3RyaW5nO1xuXG5cdFx0XHRpZiAoY2QgJiYgY2QubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0a2V5ID0gaWNvbnYuX2VuYyhjZC5uYW1lKTtcblxuXHRcdFx0XHRpZiAoYyA9PT0ga2V5KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0X2RvID0ga2V5O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoX2RvKVxuXHRcdHtcblx0XHRcdHJldHVybiBpY29udi5lbmNvZGUoYnVmLCBudWxsLCBvcHRpb25zLmVuY29kaW5nKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJldHVybiBidWY7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGljb252LmVuY29kZShidWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZpbGU8VCA9IHN0cmluZz4oZmlsZTogc3RyaW5nLCBvcHRpb25zOiBXcmFwRlNJY29udi5JV3JhcEZTSWNvbnZPcHRpb25zTG9hZEZpbGUyICYgKHtcblx0ZW5jb2Rpbmc6IHN0cmluZyxcbn0gfCB7XG5cdGF1dG9EZWNvZGU6IHRydWUgfCBzdHJpbmdbXSxcbn0pKTogQmx1ZWJpcmQ8VD5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRmlsZTxUID0gQnVmZmVyPihmaWxlOiBzdHJpbmcsIG9wdGlvbnM/OiBXcmFwRlNJY29udi5JV3JhcEZTSWNvbnZPcHRpb25zTG9hZEZpbGUpOiBCbHVlYmlyZDxUPlxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGaWxlKGZpbGU6IHN0cmluZywgb3B0aW9uczogV3JhcEZTSWNvbnYuSVdyYXBGU0ljb252T3B0aW9uc0xvYWRGaWxlID0ge30pOiBCbHVlYmlyZDxCdWZmZXIgfCBzdHJpbmc+XG57XG5cdGxldCBzZWxmOiBXcmFwRlNJY29udi5JV3JhcEZTPHR5cGVvZiBmc0V4dHJhPiA9IHRoaXM7XG5cdGxldCBmcyA9IHNlbGZbU3ltRlNMaWJdIGFzIHR5cGVvZiBmc0V4dHJhO1xuXG5cdGxldCBwczogUHJvbWlzZTxhbnk+O1xuXG5cdGlmIChvcHRpb25zLmVuY29kaW5nKVxuXHR7XG5cdFx0bGV0IGVuYyA9IGljb252LmlzTm9kZUVuY29kaW5nKG9wdGlvbnMuZW5jb2RpbmcpO1xuXG5cdFx0aWYgKGVuYylcblx0XHR7XG5cdFx0XHRwcyA9IGZzLnJlYWRGaWxlKGZpbGUsIG9wdGlvbnMpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0bGV0IG9wczogV3JhcEZTSWNvbnYuSVdyYXBGU0ljb252T3B0aW9uc0xvYWRGaWxlID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG5cdFx0XHRkZWxldGUgb3BzLmVuY29kaW5nO1xuXG5cdFx0XHRwcyA9IGZzLnJlYWRGaWxlKGZpbGUsIG9wcylcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKGJ1Zilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBpY29udi5kZWNvZGUoYnVmLCBvcHRpb25zLmVuY29kaW5nKTtcblx0XHRcdFx0fSlcblx0XHRcdDtcblx0XHR9XG5cdH1cblx0ZWxzZSBpZiAob3B0aW9ucy5hdXRvRGVjb2RlKVxuXHR7XG5cdFx0cHMgPSBmcy5yZWFkRmlsZShmaWxlLCBvcHRpb25zKVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKGJ1Zilcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHNlbGYuX2F1dG9EZWNvZGUoYnVmLCBvcHRpb25zKTtcblx0XHRcdH0pXG5cdFx0O1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdHBzID0gZnMucmVhZEZpbGUoZmlsZSwgb3B0aW9ucyk7XG5cdH1cblxuXHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZShwcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRmlsZVN5bmM8VCA9IHN0cmluZz4oZmlsZTogc3RyaW5nLCBvcHRpb25zOiBXcmFwRlNJY29udi5JV3JhcEZTSWNvbnZPcHRpb25zTG9hZEZpbGUyICYgKHtcblx0ZW5jb2Rpbmc6IHN0cmluZyxcbn0gfCB7XG5cdGF1dG9EZWNvZGU6IHRydWUgfCBzdHJpbmdbXSxcbn0pKTogVFxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGaWxlU3luYzxUID0gQnVmZmVyPihmaWxlOiBzdHJpbmcsIG9wdGlvbnM/OiBXcmFwRlNJY29udi5JV3JhcEZTSWNvbnZPcHRpb25zTG9hZEZpbGUpOiBUXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZpbGVTeW5jKGZpbGU6IHN0cmluZywgb3B0aW9uczogV3JhcEZTSWNvbnYuSVdyYXBGU0ljb252T3B0aW9uc0xvYWRGaWxlID0ge30pOiBCdWZmZXIgfCBzdHJpbmdcbntcblx0bGV0IHNlbGY6IFdyYXBGU0ljb252LklXcmFwRlM8dHlwZW9mIGZzRXh0cmE+ID0gdGhpcztcblx0bGV0IGZzID0gc2VsZltTeW1GU0xpYl0gYXMgdHlwZW9mIGZzRXh0cmE7XG5cblx0bGV0IHBzO1xuXG5cdGlmIChvcHRpb25zLmVuY29kaW5nKVxuXHR7XG5cdFx0bGV0IGVuYyA9IGljb252LmlzTm9kZUVuY29kaW5nKG9wdGlvbnMuZW5jb2RpbmcpO1xuXG5cdFx0aWYgKGVuYylcblx0XHR7XG5cdFx0XHRwcyA9IGZzLnJlYWRGaWxlU3luYyhmaWxlLCBvcHRpb25zKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGxldCBvcHM6IFdyYXBGU0ljb252LklXcmFwRlNJY29udk9wdGlvbnNMb2FkRmlsZSA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuXHRcdFx0ZGVsZXRlIG9wcy5lbmNvZGluZztcblxuXHRcdFx0cHMgPSBpY29udi5kZWNvZGUoZnMucmVhZEZpbGVTeW5jKGZpbGUsIG9wcyksIG9wdGlvbnMuZW5jb2RpbmcpO1xuXHRcdH1cblx0fVxuXHRlbHNlIGlmIChvcHRpb25zLmF1dG9EZWNvZGUpXG5cdHtcblx0XHRwcyA9IHNlbGYuX2F1dG9EZWNvZGUoZnMucmVhZEZpbGVTeW5jKGZpbGUsIG9wdGlvbnMpLCBvcHRpb25zKTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRwcyA9IGZzLnJlYWRGaWxlU3luYyhmaWxlLCBvcHRpb25zKTtcblx0fVxuXG5cdHJldHVybiBwcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cyBhcyB0eXBlb2YgaW1wb3J0KCcuL2NvcmUnKTtcbiJdfQ==