# mimemap
## A simple JSON to Content-Type header for NodeJS Servers

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

I simply perform the regex `\.([a-z0-9]+)(?=\?|$)` to grab the file extension and then pull the mimetype from the mimemap.json file. Since it treats this object as a hash map it should do this very quickly.

No like that other MIME detection library, which iterates through an array of arrays...
