/**
 * @Description:
 * @author: bubao
 * @Date: 2021-06-21 08:34:12
 * @LastEditors: bubao
 * @LastEditTime: 2022-01-25 01:03:00
 */
const GenId = require("./cheery");
const errcode = require("./errcode");
const md5Slat = require("./md5Slat");
const { generateToken, verifyToken } = require("./token");
const MyError = require("./MyError");

module.exports = {
	cherry: GenId.init(),
	errcode,
	md5Slat,
	generateToken,
	verifyToken,
	MyError
};
