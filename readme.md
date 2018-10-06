# mixint/extraStat
### A simple lookup table to add MIME types to your file stat calls.

I wrote this because I wanted a lightweight callback to add Content-Type headers to my font files and css files.

Uses nodejs filesystem builtins to determine if a file is a directory. Returns the fs.Stat object as well, so you can grab byte length for Content-Length, and 

### Usage
`yarn add @mixint/extrastat`

Use extrastat in place of fs.stat:

```js
const extraStat = require('@mixint/extrastat')

extraStat('package.json', (err, stat) => {
    // stat.filestat: original fs.Stat object
    // stat.filemode: string representing rwx permissions
    // stat.mimetype: determined from fs.isdir or file extension
    // stat.filename: convenient reference to filename without path
    // stat.pathname: original pathname
})
```

The octal filemode available at `stat.filestat.mode` is converted to human readable `rwxrwxrwx` format at `stat.filemode`.

You can edit mimemap.json to your heart's content.

I simply perform the regex `\.([a-z0-9]+)(?=\?|$)` to grab the file extension (stopping at ? or EOL means you can pass URLs with query attached and the query is ignored).

Once I have the extension I pull the mimetype from the mimemap.json file. Since it treats this object as a hash map it should do this very quickly. Full list shown below. I wanted to keep this small to minimize the size and memory footprint of my dependencies, as well as make it obvious how to customize your MIME types, say, if you have your own application/* in mind.

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
