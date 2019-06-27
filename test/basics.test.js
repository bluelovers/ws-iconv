const {expect} = require('chai')
const {extrastat, defaults} = require('../extrastat')

describe('extrastatSync Default Behavoir', () => {
	it('Loads a default configuration from disk', () => {
		expect(defaults).to.deep.equal(require('../.config.json'))
	})

	it('Returns an object containing a key for each options set to true', () => {
		let example = extrastat(process.cwd(), (err, stat) => {
			expect(example).to.have.all.keys([
				'filestat',
				'filemode',
				'filename',
				'pathname',
				'mimetype'
			])

			expect(example).to.not.have.any.keys([
				'ownername',
				'groupname',
				'role'
			])
		})
	})
})
