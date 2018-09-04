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
