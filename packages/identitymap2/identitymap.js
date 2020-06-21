/*
-- cat /etc/groups and parse gid -> groupname
-- cat /etc/passwd or get stdout of `dscl . -list /Users UniqueID`

-- in the future, watch for changes of this file and update your map
-- regex is not compitable with unencrypted password, expects stars
*/
const fs = require('fs')
const os = require('os')
const child_process = require('child_process')

let matchKeyValue = (new RegExp).compile(
    '^'           +// Only match at the beginning of line
    '([\\w\\.]+)' +// (Capture) at least one+ word character \w [and] dots \.
    '[^-\\d]*'    +// Skip any number* of everything thats not^ a hyphen - [or] a digit \d
    '(-?\\d+)'    +// Capture any number of digits, optionally? with a hyphen for '-1' and '-2'
    '[^-\\d]*'    +// Skip any number* of everything thats not^ a hyphen - [or] a digit \d
    '$'            // end of line
)

function splitKeyValue(line){
  return line.replace(matchKeyValue, (match, groupname, gid) => [gid, groupname]).split(',')
}

function neitherCommentNorBlank(line){
  return line && line[0] != '#'
}

function rollup(accumulator, current){
  return Object.assign(accumulator, {[current.shift()]: current.shift()})
}

function parse(bufferinput){
  return bufferinput
    .toString()
    .split(os.EOL)
    .filter(neitherCommentNorBlank)
    .map(splitKeyValue)
    .reduce(rollup, new Object)
}

function gids(){
  return parse(fs.readFileSync('/etc/group'))
}

function ids(){
  switch(process.platform){
    case 'darwin': 
      return parse(child_process.execSync('dscl . -list /Users UniqueID'))
    case 'linux':
    case 'freebsd': 
      return parse(fs.readFileSync('/etc/passwd'))
  }
}
module.exports = {gid: gids(), id: ids()}