/*
-- cat /etc/groups and parse gid -> groupname
-- cat /etc/passwd or get stdout of `dscl . -list /Users UniqueID`

-- in the future, watch for changes of this file and update your map
-- regex is not compitable with unencrypted password, expects stars
*/
const fs = require('fs')
const os = require('os')
const child_process = require('child_process')

let identitymap = {
	ids: {}, 
	gids: {}
}


// ^		   Only match at the beginning of line
// ([\w\.]+)   (Capture) at least one+ word character \w [and] dots \.
// [^-\d]*     Skip any number* of everything thats not^ a hyphen - [or] a digit \d
// (-?\d+)     Capture any number of digits, optionally? with a hyphen
// gm          flags: global, multiline

let idmatch = /^([\w\.]+)[^-\d]*(-?\d+)/gm

try {
	fs.readFileSync('/etc/group')
	.toString()
	.replace(idmatch, (match, groupname, gid) => {
		identitymap.gids[gid] = groupname
	})
} catch(e){
	/* do nothing, export empty object*/
	console.warn('identitymap was executed without permission to read /etc/group or /etc/group does not exist')
}

switch(process.platform){
	case 'darwin': 
		child_process.execSync('dscl . -list /Users UniqueID')
		.toString()
		.replace(idmatch, (match, username, uid) => {
			identitymap.ids[uid] = username
		})
	// case 'linux':
		// need to make sure this looks good on linux
		// fs.readFileSync('/etc/passwd')
		// .toString()
		// .replace(/(\w+).*(\d+)/g, (match, username, uid) => {
		// 	identitymap.ids[uid] = username
		// })
}
console.log(identitymap)
module.exports = identitymap