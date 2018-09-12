const fs = require('fs')
const MIMEtypes = require("./mimemap.json")

module.exports = { fromFilePath, fromExtension, extraStat }

function fromFilePath(pathname){
    // this handles a url passed in full, ending in a ? or eol
    var extension = /\.([a-z0-9]+)(?=\?|$)/i.exec(pathname)
    // turns out you can pop the result off a regex. if null, use 'default' instead
    var extensionMatch = extension ? extension.pop() : 'default'
    return fromExtension(extensionMatch)
}

// set aside as separate function in case you already have an extension to lookup
function fromExtension(extension){
    return MIMEtypes[extension.toLowerCase()] || MIMEtypes['default']
}

function octal2symbol(mode){
    // bit shifting magic to extract read write execute permission for owner, group, and world
    // adapted from https://github.com/mmalecki/mode-to-permissions/blob/master/lib/mode-to-permissions.js
    if(!mode) return ['.........']
    else return [
        mode >> 6 & 4      ? 'r' : '-',
        mode >> 6 & 2      ? 'w' : '-',
        mode >> 6 & 1      ? 'x' : '-',
        mode << 3 >> 6 & 4 ? 'r' : '-',
        mode << 3 >> 6 & 2 ? 'w' : '-',
        mode << 3 >> 6 & 1 ? 'x' : '-',
        mode << 6 >> 6 & 4 ? 'r' : '-',
        mode << 6 >> 6 & 2 ? 'w' : '-',
        mode << 6 >> 6 & 1 ? 'x' : '-',
    ].join('')
}

function extraStat(pathname, callback){
    var pathparts = pathname.split('/')
    fs.stat(pathname, (error, stat) => {
        if (error) callback(error, null)
        else callback(null, {
            filestat: stat,
            pathname: pathname,
            filemode: octal2symbol(stat.mode),
            filename: pathparts.pop() || pathparts.pop(), // OR triggers on an empty string and pops one more time, get a directory name instead of empty filename.
            mimetype: stat.isFile()      ?  fromFilePath(pathname) :
                      stat.isDirectory() ? 'application/directory' :
                      stat.isFIFO()      ? 'application/FIFO'      :
                      stat.isSocket()    ? 'application/socket'    :
                      /* otherwise...   */ 'application/unknown',
        })
    })
}
