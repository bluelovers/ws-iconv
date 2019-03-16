"use strict";
/**
 * Created by user on 2019/3/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize = require("sanitize-filename");
function trimFilename(name) {
    let ret = name.toString()
        .replace(/\r\n|\r|\n/g, ' ')
        .replace(/[\r\n\t  \xA0]+/g, ' ');
    return sanitize(ret, '')
        .trim()
        .replace(/^[　\s_]+/g, '')
        .replace(/[　\s_]+$/g, '');
}
exports.trimFilename = trimFilename;
exports.default = exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILDhDQUErQztBQUUvQyxTQUFnQixZQUFZLENBQUMsSUFBSTtJQUVoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQ3ZCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDO1NBQzNCLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FDakM7SUFFRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1NBQ3RCLElBQUksRUFBRTtTQUNOLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1NBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQ3hCO0FBQ0gsQ0FBQztBQVpELG9DQVlDO0FBRUQsa0JBQWUsT0FBa0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvMy8xNy5cbiAqL1xuXG5pbXBvcnQgc2FuaXRpemUgPSByZXF1aXJlKCdzYW5pdGl6ZS1maWxlbmFtZScpO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpbUZpbGVuYW1lKG5hbWUpOiBzdHJpbmdcbntcblx0bGV0IHJldCA9IG5hbWUudG9TdHJpbmcoKVxuXHRcdC5yZXBsYWNlKC9cXHJcXG58XFxyfFxcbi9nLCAnICcpXG5cdFx0LnJlcGxhY2UoL1tcXHJcXG5cXHQgwqBcXHhBMF0rL2csICcgJylcblx0O1xuXG5cdHJldHVybiBzYW5pdGl6ZShyZXQsICcnKVxuXHRcdC50cmltKClcblx0XHQucmVwbGFjZSgvXlvjgIBcXHNfXSsvZywgJycpXG5cdFx0LnJlcGxhY2UoL1vjgIBcXHNfXSskL2csICcnKVxuXHRcdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0cyBhcyB0eXBlb2YgaW1wb3J0KCcuL3V0aWwnKTtcbiJdfQ==