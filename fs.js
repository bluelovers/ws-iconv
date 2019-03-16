"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by user on 2019/3/17.
 */
const core_1 = require("./core");
const core_2 = require("./core");
exports.ensureWriteStream = core_2.ensureWriteStream;
exports.saveFileSync = core_2.saveFileSync;
exports._autoDecode = core_2._autoDecode;
exports._createStreamPassThrough = core_2._createStreamPassThrough;
exports._outputStream = core_2._outputStream;
exports.loadFile = core_2.loadFile;
exports.loadFileSync = core_2.loadFileSync;
exports.saveFile = core_2.saveFile;
const iconv_jschardet_1 = require("iconv-jschardet");
exports.iconv = iconv_jschardet_1.default;
__export(require("fs-extra"));
exports = core_1.WrapFSIconv(require('fs-extra'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztHQUVHO0FBQ0gsaUNBQXFDO0FBQ3JDLGlDQUFpSjtBQVV4SSw0QkFWQSx3QkFBaUIsQ0FVQTtBQUFFLHVCQVZBLG1CQUFZLENBVUE7QUFBRSxzQkFWQSxrQkFBVyxDQVVBO0FBQUUsbUNBVkEsK0JBQXdCLENBVUE7QUFBRSx3QkFWQSxvQkFBYSxDQVVBO0FBQUUsbUJBVkEsZUFBUSxDQVVBO0FBQUUsdUJBVkEsbUJBQVksQ0FVQTtBQUFFLG1CQVZBLGVBQVEsQ0FVQTtBQU5oSSxxREFBb0M7QUFhM0IsZ0JBYkYseUJBQUssQ0FhRTtBQVRkLDhCQUF5QjtBQVd6QixPQUFPLEdBQUcsa0JBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUE4QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE5LzMvMTcuXG4gKi9cbmltcG9ydCB7IFdyYXBGU0ljb252IH0gZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IGVuc3VyZVdyaXRlU3RyZWFtLCBzYXZlRmlsZVN5bmMsIF9hdXRvRGVjb2RlLCBfY3JlYXRlU3RyZWFtUGFzc1Rocm91Z2gsIF9vdXRwdXRTdHJlYW0sIGxvYWRGaWxlLCBsb2FkRmlsZVN5bmMsIHNhdmVGaWxlIH0gZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IHZFbmNvZGluZyB9IGZyb20gJ2ljb252LWpzY2hhcmRldCc7XG5pbXBvcnQgZnNFeHRyYSA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyk7XG5pbXBvcnQgY2xvbmUgPSByZXF1aXJlKFwibG9kYXNoL2Nsb25lXCIpO1xuaW1wb3J0IGljb252IGZyb20gJ2ljb252LWpzY2hhcmRldCc7XG5pbXBvcnQgQmx1ZWJpcmQgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xuaW1wb3J0IHN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuXG5leHBvcnQgKiBmcm9tICdmcy1leHRyYSc7XG5cbmV4cG9ydCB7IGVuc3VyZVdyaXRlU3RyZWFtLCBzYXZlRmlsZVN5bmMsIF9hdXRvRGVjb2RlLCBfY3JlYXRlU3RyZWFtUGFzc1Rocm91Z2gsIF9vdXRwdXRTdHJlYW0sIGxvYWRGaWxlLCBsb2FkRmlsZVN5bmMsIHNhdmVGaWxlIH1cblxuZXhwb3J0IGltcG9ydCBJV3JhcEZTSWNvbnZPcHRpb25zID0gV3JhcEZTSWNvbnYuSVdyYXBGU0ljb252T3B0aW9ucztcbmV4cG9ydCBpbXBvcnQgSVdyYXBGU0ljb252T3B0aW9uc0xvYWRGaWxlID0gV3JhcEZTSWNvbnYuSVdyYXBGU0ljb252T3B0aW9uc0xvYWRGaWxlO1xuZXhwb3J0IGltcG9ydCBJV3JhcEZTSWNvbnZPcHRpb25zTG9hZEZpbGUyID0gV3JhcEZTSWNvbnYuSVdyYXBGU0ljb252T3B0aW9uc0xvYWRGaWxlMjtcbmV4cG9ydCBpbXBvcnQgSUVuY29kaW5nID0gV3JhcEZTSWNvbnYuSUVuY29kaW5nO1xuXG5leHBvcnQgeyBpY29udiB9XG5cbmV4cG9ydHMgPSBXcmFwRlNJY29udihyZXF1aXJlKCdmcy1leHRyYScpIGFzIHR5cGVvZiBpbXBvcnQoJ2ZzLWV4dHJhJykpO1xuIl19