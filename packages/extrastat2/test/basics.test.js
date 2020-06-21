const {expect} = require('chai')
const defaults  = require('../.config.json')
const extrastat = require('../extrastat')
const path = require('path')

extrastatAsync = require('util').promisify(extrastat)

describe('extrastatSync Default Behavoir', () => {

	it('Returns an object containing a key for each options set to true', async function(){
		let stat = await extrastatAsync(process.cwd())
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
})

describe('options for children and siblings', () => {
	it('lets you get the children of the current working directory', async function(){
		let stat = await extrastatAsync(process.cwd(), {children: true})
		expect(stat.children).to.deep.include({
			filename: 'extrastat.js',
			pathname: path.resolve('extrastat.js'),
			mimetype: 'text/plain',
		})
	})

	it('gives you the siblings of a file', async function(){
		let stat = await extrastatAsync('package.json', {children: true, siblings: true})
		expect(stat.children).to.equal(null)
		expect(stat.siblings).to.deep.include({
			filename: 'extrastat.js',
			pathname: path.resolve('extrastat.js'),
			mimetype: 'text/plain',
		})
	})

	it('lets you request children on a nondirectory, returning null', async function(){
		let stat = await extrastatAsync('package.json', {children: true})
		expect(stat.children).to.equal(null)
	})

	it('returns an empty array as children when it encounters an empty directory', async function(){
		let stat = await extrastatAsync('exampleEmpty', {children: true, siblings: true})
		expect(stat.children).to.be.an("array")
		expect(stat.children.length).to.equal(0)
	})
})
