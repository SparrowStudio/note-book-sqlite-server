/**
 * @Description:
 * @author: bubao
 * @Date: 2022-01-23 12:49:36
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 16:57:50
 */
const md5 = require("md5");
const slat = "slat";
function md5Slat(text) {
	return md5(text + slat);
}
module.exports = md5Slat;
