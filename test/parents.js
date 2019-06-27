// Knows Parents

// extraStat('.') => [{'','/',application/json}]

const {extrastat} = require('../extrastat')

extrastat('.', {parents: true}, console.log)

/** prints:
null [
	{ filename: '',
    pathname: '/',
    mimetype: 'application/directory' },
  { filename: 'Users',
    pathname: '/Users/',
    mimetype: 'application/directory' },
  { filename: 'coltenjackson',
    pathname: '/Users/coltenjackson/',
    mimetype: 'application/directory' },
  { filename: 'Code',
    pathname: '/Users/coltenjackson/Code/',
    mimetype: 'application/directory' },
  { filename: 'extrastat',
    pathname: '/Users/coltenjackson/Code/extrastat/',
    mimetype: 'application/directory' }
]
**/

