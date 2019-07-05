const {expect} = require('chai')
const {extrastat, defaults} = require('../extrastat')
const path = require('path')

extrastatAsync = require('util').promisify(extrastat)

describe('extrastatSync Default Behavoir', () => {
	it('Loads a default configuration from disk', () => {
		expect(defaults).to.deep.equal(require('../.config.json'))
	})

	it('Returns an object containing a key for each options set to true', () => 
		extrastatAsync(process.cwd()).then(stat => {
			expect(stat).to.have.all.keys([
				'filemode',
				'filename',
				'pathname',
				'mimetype',
			])

			expect(stat).to.not.have.any.keys([
				'role',
				'filestat',
				'ownername',
				'groupname',
				'parents',
				'children',
				'siblings'
			])
		})
	)
})

describe('options for children and siblings', () => {
	it('lets you get the children of the current working directory', () => 
		extrastatAsync(process.cwd(), {children: true}).then(stat => {
			expect(stat.children).to.deep.include({
			 filename: 'extrastat.js',
       pathname: path.resolve('extrastat.js'),
       mimetype: 'text/plain',
			})
		})
	)

	it('lets you request children on a nondirectory, returning null', () => 
		extrastatAsync('package.json', {children: true}).then(stat => {
			expect(stat.children).to.equal(null)
		})
	)

	it('gives you the siblings of a file', () =>
		extrastatAsync('package.json', {children: true, siblings: true}).then(stat => {
			expect(stat.children).to.equal(null)
			expect(stat.siblings).to.deep.include({
			 filename: 'extrastat.js',
       pathname: path.resolve('extrastat.js'),
       mimetype: 'text/plain',
			})
		})
	)

	it('returns an empty array as children when it encounters an empty directory', () => 
		// fs.mkdirSync('exampleEmpty')
		// fs.rmdirSync('exampleEmpty')
		extrastatAsync('exampleEmpty', {children: true, siblings: true}).then(stat => {
			expect(stat.children).to.be.an("array")
			expect(stat.children.length).to.equal(0)
		})
	)
})
