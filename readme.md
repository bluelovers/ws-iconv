# mimemap
## A simple JSON to Content-Type header for NodeJS Servers

I wrote this because I wanted a lightweight callback to add Content-Type headers to my font files and css files.

Uses nodejs filesystem builtins to determine if a file is a directory. Returns the fs.Stat object as well, so you can grab byte length for Content-Length, and the permissions mode, if that's important to you ;)

### Usage

Use mimemap.extrastat in place of fs.stat:

```js
mimemap.extraStat('package.json', (err, stat) => {
    // stat.filestat: original fs.Stat object
    // stat.mimetype: determined from fs.isdir or file extension
    // stat.filename: convenient reference to filename without path
    // stat.pathname: whole original path
})
```

You can edit mimemap.json to your heart's content.

I simply perform the regex `\.([a-z0-9]+)(?=\?|$)` to grab the file extension and then pull the mimetype from the mimemap.json file. Since it treats this object as a hash map it should do this very quickly. Full list shown below. Pull requests accepted of course.

No like that other MIME detection library, which iterates through an array of arrays...

```json
{
  "default": "text/plain",
  "html": "text/html",
  "htm": "text/html",
  "css": "text/css",
  "csv": "text/csv",
  "ics": "text/calendar",
  "markdown": "text/markdown",
  "mdown": "text/markdown",
  "mkdn": "text/markdown",
  "md": "text/markdown",
  "mkd": "text/markdown",
  "mdwn": "text/markdown",
  "svg": "image/svg+xml",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "gif": "image/gif",
  "bmp": "image/bmp",
  "m3u": "audio/x-mpequrl",
  "ogg": "audio/ogg",
  "flac": "audio/flac",
  "acc": "audio/acc",
  "mp3": "audio/mp3",
  "wave": "audio/wav",
  "wav": "audio/wav",
  "midi": "audio/midi",
  "webm": "video/webm",
  "mp4": "video/mp4",
  "avi": "video/avi",
  "json": "application/json",
  "log": "application/x-ndjson",
  "stl": "application/geometry",
  "fbx": "application/geometry",
  "obj": "application/geometry",
  "otf": "application/x-font-otf",
  "ttf": "application/x-font-ttf",
  "woff": "application/font-woff",
  "woff2": "application/font-woff2",
  "odf": "application/open-office",
  "doc": "application/ms-office",
  "docx": "application/ms-office",
  "xlst": "application/ms-office",
  "pptx": "application/ms-office",
  "yam": "application/yam"
}
```
