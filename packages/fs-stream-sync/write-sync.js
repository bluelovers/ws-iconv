'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const errors_1 = require("./lib/errors");
const internal_1 = require("./lib/internal");
const internal = require("./lib/internal");
const write_1 = require("./write");
class SyncWriteStream extends write_1.WriteStream {
    constructor(path, options) {
        // @ts-ignore
        super(path, options);
    }
    static get create() {
        return createSyncWriteStream;
    }
    open() {
        if (typeof internal_1.getFsStreamData(this) !== 'boolean') {
            this[internal_1.SYM_FS_STREAM_DATA].opened = true;
            internal.open(this);
        }
        else if (this[internal_1.SYM_FS_STREAM_DATA].opened === true) {
            this[internal_1.SYM_FS_STREAM_DATA].opened = false;
            this.emit('open', this.fd);
            this.emit('ready');
        }
    }
    write(chunk, ...argv) {
        /*
        if (this.closed)
        {
            throw new NodeLikeError(EnumFsStreamErrorCode.ERR_STREAM_WRITE_AFTER_END, `write after end`)
        }
        */
        if (this._writableState.destroyed) {
            throw new errors_1.NodeLikeError(errors_1.EnumFsStreamErrorCode.ERR_STREAM_DESTROYED, `Cannot call write after a stream was destroyed`);
        }
        //console.dir({chunk,argv} );
        return super.write(chunk, ...argv);
    }
    /**
     * @fixme a unknow bug make stream.write only run once
     */
    _write(chunk, encoding, callback) {
        let self = this;
        //console.dir({chunk, encoding, callback} );
        if (!(chunk instanceof Buffer)) {
            return this.emit('error', new Error('Invalid data'));
        }
        if (typeof this.fd !== 'number') {
            return this.once('open', function () {
                self._write(chunk, encoding, callback);
            });
        }
        try {
            let bytes = fs.writeSync(this.fd, chunk, 0, chunk.length, this.pos);
            this.bytesWritten += bytes;
        }
        catch (e) {
            internal._error_callback(this, e, callback);
        }
        if (this.pos !== undefined) {
            this.pos += chunk.length;
        }
    }
    close(cb) {
        if (cb) {
            if (this.closed) {
                cb();
                return;
            }
            else {
                // @ts-ignore
                this.on('close', cb);
            }
        }
        // If we are not autoClosing, we should call
        // destroy on 'finish'.
        if (!this.autoClose) {
            this.on('finish', this.destroy.bind(this));
        }
        // we use end() instead of destroy() because of
        // https://github.com/nodejs/node/issues/2006
        this.end();
    }
    _destroy(error, callback) {
        internal._destroy(this, error, callback);
    }
}
exports.SyncWriteStream = SyncWriteStream;
function createSyncWriteStream(path, options) {
    return new SyncWriteStream(path, options);
}
exports.createSyncWriteStream = createSyncWriteStream;
exports.default = SyncWriteStream;
// @ts-ignore
Object.freeze(exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtc3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlLXN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUViLHlCQUEwQjtBQUUxQix5Q0FBb0U7QUFTcEUsNkNBQXFFO0FBQ3JFLDJDQUE0QztBQUM1QyxtQ0FBcUM7QUFFckMsTUFBYSxlQUFnQixTQUFRLG1CQUFXO0lBRS9DLFlBQVksSUFBYyxFQUFFLE9BQXdDO1FBRW5FLGFBQWE7UUFDYixLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUVoQixPQUFPLHFCQUFxQixDQUFBO0lBQzdCLENBQUM7SUFFRCxJQUFJO1FBRUgsSUFBSSxPQUFPLDBCQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUM5QztZQUNDLElBQUksQ0FBQyw2QkFBa0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7WUFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNuQjthQUNJLElBQUksSUFBSSxDQUFDLDZCQUFrQixDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksRUFDakQ7WUFDQyxJQUFJLENBQUMsNkJBQWtCLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25CO0lBQ0YsQ0FBQztJQUlELEtBQUssQ0FBQyxLQUFVLEVBQUUsR0FBRyxJQUFJO1FBRXhCOzs7OztVQUtFO1FBQ0YsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFDakM7WUFDQyxNQUFNLElBQUksc0JBQWEsQ0FBQyw4QkFBcUIsQ0FBQyxvQkFBb0IsRUFBRSxnREFBZ0QsQ0FBQyxDQUFBO1NBQ3JIO1FBRUQsNkJBQTZCO1FBRTdCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsS0FBYSxFQUFFLFFBQWdCLEVBQUUsUUFBa0I7UUFFekQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBRWYsNENBQTRDO1FBRTVDLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxNQUFNLENBQUMsRUFDOUI7WUFDQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7U0FDckQ7UUFFRCxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxRQUFRLEVBQy9CO1lBQ0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFFeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1NBQ0g7UUFFRCxJQUNBO1lBQ0MsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFcEUsSUFBSSxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUM7U0FDM0I7UUFDRCxPQUFPLENBQUMsRUFDUjtZQUNDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTtTQUMzQztRQUVELElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQzFCO1lBQ0MsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3pCO0lBQ0YsQ0FBQztJQUVELEtBQUssQ0FBQyxFQUFhO1FBRWxCLElBQUksRUFBRSxFQUNOO1lBQ0MsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUNmO2dCQUNDLEVBQUUsRUFBRSxDQUFDO2dCQUNMLE9BQU87YUFDUDtpQkFFRDtnQkFDQyxhQUFhO2dCQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3JCO1NBQ0Q7UUFFRCw0Q0FBNEM7UUFDNUMsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUNuQjtZQUNDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDM0M7UUFFRCwrQ0FBK0M7UUFDL0MsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBbUIsRUFBRSxRQUF1QztRQUVwRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDekMsQ0FBQztDQUNEO0FBdkhELDBDQXVIQztBQUVELFNBQWdCLHFCQUFxQixDQUFDLElBQWMsRUFBRSxPQUF3QztJQUU3RixPQUFPLElBQUksZUFBZSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUMxQyxDQUFDO0FBSEQsc0RBR0M7QUFFRCxrQkFBZSxlQUFlLENBQUE7QUFDOUIsYUFBYTtBQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbmltcG9ydCB7IFBhdGhMaWtlIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBFbnVtRnNTdHJlYW1FcnJvckNvZGUsIE5vZGVMaWtlRXJyb3IgfSBmcm9tICcuL2xpYi9lcnJvcnMnO1xuaW1wb3J0IHtcblx0SUZzU3RyZWFtLFxuXHRJRnNTdHJlYW1TdGF0ZSxcblx0SUZzU3RyZWFtT3B0aW9ucyxcblx0SUZzV3JpdGVTdHJlYW1PcHRpb25zLFxuXHRJRnNTdHJlYW1EYXRhLFxuXHRJRnNQYXRoLFxufSBmcm9tICcuL2xpYi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgZ2V0RnNTdHJlYW1EYXRhLCBTWU1fRlNfU1RSRUFNX0RBVEEgfSBmcm9tICcuL2xpYi9pbnRlcm5hbCc7XG5pbXBvcnQgaW50ZXJuYWwgPSByZXF1aXJlKFwiLi9saWIvaW50ZXJuYWxcIik7XG5pbXBvcnQgeyBXcml0ZVN0cmVhbSB9IGZyb20gJy4vd3JpdGUnXG5cbmV4cG9ydCBjbGFzcyBTeW5jV3JpdGVTdHJlYW0gZXh0ZW5kcyBXcml0ZVN0cmVhbVxue1xuXHRjb25zdHJ1Y3RvcihwYXRoOiBQYXRoTGlrZSwgb3B0aW9ucz86IHN0cmluZyB8IElGc1dyaXRlU3RyZWFtT3B0aW9ucylcblx0e1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRzdXBlcihwYXRoLCBvcHRpb25zKVxuXHR9XG5cblx0c3RhdGljIGdldCBjcmVhdGUoKVxuXHR7XG5cdFx0cmV0dXJuIGNyZWF0ZVN5bmNXcml0ZVN0cmVhbVxuXHR9XG5cblx0b3BlbigpOiB2b2lkXG5cdHtcblx0XHRpZiAodHlwZW9mIGdldEZzU3RyZWFtRGF0YSh0aGlzKSAhPT0gJ2Jvb2xlYW4nKVxuXHRcdHtcblx0XHRcdHRoaXNbU1lNX0ZTX1NUUkVBTV9EQVRBXS5vcGVuZWQgPSB0cnVlXG5cdFx0XHRpbnRlcm5hbC5vcGVuKHRoaXMpXG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRoaXNbU1lNX0ZTX1NUUkVBTV9EQVRBXS5vcGVuZWQgPT09IHRydWUpXG5cdFx0e1xuXHRcdFx0dGhpc1tTWU1fRlNfU1RSRUFNX0RBVEFdLm9wZW5lZCA9IGZhbHNlXG5cdFx0XHR0aGlzLmVtaXQoJ29wZW4nLCB0aGlzLmZkKTtcblx0XHRcdHRoaXMuZW1pdCgncmVhZHknKTtcblx0XHR9XG5cdH1cblxuXHR3cml0ZShjaHVuazogYW55LCBjYj86IChlcnJvcjogRXJyb3IgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB2b2lkKTogYm9vbGVhbjtcblx0d3JpdGUoY2h1bms6IGFueSwgZW5jb2Rpbmc/OiBzdHJpbmcsIGNiPzogKGVycm9yOiBFcnJvciB8IG51bGwgfCB1bmRlZmluZWQpID0+IHZvaWQpOiBib29sZWFuO1xuXHR3cml0ZShjaHVuazogYW55LCAuLi5hcmd2KVxuXHR7XG5cdFx0Lypcblx0XHRpZiAodGhpcy5jbG9zZWQpXG5cdFx0e1xuXHRcdFx0dGhyb3cgbmV3IE5vZGVMaWtlRXJyb3IoRW51bUZzU3RyZWFtRXJyb3JDb2RlLkVSUl9TVFJFQU1fV1JJVEVfQUZURVJfRU5ELCBgd3JpdGUgYWZ0ZXIgZW5kYClcblx0XHR9XG5cdFx0Ki9cblx0XHRpZiAodGhpcy5fd3JpdGFibGVTdGF0ZS5kZXN0cm95ZWQpXG5cdFx0e1xuXHRcdFx0dGhyb3cgbmV3IE5vZGVMaWtlRXJyb3IoRW51bUZzU3RyZWFtRXJyb3JDb2RlLkVSUl9TVFJFQU1fREVTVFJPWUVELCBgQ2Fubm90IGNhbGwgd3JpdGUgYWZ0ZXIgYSBzdHJlYW0gd2FzIGRlc3Ryb3llZGApXG5cdFx0fVxuXG5cdFx0Ly9jb25zb2xlLmRpcih7Y2h1bmssYXJndn0gKTtcblxuXHRcdHJldHVybiBzdXBlci53cml0ZShjaHVuaywgLi4uYXJndilcblx0fVxuXG5cdC8qKlxuXHQgKiBAZml4bWUgYSB1bmtub3cgYnVnIG1ha2Ugc3RyZWFtLndyaXRlIG9ubHkgcnVuIG9uY2Vcblx0ICovXG5cdF93cml0ZShjaHVuazogQnVmZmVyLCBlbmNvZGluZzogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pXG5cdHtcblx0XHRsZXQgc2VsZiA9IHRoaXNcblxuXHRcdC8vY29uc29sZS5kaXIoe2NodW5rLCBlbmNvZGluZywgY2FsbGJhY2t9ICk7XG5cblx0XHRpZiAoIShjaHVuayBpbnN0YW5jZW9mIEJ1ZmZlcikpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ0ludmFsaWQgZGF0YScpKTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHRoaXMuZmQgIT09ICdudW1iZXInKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLm9uY2UoJ29wZW4nLCBmdW5jdGlvbiAoKVxuXHRcdFx0e1xuXHRcdFx0XHRzZWxmLl93cml0ZShjaHVuaywgZW5jb2RpbmcsIGNhbGxiYWNrKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHRyeVxuXHRcdHtcblx0XHRcdGxldCBieXRlcyA9IGZzLndyaXRlU3luYyh0aGlzLmZkLCBjaHVuaywgMCwgY2h1bmsubGVuZ3RoLCB0aGlzLnBvcyk7XG5cblx0XHRcdHRoaXMuYnl0ZXNXcml0dGVuICs9IGJ5dGVzO1xuXHRcdH1cblx0XHRjYXRjaCAoZSlcblx0XHR7XG5cdFx0XHRpbnRlcm5hbC5fZXJyb3JfY2FsbGJhY2sodGhpcywgZSwgY2FsbGJhY2spXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucG9zICE9PSB1bmRlZmluZWQpXG5cdFx0e1xuXHRcdFx0dGhpcy5wb3MgKz0gY2h1bmsubGVuZ3RoO1xuXHRcdH1cblx0fVxuXG5cdGNsb3NlKGNiPzogRnVuY3Rpb24pXG5cdHtcblx0XHRpZiAoY2IpXG5cdFx0e1xuXHRcdFx0aWYgKHRoaXMuY2xvc2VkKVxuXHRcdFx0e1xuXHRcdFx0XHRjYigpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0dGhpcy5vbignY2xvc2UnLCBjYik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSWYgd2UgYXJlIG5vdCBhdXRvQ2xvc2luZywgd2Ugc2hvdWxkIGNhbGxcblx0XHQvLyBkZXN0cm95IG9uICdmaW5pc2gnLlxuXHRcdGlmICghdGhpcy5hdXRvQ2xvc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5vbignZmluaXNoJywgdGhpcy5kZXN0cm95LmJpbmQodGhpcykpO1xuXHRcdH1cblxuXHRcdC8vIHdlIHVzZSBlbmQoKSBpbnN0ZWFkIG9mIGRlc3Ryb3koKSBiZWNhdXNlIG9mXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2lzc3Vlcy8yMDA2XG5cdFx0dGhpcy5lbmQoKTtcblx0fVxuXG5cdF9kZXN0cm95KGVycm9yOiBFcnJvciB8IG51bGwsIGNhbGxiYWNrOiAoZXJyb3I6IEVycm9yIHwgbnVsbCkgPT4gdm9pZCk6IHZvaWRcblx0e1xuXHRcdGludGVybmFsLl9kZXN0cm95KHRoaXMsIGVycm9yLCBjYWxsYmFjaylcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3luY1dyaXRlU3RyZWFtKHBhdGg6IFBhdGhMaWtlLCBvcHRpb25zPzogc3RyaW5nIHwgSUZzV3JpdGVTdHJlYW1PcHRpb25zKVxue1xuXHRyZXR1cm4gbmV3IFN5bmNXcml0ZVN0cmVhbShwYXRoLCBvcHRpb25zKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTeW5jV3JpdGVTdHJlYW1cbi8vIEB0cy1pZ25vcmVcbk9iamVjdC5mcmVlemUoZXhwb3J0cylcbiJdfQ==