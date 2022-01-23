/**
 * @Description:
 * @author: bubao
 * @Date: 2021-06-21 08:34:12
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-23 12:51:35
 */
const GenId = require("./cheery");
const errcode = require("./errcode");
const md5Slat = require("./md5Slat");
module.exports = {
	cherry: GenId.init(),
	errcode,
	md5Slat
};
