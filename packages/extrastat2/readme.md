# extrastat
### Resolve mimetype, ownername and groupname, and human-readable permissions.

I wrote this because I wanted a lightweight callback to add Content-Type headers to my font files and css files. Then I started added more features to mimic the utility of `ls -la`, printing the names of the owner, group owner, and the permissions as 'rwxr-xr-w' as opposted to fs.stat's representation of an octal mode, `16877`

Uses nodejs filesystem builtins to determine if a file is a directory. Returns the fs.Stat object as well, so you can grab byte length for Content-Length, and

### Usage
`yarn add extrastat`

Use extrastat in place of fs.stat:

```js
const extraStat = require('extrastat')

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

Here's a real example with default config if you console.log the output:
```js
```js
extrastat = util.promisify(extrastat)

console.log(await extrastat('/'))

{ 
  filename: '',
  fullpath: './',
  mimetype: 'application/directory',
  ownername: 'root',
  groupname: 'wheel',
  role: 'other',
  filemode: 'rwxr-xr-x',
}

console.log(await extrastat('.', {children: true})

{ 
  filename: 'extrastat',
  filemode: 'rwxr-xr-x',
  pathname: 'Users/coltenjackson/Code/extrastat/',
  mimetype: 'application/directory',
  ownername: 'coltenjackson',
  groupname: 'staff',
  role: 'user',
  children:
   [ { filename: '.config.json',
       pathname: '/Users/coltenjackson/Code/extrastat/.config.json',
       mimetype: 'application/json' },
     { filename: '.git',
       pathname: '/Users/coltenjackson/Code/extrastat/.git',
       mimetype: 'application/directory' },
     { filename: '.gitignore',
       pathname: '/Users/coltenjackson/Code/extrastat/.gitignore',
       mimetype: 'text/plain' },
     { filename: 'extrastat.js',
       pathname: '/Users/coltenjackson/Code/extrastat/extrastat.js',
       mimetype: 'text/plain' },
     { filename: 'mimemap.json',
       pathname: '/Users/coltenjackson/Code/extrastat/mimemap.json',
       mimetype: 'application/json' },
     { filename: 'node_modules',
       pathname: '/Users/coltenjackson/Code/extrastat/node_modules',
       mimetype: 'application/directory' },
     { filename: 'package.json',
       pathname: '/Users/coltenjackson/Code/extrastat/package.json',
       mimetype: 'application/json' },
     { filename: 'readme.md',
       pathname: '/Users/coltenjackson/Code/extrastat/readme.md',
       mimetype: 'text/markdown' },
     { filename: 'test',
       pathname: '/Users/coltenjackson/Code/extrastat/test',
       mimetype: 'application/directory' },
     { filename: 'yarn.lock',
       pathname: '/Users/coltenjackson/Code/extrastat/yarn.lock',
       mimetype: 'text/plain' } 
   ]
 }

```

Try out `extrastat('.', {siblings: true, parents: true, children: true})`

The octal filemode available at `stat.filestat.mode` is converted to human readable `rwxrwxrwx` format at `stat.filemode`.

[IdentityMap](https://github.com/jazzyjackson/identifymap) pulls up the ids and gids of all accounts on a system, this is referenced to convert each stat calls 'uid' and 'gid' properties to a username and groupname.

Sometimes the most difficult part about reading the system's 'rwxrw-r--' permission model is thinking about whether you're in a group that has ownership of a file, or whether you're signed on as the owner of a file. extraStat performs this task for you and returns the 'role' of your identity as it relates to each file: are you 'user'/owner ? 'group' ? or 'other' ?

You can edit mimemap.json to your heart's content.

A future version will include '[dotenv-alive](https://github.com/jazzyjackson/dotenv-alive)' to keep the user/group table and the mimetypes mapping up to date with the file on disk.

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

TODO:
  there's going to be a cache object that extrastat can return values from via resovledpath
  `{[resolvedPath]: 'cached extrastat object'}`
  A bit of a memory explosion occurs when you look up the parents and siblings of every element in an array, even when all the siblings have the same set of siblings (self-inclusive), the array would store these all as extra strings

  so there may have to be some creative thinking around the cache of parent, children, and sibling objects. Can I just keep one array of each per directory ? and all the sibling and children in that directory will have the same list of parents, just point to that object in memory. 'siblings of x','parents of x','children of x', well children at least will normally be unique.

  Maybe if its done by inode it will be more effecient... parents of inode x.
