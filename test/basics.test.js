const {expect} = require('chai')
const {extrastat, defaults} = require('../extrastat')

extrastatAsync = require('util').promisify(extrastat)

describe('extrastatSync Default Behavoir', () => {
	it('Loads a default configuration from disk', () => {
		expect(defaults).to.deep.equal(require('../.config.json'))
	})

	it('Returns an object containing a key for each options set to true', done => {
		extrastatAsync(process.cwd()).then(stat => {
			expect(stat).to.have.all.keys([
				'filestat',
				'filemode',
				'filename',
				'pathname',
				'mimetype',
			])

			expect(stat).to.not.have.any.keys([
				'role',
				'ownername',
				'groupname',
				'parents',
				'children',
				'siblings'
			])

		}).then(done).catch(done)
	})
})
