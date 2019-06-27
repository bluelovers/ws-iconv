const fs   = require('fs')
const path = require('path')
/**
 * You can require a JSON file to convert it to an object. Neat!

 * Next trick will be handling bash expensions for ~ 
 */

const MIMEtypes = require("./mimemap.json")
const defaults  = require('./.config.json')
const {id, gid} = require('identitymap')

/**
@param {string} pathname
@param {extrastat.options} [options]    optional object to overwrite default config
@param {function} callback              gets called with args (err, stat)
@returns undefined                      Must be used with callback function

After successfully perfomring the initial stat,
Promise.all calls all of the functions returns by getOptionResolvers(options),
if options is null no big deal, defaults will be used.

Every key that was set to true in the options + default object is then assumed to be a function.
Functions return either a labeled object value, or a Promise to resolve to one:
  {[optionName]: optionValue}
The array of these results and promises get Object.assign'd into a single 'extrastat' object,
passed to the callback.
If any of the functions rejects, that error will be returned to the callback
(note that errors thrown during sync functions will be unhandled by Promise.all - make sure you handle it !)
**/
function extrastat(pathname, options, callback){
    // handle 2 or 3 arguments, assume 2nd argument is callback if there's no third arg.
    if(!callback){
      callback = options
      options = null
    }

    var resolvedpath = path.resolve(pathname)
    var pathparts    = resolvedpath.split('/')

    fs.stat(resolvedpath, (error, stat) => {
      if (error) callback(error, null)
      else Promise
        .all(getOptionResolvers(options).map(
          each => each(pathparts, stat)
        ))
        .then(resolvedOptions => {
          callback(null, Object.assign(...resolvedOptions))
        })
        .catch(error => {
          callback(error)
        })
     })
}

let resolvers = {
  /**
  @returns {'filestat':'fs.Stat'} the original stat object
  **/
  filename: (pathparts, stat) => ({"filename": pathparts.pop() || pathparts.pop()}),
  filestat: (pathparts, stat) => ({"filestat": stat}),
  pathname: (pathparts, stat) => {
    let resolvedpath = path.join(...pathparts)
    return {
      "pathname": resolvedpath + (stat.isDirectory() && resolvedpath != '/' ? '/' : '')
    }
  },
  ownername: (pathparts, stat) => ({"ownername": id[stat.uid]}),
  groupname: (pathparts, stat) => ({"groupname": gid[stat.gid]}),
  filemode: (pathparts, stat) => {
    let {mode} = stat
    if(!mode)
      return {'filemode': '.........'}
    else
      return {'filemode': [
        mode >> 6 & 4      ? 'r' : '-',
        mode >> 6 & 2      ? 'w' : '-',
        mode >> 6 & 1      ? 'x' : '-',
        mode << 3 >> 6 & 4 ? 'r' : '-',
        mode << 3 >> 6 & 2 ? 'w' : '-',
        mode << 3 >> 6 & 1 ? 'x' : '-',
        mode << 6 >> 6 & 4 ? 'r' : '-',
        mode << 6 >> 6 & 2 ? 'w' : '-',
        mode << 6 >> 6 & 1 ? 'x' : '-',
      ].join('')}
  },
  role: (pathparts, stat) => ({
    "role":
      process.getuid() == stat.uid           ? 'user'  : 
      process.getgroups().includes(stat.gid) ? 'group' : 
                                               'other' 
  }),
    /**
  @param {array} pathparts
  @param {fs.Stat | fs.Dirent}
  @returns {'mimetype':'string'} The mimetype derived from the file extension,
                                 Compatible with the result of fs.stat
                                 and Dirents returned by fs.readdir({withFileTypes:true})

  **/
  mimetype: (pathparts, stat) => {
    let fromFilePath = pathname => {
      let {ext} = path.parse(pathname)
      return MIMEtypes[ext.toLowerCase()] || MIMEtypes['default']
    }

    return {
      "mimetype":
        stat.isFile()      ?  fromFilePath(pathname) :
        stat.isDirectory() ? 'application/directory' :
        stat.isFIFO()      ? 'application/FIFO'      :
        stat.isSocket()    ? 'application/socket'    :
        /* otherwise...   */ 'application/unknown'  
    }
  },
  /**
  @param {array} pathparts - The resolved path name of this file split on '/'
  @param {fs.Stat} stat
  @returns {'parents':'array'} An array of {filename, pathname,  mimetype} objects
  **/
  parents: (pathparts, stat) => {
    var lastIndex = array => array[array.length - 1] || ''
    var ancestors = []

    for(var i = 0; i < pathparts.length; i++){
      ancestors.push(
        path.join(
          '/',
          lastIndex(ancestors),
          pathparts[i],
          '/'
        )
      )
    }

    return {'parents':
      ancestors.map((ancestor,index) => {
        return {
          filename: pathparts[index],
          pathname: ancestor,
          mimetype: 'application/directory'
        }
      })
    }
  }
}

/**
@param {extrastat.options} [options]
@return {array: function}

`Object.entries`  if options is undefined, no problem, Object.entries() will just be the entries of config.json.
`Object.assign`   if options is an object, its values override those in config.json
`.filter`.        For each of these Object.entries, the first .pop() tells us 'true or false',
                  Only those values that are 'true' pass the filter to be executed.
`.map`            The second .pop() gives us the name of the function to fetch from the resolvers object.
`.filter`         filter Boolean for keys that are not found in resolvers, will return undefined
                  This value gets returned assuming its an array of functions, each element is called right away
**/
function getOptionResolvers(options){
  return Object.entries(
      Object.assign(
        {},
        defaults,
        options
      )
    )
    .filter(each => each.pop())
    .map(each => resolvers[each.pop()])
    .filter(Boolean) 
}


module.exports = {
  /**
  @param {string}   pathname
  @param {function} callback :: callback(err, extrastatObject)
  **/
  extrastat,
  /**
  filename,
  filestat,
  pathname,
  ownername,
  groupname,
  filemode,
  role,
  mimetype
  **/
  resolvers
}





// maybe I read defaults, get an array of functions to use.
// for(option in defaults){
//   if(defaults[option]){
//     keys.push(option)
//   }
// }
/**
  extraResolvers:


later options might be, fileContents, fileHandle, open a file and just return its fd file descriptor, can create a readstream somewhere else from this fd if you want.
or fileContents can just read the buffer into memory, maybe provide .toString() methods by mimetype. base64 anything from here too.
extrastat('favicon.ino', {fileContents: 'base64'})
}
**/

// later... extrastat-lookalive keeps a cache of objects and inotifys them so that any request for the statistics of an object,
// or whole reams of objects (detailed stats in directory listings), 
// but at least you have the mimetype without having to poll 'stat' on every object, which is why I did all this in the first place.

// keys
//  .map(key => {[key]: extensions[key](stat)})
//  .reduce((a,b) => Object.assign(a,b), {filestat: stat})
// in this way, I only call functions that are set to true in the options, saving valueble time per call.
// easier to join pathparts than to resolve and split, 
// function extraExtraStat(pathparts, callback, extrastat){
//   // promise.all -- parallel async processes for performaing 'fs.readdir' on 3 paths at once. 
//   Promise.all(keymap.map(key => new Promise())
// }
