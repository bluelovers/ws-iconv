const fs = require('fs')
const MIMEtypes = require("./mimemap.json")

module.exports = { fromFilePath, fromExtension, extraStat }

function fromFilePath(pathname){
    var extension = /\.([a-z0-9]+)(?=\?|$)/i.exec(pathname)
    var extensionMatch = extension ? extension.pop() : 'default'
    return fromExtension(extensionMatch)
}

// set aside as a separate in case you already have an extension to lookup
function fromExtension(extension){
    return MIMEtypes[extension.toLowerCase()] || MIMEtypes['default']
}

function extraStat(pathname, callback){
    var pathparts = pathname.split('/')
    fs.stat(pathname, (err, stat) => {
        if(err) callback(err, null)
        else callback(null, {
            filestat: stat,
            pathname: pathname,
            filename: pathparts.pop() || pathparts.pop(), // OR triggers on an empty string and pops one more time, get a directory name instead of empty filename.
            mimetype: stat.isFile()      ?  fromFilePath(pathname) :
                      stat.isDirectory() ? 'application/directory' :
                      stat.isFIFO()      ? 'application/FIFO'      :
                      stat.isSocket()    ? 'application/socket'    :
                      /* otherwise...   */ 'application/unknown',
        })
    })
}
