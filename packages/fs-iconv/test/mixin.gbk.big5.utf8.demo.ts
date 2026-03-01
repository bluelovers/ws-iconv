/**
 * Created by user on 2019/3/17.
 */

//import fs from 'fs-iconv';
import fs = require('..');
import Bluebird = require('bluebird');
// @ts-ignore
import globby from 'node-novel-globby/g';
import { EnumEncoding } from 'iconv-jschardet';

Bluebird.mapSeries(globby.async([
	'*.txt',
], {
	cwd: 'C:/Home/link/dist_novel/syosetu/悠閑農家與亂碼技能/00000_null',
	absolute: true,
}), async function (file: string)
{
	let buf = await fs.loadFile(file);

	/**
	 * 自動判斷 檔案編碼 並且轉成 UTF8
	 * 適合用在檔案的編碼不統一混亂時
	 * 一個一個去肉眼檢查編碼會很累人
	 */
	return fs.saveFile(file, buf, {
			encoding: EnumEncoding.UTF8
		})
		.tap(function ()
		{
			console.log(file);
		})
})
;
