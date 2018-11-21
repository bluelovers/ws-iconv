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
    // stat.ownername: the resolved name of stat.uid
    // stat.groupname: the resolved name of stat.gid
    // stat.role: whether you are 'user', 'group', or 'other' to each file
})
```

Here's a real example if you console.log the output:
```js
{
  pathname: '/Users/coltenjackson/Code/extrastat/',
  ownername: 'coltenjackson',
  groupname: 'staff',
  role: 'user',
  filemode: 'rwxr-xr-x',
  filename: 'extrastat',
  mimetype: 'application/directory'
  filestat: {
    dev: 16777220,
    mode: 16877,
    nlink: 11,
    uid: 501,
    gid: 20,
    rdev: 0,
    blksize: 4096,
    ino: 2542542,
    size: 352,
    blocks: 0,
    atimeMs: 1542786390696.0022,
    mtimeMs: 1542785421061.7803,
    ctimeMs: 1542785421061.7803,
    birthtimeMs: 1538694875923.41,
    atime: 2018-11-21T07:46:30.696Z,
    mtime: 2018-11-21T07:30:21.062Z,
    ctime: 2018-11-21T07:30:21.062Z,
    birthtime: 2018-10-04T23:14:35.923Z
  }
}

```

The octal filemode available at `stat.filestat.mode` is converted to human readable `rwxrwxrwx` format at `stat.filemode`.

[IdentityMap](https://github.com/jazzyjackson/identifymap) pulls up the ids and gids of all accounts on a system, this is referenced to convert each stat calls 'uid' and 'gid' properties to a username and groupname.

Sometimes the most difficult part about reading the system's 'rwxrw-r--' permission model is thinking about whether you're in a group that has ownership of a file, or whether you're signed on as the owner of a file. extraStat performs this task for you and returns the 'role' of your identity as it relates to each file: are you 'user'/owner ? 'group' ? or 'other' ?

You can edit mimemap.json to your heart's content.

A future version will include '[dotenv-alive](https://github.com/jazzyjackson/dotenv-alive)' to keep the user/group table and the mimetypes mapping up to date with the file on disk.

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
