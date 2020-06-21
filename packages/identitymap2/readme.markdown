# IdentityMap

Returns an object {id, gid}, resolving each id and gid on the system to its name according to `/etc/group`, `/etc/passwd`, and `dscl . -list /Users UniqueID` on macos.

Installation:
```bash
yarn add identitymap
```

Usage:
```js
const identitymap = require('identitymap')

identitymap.gid[20]  // -> 'staff'
identitymap.gid[0]   // -> 'wheel'

identitymap.id[0]    // -> 'root'
identitymap.id[501]  // -> 'coltenjackson'

console.log(identitymap) 
// ->
{ gid:
   { '0': 'wheel',
     '1': 'daemon',
     '2': 'kmem',
     '3': 'sys',
     '4': 'tty',
     '5': 'operator',
     '6': 'mail',
     '7': 'bin',
     '8': 'procview',
     '9': 'procmod',
     '10': 'owner',
     '12': 'everyone',
     '16': 'group',
     '20': 'staff',
     /* ... */
     '-2': 'nobody',
     '-1': 'nogroup' },
  id:
   { '0': 'root',
     '1': 'daemon',
     '4': '_uucp',
     /* ... */
     '501': 'coltenjackson',
     '-2': 'nobody' }
}
```