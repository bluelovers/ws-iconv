'use strict';

import LineByLine from '..';

const liner = new LineByLine('./fixtures/normalFile.txt');

let line;
let lineNumber = 0;

while (line = liner.next())
{
	console.dir(liner.lineNumber)
	console.dir('Line ' + lineNumber + ': ' + line.toString());
	lineNumber++;
}

console.log('end of line reached');
