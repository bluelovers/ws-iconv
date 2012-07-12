var test = require('tap').test;
var parents = require('../');

test('dirname', function (t) {
    var dirs = parents('/foo/bar/baz/quux');
    t.same(dirs, [
        '/foo/bar/baz/quux',
        '/foo/bar/baz',
        '/foo/bar',
        '/foo',
        '/',
    ]);
    t.end();
});
