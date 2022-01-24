/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 12:49:36
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-24 19:43:41
 */
const md5 = require("md5");
const dotFile = require("./dotFile");
async function md5Slat(text) {
	const { slat } = await dotFile();
	return md5(text + slat);
}
module.exports = md5Slat;
