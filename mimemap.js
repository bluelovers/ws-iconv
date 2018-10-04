const fs = require('fs')
const MIMEtypes = require("./mimemap.json")

module.exports = extraStat

/**
 * @param {string} pathname - a file path to return information about
 * @param {function} callback - should expect (err, stat) to be returned
 * Note: 'filename: pathparts.pop() || pathparts.pop()' grabs the directory name if the filename is blank.
 */
function extraStat(pathname, callback){
    var pathparts = pathname.split('/')
    fs.stat(pathname, (error, stat) => {
        if (error) callback(error, null)
        else callback(null, {
            filestat: stat,
            pathname: pathname,
            filemode: octal2symbol(stat.mode),
            filename: pathparts.pop() || pathparts.pop(), 
            mimetype: stat.isFile()      ?  fromFilePath(pathname) :
                      stat.isDirectory() ? 'application/directory' :
                      stat.isFIFO()      ? 'application/FIFO'      :
                      stat.isSocket()    ? 'application/socket'    :
                      /* otherwise...   */ 'application/unknown',
        })
    })
}

/**
 * @param {string} pathname - the pathname to REGEX out an extension. Can be a URL with querystring etc.
 * @return {string} - returns the MIME type after extracting extension and calling fromExtension
 */
function fromFilePath(pathname){
    var extension = /\.([a-z0-9]+)(?=\?|$)/i.exec(pathname)
    return fromExtension(extension ? extension.pop() : 'default')
}

/**
 * @param {string} extension
 * @return {string} - returns the MIME type by accessing mimemap.json 
 */
function fromExtension(extension){
    return MIMEtypes[extension.toLowerCase()] || MIMEtypes['default']
}

/**
 * @param {number} mode - The octal form of permission mode returned by fs.stat
 * @return {string} The human-readable representation of permission mode.
 */
function octal2symbol(mode){
    // bit shifting magic to extract read write execute permission for owner, group, and world
    // adapted from https://github.com/mmalecki/mode-to-permissions/blob/master/lib/mode-to-permissions.js
    if(!mode) return '.........'
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

