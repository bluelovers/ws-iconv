const {expect} = require('chai')
const extrastat = require('../extrastat')

describe('extrastatSync Default Behavoir', () => {
	it('Loads a default configuration from disk', () => {
		expect(extrastat.defaults).to.deep.equal(require('../.config.json'))
	})

	it('Returns an object containing a key for each options set to true', () => {
		let example = extrastatSync(process.cwd())

		expect(example).to.have.all.keys([
			'filestat',
			'filemode',
			'filename',
			'pathname',
			'mimetype'
		])

		expect(example).to.not.have.any.keys([
			'superctx', // {depth: 5, }
			'subctx',
			'ownername',
			'groupname',
			'role'
		])


	})
})

describe('The superctx data structure', () => {
	it('Is an array of objects, each with filename and pathname attributes')
})