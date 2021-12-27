/**
 * Created by user on 2020/6/10.
 */

import path from 'path';
import { ITSPartialRecord } from 'ts-type';

export type ITestCaseRow = [string | any[], any?]

const isWin = process.platform === "win32";

export const testCases = {
	normalize: [
		[
			'c:/windows/nodejs/path',
			"c:/windows/nodejs/path"
		],
		[
			'c:/windows/../nodejs/path',
			"c:/nodejs/path"
		],
		isWin && [
			'c:\\windows\\nodejs\\path',
			"c:/windows/nodejs/path"
		],
		isWin && [
			'c:\\windows\\..\\nodejs\\path',
			"c:/nodejs/path"
		],
		/*
		[
			'//windows\\unix/mixed',
			"//windows/unix/mixed"
		],
		[
			'\\windows//unix/mixed',
			"/windows/unix/mixed"
		],
		 */
		[
			'//\\windows\\..\\unix/mixed/',
			"/unix/mixed/"
		],
		[
			'c:\\Windows\\Directory\\somefile.ext',
		],
		[
			'/root/of/unix/somefile.ext',
		],
		/*
		[
			'c:/',
		],
		[
			'c:',
		],

		[
			'c:\\',
		],
		 */
	],
	join: [
		[
			['some/nodejs/deep', '../path'],
		],
		isWin && [
			['some/nodejs\\windows', '../path'],
		],
		isWin && [
			['some\\windows\\only', '..\\path'],
		],
	],
	parse: [
		isWin && [
			'c:/windows/nodejs/path',
		],
		isWin && [
			'c:/windows/../nodejs/path',
		],
		isWin && [
			'c:\\windows\\nodejs\\path',
		],
		isWin && [
			'c:\\windows\\..\\nodejs\\path',
		],
		isWin && [
			'//windows\\unix/mixed',
		],
		[
			'\\windows//unix/mixed',
		],
		isWin && [
			'//\\windows\\..\\unix/mixed/',
		],
		isWin && [
			'c:\\Windows\\Directory\\somefile.ext',
		],
		[
			'/root/of/unix/somefile.ext',
		],
	],
} as ITSPartialRecord<Extract<keyof typeof path, string>, ITestCaseRow[]>

export default testCases;
