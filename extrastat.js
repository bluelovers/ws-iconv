const fs   = require('fs')
const path = require('path')
/**
 * You can require a JSON file to convert it to an object. Neat!
 */

const MIMEtypes = require("./mimemap.json")
const defaults = require('./.config.json')
const {id, gid} = require('identitymap')


// recursion could be... until path.dir == path.root

/**
 * @param {string} pathname - a file path to return information about
 * @param {function} callback - should expect (err, stat) to be returned
 * Note: 'filename: pathparts.pop() || pathparts.pop()' grabs the directory name if the filename is blank.
 */
function extraStat(pathname, callback){
    var resolvedpath = path.resolve(pathname)
    var pathparts    = resolvedpath.split('/')
    fs.stat(resolvedpath, (error, stat) => {
        if (error) callback(error, null)
        else callback(null, {
            filestat: stat,
            pathname: resolvedpath + (stat.isDirectory() && resolvedpath != '/' ? '/' : ''),
            ownername: id[stat.uid],
            groupname: gid[stat.gid],
            role: process.getuid() == stat.uid           ? 'user'  : 
                  process.getgroups().includes(stat.gid) ? 'group' : 
                                                           'other' ,
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

/*
 * @param {string} pathname - the pathname to REGEX out an extension. Can be a URL with querystring etc.
 * @return {string} - returns the MIME type after extracting extension and calling fromExtension

   MIMEtypes will return undefined if no mode is set, undefined falls over to || MIMEtypes['default'],
   which is probably text/plain so you can inspect the text unknown files.
 */
function fromFilePath(pathname){
    var {ext} = path.parse(pathname)
    return MIMEtypes[ext.toLowerCase()] || MIMEtypes['default']
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

module.exports = extraStat
